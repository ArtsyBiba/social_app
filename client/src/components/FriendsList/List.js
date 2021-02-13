import styled from 'styled-components';
import { useContext, useState } from 'react';
import axios from 'axios';

import SettingsIcon from '@material-ui/icons/Settings';
import { Divider } from '@material-ui/core';
import GenericList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import UserContext from '../../context/UserContext';

export default function List ({ list }) {
    const { reload, setReload } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleDelete = async () => {
        let token = localStorage.getItem('auth-token');
        
        try {
            await axios.delete('http://localhost:5000/friendsList/delete', {
                data: {
                    friendsListId: list._id,
                },
                headers: { 'x-auth-token': token },
            })
            .then(setReload(!reload))
        } catch (err) {
            console.log(err);
        }
    };

    const openUserMenu = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ListCard>
            <Header>
                <Subheader>
                    <Name>{list.listName}</Name>
                    <Info>4 online</Info>
                </Subheader>
                <StyledSettingsIcon color='disabled' onClick={openUserMenu} />
                <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                <MenuItem onClick={handleDelete}>
                    Delete List
                </MenuItem>
            </Menu>
            </Header>
            <Divider />
            <GenericList>
                {list.friends.map((friend) => (
                    <ListItem button key={friend._id}>
                        <Avatar src={friend.avatar} />
                        <FriendName>{friend.displayName}</FriendName>
                    </ListItem>
                ))}
            </GenericList>
        </ListCard>
    )
}

const ListCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: white;
    width: 45vh;
    height: auto;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 2px;
    margin-right: 0.5em;
`;

const Header = styled.div`
    display: flex;
    height: 10vh;
    justify-content: space-between;
    margin: 0.5em;
`;

const Subheader = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vh;
`;

const Name = styled.div`
    margin: 0.8em 0em 0em 1em;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 1.2em;
    color: lightgray;
    font-size: 0.8em;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
    margin: 1em 1em 0 0;
    cursor: pointer;
`;

const FriendName = styled.div`
    display: flex;
    margin-left: 1em;
    font-size: 0.9em;
    font-weight: 600;
`;