const express =require("express");
const cors=require("cors");
const app=express();
// require("./config/mongoose.config");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port=8000;
const server=app.listen(port,()=>{
  console.log("listening to port" + port)
})
// ********
const io=require("socket.io")(server,{cors:true});
var clients={}
io.on('connection',socket =>{
  clients[socket.id]=socket;
  socket.on("message",({name,message})=>{
    io.emit("message",{name,message})
  })
  socket.on('disconnect', function() {
    delete clients[socket.id];
    console.clear();
    console.log('deleted user id is :' + "["+socket.id+"]" );

});
})


// const app = require('express')()
// const http = require('http').createServer(app)
// const io = require('socket.io')(http)

// io.on('connection', socket => {
//   socket.on('message', ({ name, message }) => {
//     io.emit('message', { name, message })
//   })
// })

// http.listen(4000, function() {
//   console.log('listening on port 4000')
// })
