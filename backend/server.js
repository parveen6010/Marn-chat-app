const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./Config/db")
const colors = require("colors");

const userRoutes   = require("./routes/userRoutes");
const chatRoutes   = require("./routes/chatRoutes");
const messageRoutes   = require("./routes/messageRoutes");
const path = require("path");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const { Socket } = require("socket.io");

dotenv.config();
connectdb();
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//     res.end('runnnnning');
// });

// app.get('/', (req, res) => {
//     res.end('up');
// });


app.use("/api/user", userRoutes);
app.use("/api/chat" , chatRoutes);
app.use("/api/message" , messageRoutes);


// app.get('/', (req, res) => {
//     res.end('doun');
// });


// ------------------/Deployment-----------------

 const __dirname1 = path.resolve();
if(process.env.NODE_ENV==='productions'){
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

  
    app.get("*", (req, res) =>{
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    });    

}else{

    app.get('/', (req, res) => {
        res.end('API Running');
    });
}




// ------------------/Deployment-----------------


// app.get('/', (req, res) => {
//     res.end('insdsssie');
// });

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server =  app.listen(PORT, console.log(`start ${PORT}`.yellow.bold));

const 
io =  require('socket.io')(server,{
pingTimeout: 60000,
    cors:{
    origin: "http://localhost:3000",
},
});

io.on("connection" , (socket) =>{
    console.log("conntected to socket.io");

    socket.on('setup' , (userData) => {
         socket.join(userData._id);
         socket.emit("connected");
    });

    socket.on('join chat' , (room) => {
        socket.join(room);
        console.log("user Joined Room: " + room);

    });


    socket.on("typing" , (room) => socket.in(room).emit("typing"));
    socket.on("stop typing" , (room) => socket.in(room).emit("stop typing"));

     socket.on("new Message" , (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        if(!chat.users) return  console.log("chat.users not defined");
        chat.users.forEach(user => {
            if(user._id == newMessageRecieved.sender._id) return ;
       
            socket.in(user._id).emit("message recieved" , newMessageRecieved);
        });

        socket.off("setup" , () =>{
            console.log("USER DISCONNECTED");
            socket.leave(userData._id);
        });
    });

});
  
