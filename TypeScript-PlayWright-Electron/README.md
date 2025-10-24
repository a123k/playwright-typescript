# README #

Sample Test Framework for Electron using PlayWright TypeScript in BDD style
- Currently contains sample tests

### Set up for running the tests  ###

* Download and install VS code https://code.visualstudio.com/download
* Download and install https://www.zaproxy.org/download/
* Clone this repository
* Run the zap server in the background for running security tests /usr/local/bin/zap.sh  -daemon -port 8081 -config api.disablekey=true
* Run the node server node ./TypeScript-PlayWright-Electron/sample_app/hash/server.js 
* Run the tests from TypeScript-PlayWright-Electron folder using command npm test



