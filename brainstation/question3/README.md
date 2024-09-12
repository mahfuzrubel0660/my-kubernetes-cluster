






To deploy the application we can choose kubernetes as container platform. We will use multiple worker node on our kubernetes cluster.

We will deploy our application pod as replication as three for the redundant of the application. 

For the access of frontend application we will use ingress.

For the increasing load to the application server we will use auto scalling that with the increasing load new pod will be created as needed and loadbalancer will  balance the extra load to the pods.

For monitoring the resources of the pods we can use prometheus and grafana. prometheus will collect the data and grafana will plot the graph with that data.

For alerting any unwanted situation we can use alert manager and it will notify when the threshold will cross. 

For the passing through any ocnfiguration to the application of the pod we will use configmap as volume and it will impact the application pod instantly. 
    
For passing through any secret and password we can use kubernetes secret and it is base64 encoded. 

So for the deployment of application we will choose cloud platform and cloud VM is highly available instead of on-premise.. we will deploy kubernetes cluster with multiple worker node to ensure the high availability of the pods.











