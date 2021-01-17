import styled from 'styled-components';

import Button from '@material-ui/core/Button';

export default function FriendsList () {
    return (
        <Container>
            <Header>Friends List</Header>
            <SyledButton variant="outlined">Create List</SyledButton>
        </Container>
    )
};

const Container = styled.div`
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