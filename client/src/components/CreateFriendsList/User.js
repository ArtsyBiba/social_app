import styled from 'styled-components';
import { useState, useEffect } from 'react';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export default function Suggestions ({ user, newFriendsList, setNewFriendsList }) {
    const [added, setAdded] = useState(false);
    
    useEffect(() => {
        const checkIfAdded = () => {
            return (
                newFriendsList.friends.length > 0 && 
                    newFriendsList.friends.some(e => e._id === user._id) 
                            ? setAdded(true)
                            : setAdded(false)
            )
        };

        checkIfAdded();
    });

    const handleAddButton = () => {  
        setNewFriendsList(prevList => {
            return { 
                friends: prevList.friends.concat(user), 
            }
        });
    };

    const handleRemoveButton = () => {
        const filteredFriends = newFriendsList.friends.filter(e => e._id !== user._id);
        
        setNewFriendsList(prevList => {
            return { 
                ...prevList, 
                friends: filteredFriends, 
            }
        });
    };
    
    return (
        <>
            <ListItem button>
                <Avatar>{user.displayName[0]}</Avatar>
                <Name>{user.displayName}</Name>
                {added ? 
                    <SyledButton active='active' variant='contained' onClick={handleRemoveButton}>
                        Remove
                    </SyledButton> :
                    <SyledButton variant='outlined' onClick={handleAddButton}>
                        Add
                    </SyledButton>
                }
            </ListItem>
            <Divider />
        </>
    )
}

const Name = styled.div`
    display: flex;
    margin-left: 1em;
    font-size: 0.8em;
    font-weight: 600;
`;

const SyledButton = styled(Button)`
    text-transform: uppercase;
    width: 70px;
    height: 20px;
    background-color: ${props => props.active ? 'lightred' : 'lightgreen'};
    position: absolute;
    right: 16px;
`;