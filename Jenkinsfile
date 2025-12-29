pipeline {
    agent any

    environment {
        IMAGE = "dockerhub_ldn/expimage"
        TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t $IMAGE:$TAG ."
            }
        }

        // stage('Push Image too dokcer hub haha ') {
        //     steps {
        //         withCredentials([usernamePassword(
        //             credentialsId: 'dockerhub-creds',
        //             usernameVariable: 'USER',
        //             passwordVariable: 'PASS'
        //         )]) {
        //             sh """
        //             echo $PASS | docker login -u $USER --password-stdin
        //             docker push $IMAGE:$TAG
        //             """
        //         }
        //     }
        // }
    }
}
