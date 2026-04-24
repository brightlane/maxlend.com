import boto3
import os
from botocore.exceptions import EndpointConnectionError

def upload_file_to_s3(file_path, bucket_name, s3_key):
    """
    Uploads a file to S3 with retries
    :param file_path: Local file path
    :param bucket_name: Name of the S3 bucket
    :param s3_key: The key in S3 where the file will be stored
    """
    s3_client = boto3.client('s3')
    
    try:
        print(f"Uploading {file_path} to s3://{bucket_name}/{s3_key}")
        s3_client.upload_file(file_path, bucket_name, s3_key)
        print(f"Successfully uploaded {file_path} to s3://{bucket_name}/{s3_key}")
    except EndpointConnectionError as e:
        print(f"Endpoint connection error: {e}")
    except Exception as e:
        print(f"An error occurred while uploading: {e}")

# Replace these with your actual values
file_path = 'path/to/generated/file/batch_1.csv'  # Path to the file to be uploaded
bucket_name = 'your-actual-bucket-name'  # Your actual S3 bucket name
s3_key = 'batch_1.csv'  # The name of the file in the bucket (can be changed)

# Call the function to upload
upload_file_to_s3(file_path, bucket_name, s3_key)
