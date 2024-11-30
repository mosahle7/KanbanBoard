const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetcher = async () => {
    try{
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        return responseData;
    }   
    catch(err){
        console.log(err.message);
  }
}

// export const fetchTickets = async () => {
//     const [tickets, setTickets] = useStae([]);
//         const response = await fetcher();
//         setTickets(response.tickets);
//         return tickets;
// }