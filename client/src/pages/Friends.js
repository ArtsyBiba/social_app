import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';

 
export default function Friends () {   
    const { userData } = useContext(UserContext);
    const classes = useStyles();
    const [openCreatePoll, setOpenCreatePoll] = useState(false);
    const [savedPolls, setSavedPolls] = useState('');
    
    useEffect(() => {
        if(userData.user) {
            setSavedPolls(userData.user.polls);
        }
    }, [userData]);

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
                        Conent
                    </main>
                    <CreatePoll 
                        openCreatePoll={openCreatePoll}
                        setOpenCreatePoll={setOpenCreatePoll}
                        savedPolls={savedPolls}
                        setSavedPolls={setSavedPolls}
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