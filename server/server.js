const { ApolloClient, InMemoryCache, gql } = require('@apollo/client/core');
const express = require('express');
const multer = require('multer');
const init = require('./init');
const utils = require('./utils');

const upload = multer({ dest: 'uploads/' });
const app = express();
app.listen(5000, () => console.log('Server started on port 5000'));

// client for calling PeterPortal's GraphQL API
const client = new ApolloClient({
  uri: 'https://api.peterportal.org/graphql/',
  cache: new InMemoryCache(),
});

init.getAllClasses(client, gql).then((allClassesByDept) => {
  app.locals.allClassesByDept = allClassesByDept;
});

app.post('/api/parse', upload.single("file"), (req, res) => {
  const spawn = require('child_process').spawn;
  const python_process = spawn('python', ["parse.py", req.file.path]);
  python_process.stdout.on('data', async (data) => {
    const dataJSON = JSON.parse(data.toString());
    allClassesByDept = app.locals.allClassesByDept;
    // IMPLEMENT filterClasses
    // utils.filterClasses(dataJSON["classes_needed"], dataJSON["classes_taken_by_dept"]); // ex: COMPSCI 171:183, or BIOSCI9D (a course not offered anymore)
    utils.verifyAndUpdateClasses(dataJSON["classes_needed"], allClassesByDept); // ex: COMPSCI 171:183, or BIOSCI9D (a course not offered anymore)
    const aliases = await utils.getAliases(dataJSON["classes_taken_by_dept"], client, gql);
    dataJSON["classes_eligible"] = await utils.getEligibleClasses(dataJSON["classes_needed"], dataJSON["classes_taken_by_dept"], aliases, client, gql);
    // console.log("dataJSON: ", dataJSON);
    // TODO update classes_needed_by_dept to classes_needed AND remove classes_taken_by_dept implementation from parse.py
    res.json(dataJSON);
  });
});