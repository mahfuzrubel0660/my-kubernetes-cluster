


vim admin-sa.yml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: jmutai-admin
  namespace: kube-system


___

cat clusterrolebinding.yaml


apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: dashboard-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
  - kind: ServiceAccount
    name: dashboard-admin
    namespace: kube-system


Set a variable to store the name of the service account.

SA_NAME="dashboard-admin"
Then run the command below to print the token for the admin user created.

kubectl -n kube-system describe secret $(kubectl -n kube-system get secret | grep ${SA_NAME} | awk '{print $1}')




