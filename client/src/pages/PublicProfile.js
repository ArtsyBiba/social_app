import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import useStyles from '../themes/theme.profile';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';
import Avatar from '@material-ui/core/Avatar';

import UserContext from '../context/UserContext';
 
export default function PublicProfile () {   
    const classes = useStyles();
    const { userData, setUserData } = useContext(UserContext);
    const [openCreatePoll, setOpenCreatePoll] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const location = useLocation();
    
    const userId = location.pathname.split('/')[1];

    useEffect(() => {
        const getSelectedUser = async () => {
            const token = localStorage.getItem('auth-token');
            
            const userRes = await axios.post(
                'http://localhost:5000/users/getUserProfile',
                { userId },
                { headers: { 'x-auth-token': token } },
            );
            setSelectedUser(userRes.data);
        }

        getSelectedUser();
    }, [userId]);

    if (!userData.user) {
        const token = localStorage.getItem('auth-token');

        const getUser = async () => {
            const userRes = await axios.get(
                'http://localhost:5000/users/',
                { headers: { 'x-auth-token': token } },
            );
            setUserData({
                token,
                user: userRes.data,
            });
        };

        getUser();
    }

    return (
        <StyledPage>
            {selectedUser && userData.user.followings.some(e => e._id === userId) ? (
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

