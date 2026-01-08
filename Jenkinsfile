// pipeline {
//     agent any

//     environment {
//         IMAGE = "youcef26/expimage"
//         TAG = "${BUILD_NUMBER}"
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 checkout scm
//             }
//         }

//         stage('Build Image') {
//             steps {
//                 sh "docker build -t $IMAGE:$TAG ."
//             }
//         }

//         stage('Push Image to Docker Hub') {
//             steps {
//                 withCredentials([usernamePassword(
//                     credentialsId: 'dockerhub-creds',
//                     usernameVariable: 'USER',
//                     passwordVariable: 'PASS'
//                 )]) {
//                     sh '''
//                         echo "$PASS" | docker login -u "$USER" --password-stdin
//                         docker push $IMAGE:$TAG
//                         docker logout
//                     '''
//                 }
//             }
//         }
//     }
// }

pipeline {
    agent any

    environment {
        IMAGE = "youcef26/expimage"
        TAG = "${BUILD_NUMBER}"
        MANIFEST_REPO = "https://github.com/Ldn26/cd.git"
        MANIFEST_BRANCH = "master"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm  // using source coe managements
            }
        }

        stage('Build Image') {
            steps {
                sh "docker build -t $IMAGE:$TAG ."
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh '''
                        echo "$PASS" | docker login -u "$USER" --password-stdin
                        docker push $IMAGE:$TAG
                        docker logout
                    '''
                }
            }
        }

        stage('Update Manifest Image (Argo CD)') {
            steps {
                sh '''
                  rm -rf manifest-repo
                  git clone -b $MANIFEST_BRANCH $MANIFEST_REPO manifest-repo 
                  cd manifest-repo/base
                  sed -i "s|image: .*|image: $IMAGE:$TAG|" deployment.yaml
                  git config user.name "Ldn26"
                  git config user.email "y_laidani@estin.dz"
                  git add deployment.yaml
                  git commit -m "Update image to $IMAGE:$TAG"
                  git push origin $MANIFEST_BRANCH
                '''
            }
        }
    }
}
