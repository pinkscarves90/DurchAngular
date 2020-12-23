For local running:

Start client
npm start (4200)

Start Node
tsc index.ts (if node side changes made)
nodemon index.js
From functions folder for firebase and server folder for locally running,

node index.js (3000)


For Firebase hosting from local 

1) firebase.json in root ->
 ...
  "public": "dist",

 ....

  "rewrites": [
        {
          "source": "**",
          "function": "expressApp"
        }
      ],
..
 "functions": {
      "source": "functions"
    }


2).firebaserc in root


{
  "projects": {
    "default": "firebase-express-demowyre",
  }
}

3) FOLDERS:
Folder-> index.js in root : a small script which will copy the dist, server and dependencies to “functions” directory

Folder->server in root : This directory will keep all express related stuff.
Folder-> functions in root :This will keep code and structure for firebase hosting.
package .json -> Firebase deploy requires all the dependencies to be listed under functions folder package.json.

npm install -g firebase-tools
(Proj name:fir-express-demowyre)

* firebase logout
* firebase login (login via web and it shows successfull in the cli) anila@durch.net
* firebase use --add (select the project from your Gmail account)
* firebase deploy (deploys to the public url) https://durch-834c0.web.app/
to test node server > from functions folder Run command "node index" (It will start at that port)

(After your client side changes always build your app with ng build to create new dist folder)

Your project fir-express-demowyre must be on the Blaze (pay-as-you-go) plan to complete this command. Required API cloudbuild.googleapis.com can't be enabled until the upgrade is complete. To upgrade, visit the following 
URL:https://console.firebase.google.com/project/fir-express-demowyre/usage/details


After upgrade :
WEBSITE URL :  https://firebase-express-demowyre.firebaseapp.com/



