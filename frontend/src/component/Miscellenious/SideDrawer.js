import  React , {useState} from "react"
import { Box , Text} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { Avatar } from "@chakra-ui/avatar";
import { useDisclosure } from "@chakra-ui/hooks";
import { MenuDivider ,  MenuList , Tooltip , Menu  , MenuButton , MenuItem, Spinner} from "@chakra-ui/react";

import {  BellIcon , ChevronDownIcon} from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import { useHistory } from "react-router-dom";

import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";


// import { Spinner } from "@chakra-ui/spinner";

import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Input,
    useToast
  } from '@chakra-ui/react'
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvator/UserListItem";
import { getSender } from "../../config/ChatLogic";

// MenuList
const SideDrawer = () =>{
  
    const [Search , setSearch] =  useState("");
    const [SearchResult , setSearchResult] =  useState([]);
    const [Loading , setLoading] =  useState(false);
    const [LoadingChat , setLoadingChat] =  useState();
    const { user , SelectedChat , setSelectedChat , chats , setChats , notification, setNotification} =  ChatState();

    const { isOpen, onOpen, onClose } = useDisclosure()


     const  history = useHistory();
  const logoutHandler = () =>{
   
    localStorage.removeItem("userInfo");
    history.push("/");
  }

  const toast = useToast();
   
  const handleSearch = async () => {
    if (!Search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
  
    try {
      setLoading(true);
   
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
     
      const { data } = await axios.get(`/api/user?search=${Search}`, config);
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log("No");
      toast({
        title: "Error Occurred",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };
  


const accessChat =  async (userId) => {

try {
    setLoadingChat(true);
    const config = {
        headers: {
            "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }; 
 
   const {data} = await axios.post("/api/chat" , {userId} , config);
    // console.log(data);
   if(!chats.find((c) => c.id === data._id))
   setChats([data , ...chats]);

   setSelectedChat(data);
    setLoadingChat(false)
    onClose();

} catch (error) {
    toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
}
};


    return (
    <>
    <Box 
    
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    width="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    > 
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
        
     <Button variant="ghost" onClick={onOpen}>
     <i class="fas fa-search"></i>
     <Text display={{base:"none" , md: "flex"}} px="4" >
         Search user
     </Text>
          </Button>
     </Tooltip>

    
    <Text fontSize= "2xl" fontFamily= "work sans"> Talk-A-Tive </Text>
    
 <div>
    <Menu>  
        <MenuButton p = {1}  >
      
        <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />

         <BellIcon fontSize="2xl" m={1} />
        </MenuButton>
        <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
     </Menu>
   
     <Menu>
     <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} >
       <Avatar size = 'sm' cursor  = 'pointer' name={user.name} src={user.pic} />
       </MenuButton>
     
       <MenuList>
        <ProfileModel  user = {user}>
       <MenuItem>My Profile</MenuItem>{" "}
       </ProfileModel>
       <MenuDivider/>
       <MenuItem onClick={logoutHandler}>Logout</MenuItem>
       </MenuList>
     </Menu>
     </div> 
    </Box>


<Drawer placement="left" isOpen={isOpen} onClose={onClose} >

  <DrawerOverlay/>
  <DrawerContent>
  <DrawerHeader borderBottomWidth= "1px" >Search Users</DrawerHeader>
  <DrawerBody>
     <Box display="flex" paddingBottom={2}>
     
      <Input
      placeholder = "Search by name or email"
      mr = {2}
      value = {Search}
      onChange = {(e) => setSearch(e.target.value)}
    
    />

     <Button 
     onClick={handleSearch}
    >
        Go</Button>

     </Box>
   
    { Loading ? (
      <ChatLoading/>
    ):(
    SearchResult?.map ((user) => (
   
    <UserListItem 
     key={user._id}
     user = {user}
     handleFunction = { () => accessChat(user._id) }
    />  

    )) 
    )
    }

{LoadingChat && <Spinner ml ="auto" display="flex" />}
  </DrawerBody>
  </DrawerContent>
</Drawer>


    </>
    )
}
export default SideDrawer;