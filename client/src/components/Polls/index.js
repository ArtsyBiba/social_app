import styled from 'styled-components';
import Poll from './Poll';
import UserContext from '../../context/UserContext';

import Button from '@material-ui/core/Button';

export default function Pools ({ setOpenCreatePoll, savedPolls, setSavedPolls }) {
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
                {savedPolls
                    ? savedPolls.map((poll) => (
                        <Poll 
                            poll={poll} 
                            key={poll._id}
                            setSavedPolls={setSavedPolls}
                            savedPolls={savedPolls}
                        />
                    )) : (
                        <div>Create your first poll</div>
                    )
                }
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