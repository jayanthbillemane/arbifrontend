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
                // Retrieve the server credential
                withCredentials([string(credentialsId: 'server', variable: 'SERVER')]) {
                    // Use Jenkins credentials to retrieve values securely
                    withCredentials([
                        usernamePassword(credentialsId: 'creds', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD'),
                        file(credentialsId: 'pemid', variable: 'PEM_FILE')
                    ]) {

                        // Print credential values (optional)
                        echo "Username: $USERNAME"
                        echo "Username: $SERVER"

                        // Deploy changes to the server
                        sh "ssh  -o StrictHostKeyChecking=no -i $PEM_FILE $USERNAME@$SERVER 'cd /home/azureuser/arbifrontend && git pull'"
                    }
                }
            }
        }
    }
}
