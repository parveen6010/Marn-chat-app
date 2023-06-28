import React, { useState } from "react";
import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../component/Miscellenious/SideDrawer";
import MyChats from "../component/Miscellenious/MyChats";
import ChatBox from "../component/Miscellenious/ChatBox";
      

const Chatpage = () =>   {  
       const { user } =  ChatState();
   
     const [fetchAgain , setfetchAgain] = useState(false);
    return (
     <div style={{ width: "100%"}}>
              { user && <SideDrawer/>}
              <Box
              display = "flex"
    justifyContent="space-between"
              width = "100%"
              height = "91.5vh"
              padding = "10px"
               >
              { user && <MyChats fetchAgain = {fetchAgain} />}
              { user && <ChatBox fetchAgain = {fetchAgain} setfetchAgain = {setfetchAgain} />}   
              </Box>
         </div>
    )
};
 
export default Chatpage;

 