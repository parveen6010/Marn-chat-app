import React, { useState , useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import {Input, FormControl, Box, IconButton, Text , Spinner , useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender , getSenderfull } from "../config/ChatLogic";
import ProfileModel from "./Miscellenious/ProfileModel";
import UpdateGroupChatModel from "./Miscellenious/UpdateGroupChatModel";
import axios from "axios";
import "../component/style.css";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie"
import animationData from "../animation/typing.json"

import io from 'socket.io-client';
 const ENDPOINT = "http://localhost:5000";
 var socket , SelectedChatCompare;

const SingleChat = ({fetchAgain , setfetchAgain }) => {

  const [messages , setMessages] = useState([]);
  const [loading , setLoading] = useState(false);
  const [newMessage , setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

const toast = useToast();

const {user , SelectedChat , setSelectedChat , notification, setNotification} = ChatState();
   
 
  const fetchMessage = async() => {

    if(!SelectedChat) return

    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`,
        },
      };
       setLoading(true);
      const { data } = await axios.get(`/api/message/${SelectedChat._id}` ,
      config
      )
     
      setMessages(data)
      setLoading(false);
  socket.emit("join chat", SelectedChat._id);
      
    } catch (error) {
        toast({
     title:"Error Occured!",
     description: "Failed to send Message",
     status: "error",
     duration:5000,
     isClosable:true,
     position:"bottom"
    })
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup",user);
    socket.on("connected" , () => setSocketConnected(true));
    socket.on("typing" , ()=> setIsTyping(true));
    socket.on("stop typing" , ()=> setIsTyping(false)); 

   } , []);

useEffect(() => {
 
  fetchMessage();
SelectedChatCompare = SelectedChat;
},[SelectedChat]);


useEffect(() => {
 socket.on("message recieved" , (newMessageRecieved) =>{
  if(!SelectedChatCompare || SelectedChatCompare._id !== newMessageRecieved.chat._id ){
    // give notification
    if (!notification.includes(newMessageRecieved)) {
      setNotification([newMessageRecieved, ...notification]);
      setfetchAgain(!fetchAgain);
    }
  }else{
    setMessages([...messages,newMessageRecieved]);
  }
 })  

});




    const sendMessage = async (event) => {
 if(event.key === "Enter" && newMessage){
    socket.emit("stop typing" , SelectedChat._id);
  try {
    const config = {
      headers:{
        "Content-Type": "application/json",
        Authorization:`Bearer ${user.token}`,
      },
    };
  
    const {data} = await axios.post('/api/message' , {
      content: newMessage,
      chatId: SelectedChat._id,
    }, config);
 
   

socket.emit('new Message', data);

    setNewMessage("");
    setMessages([...messages , data]);
  } catch (error) {
    toast({
     title:"Error Occured!",
     description: "Failed to send Message",
     status: "error",
     duration:5000,
     isClosable:true,
     position:"bottom"
    })

  }
 }
}



    const typingHandler = (e) => {

      setNewMessage(e.target.value);

      // typping indicator logic 
     if(!socketConnected) return;

    if(!typing){
      setTyping(true);
      socket.emit("typing" , SelectedChat._id);
    }

    let lastTypingTime  = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if(timeDiff >= timerLength && typing){
        socket.emit("stop typing" ,  SelectedChat._id);
        setTyping(false);
      }
    }, timerLength);
    };


    return  (
        <>
   {  SelectedChat ? (
    <>
    <Text
    fontSize={{base : "28px" , md:"30px"}}
    pb ={3}
    px ={2}
    w="100%"
    fontFamily="work sans"
    display="flex"
    justifyContent={{base:"space-between"}}
    alignItems="center"
>
     <IconButton
     display={{base : "flex" , md: "none"}}
     icon={<ArrowBackIcon/>}
     onClick={() => setSelectedChat("") }
     />

     
   {!SelectedChat.isGrophChat ? (
    <>
      {getSender(user , SelectedChat.users) }
      <ProfileModel user = {getSenderfull(user , SelectedChat.users) } />
    </>
    ) : (
<>
{SelectedChat.chatName.toUpperCase()} 
  
  <UpdateGroupChatModel
 fetchAgain={fetchAgain}
  setfetchAgain={setfetchAgain}
  fetchMessage = {fetchMessage}
  />
</>

  )
}

</Text>
<Box
display="flex"
flexDir="column"
justifyContent="flex-end"
p={3}
bg="#E8E8E8"
w="100%"
h ="100%"
borderRadius="lg"
overflowY="hidden"
>
{loading ? (
  < Spinner 
  size="xl"
  w={28}
  h={28}
  alignSelf="center"
  margin="auto"
  />
) : (
  <div className="messages" > 
   <ScrollableChat messages= {messages} />
   </div>
  
 
)}

<FormControl onKeyDown={sendMessage} isRequired mt={3}>
{istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
<Input
variant="filled"
bg="#E0E0E0"
placeholder="Enter a message.."
onChange={typingHandler}
value={newMessage} 
/>
 </FormControl>
</Box>

    </>
     ) : (
        <Box
        display = "flex"
        alignItems="center"
        justifyContent="center"
        h="100%"
        >
        <Text
        fontSize="3xl"
        pb={3}
        fontfamily="work sans"
        >
   Click on a user to start Chatting
        </Text>
        </Box>
     )}
     
    </>
);
}

export default SingleChat;