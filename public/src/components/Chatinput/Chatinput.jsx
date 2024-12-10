import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

export default function Chatinput({ handleSendMsg, previewImg, setPreviewImg }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (emojiObject) => {
    setMsg((prevMsg) => prevMsg + emojiObject.emoji);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result); // Update the parent state
      };
    }
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.trim() || previewImg) {
      handleSendMsg({ text: msg, image: previewImg });
      setMsg("");
      setPreviewImg(null); // Reset the parent state
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <SentimentSatisfiedAltIcon className="emojiIcon" onClick={handleEmoji} />
          {showEmoji && <Picker onEmojiClick={handleEmojiClick} className="emoji-picker-react" />}
        </div>
        <div className="image-upload">
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <label htmlFor="imageUpload">
            <InsertPhotoIcon className="imageIcon" />
          </label>
        </div>
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <input
          type="text"
          placeholder="type your msg..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit" type="submit">
          <SendIcon />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  justify-content:center;
  background-color: #080420;
  padding: 0 1rem;

  @media screen and (max-width:720px) {
    grid-template-columns: 30% 70%;
  }

  .button-container {
    display: flex;
    align-items: center;
    justify-content:center;
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

    .image-upload {
      .imageIcon {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
    }




    .emoji-picker-react {
      position: absolute;
      top: -450px;
      height: 1500% !important;
      width: 1300% !important;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      .emoji-categories {
        button {
          filter: contrast(0);
        }
      }
      .epr-emoji-category-label {
        background-color: #080420;
        border-width: 0.7px 0 !important;
        border: solid;
        border-color: #9a86f3 !important;
      }
      .emoji-group:before {
        background-color: #080420;
      }
      @media screen and (max-width:720px) {
        height: 1400% !important;
        width: 900% !important;
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
      @media screen and (max-width:720px) {
        width: 95%;
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
      @media screen and (max-width:720px) {
        padding: 0 0.8rem;
      }
    }
  }
`;
