
docker run -it -d  -u root -p 8080:8080 -p 50000:50000 -v /var/run/docker.sock:/var/run/docker.sock -v $(which docker):/usr/bin/docker -v /var/jenkins_home:/var/jenkins_home --name jenkins2 jenkins/jenkins:lts


