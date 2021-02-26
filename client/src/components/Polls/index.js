import { useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';

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
                <StyledGridList>
                    {savedPolls
                        ? savedPolls.map((poll, index) => (
                            <Poll 
                                poll={poll} 
                                key={index}
                            />
                        )) : (
                            <div>Create your first poll</div>
                        )
                    }
                </StyledGridList>
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
    flex-wrap: wrap;
    justify-content: flex-start;
    overflow: hidden;
    margin: 1em;
    width: 110vh;
    height: 44vh;
`;

const StyledGridList = styled(GridList)`
    flex-wrap: nowrap;
    transform: translateZ(0);    
`;