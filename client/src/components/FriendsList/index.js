import styled from 'styled-components';
import List from './List';

import Button from '@material-ui/core/Button';

export default function FriendsList () {
    return (
        <Container>
            <HeaderWrapper>
                <Header>Friends List</Header>
                <SyledButton variant="outlined">Create List</SyledButton>
            </HeaderWrapper>
            <ListsWrapper>
                <List />
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