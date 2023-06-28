import  React, { useEffect, useState }  from "react"
import { ChatState } from "../../Context/ChatProvider";
import {  useToast } from "@chakra-ui/react";
import axios from "axios";
import { Box } from "@chakra-ui/layout";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/button";
import {  Stack } from '@chakra-ui/react'
import { Text  } from "@chakra-ui/react";
import { getSender } from "../../config/ChatLogic";
import ChatLoading from "../ChatLoading";
import GroupChatModel from "./GroupChatModel";



const MyChats = ({ fetchAgain }) =>{

     const [loggedUser , setloggedUser] = useState();
    const { user , SelectedChat , setSelectedChat , chats , setChats } =  ChatState();
    

   const toast = useToast();
   
   const fetchChats = async () =>{

      //  console.log(user.chatName);
      try {
        
        const config = {
            headers: {
                // "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          };

     const {data} = await axios.get("/api/chat" , config);
   
    //  console.log(data);
   
     setChats(data);   

    } catch (error) {
        toast({
            title: "Error Occured",
            description :"failed to Load the chats",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottum-left",
          });

      }

   };



   useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("userInfo")));
    // console.log(JSON.parse(localStorage.getItem("userInfo")));
    
    fetchChats();
  }, [fetchAgain]);



    return (
    <Box
    display={{base: SelectedChat ? "none" : "flex" , md: "flex"}}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{base:"100%" , md:"31%"}}
    borderRadius="lg"
    borderWidth="1px"
    >
     <Box 
     pb={3}
     px={3}
     fontSize={{base:"28px" , md: "30px"}}
     fontFamily="work sans"
     display="flex"
     w="100%"
     justifyContent="space-between"
     alignItems="center"
     >
      My Chats
  
  <GroupChatModel>
   <Button 
   display="flex"
   fontSize={{base:"17px" , md: "10px" , lg:"17px"}}
   rightIcon={<AddIcon/>}
>
    New Group Chat
   </Button>
   </GroupChatModel>
 </Box> 


 <Box
 display="flex"
 flexDir="column"
 p={3}
 bg="#F8F8F8"
 w="100%"
 h="100%"
 borderRadius="lg"
 overflowY="hidden"
 >


  {chats ? (
   <Stack  overflowY = 'scroll'>
    {chats.map((chat) =>(
     <Box
     onClick ={() => setSelectedChat(chat)}
     cursor="pointer"
     bg={SelectedChat === chat ? "#3882AC" : "#E8E8E8"}
     color={SelectedChat === chat ? "white" : "black"}
     px={3}
     py={2}
     borderRadius="lg"
     key={chat._id}
     >
      <Text>
        {!chat.isGrophChat ? getSender(loggedUser , chat.users)
        : chat.chatName }
      </Text>
     </Box>

    ))}

   </Stack>

  ) : (
  <ChatLoading />

  )
}
 </Box>
  </Box>
  );
};
export default MyChats;





















// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();

//   const { user , SelectedChat , setSelectedChat , chats , setChats } =  ChatState();

//   const toast = useToast();

//   const fetchChats = async () => {
//     // console.log(user._id);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get("/api/chat", config);
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };

//   useEffect(() => {
//     setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
//     fetchChats();
//     // eslint-disable-next-line
//   }, [fetchAgain]);

//   return (
//     <Box
//       d={{ base: SelectedChat ? "none" : "flex", md: "flex" }}
//       flexDir="column"
//       alignItems="center"
//       p={3}
//       bg="white"
//       w={{ base: "100%", md: "31%" }}
//       borderRadius="lg"
//       borderWidth="1px"
//     >
//       <Box
//         pb={3}
//         px={3}
//         fontSize={{ base: "28px", md: "30px" }}
//         fontFamily="Work sans"
//         d="flex"
//         w="100%"
//         justifyContent="space-between"
//         alignItems="center"
//       >
//         My Chats
//         <GroupChatModel>
//           <Button
//             d="flex"
//             fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//             rightIcon={<AddIcon />}
//           >
//             New Group Chat
//           </Button>
//         </GroupChatModel>
//       </Box>
//       <Box
//         d="flex"
//         flexDir="column"
//         p={3}
//         bg="#F8F8F8"
//         w="100%"
//         h="100%"
//         borderRadius="lg"
//         overflowY="hidden"
//       >
//         {chats ? (
//           <Stack overflowY="scroll">
//             {chats.map((chat) => (
//               <Box
//                 onClick={() => setSelectedChat(chat)}
//                 cursor="pointer"
//                 bg={SelectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                 color={SelectedChat === chat ? "white" : "black"}
//                 px={3}
//                 py={2}
//                 borderRadius="lg"
//                 key={chat._id}
//               >
//                 <Text>
//                   {!chat.isGroupChat
//                     ? getSender(loggedUser, chat.users)
//                     : chat.chatName}
//                 </Text>
//                 {chat.latestMessage && (
//                   <Text fontSize="xs">
//                     <b>{chat.latestMessage.sender.name} : </b>
//                     {chat.latestMessage.content.length > 50
//                       ? chat.latestMessage.content.substring(0, 51) + "..."
//                       : chat.latestMessage.content}
//                   </Text>
//                 )}
//               </Box>
//             ))}
//           </Stack>
//         ) : (
//           <ChatLoading />
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default MyChats;