import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { fetcher } from './utils/fetcher';
import { Header } from './components/Header';
import { Board } from './components/Board';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('status');
  const [ordering, setOrdering] = useState('priority');

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await fetcher();
      setTickets(data.tickets);
      setUsers(data.users);
    };

    fetchTickets();
  }, []); 

  return (
    <>
    <div className="App">
    <Header setGrouping={setGrouping} setOrdering={setOrdering}/>
    <Board tickets={tickets} users={users} grouping={grouping} ordering={ordering}/>

    </div>
    </>
  )

  
}


export default App
