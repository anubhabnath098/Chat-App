import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
export default function Logout() {
    const navigate=useNavigate();
    const handleClick = ()=>{
        localStorage.clear();
        navigate("/login");
    }
  return (
    <Button>
      <LogoutIcon onClick={handleClick}/>
    </Button>
  )
}



const Button = styled.div`
    display:flex;
    align-items:center;
    padding:0.5rem;
    justify-content:center;
    border-radius:0.5rem;
    background-color:#9a86f3;
    cursor:pointer;
`
