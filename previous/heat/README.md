[200~k8s-cluster-using-heat
Prerequisite:

1. openstack python client
2. Openstack python heat client
3. openstack credential
Ubuntu

apt install python-openstackclient python-pip
pip install python-heatclient
Change the following as per your environment

vi creds
export OS_USERNAME=
export OS_PASSWORD=
export OS_PROJECT_NAME=
export OS_USER_DOMAIN_NAME=Default
export OS_PROJECT_DOMAIN_NAME=Default
export OS_AUTH_URL=http://cloud.brilliant.com.bd:5000/v3
export OS_IDENTITY_API_VERSION=3
export OS_IMAGE_API_VERSION=2
export OS_AUTH_TYPE=password
$ source creds

$ openstack stack create -t stack_full.yaml -e env.yaml k8s-cluster --wait

To scale UP the node
change the env.yaml, slave_count: 2 or 3 , your desired worker count.

openstack stack update --existing k8s-cluster -e env.yaml
or
openstack stack update -t stack_full.yaml -e env.yaml k8s-cluster

login to the master node, cd ~
	kubeadm token create --print-join-command > joinslave
	##for ubuntu: 
	python3 -m http.server 80
        ##for centos: 
	python -m SimpleHTTPServer 80
        ##Press CTRL-C after get the below message for each node. 

        {{{10.10.2.19 - - [28/Oct/2020 10:19:18] "GET /joinslave HTTP/1.1" 200 - }}}
