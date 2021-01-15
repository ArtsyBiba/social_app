import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import styled from 'styled-components';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import Icon from '../components/Toolbar/Icon';
import SignOut from '../components/Toolbar/SignOut';
import User from '../components/Toolbar/User';
 
export default function Profile () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) {
            history.push('/');
        }
    }, [userData, history]);

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        
        localStorage.setItem('auth-token', '');
        history.push('/');
    };
    
    return (
        <StyledPage>
            <AppBar position='absolute'>
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
                            <Badge badgeContent={0} color='secondary'>
                                <User userData={userData} />
                            </Badge>
                        </IconButton>
                        <IconButton color='inherit' onClick={logout}>
                            <Badge badgeContent={0} color='secondary'>
                                <SignOut />
                            </Badge>
                        </IconButton>
                    </IconsWrapper>
                </StyledToolbar>
            </AppBar>
    </StyledPage>
    )
}

const StyledPage = styled.div`
    display: flex;
    background-color: #f5f3ed;
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
`;

const StyledToolbar = styled(Toolbar)`
    justify-content: space-between;
`;