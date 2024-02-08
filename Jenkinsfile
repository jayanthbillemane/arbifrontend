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
                // Use Jenkins credentials to retrieve values securely
                script {
                    // Retrieve SERVER credential
                    def serverCredential = credentials('server')
                    def server = serverCredential.server

                    // Retrieve USERNAME credential
                    def usernameCredential = credentials('arviprod')
                    def arviprod = usernameCredential.azureuser

                    // Retrieve PEM_FILE credential
                    def pemFileCredential = credentials('pemid')
                    def pemid = pemFileCredential.pemid

                    // Retrieve PASSWORD credential
                    def passwordCredential = credentials('passwrd')
                    def passwrd = passwordCredential.passwrd

                    // Deploy changes to the server
                    sh '''
                    sshpass -p "$passwrd" ssh -i "$pemid" "$arviprod"@"$server" 'cd /home/azureuser/arbifrontend && git pull origin dev && docker-compose up -d'
                    '''
                }
            }
        }
    }
}
