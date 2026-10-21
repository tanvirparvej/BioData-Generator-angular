pipeline {
    agent any

    environment {
        REGISTRY_USER = 'tanvirparvej'
        IMAGE_NAME    = 'biodata-generator-angular'
        IMAGE_TAG     = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                // Pulls code from your Git repository
                checkout scm
            }
        }

        stage('Down Existing Containers') {
            steps {
                echo 'Stopping running containers...'
                sh 'docker-compose down --remove-orphans'
            }
        }

        stage('Build & Deploy with Docker Compose') {
            steps {
                echo 'Building and starting the application...'
                // Builds the image and runs it in detached (-d) mode
                sh 'docker-compose up --build -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo "Deployment successful! Your Angular app is running."
        }
        failure {
            echo "Deployment failed. Check the logs above."
        }
    }
}
