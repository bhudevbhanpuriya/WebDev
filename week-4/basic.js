const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello Remiss!')
})

app.get('/asd', (req, res) => {
    res.send('Hello from asd endpoint!')
})

app.listen(port)

