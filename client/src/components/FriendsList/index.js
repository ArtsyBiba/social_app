import styled from 'styled-components';
import { useContext } from 'react';

import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';

import List from './List';
import UserContext from '../../context/UserContext';

export default function FriendsList ({ setOpenCreateFriendsList }) {
    const { userData } = useContext(UserContext);
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
                <StyledGridList>
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
                </StyledGridList>
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
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow: hidden;
    margin: 1em;
    width: 110vh;
`;

const StyledGridList = styled(GridList)`
    flex-wrap: nowrap;
    transform: translateZ(0);    
`;