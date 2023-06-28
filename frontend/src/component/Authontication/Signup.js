
import {
    Button,
    FormControl,
    FormLabel,
    useToast,
  } from "@chakra-ui/react";
  
  import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
  import { VStack } from "@chakra-ui/layout";
  import React, { useState } from "react";
  import axios from "axios";
  import { useHistory } from "react-router-dom";
  
  const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();
    const handleclick = () => setShow(!show);
  
    const postDetails = (pics) => {
      setLoading(true);
      if (pics === undefined) {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
  
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "Chatapp");
        data.append("cloud_name", "dtcfcfm1d");
        fetch("https://api.cloudinary.com/v1_1/dtcfcfm1d/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            console.log(data.url);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      } else {
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
    };
  
    const submitHandler = async () => {
      setLoading(true);
  
      if (!name || !email || !password || !confirmpassword) {
        toast({
          title: "Please fill in all the fields!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
  
      if (password !== confirmpassword) {
        toast({
          title: "Password does not match!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
  
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
  
        const { data } = await axios.post(
          "/api/user",
          { name, email, password, pic },
          config
        );
  
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
  
        localStorage.setItem("userInfo", JSON.stringify(data));
  
        setLoading(false);
        history.push("/chats");
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
    };
  
    return (
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
  
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
  
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <InputRightElement paddingRight="5px">
              <Button h="1.76rem" size="sm" onClick={handleclick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Confirm Password"
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
  
            <InputRightElement paddingRight="5px">
              <Button h="1.76rem" size="sm" onClick={handleclick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
  
        <FormControl id="pic">
          <FormLabel>Upload Your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
  
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Sign Up
        </Button>
      </VStack>
    );
  };
  
  export default Signup;
  








// import {
//   Button,
//   FormControl,
//   FormLabel,
//   useToast,
// } from "@chakra-ui/react";

// import {
//   Input,
//   InputGroup,
//   InputRightElement,
// } from "@chakra-ui/input";

// import { VStack } from "@chakra-ui/layout";
// import React, { useState } from "react";
// import axios from "axios";
// import { useHistory } from "react-router-dom";

// const Signup = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmpassword, setConfirmpassword] = useState("");
//   const [pic, setPic] = useState("");
//   const [loading, setLoading] = useState(false);
//   const toast = useToast();
//   const history = useHistory();

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleShowConfirmPassword = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const postDetails = (pics) => {
//     setLoading(true);
//     if (!pics) {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }

//     if (pics.type === "image/jpeg" || pics.type === "image/png") {
//       const data = new FormData();
//       data.append("file", pics);
//       data.append("upload_preset", "Chatapp");
//       data.append("cloud_name", "dtcfcfm1d");

//       fetch("https://api.cloudinary.com/v1_1/dtcfcfm1d/image/upload", {
//         method: "post",
//         body: data,
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setPic(data.url.toString());
//           console.log(data.url);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.log(err);
//           setLoading(false);
//         });
//     } else {
//       toast({
//         title: "Please Select an Image!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
//   };
//   const submitHandler = async () => {
//     setLoading(true);
  
//     if (!name || !email || !password || !confirmpassword) {
//       toast({
//         title: "Please fill in all the fields!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
  
//     if (password !== confirmpassword) {
//       toast({
//         title: "Password does not match!",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
  
//       const { data } =  axios.post(
//         "/api/user",
//         { name, email, password, pic },
//         config
//       );
  
//       toast({
//         title: "Registration Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
  
//       localStorage.setItem("userInfo", JSON.stringify(data));
  
//       setLoading(false);
//       history.push("/chats");
//     } catch (error) {
//       if (error.response && error.response.data && error.response.data.message) {
//         toast({
//           title: "Error Occurred!",
//           description: error.response.data.message,
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       } else {
//         toast({
//           title: "Error Occurred!",
//           description: "An unexpected error occurred.",
//           status: "error",
//           duration: 5000, 
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//       setLoading(false);
//     }
//   };
  
  

//   return (
//     <VStack spacing="5px">
//       <FormControl id="first-name" isRequired>
//         <FormLabel>Name</FormLabel>
//         <Input
//           placeholder="Enter Your Name"
//           onChange={(e) => setName(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           placeholder="Enter Your Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>

//         <InputGroup>
//           <Input
//             type={showPassword ? "text" : "password"}
//             placeholder="Enter Your Password"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <InputRightElement paddingRight="5px">
//             <Button h="1.76rem" size="sm" onClick={handleShowPassword}>
//               {showPassword ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <FormControl id="confirm-password" isRequired>
//         <FormLabel>Confirm Password</FormLabel>

//         <InputGroup>
//           <Input
//             type={showConfirmPassword ? "text" : "password"}
//             placeholder="Enter Your Confirm Password"
//             onChange={(e) => setConfirmpassword(e.target.value)}
//           />

//           <InputRightElement paddingRight="5px">
//             <Button
//               h="1.76rem"
//               size="sm"
//               onClick={handleShowConfirmPassword}
//             >
//               {showConfirmPassword ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <FormControl id="pic">
//         <FormLabel>Upload Your Picture</FormLabel>
//         <Input
//           type="file"
//           p={1.5}
//           accept="image/*"
//           onChange={(e) => postDetails(e.target.files[0])}
//         />
//       </FormControl>

//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Sign Up
//       </Button>
//     </VStack>
//   );
// };

// export default Signup;
