import React, { useState }  from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    useDisclosure,
    Button,
    Box,
    FormControl,
    Input,
    useToast,
    Spinner,
  } from '@chakra-ui/react'
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../userAvator/UserBadgeItem";
import axios from "axios";
import UserListItem from "../userAvator/UserListItem";

  
const UpdateGroupChatModel = ({fetchAgain , setfetchAgain , fetchMessage}) =>{
    
  const { isOpen, onOpen, onClose } = useDisclosure();
const [GroupChatName , setGroupChatName] = useState();
const [Search , setSearch] = useState("");
const [SearchResult , setSearchResult] = useState([]);
const [RenameLoading , setRenameLoading] = useState(false);

const [Loading , setLoading] = useState(false);

const {SelectedChat , setSelectedChat , user } = ChatState();

 const toast = useToast();

const handleRemove = async (user1) =>{

  if(SelectedChat.groupAdmin._id !== user._id && user1.Id !== user._id){
    toast({
      title: "Only admins can remove someone!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
return
  }

  try {
    setLoading(true);
    const config = {
     headers: {
         // "Content-type": "application/json",
       Authorization: `Bearer ${user.token}`,
     },
   };
   
   const {data} = await axios.put(`/api/chat/groupremove` , {
   chatId: SelectedChat._id,
   userId:user1._id,
   },config);
   console.log(data);

   user1._id === user._id ? setSelectedChat() :  setSelectedChat(data);
     setfetchAgain(!fetchAgain);
     fetchMessage();
     setLoading(false);
   
   } catch (error) {
     toast({
       title: "Error Occured",
       description: error.response.data.message,
       status: "error",
       duration: 5000,
       isClosable: true,
       position: "bottom",
     });
   setLoading(false);
   }
   setGroupChatName("");
}
 
const handleRename = async () =>{

  if(!GroupChatName) return
  try {
    setRenameLoading(true)
    const config = {
      headers: {
          // "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
   console.log(GroupChatName);
const {data} = await axios.put("/api/chat/rename" ,{
  chatId:SelectedChat._id,
  chatName: GroupChatName,

} , config );

setSelectedChat(data);
setfetchAgain(!fetchAgain);
setRenameLoading(false);

  } catch (error) { 
    toast({
      title: "Error Occured",
      description : error.response.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
   setRenameLoading(false);

  }

setGroupChatName("");
};



const handleSearch = async (query) => {
  setSearch(query);
  if(!query){
   return; 
  }
  try {
    setLoading(true);
    const config = {
        headers: {
            // "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.get(`/api/user?search=${Search}` , config);
 console.log(data);
      setLoading(false);
   setSearchResult(data);

 } catch (error) {
    toast({
        title: "Error Occured",
        description: "Failed to load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
setLoading(false);
 }       
 setGroupChatName("");   
};

const handleAddUser = async (user1) => {
if(SelectedChat.users.find((u) => u._id === user1._id)) {
  toast({
    title: "User Already in group!",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
return
} 

if(SelectedChat.groupAdmin._id !== user._id){
  toast({
    title: "Only admins can add someone!",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
return
}

try {
 setLoading(true);
 const config = {
  headers: {
      // "Content-type": "application/json",
    Authorization: `Bearer ${user.token}`,
  },
};

const {data} = await axios.put(`/api/chat/groupadd` , {
chatId: SelectedChat._id,
userId:user1._id,
},config);
console.log(data);

  setSelectedChat(data);
  setfetchAgain(!fetchAgain);
  setLoading(false);


  console.log(data);

} catch (error) {
  toast({
    title: "Error Occured",
    description: error.response.data.message,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
setLoading(false);
}
setGroupChatName("");
} 


return (
    
    <>
       <IconButton
      display={{base:"flex"}}
      icon={<ViewIcon/>}
      onClick={onOpen}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
          fontSize="35px"
          fontFamily="Work sans"
          display="flex"
          justifyContent="center"
          >{SelectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         <Box
         w="100%"
         display="flex"
         flexWrap="wrap"
         pb={3}
         >
         {SelectedChat.users.map(u =>(
<UserBadgeItem key={user._id} user={u} 
       handleFunction = {() => handleRemove(u)}  
/>
              ) )}
           </Box>
          <FormControl 
          display="flex"
          >
     <Input
     _placeholder="Chat Name"
     mb={3}
     value={GroupChatName}
     onChange={(e) => setGroupChatName(e.target.value)}
     />
     <Button
     variant="solid"
     colorScheme="teal"
     ml={1}
     isLoading={RenameLoading}
     onClick={handleRename}
     >
   Update
     </Button>
          </FormControl>

       <FormControl>
        <Input
        placeholder="Add User to Group"
        mb={1}
        onChange={(e) => handleSearch(e.target.value)}
        />
       </FormControl>
       {Loading ? (
        <Spinner size="lg" />
       ) : (
        SearchResult?.map((user) => (
          <UserListItem
          key={user._id}
          user={user}
          handleFunction={() => handleAddUser(user)}
          />
         ) )
        
       )
       }

          </ModalBody>
          <ModalFooter>
 <Button onClick={() => handleRemove(user)} colorScheme='red' >
             Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

























export default UpdateGroupChatModel;









