import { useState, useEffect, useRef} from 'react'
import styled from 'styled-components';

export const Header = ({setGrouping, setOrdering}) => {

const  [showBox, setShowBox] = useState(false);
const [savedGrouping, setSavedGrouping] = useState(localStorage.getItem('grouping') || 'status');
const [savedOrdering, setSavedOrdering] = useState(localStorage.getItem('ordering') || 'priority');
  

const boxRef = useRef(null);
const buttonRef = useRef(null);

  const toggleBox = () => {
    setShowBox(!showBox);
  };

  const handleGroupingChange = (e) => {
    setGrouping(e.target.value);
    setSavedGrouping(e.target.value);  // Store it in state
    localStorage.setItem('grouping', e.target.value);  // Save to localStorage
  };

  const handleOrderingChange = (e) => {
    setOrdering(e.target.value);
    setSavedOrdering(e.target.value);  // Store it in state
    localStorage.setItem('ordering', e.target.value);  // Save to localStorage
  };

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (showBox && !boxRef.current.contains(ev.target) && !buttonRef.current.contains(ev.target)) {
        setShowBox(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBox]);


  return (
    <>
    <Content>
      <Button ref={buttonRef} onClick={toggleBox}>
  
        <img src="/assets/Display.svg" alt="Display" style={display} />
        <Display htmlFor="dropdown">Display</Display>
        <img src="/assets/down.svg" alt="Display" style={display} />
      </Button>

      {showBox && (
          <Box ref={boxRef}>
          <BoxEle>
          <label htmlFor="grouping">Grouping</label>
          <GDropdown id="grouping" value={savedGrouping} onChange={handleGroupingChange}>
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </GDropdown>
          </BoxEle>

          <BoxEle>
          <label htmlFor="ordering">Ordering</label>
          <ODropdown id="ordering" value={savedOrdering} onChange={handleOrderingChange}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </ODropdown>
          </BoxEle>
          </Box>
      )}
    </Content>


      
    </>
  )
}

const Content = styled.header`
  position: fixed;           
  top: 0;                    
  left: 0;                   
  width: 100%;               
  height: 80px;              
  background-color: white;  
  boxShadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  zIndex: 1000;
`;


const Button = styled.button`
  display: flex;                /* Use flexbox to arrange elements side by side */
  align-items: center;          
  background-color: white;    
  border-radius: 8px;           
  padding: 8px 16px;            
  border: none;                 
  cursor: pointer;             
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1); 
  transition: background-color 0.3s ease; 
  margin-left: 45px;            
  margin-top: 20px;           
  margin-bottom: 20px;  
  `;

const Display = styled.div`
  margin-left: 7px;          
  margin-right: 7px;
  `;

const display = {


};

const Box = styled.div`
  height: 100px;
  width: 20%;
  margin-left: 45px;
  border-radius: 8px;
  margin-top: -7px;
  background-color: #F5F5F5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;
  justify-content: space-evenly;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);

`;

const BoxEle = styled.div `
  display: flex;
  flex-direction: row;
  align-items: center;
  color: grey;
  // margin-bottom: 10px;
`;

const GDropdown = styled.select`
  margin-left: 90px;
  height: 35px;
  width: 100px;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  // flex-grow: 1;
`;

const ODropdown = styled.select`
  margin-left: 92px;
  height: 35px;
  width: 100px;
  padding: 8px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  // flex-grow: 1;
`;


