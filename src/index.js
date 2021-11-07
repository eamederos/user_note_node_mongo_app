require('dotenv').config()

const app = require('./server')
require('./database')

port = app.get('port') 

app.listen(port, ()=>{
    console.log(`Server listening on port${port}`)
})