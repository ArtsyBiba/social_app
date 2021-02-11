import { useState, useContext } from 'react';
import styled from 'styled-components';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';
import Avatar from '@material-ui/core/Avatar';

import UserContext from '../context/UserContext';
 
export default function PublicProfile () {   
    const classes = useStyles();
    const { userData, selectedUser } = useContext(UserContext);
    const [openCreatePoll, setOpenCreatePoll] = useState(false);

    return (
        <StyledPage>
            {selectedUser && userData.user.followings.some(e => e._id === selectedUser._id) ? (
                <>
                    <AppBar position='fixed' className={classes.appBar}>
                        <Navbar setOpenCreatePoll={setOpenCreatePoll} />
                    </AppBar>
                    <Sidebar /> 
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <UserDataWrapper>
                            <StyledAvatar 
                                alt={selectedUser.displayName} 
                                src={selectedUser.avatar}
                            />
                            <h2>{selectedUser.displayName}</h2>
                        </UserDataWrapper>
                    </main>
                    <CreatePoll 
                        openCreatePoll={openCreatePoll}
                        setOpenCreatePoll={setOpenCreatePoll}
                    />
                </>
            ) : (
                <div>You can only view profiles of users that you follow</div>
            )}
        </StyledPage>
    )
}

const StyledPage = styled.div`
    display: flex;
    background-color: #fafafa;
    height: 100vh;
`;

const UserDataWrapper = styled.form`
    display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: space-between;
    align-items: center;
    margin: auto;
	margin-top: 1.5em;
`;

const StyledAvatar = styled(Avatar)`
    height: 70px;
    width: 70px;
`;

