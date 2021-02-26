import { useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import Poll from './Poll';
import UserContext from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';

export default function Polls ({ setOpenCreatePoll }) {
    const { userData, polls, setPolls } = useContext(UserContext);
    const socketContext = useContext(SocketContext);
    const savedPolls = userData.user.polls;
    
    const handleCreatePoll = () => {
        setOpenCreatePoll(true);
    };

    const handleVote = useCallback(({ data }) => {
        let pollForUpdate = polls.find(poll => poll._id === data.pollId);
        
        data.image === 'one' ?
            pollForUpdate.imageOneVotes =  pollForUpdate.imageOneVotes + 1
            : pollForUpdate.imageTwoVotes =  pollForUpdate.imageTwoVotes + 1;
        
        setPolls(prevPolls => (
            prevPolls.map(poll => (
                poll._id === pollForUpdate._id ? pollForUpdate : poll
            ))
        ));
    }, [polls, setPolls]);

    useEffect(() => {
        socketContext.on('uservoted', (data) => {
            handleVote(data);
         });

        //  socketContext.on('userunvoted', (data) => {
        //     handleVote(data);
        //  });
    }, [socketContext, handleVote])
    
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