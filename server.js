const express = require('express')
const app = express()

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.static('public'))

const hostname = '0.0.0.0';
const port = 3000;

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});