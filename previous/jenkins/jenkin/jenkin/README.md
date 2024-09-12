# jenkin
jenkin

## Jenkin on docker 
```
docker run -it -d  -u root -p 8080:8080 -p 50000:50000 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v $(which docker):/usr/bin/docker \
-v /var/jenkins_home:/var/jenkins_home \
--name jenkins2 jenkins/jenkins:lts
```

## For K8s Deploy

```
kubectl create -f admin.yaml

# Get the token:
 kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep kube-admin | awk '{print $1}')
```

from jenkin web-ui-->Manage Jenkins--> Manage Credentials-->global--> add credentials-->kind->secret text--> put token in the secret field--> ID to identify the credential. 

use  this ID to the pipeline "credentialsId" field

Reguired Jenkin Plugin:

> Kubernetes plugin,
> 	Kubernetes Credentials Plugin,
> 		Kubernetes CLI Plugin


