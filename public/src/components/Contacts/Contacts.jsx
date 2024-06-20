import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import logo from "../../assets/logo.png"


export default function Contacts({contacts, currentUser, changeChat}) {
    const [currentUserName, setCurrentUserName] = useState(undefined)
    const [currentUserImage, setCurrentUserImage] = useState(undefined)
    const [currentSelected, setCurrentSelected] = useState(undefined);
    useEffect(()=>{
        if(currentUser){
            setCurrentUserImage(currentUser.avatarImage)
            setCurrentUserName(currentUser.username);
        }
    },[currentUser])

    const changeCurrentChat = (index, contact)=>{
        setCurrentSelected(index);
        changeChat(contact)

    }
  return <>
  {currentUserName&& currentUserImage&&(
    <Container>
        <div className="brand">
            <img src={logo} alt="" />
            <h3>umbchat</h3>
        </div>
        <div className="contacts">
            {
                contacts.map((contact, index)=>{
                    return(
                        <div className={`contact ${index===currentSelected ? "selected":""}`} key ={index}
                        onClick ={()=>changeCurrentChat(index,contact)}
                        >
                            <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" className='avatar'/>
                            <div className="username">
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                    )
                })
            }
            </div>
            <div className="current-user">
                <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentUserImage.avatarImage?currentUserImage.avatarImage:currentUserImage}`} alt="avatar" />
                    <div className="username">
                        <h2>{currentUserName}</h2>
                    </div>
                </div>
            </div>
        
    </Container>
  )}
  
  </>
}

const Container = styled.div`
    width:100%;
    display:grid;
    grid-template-rows:10% 75% 15%;
    
    background-color:#080420;
    .brand{
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        img{
            height:2.2rem;
        }
        h3{
            color:white;
        }
    }
    .contacts{
        display:flex;
        flex-direction:column;
        align-items:center;
        overflow:auto;
        width:100%;
        gap:0.8rem;
        
        &::-webkit-scrollbar{
            width:0.2rem;
            &-thumb{
                background-color:#ffffff39;
                width:0.1rem;
                border-radius:1rem;
            }
        }

        .contact{
            background-color:#ffffff39;
            max-height:5rem;
            width:90%;
            cursor:pointer;
            border-radius:0.2rem;
            padding:0.4rem;
            gap:1rem;
            display:flex;
            align-items:center;
            transition: 0.5s ease-in-out;
            
                img{
                    height:3rem;
                }
            
            .username{
                h3{
                    color:white;
                }
            }

        }
        .selected {
            background-color:#9186f3;
        }
    }
    .current-user{
        background-color:#0d0d30;
        display:flex;
        justify-content:center;
        align-items:center;
        gap:2rem;
        .avatar{
            height:100%;
            width:100%;
            display:flex;
            align-items:center;
            justify-content:center;
            gap:1rem;
            img{
                height:3rem;
                max-inline-size:100%;

            }
        }
        .username{
            h2{
                color:white;
            }
        }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap:0.5rem;
      .username{
        h2{
            font-size:1rem;
        }
      }
    }
    @media screen and (max-width: 720px){
        .brand{
            width:100%;
        }
        .brand h3{
            display:none;
        }
        .brand img{
            padding:0;
            margin:0;
            width:50%;
            height:50%;
        }
        .contacts{
            width:100%;
        }
        .username{
            display:none;
        }
    }

`