import { useState } from 'react';
import styled from 'styled-components';
import useStyles from '../themes/theme.profile';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';
import Avatar from '@material-ui/core/Avatar';
 
export default function PublicProfile () {   
    const classes = useStyles();
    const [openCreatePoll, setOpenCreatePoll] = useState(false);
    const history = useHistory();
    const { user } = history.location.state;

    return (
        <StyledPage>
            {user ? (
                <>
                    <AppBar position='fixed' className={classes.appBar}>
                        <Navbar setOpenCreatePoll={setOpenCreatePoll} />
                    </AppBar>
                    <Sidebar /> 
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <UserDataWrapper>
                            <StyledAvatar 
                                alt={user.displayName} 
                                src={user.avatar}
                            />
                            <h2>{user.displayName}</h2>
                        </UserDataWrapper>
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

