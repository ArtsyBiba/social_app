import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Icon from '../components/Navbar/Icon';
import UserMenu from '../components/Navbar/UserMenu';
import Sidebar from '../components/Sidebar/index';
import Pools from '../components/Pools/index';
import FriendsList from '../components/FriendsList/index';

 
export default function Profile () {   
    const { userData } = useContext(UserContext);
    const classes = useStyles();

    return (
        <StyledPage>
            {userData.user ? (
                <>
                    <AppBar position='fixed' className={classes.appBar}>
                        <StyledToolbar>
                            <AppName>
                                <Icon>💬 </Icon>
                                <Typography 
                                    component='h1' 
                                    variant='h6' 
                                    color='inherit' 
                                    noWrap 
                                >
                                    Social App
                                </Typography>
                            </AppName>
                            <IconsWrapper>
                                <IconButton color='inherit'>
                                    <Typography component='p'>
                                        Friends
                                    </Typography>
                                </IconButton>
                                <IconButton color='inherit'>
                                    <Typography>
                                        Friends posts
                                    </Typography>
                                </IconButton>
                                <IconButton color='inherit'>
                                    <Typography component='p'>
                                        Opinions
                                    </Typography>
                                </IconButton>
                                <IconButton color='inherit'>
                                    <Typography component='p'>
                                        Create Pool
                                    </Typography>
                                </IconButton>
                                <UserMenu />
                            </IconsWrapper>
                        </StyledToolbar>
                    </AppBar>
                    <Sidebar /> 
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <Pools />
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
    height: 100vh;
`;

const AppName = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const IconsWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
`;

const StyledToolbar = styled(Toolbar)`
    justify-content: space-between;
`;