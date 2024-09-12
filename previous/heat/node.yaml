heat_template_version: 2017-02-24
description: Kubernetes node definition
parameters:
    index:
        type: number
        label: Index
        description: Index in floating IP list
    key_name:
        type: string
        label: Key Name
        description: SSH key to be used for all instances
    image:
        type: string
        label: Image
        description: Image to be used
    volume_type:
        type: string
        label: volume-type
        description: bootable-volume
        default: CEPH
    flavor:
        type: string
        label: Instance Type
        description: Type of instance (flavor) to deploy node
    public_network_id:
        type: string
        description: ID of the public network
        default: public
    availability_zone:
        type: string
        label: Availability Zone
        description: Availabilito zone to create nodes in
    name:
        type: string
        label: Instance Name
        description: Name of the node
    internal_net:
        type: string
        label: Internal Network
        description: Network to connect node to
    install_script:
        type: string
        label: Install Script
        description: Script to run after cloud-init finishes
    additional_config:
        type: string
        label: Additional Config
        description: Additional software config
        default: ""
    security_group:
        type: string
        label: Security Group
        description: Security group to apply to nodes
    master_volume_size:
        type: number
        default: 50
    volume_size:
        type: number
    port_security_enabled:
        type: string
        description: port_security_enabled
        default: enabled



conditions:
    install_script:
        equals:
            - { get_param: install_script }
            - ""

    port_security_disable: {equals : [{get_param: port_security_enabled}, "disabled"]}

     
resources:
    port1:
        type: OS::Neutron::Port
        properties:
            admin_state_up: true
            network_id: { get_param: internal_net }
            security_groups:
                - { get_param: security_group }
    port2:
        type: OS::Neutron::Port
        properties:
            admin_state_up: true
            network_id: { get_param: internal_net }
            port_security_enabled: false


    instance_floatingip:
        type: OS::Neutron::FloatingIP
        properties:
            floating_network_id: { get_param: public_network_id }
            port_id: {if: ["port_security_disable", { get_resource: port2 }, { get_resource: port1 } ]}
    #           - "port_security_disable"
    #           - - { get_resource: port2 }
    #           - - { get_resource: port1 }

    master-volume:
        type: OS::Cinder::Volume
        properties:
            name  : { get_param: name }
            image : { get_param: image }
            size  : { get_param: volume_size }
            volume_type: { get_param: volume_type }
    instance:
        type: OS::Nova::Server
        depends_on: [ master-volume, port1, port2  ]
        properties:
            availability_zone: { get_param: availability_zone }
            flavor: { get_param: flavor }
            key_name: { get_param: key_name }
            networks:
                - port: {if: ["port_security_disable", { get_resource: port2 }, { get_resource: port1 } ]}
            name: { get_param: name }
            user_data_format: SOFTWARE_CONFIG
            user_data: { get_resource: user_data }
            block_device_mapping_v2:
                - device_name: vda
                  volume_id : { get_resource : master-volume }
                  delete_on_termination: True
    user_data_base:
        type: OS::Heat::CloudConfig
        properties:
            cloud_config:
                #cloud-config
                manage_etc_hosts: localhost
                package_update: true
                packages:
                    - socat
                runcmd:
                    - - 'systemd-run'
                      - '--on-boot=0s'
                      - '--unit=kubeadm-install'
                      - 'bash'
                      - '-c'
                      - { get_param: install_script }
    user_data:
        type: OS::Heat::MultipartMime
        properties:
            parts:
                if:
                    - install_script
                    - - config: { get_resource: user_data_base }
                    - - config: { get_resource: user_data_base }
                      - config: { get_param: additional_config }

outputs:
  ip:
    description: Master IP of kubernetes cluster
    value: {get_attr: [ instance, first_address ] }

   # value: {get_attr: [ instance_floatingip, floating_ip_address] }
  Floating_IP:
    description: Public IP of Master
    value: {get_attr: [ instance_floatingip, floating_ip_address] }
