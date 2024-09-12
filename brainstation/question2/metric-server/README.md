

kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml



# Get the metrics for all nodes 
kubectl get --raw /apis/metrics.k8s.io/v1beta1/nodes


# Get the metrics for all pods 
kubectl get --raw /apis/metrics.k8s.io/v1beta1/pods


# Get the metrics for node &lt;node_name&gt;
kubectl get --raw /apis/metrics.k8s.io/v1beta1/&lt;node_name&gt; |  jq '.'
# Get the metrics for pode &lt;pod_name&gt;
kubectl get --raw /apis/metrics.k8s.io/v1beta1/&lt;pod_name&gt; | jq '.'




