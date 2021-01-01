const data = [
    {
        title: "Execute Python file on Node.js",
        description: "Want to run Python file using Node.js? Yes, you can!",
        date: "December, 31st 2020",
        content: "**Node.js** is a very powerful tool for every single web development purposes. One of the useful function of Node.js is executing **Python** file on website using `child-process`.\n\n### Preparing Node.js project\n\nFirst thing, we need to create a Node.js project on our computer by creating a folder named \"python-nodejs\" (for example, you can name it by something else you like), and then initiate `npm` to install some dependencies. In your terminal (or command prompt or something else (maybe)), type\n\n```bash\nmkdir python-nodejs\ncd python-nodejs\nnpm init --yes\n```\n\nAfter we created the project, we can install `express` by one-line command below in your terminal.\n\n```bash\nnpm install express\n```\n\n### Create a Python and JavaScript file\n#### Doing in Python file\n\nStill in folder **python-nodejs**, create a JavaScript file named `index.js` and also a Python file named `hello.py`. In `hello.py`, we can write a simple Python script like this.\n\n```py\nprint(\"Hello, world!\")\n```\n\n#### Doing in JavaScript file\n\n##### Importing dependencies\n\nAnd let's do the work for our `index.js` file. Firstly, we need to import `express` package and `child-process` and initiate them by adding this JavaScript code below\n\n```js\nconst express = require('express');\nconst {spawn} = require('child_process');\nconst app = express();\nconst port = 3000;  // port\n```\n\n##### Create spawn process\n\nAfter importing packages, let's initiate Python **spawn** script to make us execute Python file. Make a route `/` and insert the `python` spawn process inside the route function.\n\n```js\napp.get('/', (req, res) => {\n  let result;  // init'd result\n  \n  // define new child process\n  //// to execute the Python script\n  const python = spawn('python', ['hello.py']);\n});\n```\n\n##### Collect data from Python file\n\nStill inside the route function, let's add some function to collect the data in Python file by adding this file after `const python = spawn('python, ['hello.py']);`\n\n```js\n// collect data from script\npython.stdout.on('data', function (data) {\n  console.log('Getting data from python script ...');\n  result = data.toString();\n});\n```\n\n##### Closing process\nStill inside the route function let's close the process data and send it on our website by adding this function.\n\n```js\n// in close event we are sure that stream from child process is closed\n  python.on('close', (code) => {\n    console.log(`child process close all stdio with code ${code}`);\n    \n    // send data to browser\n    res.send(result);\n  });\n```\n\n##### Listen to server\nTo make sure our website can be run, we need to make the app listen to server by certain port. By typing\n```js\napp.listen(port, () => {\n  console.log(`listening on http://localhost ${port}!`);\n});\n```\n\nAnd finally, our `index.js` file will be [like this](https://gist.github.com/daimessdn/46970454b53662dbf6cb05ccdd598b01#file-index-js).\n\n### Execution\n\nAfter we doing some coding stuff in our `hello.py` and `index.js`, finally, we can execute `node index.js` to run Node.js server and typing `http://localhost:3000` in our browser, we can see the `Hello, world!` result is appear on our website."
    }
];