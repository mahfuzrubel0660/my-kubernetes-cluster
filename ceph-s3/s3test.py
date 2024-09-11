



import boto3

endpoint = "http://s3.brilliant.com.bd:8080" # enter the endpoint _URL_ along with the port "http://URL:PORT"

access_key = 'EWFHFYITT3LULC21UWLZ'
secret_key = 'JDG24jrBAF10R13GzzwgpA0oEQptH682mv35xQLu'

s3 = boto3.client(
        's3',
        endpoint_url=endpoint,
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key
        )

s3.create_bucket(Bucket='my-new-bucket')

response = s3.list_buckets()
for bucket in response['Buckets']:
    print("{name}\t{created}".format(
                name = bucket['Name'],
                created = bucket['CreationDate']
))

