const mongoose = require('mongoose')

const {NOTES_ADD_MONGO_DB_HOST, NOTES_ADD_MONGO_DB_DABASE }=  process.env
const MONGODB_URI = `mongodb://${NOTES_ADD_MONGO_DB_HOST}/${NOTES_ADD_MONGO_DB_DABASE}`

console.log("trying to connect db")
mongoose.connect(MONGODB_URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(
    db=>console.log('database is coneccted')
)
.catch(
    err=>console.log(err)
)

