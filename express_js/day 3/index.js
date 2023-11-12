const express = require('express')
const mysql = require('mysql2')
const authorRoute = require('./routes/author')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const dbConfig = require('./config/database')
const pool = mysql.createPool(dbConfig)
const authenticateJWT = require('./middleware/auth')

pool.on('error', (err) => {
    console.log(err)
})

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

//membuat parameter harus diawali : diawal
app.get('/contohparameter/:username/:jurusan/:kelas', (req, res) => {
    res.json(req.params)
})

app.get('/contohparam', (req, res) => {
    res.json(req.query)
})

app.get('/', (req, res) => {
    res.write('Hello world')
    res.end()

    koneksi.query('select * from author', (err, result) => {
        if(err){
            console.log('error')
        }else{
            
        }
    })
})
app.use('/auth', authRoute)
app.use('/author', authenticateJWT, authorRoute)
app.use('/user', userRoute)
app.use('/author', authRoute)

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`)
})	