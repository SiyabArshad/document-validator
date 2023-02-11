const mongoose = require('mongoose');
const connection=()=>{
    
mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));
}
module.exports=connection