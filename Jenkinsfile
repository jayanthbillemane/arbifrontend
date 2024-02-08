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
                    def serverCredential = credentials('server', '/Global credentials (unrestricted)')
                    def server = serverCredential.username

                    // Retrieve USERNAME and PASSWORD credentials
                    def usernamePasswordCredential = credentials('arviprod', '/Global credentials (unrestricted)')
                    def arviprod = usernamePasswordCredential.username
                    def password = usernamePasswordCredential.password

                    // Retrieve PEM_FILE credential
                    def pemFileCredential = credentials('pemid', '/Global credentials (unrestricted)')
                    def pemid = pemFileCredential.id

                    // Print credential values (optional)
                    echo "Server: $server"
                    echo "Username: $arviprod"
                    echo "PEM File ID: $pemid"
                    
                    // Deploy changes to the server
                    sh '''
                    sshpass -p "$password" ssh -i "$pemid" "$arviprod"@"$server" 'cd /home/azureuser/arbifrontend && git pull origin dev && docker-compose up -d'
                    '''
                }
            }
        }
    }
}
