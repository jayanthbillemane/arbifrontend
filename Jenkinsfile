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
                script {
                    // Retrieve SERVER credential
                    def serverCredential = credentials('server')
                    echo "serverCredential: $serverCredential"
                    def server = serverCredential.server

                    // Retrieve USERNAME and PASSWORD credentials
                    def usernamePasswordCredential = credentials('arviprod')
                    def usernamePasswordCredentialp = credentials('passwrd')

                    def arviprod = usernamePasswordCredential.azureuser
                    def password = usernamePasswordCredentialp.passwrd

                    // Retrieve PEM_FILE credential
                    def pemFileCredential = credentials('pemid')
                    def pemid = pemFileCredential.id

                    // Print credential values
                    echo "Server: $server"
                    echo "Username: $arviprod"
                    echo "PEM File ID: $pemid"
                    
                    // Deploy changes to the server
                    sh '''
                    sshpass -p "$password" ssh -i "$pemid" "$arviprod"@"$server" 'cd /home/azureuser/arbifrontend && git pull origin dev && docker-compose up -d'
                    '''
                    
                    echo 'Deployment completed successfully'
                }
            }
        }
    }
}
