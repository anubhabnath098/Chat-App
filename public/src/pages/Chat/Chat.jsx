import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { host } from '../../utils/APIRoutes';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUserRoute } from '../../utils/APIRoutes';
import Contacts from '../../components/Contacts/Contacts';
import Welcome from '../../components/Welcome/Welcome';
import ChatContainer from '../../components/ChatContainer/ChatContainer';
import { io } from "socket.io-client";
import Menu from '../../components/Menu/Menu';


export default function Chat() {
    const socket = useRef();

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            if (!localStorage.getItem("chat-app-user")) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
                setIsLoaded(true);
            }
        };
        fetchUser();
    }, [navigate]);

    useEffect(()=>{
        if(currentUser){
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    },[currentUser])

    useEffect(() => {
        const getCurrentUser = async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const { data } = await axios.get(`${allUserRoute}/${currentUser._id}`);
                    setContacts(data);

                } else {
                    navigate("/setAvatar");
                }
            }
        };
        getCurrentUser();
    }, [currentUser, navigate]);

    const handleChatChange = (chat)=>{
        setCurrentChat(chat);
    }

    return (
        <Container>
            <Menu searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange} searchTerm={searchTerm}/>
                {isLoaded && currentChat===undefined?<Welcome currentUser={currentUser}/>:
                <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>}
            </div>
            
        </Container>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }

    @media screen and (max-width:720px){
        overflow:scroll;
        height:90vh;
        width:90vw;
        grid-template-columns:20% 80%;

    }

  }
  @media screen and (max-width:720px) {
    
  }
`;
