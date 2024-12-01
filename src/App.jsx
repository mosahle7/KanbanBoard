import { useState, useEffect } from 'react'
import styled from 'styled-components';
import { fetcher } from './utils/fetcher';
import { Header } from './components/Header';
import { Board } from './components/Board';

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => {
    const savedGrouping = localStorage.getItem('grouping');
    return savedGrouping ? savedGrouping : 'status'; // Fallback to 'status' if not found
  });
  const [ordering, setOrdering] = useState(() => {
    const savedOrdering = localStorage.getItem('ordering');
    return savedOrdering ? savedOrdering : 'priority'; // Fallback to 'priority' if not found
  });
  
  useEffect(() => {
    const fetchTickets = async () => {
      const data = await fetcher();
      setTickets(data.tickets);
      setUsers(data.users);
    };

    fetchTickets();
  }, []); 

  useEffect(() => {
    if (grouping) {
      localStorage.setItem('grouping', grouping);
    }
    if (ordering) {
      localStorage.setItem('ordering', ordering);
    }
  }, [grouping, ordering]);
  

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
