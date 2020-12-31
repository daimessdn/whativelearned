const data = [
    {
        title: "Execute Python file on Node.js",
        description: "Want to run Python file using Node.js? Yes, you can!",
        date: "December, 31st 2020",
        content: `
**Node.js** is a very powerful tool for every single web development purposes. One of the useful function of Node.js is executing **Python** file on website using \`child-process\`.

### Preparing Node.js project

First thing, we need to create a Node.js project on our computer by creating a folder named "python-nodejs" (for example, you can name it by something else you like), and then initiate \`npm\` to install some dependencies. In your terminal (or command prompt or something else (maybe)), type

\`\`\`bash
mkdir python-nodejs
cd python-nodejs
npm init --yes
\`\`\`

After we created the project, we can install \`express\` by one-line command below in your terminal.

\`\`\`bash
npm install express
\`\`\`

### Create a Python and JavaScript file
#### Doing in Python file

Still in folder **python-nodejs**, create a JavaScript file named \`index.js\` and also a Python file named \`hello.py\`. In \`hello.py\`, we can write a simple Python script like this.

\`\`\`py
print("Hello, world!")
\`\`\`

#### Doing in JavaScript file

##### Importing dependencies

And let's do the work for our \`index.js\` file. Firstly, we need to import \`express\` package and \`child-process\` and initiate them by adding this JavaScript code below

\`\`\`js
const express = require('express');
const {spawn} = require('child_process');
const app = express();
const port = 3000;  // port
\`\`\`

##### Create spawn process

After importing packages, let's initiate Python **spawn** script to make us execute Python file. Make a route \`/\` and insert the \`python\` spawn process inside the route function.

\`\`\`js
app.get('/', (req, res) => {
  let result;  // init'd result
  
  // define new child process
  //// to execute the Python script
  const python = spawn('python', ['hello.py']);
});
\`\`\`

##### Collect data from Python file

Still inside the route function, let's add some function to collect the data in Python file by adding this file after \`const python = spawn('python, ['hello.py']);\`

\`\`\`js
// collect data from script
python.stdout.on('data', function (data) {
  console.log('Getting data from python script ...');
  result = data.toString();
});
\`\`\`

##### Closing process
Still inside the route function let's close the process data and send it on our website by adding this function.

\`\`\`js
// in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(\`child process close all stdio with code \${code}\`);
    
    // send data to browser
    res.send(result);
  });
\`\`\`

##### Listen to server
To make sure our website can be run, we need to make the app listen to server by certain port. By typing
\`\`\`js
app.listen(port, () => {
  console.log(\`listening on http://localhost \${port}!\`);
});
\`\`\`

And finally, our \`index.js\` file will be [like this](https://gist.github.com/daimessdn/46970454b53662dbf6cb05ccdd598b01#file-index-js).

### Execution

After we doing some coding stuff in our \`hello.py\` and \`index.js\`, finally, we can execute \`node index.js\` to run Node.js server and typing \`http://localhost:3000\` in our browser, we can see the \`Hello, world!\` result is appear on our website.
        `
    }
];