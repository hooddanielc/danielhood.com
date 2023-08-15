variable "app_name" {
  type    = string
  default = "danielhood"
}

variable "git_sha" {
  type = string
}

variable "aws_access_key" {
  type      = string
  sensitive = true
}

variable "aws_secret_access_key" {
  type      = string
  sensitive = true
}
