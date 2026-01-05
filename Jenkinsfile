pipeline {
    agent {
        docker {
            image 'node:20'   // Node.js + npm installed
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // Allow Docker commands
        }
    }
    environment {
        IMAGE_NAME = "youcef26/expimage"                  // Docker Hub image
        IMAGE_TAG = "${env.BUILD_NUMBER}"             
        K8S_REPO = "https://github.com/Ldn26/cd.git"       /// manifests repo
        K8S_BRANCH = "master"                               // Branch Argo CD watches
    }

    stages {
        stage('Checkout App Code') {
            steps {
                checkout scm  
            }
        }

        stage('Install & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'   
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t $IMAGE_NAME:$IMAGE_TAG ."
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds', 
                    usernameVariable: 'DOCKER_USER', 
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME:$IMAGE_TAG
                        docker logout
                    '''
                }
            }
        }

        // stage('Update K8s Manifest in Git') {
        //     steps {
        //         // Clone the K8s manifests repo
        //         sh "git clone -b $K8S_BRANCH $K8S_REPO k8s-repo"
        //         dir('k8s-repo') {
        //             // Update the deployment.yaml image tag
        //             sh "sed -i.bak 's|image: $IMAGE_NAME:.*|image: $IMAGE_NAME:$IMAGE_TAG|' base/deployment.yaml"
        //             sh 'git config user.name "Ldn26"'
        //             sh 'git config user.email "youcefldn26@gmail.com"'
        //             sh 'git add base/deployment.yaml'
        //             sh "git commit -m 'Update image to $IMAGE_TAG'"
        //             sh "git push origin $K8S_BRANCH"
        //         }
        //     }
        // }
    }

    // post {
    //     success {
    //         echo "Pipeline completed successfully! Argo CD will deploy the new image."
    //     }
    //     failure {
    //         echo "Pipeline failed. Check logs for details."
    //     }
    // }
}
