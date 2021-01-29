import styled from 'styled-components';
import { useContext } from 'react';

import Button from '@material-ui/core/Button';

import List from './List';
import UserContext from '../../context/UserContext';

export default function FriendsList ({ setOpenCreateFriendsList }) {
    const { userData } = useContext(UserContext);
    console.log(userData)
    const savedLists = userData.user.friendsLists;
    
    const handleCreateFriendsList = () => {
        setOpenCreateFriendsList(true);
    };
    
    return (
        <Container>
            <HeaderWrapper>
                <Header>Friends List</Header>
                <SyledButton variant='outlined' onClick={handleCreateFriendsList}>
                    Create List
                </SyledButton>
            </HeaderWrapper>
            <ListsWrapper>
                {savedLists
                    ? savedLists.map((list, index) => (
                        <List 
                            list={list} 
                            key={index}
                        />
                    )) : (
                        <div>Create your first poll</div>
                    )
                }
            </ListsWrapper>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderWrapper = styled.div`
    display: flex;
    margin: 1em;
    justify-content: space-between;
`;

const Header = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
`;

const SyledButton = styled(Button)`
    align-self: flex-end;
    text-transform: uppercase;
    width: 120px;
`;

const ListsWrapper = styled.div`
    display: flex;
    margin: 1em;
`;