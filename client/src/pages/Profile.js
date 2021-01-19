import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import Polls from '../components/Polls/index';
import FriendsList from '../components/FriendsList/index';

 
export default function Profile () {   
    const { userData } = useContext(UserContext);
    const classes = useStyles();

    return (
        <StyledPage>
            {userData.user ? (
                <>
                    <AppBar position='fixed' className={classes.appBar}>
                        <Navbar />
                    </AppBar>
                    <Sidebar /> 
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Polls />
                        <FriendsList />
                    </main>
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

