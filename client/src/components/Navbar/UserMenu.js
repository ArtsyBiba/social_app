import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';

export default function UserMenu () { 
    const { userData, setUserData } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    
    let currentUser = '';
    
    if (userData.user) {
        currentUser = userData.user.displayName;
    };

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        
        localStorage.setItem('auth-token', '');
        history.push('/');
    };

    const goToProfile = () => {
        history.push('/profile');
        setAnchorEl(null);
    }

    const openUserMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return ( 
        <>
            <IconButton color='inherit' onClick={openUserMenu}>
                <Badge badgeContent={0} color='secondary'>
                    <StyledAvatar src={userData.user.avatar} />
                    <Typography component='p' style={{paddingLeft: '10px', paddingTop: '5px'}}>
                        {currentUser}
                    </Typography>
                </Badge>
            </IconButton>
            <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={goToProfile}>My Profile</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    )
};

const StyledAvatar = styled(Avatar)`
    width: 30px;
    height: 30px;
`;