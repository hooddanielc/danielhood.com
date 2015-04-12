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
    sudo apt-get -y install git
    sudo apt-get -y install curl
    sudo apt-get -y install tmux
    sudo apt-get -y install vim
  ROOT_SCRIPT

  $user_script = <<-USER_SCRIPT
    cd /home/vagrant

    # Installing nvm
    wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
    export NVM_DIR="/home/vagrant/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm
    nvm install 0.12.2
    nvm alias default 0.12.2

    # Installing ember-cli
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"
    export PATH="$HOME/.linuxbrew/bin:$PATH"
    export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
    export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"
    brew install watchman
    npm install -g bower ember-cli phantomjs
    cd /vagrant/front-end
    npm install
    bower install
    ember build
    git clone --recursive https://github.com/hooddanielc/dannys-vim.git ~/.vim && ~/.vim/install.sh
  USER_SCRIPT

  config.vm.provision "shell", path: "vagrant-scripts/install-postgres.sh" 
  config.vm.network "forwarded_port", guest: 80, host: 1337
  config.vm.provision "shell", inline: $root_script
  config.vm.provision "shell", inline: $user_script, privileged: false
end
