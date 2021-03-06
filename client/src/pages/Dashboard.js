import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import Polls from '../components/Polls/index';
import FriendsList from '../components/FriendsList/index';
import CreatePoll from '../components/CreatePoll/index';
import CreateFriendsList from '../components/CreateFriendsList/index';

 
export default function Dashboard () {   
    const { userData } = useContext(UserContext);
    const classes = useStyles();
    const [openCreatePoll, setOpenCreatePoll] = useState(false);
    const [openCreateFriendsList, setOpenCreateFriendsList] = useState(false);

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
                        <Polls setOpenCreatePoll={setOpenCreatePoll} />
                        <FriendsList setOpenCreateFriendsList={setOpenCreateFriendsList} />
                    </main>
                    <CreatePoll 
                        openCreatePoll={openCreatePoll}
                        setOpenCreatePoll={setOpenCreatePoll}
                    />
                    <CreateFriendsList
                        openCreateFriendsList={openCreateFriendsList}
                        setOpenCreateFriendsList={setOpenCreateFriendsList}
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

