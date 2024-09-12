#FROM httpd
FROM centos:7

#COPY index.html /usr/local/apache2/htdocs/index.html

RUN yum update -y 
RUN yum install epel-release -y
RUN yum install memcached python-memcached -y
RUN yum install openstack-dashboard httpd httpd-tools mod_wsgi -y
RUN yum -y install yum-plugin-priorities

RUN yum -y install centos-release-openstack-rocky -y
RUN yum install python-openstackclient -y
RUN yum install openstack-selinux -y

COPY memcached /etc/sysconfig/
RUN yum install vim nmap net-tools chrony -y
RUN echo "server 0.asia.pool.ntp.org iburst " >> /etc/chrony.conf  
#RUN systemctl enable chronyd
#RUN systemctl start chronyd
#RUN setenforce 0
#RUN sed -i 's/enforcing/permissive/g' /etc/selinux/config

RUN mkdir  /etc/openstack-dashboard/
RUN touch /etc/openstack-dashboard/local_settings
COPY local_settings /etc/openstack-dashboard/
RUN mkdir -p /etc/httpd/conf.d/
COPY openstack-dashboard.conf  /etc/httpd/conf.d/
RUN yum -y install systemd; yum clean all; \
(cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == systemd-tmpfiles-setup.service ] || rm -f $i; done)
EXPOSE 80 8080 443 8443
ENV container docker
CMD ["/usr/sbin/init"]
RUN export XDG_RUNTIME_DIR=/run/user/$(id -u)
#RUN systemctl restart httpd






