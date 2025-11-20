# README #

Sample Test Framework for Electron using PlayWright TypeScript in BDD style
- Currently contains sample tests

### Set up for running the tests  ###

* Download and install VS code https://code.visualstudio.com/download
* Download and install https://www.zaproxy.org/download/
* Clone this repository
* Run the zap server in the background for running security tests /usr/local/bin/zap.sh  -daemon -port 8081 -config api.disablekey=true
* Run the node server node ./PlayWrightTypeScript/sample_app/hash/server.js 
* Run all the tests from PlayWrightTypeScript folder using command npm test
* Run a specific test using tag use  TAG=<tag> npm run test:tag example  TAG=@TC-1 npm run test:tag



