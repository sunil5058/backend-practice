

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const userModel = require('./models/user');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.render('index');
});
app.get('/read',async(req,res)=>{
    const users=await userModel.find();
    res.render('read',{users});
});

app.post('/create',async (req,res)=>{
    const {name,email,image}=req.body;

   const createdUser=await userModel.create({
    name,
    email,
    image
   });
   res.redirect('/read');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 