import { TicketCard } from "./TicketCard";
import styled from "styled-components";

export const Board = ({tickets, users, grouping, ordering}) => {
    const predefinedGroups = {
        status: ["Backlog", "Todo", "In progress", "Done", "Cancelled"],
        priority: ["No Priority", "Urgent", "High", "Medium", "Low"],
    };

    const priorityMapping = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No Priority",
    };
    const getUserName = (userId) => {
        const user = users.find(user=>user.id === userId);
        console.log("Users", users);
        console.log(user.name,user.id);
        console.log(userId);
        return user ? user.name : "Unknown";
    };

    const groupTasks = (tasks, grouping) => {
        const grouped = tasks.reduce((acc, task) => {
            let groupKey = task[grouping];

            // If grouping by userId, replace it with userName
            if (grouping === "user") {
                groupKey = getUserName(task.userId);
            }

            // Map numeric priority to string labels if grouping by priority
            if (grouping === "priority" && priorityMapping[groupKey] !== undefined) {
                groupKey = priorityMapping[groupKey];
            }

            // Handle undefined groupKey
            groupKey = groupKey || "Undefined";

            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }
            acc[groupKey].push(task);
            return acc;
        }, {});

        // If grouping by predefined categories
        if (predefinedGroups[grouping]) {
            const finalGrouped = predefinedGroups[grouping].reduce((acc, group) => {
                acc[group] = grouped[group] || []; // Ensure all predefined groups are present
                return acc;
            }, {});
            return finalGrouped;
        }

        return grouped; // For other dynamic groups, return grouped directly
    };

    
    const sortTasks = (tasks, ordering) => {
        return tasks.sort((a, b) => {
          if (ordering === 'priority') {
            return b.priority - a.priority; // Sort by priority
          }
          if (ordering === 'title') {
            return a.title.localeCompare(b.title); // Sort by title
          }
          return 0;
        });
      };

    const groupedTasks = groupTasks(sortTasks(tickets, ordering), grouping);


    return (
        <Container>
            {/* {tickets.map((ticket) => (
                <TicketCard key = {ticket.id} ticket = {ticket} /> 
            ))}
             */}
             {Object.entries(groupedTasks).map(([groupKey, groupTasks]) => (
                  <Group key={groupKey}>
                  <GroupTitle>{groupKey}</GroupTitle>
                  {groupTasks.length > 0 &&
                      groupTasks.map((task) => (
                          <TicketCard key={task.id} ticket={task} />
                      ))
                  }
              </Group>
        
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

const Group = styled.div`
  flex: 1 1 300px; /* Allow groups to grow and shrink, with a minimum width of 300px */
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the start */
`;

const GroupTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 500; 
`;

