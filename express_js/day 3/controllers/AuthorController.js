const mysql = require('mysql2')
const dbConfig = require('../config/database')
const {
    responseNotFound,
    responseSuccess
} = require('../traits/ApiResponse')
const pool = mysql.createPool(dbConfig)

const search = (req, res) => {
    const keyword = req.query.keyword

    const query = `SELECT * FROM author WHERE nama LIKE '%${keyword}%'`

    pool.getConnection((err, connection) => {
        if(err) throw err

        if(results.length == 0 ){
            return res.json({
                message : 'Data tidak ditemukan'
            })
        }

        responseSuccess(res, results, 'Author successfully fetched')
    })

    connection.release()


}

const sortBy = (req, res) => {
    const orderBy = req.query.order

    const query = `SELECT * FROM authors ORDER BY nama ${orderBy}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err
            if(results.length == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, results, 'Author successfully fetched')
        })

        connection.release()
    })
}

const getAuthors = (req, res) => {
    const query = "SELECT * FROM author"

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, results) => {
            if(err) throw err
            
            responseSuccess(res, results, 'Authors succesfully fetched')
        })

        connection.release()
    })
}

const getAuthor = ((req, res) => {
    const id = req.params.id

    const query =  `SELECT * FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err

            if(result.length == 0){
                responseNotFound(res)
                return

            }
            
            responseSuccess(res, result, 'Author succesfuly fetched')

        })

        connection.release()
    })
})

const addAuthor = (req, res) => {
    const data = {
        nama: req.body.nama,
        email: req.body.email,
        alamat: req.body.alamat,
        umur: req.body.umur,
        media_sosial: req.body.media_sosial
    }

    const query = 'INSERT INTO author SET ?'

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, [data], (err, result) => {
            if(err) throw err

            responseSuccess(res, result, 'Author successfully added')
        })

        connection.release()
    })
}

const updateAuthor = (req, res) => {
    const id = req.params.id;

    const data = {
        nama: req.body.nama,
        email: req.body.email,
        umur: req.body.umur,
        alamat: req.body.alamat,
        media_sosial: req.body.media_sosial
    }

    const query = `UPDATE author SET ? WHERE id=${id}`;
    pool.getConnection((err, connection) => {
        if (err) throw err;

        connection.query(query, [data], (err, results) => {
            connection.release();

            if (err) throw err;

            if (results.affectedRows == 0) {
                responseNotFound(res);
                return;
            }
            responseSuccess(res, results, 'Author successfully updated');
        });
    });
}

const deleteAuthor = (req, res) =>{
    const id = req.params.id

    const query = `DELETE FROM author WHERE id=${id}`

    pool.getConnection((err, connection) => {
        if(err) throw err

        connection.query(query, (err, result) => {
            if(err) throw err

            if(result.affectedRows == 0){
                responseNotFound(res)
                return
            }

            responseSuccess(res, result, 'Author successfully delete')
        })
    })
}

module.exports = {
    getAuthors, 
    getAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor,
    search,
    sortBy
}