const express = require('express')
const mysql = require('mysql2/promise')


const app = express()
const port = 3000

async function createConnection() {
  return await mysql.createConnection({
    host: 'db',
    user: 'docker',
    password: '1234',
    database: 'mydb'
  })
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', async (req, res) => {
  const connection = await createConnection()
  const [data] = await connection.query('SELECT * FROM users')
  res.json(data)
  await connection.end()
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
