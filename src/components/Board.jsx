import { TicketCard } from "./TicketCard";
import styled from "styled-components";

export const Board = ({tickets}) => {
    return (
        <Container>
            {tickets.map((ticket) => (
                <TicketCard key = {ticket.id} ticket = {ticket} /> 
            ))}
        </Container>
    )

}
const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    padding: 20px;
    background-color: #f7f7f7;
    padding-top: 150px;
    box-sizing: border-box; /* Include padding and border in width calculation */
`;