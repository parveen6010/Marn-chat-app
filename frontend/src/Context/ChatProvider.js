import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(); // Initialize user with default values
 const[SelectedChat , setSelectedChat] = useState();
  const [chats, setChats] = useState([]); // Initialize user with default values
  const [notification, setNotification] = useState([]); 
  
  const history = useHistory();
  
  // useEffect(() => {
  //   const userInfo = localStorage.getItem("userInfo");

  //   if (userInfo) {
  //     try {
  //       const parsedUserInfo = JSON.parse(userInfo);
  //       setUser(parsedUserInfo);
  //     } catch (error) {
  //       console.error("Error parsing user info:", error);
  //       // Handle the error, e.g., redirect to an error page
  //     }
  //   } else {
  //     history.push("/");
  //   }
  // }, [history]);


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <ChatContext.Provider value={{ SelectedChat , setSelectedChat , user, setUser , chats, setChats , notification, setNotification}}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
