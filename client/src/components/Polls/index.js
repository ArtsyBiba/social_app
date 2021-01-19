import styled from 'styled-components';
import Poll from './Poll';

import Button from '@material-ui/core/Button';

export default function Pools ({ setOpenCreatePoll }) {
    const handleCreatePoll = () => {
        setOpenCreatePoll(true);
    };
    
    return (
        <Container>
            <HeaderWrapper>
                <Header>Polls</Header>
                <SyledButton variant='outlined' onClick={handleCreatePoll}>
                    Create Poll
                </SyledButton>
            </HeaderWrapper>
            <PollsWrapper>
                <Poll />
            </PollsWrapper>
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

const PollsWrapper = styled.div`
    display: flex;
    margin: 1em;
`;