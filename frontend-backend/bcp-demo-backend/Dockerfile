# pull official base image
FROM python:3.10.6-slim-buster

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# add and install requirements
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# add app
COPY . .

# Expose Port for the Container to listen 
EXPOSE 5000

# Run Flask App
CMD python manage.py run -h 0.0.0.0