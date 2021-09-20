const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_USER,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connect To MongoDB"))
    .catch((err) => console.log("Failed To Connect"))

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening port ${port}...`)
})