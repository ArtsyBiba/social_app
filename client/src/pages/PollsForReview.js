import { useContext, useState } from 'react';
import styled from 'styled-components';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';
import ReviewPoll from '../components/PollsForReview/ReviewPoll';
import UserContext from '../context/UserContext';
 
export default function PollsForReview () {   
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
                            {userData.user.pollsForReview
                                ? userData.user.pollsForReview.map((poll, index) => (
                                    <ReviewPoll 
                                        poll={poll} 
                                        key={index}
                                        userId={userData.user.id}
                                    />
                                )) : (
                                    <div>Create your first poll</div>
                                )
                            }
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
    margin: 1em;
`;