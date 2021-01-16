import { useContext } from 'react';
import styled from 'styled-components';
import UserContext from '../context/UserContext';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Icon from '../components/Navbar/Icon';
import UserMenu from '../components/Navbar/UserMenu';
 
export default function Profile () {   
    const { userData } = useContext(UserContext);

    return (
        <StyledPage>
            {userData.user ? (
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
                            <UserMenu />
                        </IconsWrapper>
                    </StyledToolbar>
                </AppBar>
            ) : (
                <div>Not authorized</div>
            )}
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