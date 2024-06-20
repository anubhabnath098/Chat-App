import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export default function Chatinput({handleSendMsg}) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = ( emojiObject,event) => {
    setMsg(prevMsg => prevMsg + emojiObject.emoji);
  };
  const sendChat =(e)=>{
    e.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg(``)
    }
  }
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <SentimentSatisfiedAltIcon className="emojiIcon" onClick={handleEmoji} />
          {showEmoji && <Picker onEmojiClick={handleEmojiClick} className="emoji-picker-react" />}
        </div>
      </div>
      <form className="input-container"  onSubmit={(e)=>sendChat(e)}>
        <input
          type="text"
          placeholder="type your msg..."
          value={msg}
          onChange={(e)=>setMsg(e.target.value)}
          
        />
        <button className="submit">
          <SendIcon />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;

  @media screen and (max-width:720px){
    grid-template-columns: 15% 85%;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      .emojiIcon {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
    }
    .emoji-picker-react {
      position: absolute;
      top: -450px;
      height:1500% !important;
      width:1300% !important;
      background-color:#080420;
      box-shadow:0 5px 10px #9a86f3;
      border-color:#9a86f3;
      .emoji-categories{
        button{
            filter:contrast(0);
        }
      }
      .epr-emoji-category-label{
        background-color:#080420;
        border-width:0.7px 0 !important;
        border:solid;
        border-color:#9a86f3 !important;
      }
      .emoji-group:before{
        background-color:#080420;
      }
      @media screen and (max-width:720px){
        height:1400% !important;
        width:900% !important;
      }
    }
  }
  .input-container {
    width: 100%;
    height: 80%;
    display: flex;
    align-content: center;
    border-radius: 2rem;
    background-color: #ffffff34;
    input {
      height: 90%;
      width: 90%;
      color: white;
      background-color: transparent;
      border: none;
      padding-left: 1rem;
      font-size: 1rem;
      @media screen and (max-width:720px){
        width:95%;
      } 

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      border: none;
      display: flex;
      justify-content: center;
      cursor: pointer;
      align-items: center;
      background-color: #9a86f3;
      @media screen and (max-width:720px){
        padding: 0 0.8rem;
      }
    }
  }
`;
