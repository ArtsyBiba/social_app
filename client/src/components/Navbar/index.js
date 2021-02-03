import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Icon from './Icon';
import UserMenu from './UserMenu';

export default function Navbar ({ setOpenCreatePoll }) {
    const history = useHistory();
    
    const handleCreatePoll = () => {
        setOpenCreatePoll(true);
    };

    const handleOpenFriends = () => {
        history.push('/friends');
    };

    const handleOpenProfile = () => {
        history.push('/profile');
    };
    
    return (
        <StyledToolbar>
            <AppName onClick={handleOpenProfile}>
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
                <IconButton color='inherit' onClick={handleOpenFriends}>
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
                <IconButton color='inherit' onClick={handleCreatePoll}>
                    <Typography component='p'>
                        Create Poll
                    </Typography>
                </IconButton>
                <UserMenu />
            </IconsWrapper>
        </StyledToolbar>
    )
};

const AppName = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
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