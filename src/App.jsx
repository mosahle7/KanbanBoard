import { useState, useEffect } from 'react'
import styled from 'styled-components';
// import './App.css';
import { fetcher } from './utils/fetcher';
import { Header } from './components/Header';
import { Board } from './components/Board';
function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await fetcher();
      setTickets(data.tickets);
    };

    fetchTickets();
  }, []); 

  return (
    <>
    <div className="App">
    <Header/>
    <Board tickets={tickets}/>

    </div>
    </>
  )

  
}


export default App
