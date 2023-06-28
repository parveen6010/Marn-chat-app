import React, { useEffect } from 'react'
import {
    Container,
    Box,
    Text,
    Tabs,
    TabList,
    TabPanel,
    TabPanels,
    Tab,
} from '@chakra-ui/react'

import Login from "../component/Authontication/Login";
import Signup from '../component/Authontication/Signup';
import { useHistory } from "react-router-dom";

const Homepage = () => {
    
    const history = useHistory();
 
 
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
    
        if (userInfo) {
          try {
            console.log(userInfo);
            history.push('/chats');
          } catch (error) {
            console.error('Error parsing user info:', error);
            // Handle the error, e.g., redirect to an error page
          }
        }
      }, [history]);
    
 

    return (
        <Container maxW="xl" centerContent>

            <Box
                d="flex"
                justifyContent="Center"
                textAlign="center"
                p={3}
                bg={"white"}
                w="100%"
                m="40px 0 15px 0"
                borderRadius="lg"
                borderWidth="1px"

            >


                <Text fontSize="2xl" fontFamily="Work sans" color="black" >
                    Talk-A-Tive</Text>
            </Box
            >

            <Box
                bg="white"
                w="100%"
                p={4}
                borderRadius="lg"
                borderWidth="1px"
                color="black"
            >

                <Tabs variant='soft-rounded' >
                    <TabList mb="1em">
                        <Tab width="50%" >Login</Tab>
                        <Tab width="50%">Sign up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

            </Box>

        </Container>
    )
}

export default Homepage
