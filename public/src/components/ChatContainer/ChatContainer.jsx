import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Logout from '../Logout/Logout';
import Chatinput from '../Chatinput/Chatinput';
import axios from 'axios';
import { sendMessageRoute, getAllMessagesRoute } from '../../utils/APIRoutes';
import { v4 as uuidv4 } from "uuid";

export default function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (currentChat) {
                    const response = await axios.post(getAllMessagesRoute, {
                        from: currentUser._id,
                        to: currentChat._id,
                    });
                    setMessages(response.data);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [currentChat, currentUser]);

    const handleSendMsg = async (msg) => {
        try {
            await axios.post(sendMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
                message: msg,
            });
            socket.current.emit("send-msg", {
                to: currentChat._id,
                from: currentUser._id,
                message: msg
            });
            const msgs = [...messages];
            msgs.push({ fromSelf: true, message: msg });
            setMessages(msgs);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    },[]);

    useEffect(() => {
        if (arrivalMessage) {
            setMessages((prev) => [...prev, arrivalMessage]);
        }
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            {currentChat && (
                <Container>
                    <div className="chat-header">
                        <div className="user-details">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h3>{currentChat.username}</h3>
                            </div>
                        </div>
                        <Logout />
                    </div>

                    <div className="chat-messages">
                        {messages.map((message) => (
                            <div ref={scrollRef} key={uuidv4()}>
                                <div className={`${message.fromSelf ? "sended" : "received"}`}>
                                    <div className="content">
                                        <p>{message.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Chatinput handleSendMsg={handleSendMsg} />
                </Container>
            )}
        </>
    );
}

const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 78% 12%;
    padding-top: 1rem;
    height: 85vh;
    width: 100%;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-auto-rows: 15% 70% 15%;
    }
    @media screen and (max-width:720px){
        grid-template-rows: 13% 80% 7%;
        
    }
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
    }
    .user-details {
        display: flex;
        align-items: center;
        gap: 1rem;
        .avatar {
            img {
                height: 3rem;
            }
        }
        .username {
            h3 {
                color: white;
            }
        }
    }
    .chat-messages {
        width: 100%;
        padding: 1rem 2rem;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &::-webkit-scrollbar {
            width: 7px;
        }
        &::-webkit-scrollbar-thumb {
            background: #2d2d2d;
            border-radius: 6px;
        }

        .content {
            max-width: 40%;
            overflow-wrap: break-word;
            color: #d1d1d1;
            padding: 1rem;
            font-size: 1.1rem;
            border-radius: 1rem;
        }

        .sended {
            display: flex;
            justify-content: flex-end;
            .content {
                background-color: #4f04ff21;
            }
        }
        .received {
            display: flex;
            justify-content: flex-start;
            .content {
                background-color: #9900ff20;
            }
        }
    }
`;
