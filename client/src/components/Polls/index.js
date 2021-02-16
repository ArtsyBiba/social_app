import { useContext, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';

import Poll from './Poll';
import UserContext from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';

export default function Pools ({ setOpenCreatePoll }) {
    const { userData, reload, setReload } = useContext(UserContext);
    const socketContext = useContext(SocketContext);
    const savedPolls = userData.user.polls;
    
    const handleCreatePoll = () => {
        setOpenCreatePoll(true);
    };

    const handleVote = useCallback(() => {
        setReload(!reload);
    }, [setReload, reload]);

    useEffect(() => {
        socketContext.on('uservoted', () => {
            handleVote();
         });

         socketContext.on('userunvoted', () => {
            handleVote();
         });
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
                    ? savedPolls.map((poll, index) => (
                        <Poll 
                            poll={poll} 
                            key={index}
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