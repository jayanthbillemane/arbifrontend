pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git repository
                git branch: 'dev', url: 'https://github.com/jayanthbillemane/arbifrontend'
            }
        }
        stage('Deploy') {
            when {
                branch 'dev' // Only run this stage for the dev branch
            }
            steps {
                // Deploy changes to the server
                sh '''
                SERVER="$server"
                USERNAME="$arviprod"
                PEM_FILE="$pemid"
                PASSWORD="$passwrd"
                
                sshpass -p "$PASSWORD" ssh -i "$PEM_FILE" "$USERNAME"@"$SERVER" 'cd /home/azureuser/arbifrontend && git pull origin dev && docker-compose up -d'
                '''
            }
        }
    }
}

pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git repository
                git branch: 'dev', url: 'https://github.com/jayanthbillemane/arbifrontend'
            }
        }
        stage('Deploy') {
            when {
                branch 'dev' // Only run this stage for the dev branch
            }
            steps {
                // Use Jenkins credentials to retrieve SSH private key for authentication
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'your-ssh-credentials-id', keyFileVariable: 'SSH_PRIVATE_KEY')]) {
                        // Deploy changes to the server
                        sh '''
                        SERVER="$server"
                        USERNAME="$arviprod"
                        
                        # Use SSH_PRIVATE_KEY variable to specify the private key file
                        ssh -i "$SSH_PRIVATE_KEY" "$USERNAME"@"$SERVER" 'cd /path/to/your/app && git pull origin dev && ./deploy.sh'
                        '''
                    }
                }
            }
        }
    }
}

