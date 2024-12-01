import { useState, useEffect } from "react";
import styled from "styled-components";
import UrgenPriority from '/assets/SVG - Urgent Priority grey.svg';
import HighPriority from '/assets/Img - High Priority.svg';
import MediumPriority from '/assets/Img - Medium Priority.svg';
import LowPriority from '/assets/Img - Low Priority.svg';
import Nopriority from '/assets/No-priority.svg';
import TodoIcon from '/assets/To-do.svg';
import InProgressIcon from '/assets/in-progress.svg';
import DoneIcon from '/assets/Done.svg';
import CancelledIcon from '/assets/Cancelled.svg';
import BacklogIcon from '/assets/Backlog.svg';

export const TicketCard = ({ticket, showUser, showPriority}) => {

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 4:
                return UrgenPriority;
            case 3:
                return HighPriority;
            case 2:
                return MediumPriority;
            case 1:
                return LowPriority;
            case 0:
                return Nopriority;
            default:
                return null;
        }
    };


  // Function to get the status icon based on task's status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return BacklogIcon;
      case 'Todo':
        return TodoIcon;
      case 'In progress':
        return InProgressIcon;
      case 'Done':
        return DoneIcon;
      case 'Cancelled':
        return CancelledIcon;
      default:
        return null;
    }
  };
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };

    return (
        <Container>
          <Top>
          <ID>{ticket.id}</ID>
          {showUser && <User>{ticket.userId}</User>}
        
          </Top>
          <Title>
            <StatusIcon>
            <img src={getStatusIcon(ticket.status)} alt={`${ticket.status} icon`} width="15" />

            </StatusIcon>

            <TitleText>{ticket.title}</TitleText>
            </Title>
          <Bottom>
          {showPriority && (
          <Priority>
            <img src={getPriorityIcon(ticket.priority)} alt="" />

          </Priority>
          )}
    
          <Tag><Circle></Circle>{capitalizeWords(ticket.tag[0])}</Tag>
          </Bottom>
        </Container>
      );
}
const Container = styled.div`
  border-radius: 10px;
  padding: 20px; 
  margin: 10px 0; 
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  height: 110px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;


const Title = styled.div`
margin: 0 0 10px;
font-weight: 500;
display: flex;
align-items: center; /* Align items (icon + title) horizontally */
-webkit-box-orient: vertical;
-webkit-line-clamp: 2;
overflow: hidden;
text-overflow: ellipsis;
`;

const TitleText = styled.div`
  flex-grow: 1; /* Allow the title to take up remaining space */
  display: -webkit-box; /* Enable multi-line truncation */
  -webkit-box-orient: vertical; /* Define the orientation to be vertical */
  -webkit-line-clamp: 2; /* Limit the text to 2 lines */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Add ellipsis when text overflows */
  white-space: normal; /* Allow wrapping of text */
`;

const StatusIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const User = styled.div`
  margin: 5px 0;
  `;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: grey;
`

const ID = styled.div`
    
`
const Bottom = styled.div`
    display: flex;
    // justify-content: space-between;
    // align-items: center;
    color: grey;
`
const Priority = styled.div`
    border: 0.5px solid #e8e8e8;
    border-radius: 5px;
    display: flex;
    justify-content: center;  
    align-items: center;  
    padding: 5px;  


    img {
        width: 15px;
    }
`
const Tag = styled.div`
    border: 1px solid #e8e8e8;
    border-radius: 5px;
    margin-left: 10px;
    font-size: 0.9em; 
    display: flex;
    justify-content: center; 
    align-items: center;  
    padding: 5px;  
`
const Circle = styled.div`
  width: 12px;
  height: 12px;
  margin-bottom: 2px;
  background-color: grey; 
  border-radius: 50%; 
  margin-right: 8px; 
`;



