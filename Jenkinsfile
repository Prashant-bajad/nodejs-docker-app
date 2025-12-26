pipeline {
    agent any
    
    environment {
        AWS_REGION = 'us-east-1'
        ECR_REPO = '590183832380.dkr.ecr.us-east-1.amazonaws.com/todo-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
        APP_SERVER = 'ec2-user@18.221.19.114'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out code from GitHub...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                script {
                    sh "docker build -t ${ECR_REPO}:${IMAGE_TAG} ."
                    sh "docker tag ${ECR_REPO}:${IMAGE_TAG} ${ECR_REPO}:latest"
                }
            }
        }
        
        stage('Push to ECR') {
            steps {
                echo '☁️ Pushing image to AWS ECR...'
                script {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                        docker push ${ECR_REPO}:${IMAGE_TAG}
                        docker push ${ECR_REPO}:latest
                    """
                }
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                echo '🚀 Deploying to EC2...'
                script {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${APP_SERVER} '
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ECR_REPO}
                            docker pull ${ECR_REPO}:latest
                            docker stop nodejs-app || true
                            docker rm nodejs-app || true
                            docker run -d --name nodejs-app -p 3000:3000 ${ECR_REPO}:latest
                        '
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}