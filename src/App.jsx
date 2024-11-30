import { useState } from 'react'
import styled from 'styled-components';
import './App.css';

function App() {

  const  [showBox, setShowBox] = useState(false);

  const toggleBox = () => {
    setShowBox(!showBox);
  }
  return (
    <>
    <Header>
      <Button onClick={toggleBox}>
  
        <img src="/assets/Display.svg" alt="Display" style={display} />
        <Label htmlFor="dropdown">Display</Label>
        <img src="/assets/down.svg" alt="Display" style={display} />
        {showBox && (
          <div style={boxStyle}>
            <div>
              <div>Grouping</div>
              <div>Ordering</div>


            </div>
          </div>
        )}
      </Button>
    </Header>
      
    </>
  )
}
const Header = styled.header`
  position: fixed;           // Fix the header at the top
  top: 0;                    // Position it at the top
  left: 0;                    // Position it flush with the left
  width: 100%;               // Make it span the full width of the viewport
  height: 80px;              // Set a fixed height
  background-Color: #f5f5f5;   // Set background color
  boxShadow: 0px 2px 5px rgba(0, 0, 0, 0.1); // Optional shadow for design
  zIndex: 1000;
  backgroundColor: #f5f5f5;
`;


const Button = styled.button`
  display: flex;                /* Use flexbox to arrange elements side by side */
  align-items: center;          /* Vertically center the elements */
  background-color: white;    /* Set a light background color */
  border-radius: 8px;           /* Radius for rounded corners */
  padding: 8px 16px;            /* Padding inside the button */
  border: none;                 /* Remove default border */
  cursor: pointer;              /* Change cursor to indicate it's clickable */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); /* Optional shadow for a softer look */
  transition: background-color 0.3s ease; /* Smooth background color transition */
  margin-left: 70px;            /* Add left margin */
  margin-top: 20px;           /* Add right margin */
  margin-bottom: 20px;  
  `;

const Label = styled.label`
  margin-left: 7px;           /* Add right margin */
  margin-right: 7px;
  `;

const display = {

};

const boxStyle = {
};
const dropdownContainerStyle = {
  // display: 'inline-block',
  // backgroundColor: '#fff',
  // padding: '10px',
  // borderRadius: '8px',
  // boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  // marginTop: '10px',
};

const labelStyle = {
  // marginRight: '10px',
  // fontSize: '16px',
  // fontWeight: 'bold',
};

const selectStyle = {
  // padding: '8px',
  // fontSize: '16px',
  // borderRadius: '5px',
  // border: '1px solid #ccc',
};

export default App
