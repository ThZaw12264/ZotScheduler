const express = require('express');
const multer = require('multer'); // Import multer
const upload = multer({ dest: 'uploads/' }); // Create multer instance
const app = express();

app.listen(5000, () => console.log('Server started on port 5000'));

app.post('/api/parse', upload.single("file"), (req, res) => {
    const spawn = require('child_process').spawn;
    const python_process = spawn('python', ["parse.py", req.file.path]);
    python_process.stdout.on('data', (data) => {
        console.log(data.toString());
        res.json({"Major": data.toString()})
    });
});