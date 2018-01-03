# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure('2') do |config|
  config.vm.box = 'azure'
  config.vm.box_url = 'https://github.com/msopentech/vagrant-azure/raw/master/dummy.box' #Caja base vacía
  config.vm.network "public_network" 
  config.vm.hostname = "localhost"
  config.vm.network "forwarded_port", guest: 80, host: 80

  # use local ssh key to connect to remote vagrant box
  config.ssh.private_key_path = '~/.ssh/id_rsa'
  config.ssh.username = 'projectx'
  config.vm.provider :azure do |azure, override|
    azure.vm_image_urn = 'canonical:UbuntuServer:16.04-LTS:16.04.201701130'
    azure.vm_size = 'Basic_A0'
    azure.location = 'southcentralus'
    azure.tcp_endpoints = '80'
    azure.vm_name = "projectxmaquina"
    azure.resource_group_name= "projectx"
    azure.tenant_id = '2c9d55c9-7a3d-46b3-85ac-e6bdff7c7f5c'
    azure.client_id = '9c205bc6-2027-49bd-bc93-7a82ee46c37e'
    azure.client_secret = 'cbdb3945-39e8-4922-af4f-41d6f40f03a2'
    azure.subscription_id = '4182b17d-b952-4b79-bf8f-035b21024e3d'
  end

  # Provisionar con ansible
  config.vm.provision "ansible" do |ansible|
    ansible.sudo = true
    ansible.playbook = "./playbook.yml"
    ansible.verbose = "-vvvv"

    ansible.host_key_checking = false
  end

end
