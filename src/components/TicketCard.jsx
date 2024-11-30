// import './TicketCard.css'; 
import styled from "styled-components";
import UrgenPriority from '/assets/SVG - Urgent Priority grey.svg';
import HighPriority from '/assets/Img - High Priority.svg';
import MediumPriority from '/assets/Img - Medium Priority.svg';
import LowPriority from '/assets/Img - Low Priority.svg';
import Nopriority from '/assets/No-priority.svg';

export const TicketCard = ({ticket}) => {
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
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
      };

    return (
        <Container>
          <Top>
          <ID>{ticket.id}</ID>
          <User>{ticket.userId}</User>
        
          </Top>
          <Title>{ticket.title}</Title>
          <Bottom>
          <Priority>
            <img src={getPriorityIcon(ticket.priority)} alt="" />

          </Priority>
          {/* <p><strong>Status:</strong> {ticket.status}</p> */}
    
          <Tag>{capitalizeWords(ticket.tag[0])}</Tag>
          </Bottom>
        </Container>
      );
}
const Container = styled.div`
//   border: 1px solid #ddd; /* Light gray border */
//   border-radius: 5px; /* Rounded corners */
  padding: 20px; /* Padding inside the card */
  margin: 5px 0; /* Vertical margin between cards */
  background-color: white; /* White background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for the card */
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

const Title = styled.div`
  margin: 0 0 10px; /* No margin on top, 10px on the bottom */
//   font-size: 1.2em; /* Font size of the title */
  font-weight: 500; /* Bold font weight */
   display: -webkit-box; /* Create a flex container for text */
  -webkit-box-orient: vertical; /* Stack text vertically */
  -webkit-line-clamp: 2; /* Limit the text to 2 lines */
  overflow: hidden; /* Hide overflowing text */
  text-overflow: ellipsis; /* Show ellipsis when the text exceeds two lines */
`;
  

const User = styled.div`
  margin: 5px 0; /* Margin between paragraphs */
//   font-size: 0.9em; /* Font size for the paragraph text */
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
    justify-content: center;  /* Horizontally centers the content */
    align-items: center;  /* Vertically centers the content */
    padding: 5px;  /* Optional: Adds padding around the image */


    img {
        width: 15px;
    }
`
const Tag = styled.div`
    border: 1px solid #e8e8e8; /* Light gray border */
    border-radius: 0.5px; /* Rounded corners */
    margin-left: 10px;
    font-size: 0.9em; /* Font size of the tag */
    display: flex;
    justify-content: center;  /* Horizontally centers the text */
    align-items: center;  /* Vertically centers the text */
    padding: 5px;  /* Optional: Adds padding around the text */
`



