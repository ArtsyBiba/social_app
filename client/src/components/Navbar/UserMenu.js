import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

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
        // history.push('/profile');
        // setAnchorEl(null);
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
                    <AccountBoxIcon />
                    <Typography component='p' style={{paddingLeft: '10px'}}>
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