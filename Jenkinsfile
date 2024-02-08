pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from Git repository
                git branch: 'dev', url: 'https://github.com/jayanthbillemane/arbifrontend'
                echo 'Checked out code successfully'
            }
        }
        stage('Deploy') {
            when {
                branch 'dev' // Only run this stage for the dev branch
            }
            steps {
                // Use Jenkins credentials to retrieve values securely
                withCredentials([
                    usernamePassword(credentialsId: 'creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                    file(credentialsId: 'pemid', variable: 'PEM_FILE')
                ]) {
                    // Print credential values (optional)
                    echo "Username: $USERNAME"
                    // Construct the remote command
                    def remoteCommand = """
                        cd /home/azureuser/arbifrontend &&
                        git pull origin dev &&
                        docker-compose up -d
                    """

                    // Deploy changes to the server
                    sh "ssh -i $PEM_FILE $USERNAME@$server '$remoteCommand'"
                }
            }
        }
    }
}
