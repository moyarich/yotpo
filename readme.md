# This is a monorepo using **[NPM workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces)**
Our directory structure

 ```text
  my-workspace
  ├── example
  │   ├── index.js
  │   ├── package.json
  ├── test
  │   ├── package.json
  ├── packages
  │   └── yotpo
  │       ├── package.json
  └── package.json
```


# Link workspace packages

Instruct NPM to link directories in the workspace together by running the command below. It will auto create a symlink to the @moyarich/yotpo in the packages folder

```
npm install
```

### Having issues with dependency? 
Use the `--legacy-peer-deps` flag if there are any issues with packages having outdated dependencies because they were not updated to support the newer official releases of their dependencies.

```
npm install --legacy-peer-deps
```

# Run the application
Note: The `example` project [Preloads dotenv](https://github.com/motdotla/dotenv#preload) in node.js

This application is started with dotenv preloaded. By preloaded dotenv we won't need the code below in the `example/index.js` source code :
```
require('dotenv').config();
```

We used something similar to the command below in the package.json file
```
node -r dotenv/config index.js
```

Our .env file in located in our `workspace` directory. Visit this documentation for more information on how to use **DOTENV_CONFIG_PATH** to [preload dotenv](https://github.com/motdotla/dotenv#preload)

## Run using node or npm: 

### Use node
From within the workspace directory:
```
DOTENV_CONFIG_PATH=.env node -r dotenv/config example/index.js
```

From within the `example` directory:
```
DOTENV_CONFIG_PATH=../.env node -r dotenv/config index.js
```

### Use npm

The application is setup so that we don't have to type the above node command everytime to start the application. This is possible with the node command added to the scripts section of the package.json file.
```
{
  "scripts": {
    "start": "DOTENV_CONFIG_PATH=../.env node -r dotenv/config index.js"
  }
```

From within the `workspace` directory , use the npm command :`npm run --prefix project ${COMMAND}`

```
npm run --prefix example start
```

From within the `example` directory use the command:
```
npm run start
```


# run tests from within workspace directory 
npm test example/test/yotpo.test

## Run test on a real Yotpo Sandbox
npm test test/sandbox/YotpoProduct-live.test
npm test test/sandbox/YotpoPurchase-live.test
npm test test/YotpoProduct.test
npm test test/yotpo.test


# About project:

Technology used:
- [Node.js](https://nodejs.org/en/about/)
- [NPM workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [JSdocs](https://jsdoc.app/about-getting-started.html)
- Promises : [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/guide/) : Mocked fetch API via [fetchmock](https://github.com/wheresrhys/fetch-mock)
- Modules
- Classes
- [Dependency Injection](https://www.freecodecamp.org/news/a-quick-intro-to-dependency-injection-what-it-is-and-when-to-use-it-7578c84fa88f/) concept
- 

This project was written in JavaScript and runs on the JavaScript engine Node.js.
It is organised using **[NPM workspace](https://docs.npmjs.com/cli/v7/using-npm/workspaces)**. Workspaces is a directory package architecture that makes it easy for code to be shared/linked across multiple directories.
These directories are subdirectories grouped under one root directory, a concept known as a monorepo. 
Many popular JavaScript projects use this concept to create plugins that live under one roof. Such examples are [Babel](https://github.com/gatsbyjs/gatsby) and [gatsby](https://github.com/gatsbyjs/gatsby). 



The **Yotpo** [packages/yotpo] is currently being used in a much larger project that handles sending orders and products to Yotpo via a queue system. The queue manages this data transfer as a daily task and retries on failure.

[JSdocs](https://jsdoc.app/about-getting-started.html) is used to add comment as documentation to the code. 
In the event that full documentation is needed the JSDoc tool can scan the source code and generate an HTML documentation website from it.

The code utilises promises and the Fetch API switching up the way JavaScript handles code by stopping it from waiting until one line is done running to process another.
Javascript Modules and Classes are both used to organise the code.
Mocha and Chai is used for testing parts of the code.
The programming technique , Dependency Injection, is used within the classes to ensure that the fetch API could be tested and fully mocked to visit fake Yotpo URLs. This means that the real Yotpo API does not have to be visited in order to test that the code works properly.

---
I came across an issue with the Fetch API where on server connection errors when json is expected as the result for errors Fetch returns a string instead.
These kinds of errors often causes an application to crash and because this Yoptpo application is part of a much bigger application this problem had to be fixed.

### Fetch response code technique
```javascript
fetch(url, initObject)
      .then((res) => {
        return res.text().then((responseText) => {
          /**
           * Catching an error produced by fetch here because whenever an error is caused by a
           * server failure, the error message is a string instead of JSON.
           * Wrapping the error as JSON and setting a custom error type so that the app doesnt crash
           * and the error type can be used by another app to resend the request to Yotpo at a later time
           * 
           * Example server error: 504 (Gateway Timeout)
           */
          try {
            const data = JSON.parse(responseText);
            const response = { status: res.status, body: data };
            return Promise.resolve(response);
          } catch (error) {
            Object.assign(
              error,
              { invalidResponse: responseText },
              {
                name: error.name,
                message: error.message,
                stack: error.stack,
                error_type: "Exceptions::InvalidJSON",
                status: res.status,
                statusText: res.statusText,
                url,
              }
            );
            return Promise.reject(error);
          }
        });
      })
      .then((resObj) => {
        this.response = resObj;
        return resObj.body;
      })
      .catch((error) => {
        throw error;
      });
```

