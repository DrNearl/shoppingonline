const mongoose = require('mongoose');
const MyConstants = require('./MyConstants');

const uri = process.env.DB_URL;
mongoose.connect(uri)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.error(err);
});