terraform {
  backend "s3" {
    bucket         = "danielhood-tf-state"
    key            = "danielhood-web.tfstate"
    region         = "us-west-2"
    dynamodb_table = "danielhood-tf-state"
  }
}

provider "aws" {
  access_key = var.aws_access_key
  secret_key = var.aws_secret_access_key
  region     = "us-west-2"

  default_tags {
    tags = {
      Environment = terraform.workspace
      Application = var.app_name
    }
  }
}

data "terraform_remote_state" "orchestration" {
  backend = "s3"
  config = {
    access_key = var.aws_access_key
    secret_key = var.aws_secret_access_key
    bucket     = "danielhood-tf-state"
    key        = "env:/${terraform.workspace}/danielhood-orchestration.tfstate"
    region     = "us-west-2"
  }
}

/**
 * Load Balancer Target Group: Port 3000/3000
 */
resource "aws_alb_target_group" "main" {
  name        = "${data.terraform_remote_state.orchestration.outputs.name_prefix}-web-tg"
  port        = 80
  protocol    = "HTTP"
  vpc_id      = data.terraform_remote_state.orchestration.outputs.vpc.id
  target_type = "ip"

  health_check {
    healthy_threshold   = "3"
    interval            = "30"
    protocol            = "HTTP"
    matcher             = "200"
    timeout             = "3"
    path                = "/index.html"
    unhealthy_threshold = "2"
  }

  tags = {
    Name = "${data.terraform_remote_state.orchestration.outputs.name_prefix}-http-tg"
  }
}

# Redirect traffic to target group
resource "aws_alb_listener" "https_main" {
  load_balancer_arn = data.terraform_remote_state.orchestration.outputs.alb.alb_id
  port              = 3000
  protocol          = "HTTPS"
  certificate_arn   = data.terraform_remote_state.orchestration.outputs.alb.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.main.id
  }
}

/**
 * ECS Service
 */
resource "aws_ecs_task_definition" "web" {
  family                   = "${data.terraform_remote_state.orchestration.outputs.name_prefix}-web-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = data.terraform_remote_state.orchestration.outputs.ecs.ecs_task_execution_role_arn
  task_role_arn            = data.terraform_remote_state.orchestration.outputs.ecs.ecs_task_role_arn
  container_definitions = jsonencode([
    {
      name      = "${data.terraform_remote_state.orchestration.outputs.name_prefix}-web-container"
      image     = "${data.terraform_remote_state.orchestration.outputs.ecr.urls.web}:${var.git_sha}"
      essential = true
      portMappings = [{
        protocol      = "tcp"
        containerPort = 3000
        hostPort      = 3000
      }]
      # environment = [
      #   {
      #     name  = "API_DOMAIN"
      #     value = "EXAMPLE"
      #   }
      # ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = data.terraform_remote_state.orchestration.outputs.ecs.cloudwatch_log_group_name
          awslogs-stream-prefix = "ecs"
          awslogs-region        = data.terraform_remote_state.orchestration.outputs.ecs.region
        }
      }
    }
  ])

  tags = {
    Name = "${data.terraform_remote_state.orchestration.outputs.name_prefix}-task"
  }
}

resource "aws_ecs_service" "web" {
  name                               = "${data.terraform_remote_state.orchestration.outputs.name_prefix}-web-service"
  cluster                            = data.terraform_remote_state.orchestration.outputs.ecs.ecs_cluster_id
  task_definition                    = aws_ecs_task_definition.web.arn
  desired_count                      = 1
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200
  health_check_grace_period_seconds  = 60
  launch_type                        = "FARGATE"
  scheduling_strategy                = "REPLICA"

  network_configuration {
    security_groups  = [data.terraform_remote_state.orchestration.outputs.security_groups.ecs_tasks]
    subnets          = data.terraform_remote_state.orchestration.outputs.ecs.subnets
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.main.arn
    container_name   = "${data.terraform_remote_state.orchestration.outputs.name_prefix}-web-container"
    container_port   = 3000
  }

  # we ignore task_definition changes as the revision changes on deploy
  # of a new version of the application
  # desired_count is ignored as it can change due to autoscaling policy
  lifecycle {
    ignore_changes = [desired_count]
  }
}

output "remote_state_data" {
  value = data.terraform_remote_state.orchestration.outputs
}

output "ecr_repo" {
  value = data.terraform_remote_state.orchestration.outputs.ecr.urls.web
}
