node {  
  stage("Prepare environment") {
    docker.image('node:6').inside {
      stage("Install Dependencies") {
          sh "npm install"
        }
      stage("Test and validate") {
          sh "npm test"
      }
    }
  }
}