//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require('mongoose')


var post_name;


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// app.get("/",function(req,res){
//   res.render("home",{home : homeStartingContent,about : aboutContent ,contact : contactContent});
// });

const connectionString = "mongodb+srv://sughoshsv:wmxn67ke88@cluster0.uzegvmv.mongodb.net/DialyJournel";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const journelsSchema = new mongoose.Schema({
  title: String,
  content : String 
});

const Journel = mongoose.model('Journel', journelsSchema);





app.get("/",function(req,res){


  Journel.find({})
  .then(function (fountItem) {
    // Handle the results of the query

    res.render("home",{
      home : homeStartingContent,
      posts : fountItem
    });
  })
  .catch(function (error) {
    // Handle any errors that occurred
    console.error(error);
  });


  
}); 

app.get("/about",function(req,res){
  res.render("about",{about : aboutContent });
});

app.get("/contact",function(req,res){
  res.render("contact",{contact : contactContent});
});

app.get("/compose",function(req,res){

  
  res.render("compose");
});

app.post("/compose",function(req,res){
  
  // const post = {
  //   title : req.body.postTitle,
  //   content : req.body.postBody
  // };
  // posts.push(post);
  // console.log(posts);

  const title_name = req.body.postTitle;
  const content_body = req.body.postBody;

  
  const journel = new Journel({
    title : title_name,
    content : content_body
  });

  journel.save();

  res.redirect("/");
});



app.get("/post/:name",function(req,res){
  console.log('User clicked on "Read more" for post with title:', req.params.name);
    const requested_title =  ( req.params.name);
    console.log(requested_title)
    Journel.findOne({
      title: requested_title
    })
    .then(function (foundList) {

      res.render("post", {
        title: foundList.title,
        content: foundList.content
      });
      //console.log(foundList.title+" : "+foundList.content);
    })
    .catch(function (error) {
      res.redirect("/")
    });



    // posts.forEach(function(post){

    //   const storedTitle = _.lowerCase(post.title);
      
    //   if( storedTitle ===  requested_title )
       
    //     res.render("post",{
    //       title : post.title ,
    //       content  : post.content
    //     });

    // });
    
    
    
   

});



app.listen( process.env.PORT ||3000 );
