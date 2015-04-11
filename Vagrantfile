# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "hashicorp/precise32"

  $root_script = <<-ROOT_SCRIPT
    sudo apt-get -y install apache2
    sudo apt-get -y install php5 libapache2-mod-php5 php5-mcrypt
    sudo a2dissite default
    sudo cp /vagrant/vagrant-scripts/apache-site.conf /etc/apache2/sites-available/danielhood.com
    sudo a2ensite danielhood.com
    sudo service apache2 restart
  ROOT_SCRIPT

  $user_script = <<-USER_SCRIPT
    cd /home/vagrant

    # Installing nvm
    wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh

    # This enables NVM without a logout/login
    export NVM_DIR="/home/vagrant/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

    # Install a node and alias
    nvm install 0.10.33
    nvm alias default 0.10.33

    # You can also install other stuff here
    npm install -g bower ember-cli
  USER_SCRIPT

  config.vm.provision "shell", path: "vagrant-scripts/install-postgres.sh" 
  config.vm.provision "shell", inline: $user_script, privileged: false
  config.vm.network "forwarded_port", guest: 80, host: 1337
  config.vm.provision "shell", inline: $root_script
end
