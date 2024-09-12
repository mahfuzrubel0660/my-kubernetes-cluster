



kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml

kubectl get all -n kubernetes-dashboard

kubectl edit service/kubernetes-dashboard -n kubernetes-dashboard

kubectl get pods --all-namespaces

kubectl get svc --all-namespaces

# to access to the dashboard

kubectl create serviceaccount dashboard -n kubernetes-dashboard

# to find the token 

kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard  get serviceaccount dashboard -o jsonpath="{.secrets[0].name}") -o jsonpath="{.data.token}" | base64 --decode

OR, this work

kubectl --namespace kubernetes-dashboard describe secret $(kubectl -n kubernetes-dashboard get secret | grep admin-user | awk '{print $1}')


# for full access to the cluster


kubectl create clusterrolebinding dashboard-admin -n kubernetes-dashboard  --clusterrole=cluster-admin  --serviceaccount=default:dashboard













