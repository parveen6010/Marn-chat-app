import React from "react";

import { useDisclosure } from "@chakra-ui/hooks";
import { IconButton , Button } from "@chakra-ui/button";
import { ViewIcon } from "@chakra-ui/icons";

import { Image , Text} from "@chakra-ui/react";



import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

// const ProfileModel = ({user , childern}) =>{
//     const {isOpen , onOpen , onClose }   = useDisclosure();

//     return(
//        <>
// { childern ? (
// <span onClick={onOpen}>{childern}</span> 
//         )  : (
//              <IconButton
//     display = {{base: "flex"}}
//     icon = {<ViewIcon />}
//      onClick={onOpen}
//          />
//     )
// }

// <Modal size="lg" isCentered isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent
//         h="410px"
//         >
//           <ModalHeader
//           fontSize="40px"
//           fontFamily="work sans"
//           display = "flex"
//           justifyContent="center"
//           >{user.name}
//           </ModalHeader>
//             <ModalCloseButton />
//           <ModalBody
//             display = "flex"
//              flexDir="column"
//             alignItems="center"
//             justifyContent="space-between"
//   >
      
//            <Image
//            borderRadius="full"
//           boxSize="150px"
//           src={user.pic}
//           alt={user.name}
//            />
          
//           <Text
//           fontSize={{base:"20px" , md:"20px"}}
//           fontFamily="work sans"
//           >
//            Email:{user.email} 
//           </Text>

//           </ModalBody>
//           <ModalFooter>
//             <Button color="white" background ='purple' mr={3} onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
      
//   </>
//     );
// };


// export default ProfileModel;






const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button color="white" background ='purple' mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;