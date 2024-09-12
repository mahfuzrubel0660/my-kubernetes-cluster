pipeline {
  environment {
    registry = "munnaeeebd/bs23"
    registryCredential = 'dockerhub'
    dockerImage = ''
  }
  agent any
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/munnaeebd/bs23-task1.git'
      }
    }
    stage('Building image') {
      steps{
        script {
          dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
    stage('Deploy Image') {
      steps{
        script {
          docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
          }
        }
      }
    }
    stage('Kubernetes-deployment') {
      steps{
        sh "kubectl create deployment app1 --image=munnaeeebd/bs23:$BUILD_NUMBER"  
      }
    }
  }
}
