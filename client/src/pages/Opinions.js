import { useContext, useState } from 'react';
import styled from 'styled-components';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';
import GridList from '@material-ui/core/GridList';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';
import OpinionsPoll from '../components/Opinions/OpinionsPoll';
import UserContext from '../context/UserContext';
 
export default function Opinions () {   
    const { userData } = useContext(UserContext);
    const classes = useStyles();
    const [openCreatePoll, setOpenCreatePoll] = useState(false);

    return (
        <StyledPage>
            {userData.user ? (
                <>
                    <AppBar position='fixed' className={classes.appBar}>
                        <Navbar setOpenCreatePoll={setOpenCreatePoll} />
                    </AppBar>
                    <Sidebar /> 
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <PollsWrapper>
                            <StyledGridList>
                                {userData.user.polls
                                    ? userData.user.polls.map((poll, index) => (
                                        <OpinionsPoll 
                                            poll={poll} 
                                            key={index}
                                        />
                                    )) : (
                                        <div>Create your first poll</div>
                                    )
                                }
                            </StyledGridList>
                        </PollsWrapper>
                    </main>
                    <CreatePoll 
                        openCreatePoll={openCreatePoll}
                        setOpenCreatePoll={setOpenCreatePoll}
                    />
                </>
            ) : (
                <div>Not authorized</div>
            )}
        </StyledPage>
    )
}

const StyledPage = styled.div`
    display: flex;
    background-color: #fafafa;
    height: 100%;
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