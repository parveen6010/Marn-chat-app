import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const history = useHistory();

  const handleclick = () => setShow(!show);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: 'Please fill all fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        '/api/user/login',
        { email, password },
        config
      );

      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push('/chats');
    } catch (error) {
      toast({
        title: 'Error Occurred',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement paddingRight="5px">
            <Button h="1.76rem" size="sm" onClick={handleclick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign in
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail('guest@example.com');
          setPassword('12345');
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;












// // import {
// //     FormControl,
// //     FormLabel,
// //     Input,
// //     InputGroup,
// //     InputRightElement,
// //     Button,

// // } from '@chakra-ui/react';

// // import { VStack } from "@chakra-ui/layout"
// // import React, { useState } from 'react'
// // import axios from 'axios';
// // import { useHistory } from "react-router-dom";
// // import { useToast } from "@chakra-ui/react";


// // const Login = () => {
// //     const [show, setShow] = useState(false);

// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [loading, setLoading] = useState(false);

// //     const toast = useToast();
// //     const history = useHistory();

// //     const handleclick = () => setShow(!show);
// //     const submitHandler = async () => {

// //         setLoading(true);
// //         if (!email || !password) {

// //             toast({
// //                 title: "Please fill all Feilds",
// //                 status: "warning",
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: "bottom"
// //             });
// //             setLoading(false);
// //             return;
// //         }

// //         try {
// //             const config = {
// //                 Headers: {
// //                     "Content-type": "application/json",

// //                 },
// //             };
// //             const { data } = axios.post(
// //                 "/api/user/login", { email, password },
// //                 config
// //             );

// //             toast({
// //                 title: "Login Successfull",
// //                 status: "success",
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: "bottom"
// //             });
// //             localStorage.setItem("userinfo", JSON.stringify(data));
// //             setLoading(false);
// //             history.push("/chats");

// //         } catch (error) {
// //             toast({
// //                 title: "Error Occured",
// //                 description: error.response.data.message,
// //                 status: "error",
// //                 duration: 5000,
// //                 isClosable: true,
// //                 position: "bottom",
// //             });
// //             setLoading(false);
// //         }
// //     };


// //     return (
// //         <VStack
// //             spacing="5px" >


// //             <FormControl id="email" isRequired>
// //                 <FormLabel>
// //                     Email
// //                 </FormLabel>
// //                 <Input
// //                     placeholder="Enter Your Email"
// //                     value={email}
// //                     onChange={(e) =>
// //                         setEmail(e.target.value)
// //                     }
// //                 />
// //             </FormControl>

// //             <FormControl id="password" isRequired>
// //                 <FormLabel>
// //                     Password
// //                 </FormLabel>

// //                 <InputGroup>
// //                     <Input
// //                         type={show ? "text" : "password"}
// //                         placeholder="Enter Your Password"
// //                         value={password}
// //                         onChange={(e) =>
// //                             setPassword(e.target.value)
// //                         }
// //                     />

// //                     <InputRightElement paddingRight="5px" >
// //                         <Button h="1.76rem" size="sm" onClick={handleclick} >
// //                             {show ? "Hide" : "show"}
// //                         </Button>
// //                     </InputRightElement>

// //                 </InputGroup>
// //             </FormControl>


// //             <Button
// //                 colorScheme="blue"
// //                 width="100%"
// //                 style={{ marginTop: 15 }}
// //                 onClick={submitHandler}
// //                 isLoading={loading}
// //             >
// //                 Sign in
// //             </Button>


// //             <Button
// //                 variant="solid"
// //                 colorScheme="red"
// //                 width="100%"
// //                 onClick={() => {
// //                     setEmail("guest@examole.com")
// //                     setPassword("123456");
// //                 }}

// //             >
// //                 Get Guest User Credentials
// //             </Button>

// //         </VStack >
// //     )
// // }

// // export default Login



