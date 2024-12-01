import { useState , useEffect} from "react";
import { TicketCard } from "./TicketCard";
import styled from "styled-components";

export const Board = ({tickets, users, grouping, ordering}) => {
    const [currentGrouping, setCurrentGrouping] = useState(() => {
        const savedGrouping = localStorage.getItem('grouping');
        return savedGrouping ? savedGrouping : grouping; // Use localStorage value if available, else fall back to prop
      });
      
      const [currentOrdering, setCurrentOrdering] = useState(() => {
        const savedOrdering = localStorage.getItem('ordering');
        return savedOrdering ? savedOrdering : ordering; // Use localStorage value if available, else fall back to prop
      });
   

    // Load settings from localStorage on initial load
    useEffect(() => {
    const savedGrouping = localStorage.getItem('grouping');
    const savedOrdering = localStorage.getItem('ordering');

    if (savedGrouping) setCurrentGrouping(savedGrouping);
    if (savedOrdering) setCurrentOrdering(savedOrdering);
    }, []);

  // Save settings to localStorage whenever they change

    useEffect(() => {
        if (currentGrouping !== undefined) {
            localStorage.setItem('grouping', currentGrouping);
        }
        if (currentOrdering !== undefined) {
            localStorage.setItem('ordering', currentOrdering);
        }
    }, [currentGrouping, currentOrdering]);


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

    const priorityIcons = {
        "No Priority": "assets/No-priority.svg",
        "Urgent": "assets/SVG - Urgent Priority colour.svg",
        "High": "assets/Img - High Priority.svg",
        "Medium": "assets/Img - Medium Priority.svg",
        "Low": "assets/Img - Low Priority.svg",
    };

    const statusIcons = {
        "Backlog": "assets/Backlog.svg",
        "Todo": "assets/To-do.svg",
        "In progress": "assets/in-progress.svg",
        "Done": "assets/Done.svg",
        "Cancelled": "assets/Cancelled.svg",
    };

    const getIcon = (groupKey) => {
        if (predefinedGroups.status.includes(groupKey)) {
            return statusIcons[groupKey];
        }
        if (predefinedGroups.priority.includes(groupKey)) {
            return priorityIcons[groupKey];
        }
        return null;
    };

    const getUserName = (userId) => {
        const user = users.find(user=>user.id === userId);
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
                  <GroupTitle>
                    <GroupTitleLeft>
                    {getIcon(groupKey) && (
                    <img
                    src={getIcon(groupKey)}
                    alt={`${groupKey} icon`}
                    width="15"
                    />
                    )}
                    {groupKey} 
                    <GroupTitleNumber>{groupTasks.length}</GroupTitleNumber>
                    </GroupTitleLeft>
                    <GroupTitleRight>
                    <img src="assets/add.svg" alt="Add Icon" width="18" />
                    <img src="assets/3 dot menu.svg" alt="Menu Icon" width="18" />
                    </GroupTitleRight>

                    </GroupTitle>
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
    padding-top: 100px;
    box-sizing: border-box; /* Include padding and border in width calculation */
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align content to the start */
  width: 100%;
`;

const GroupTitle = styled.div`
  margin-bottom: 20px;
  margin-left: 10px;
  font-weight: 500; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  `;

  const GroupTitleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; 
`;

const GroupTitleRight = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  gap: 10px;
`;

const GroupTitleNumber = styled.span`
  color: grey; 
  font-weight: bold;
  margin-left: 6px; 
`;
