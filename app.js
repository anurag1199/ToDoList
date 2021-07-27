const app = require("express")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
const itemsSchema = {
  name:String
  };
const Item = mongoose.model("Item", itemsSchema);
const item1 = new Item({
  name:"Welcome to your todolist!"
  });
const item2 = new Item({
  name: "Start mentioning your Items"
const defaultItems = [item1,item2];
const listSchema = {
  name:String,
  items:[itemsSchema]
  };
const List = mongoose.model("List", listSchema);
app.get("/", function(req,res) {
  Item.find({}, function(err, foundItems){
    if(foundItems.length === 0){
///To insert many items into the database if none are present///
        Item.insertMany(defaultItems, function(err){
          if(err){
          console.log(err);
          }
          });
          res.redirect("/");
     else{
     res.render("list", {newListItems: foundItems});
     }
     });
///To delete checked item from the database///
app.post("/delete" , function(req,res){
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function(err){
    if(err){
      console.log(err);
      }
     else{
      res.redirect("/")
      }
    });
    }
///To update the selected item from the list app///
app.post("/update", function(req,res){
  const checkedItemValue = req.body.value
  Item.updateOne({newCheckedItemValue :  checkedItemValue}, function(err){
    if(err){
      console.log(err);
      }
    else{
      res.redirect("/");
      }
    );
    }
