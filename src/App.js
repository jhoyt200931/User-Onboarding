import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./Form";
import styled from "styled-components";

const Body = styled.div`
background-image: url("https://grantland.com/wp-content/uploads/2014/09/gl_nbacourts_04.png?w=1024");

height: 750px;
background-repeat: no-repeat;
background-size: cover;
font-family: "Comic Sans MS", cursive, sans-serif;
`;

function App() {
  return (
    <Body>
      <Form />
    </Body>
  );
}

export default App;
