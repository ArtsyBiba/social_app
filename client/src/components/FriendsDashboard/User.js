import styled from 'styled-components';
import { useContext } from 'react';
import axios from 'axios';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import UserContext from '../../context/UserContext';

export default function Suggestions ({ user }) {
    const { userData } = useContext(UserContext);
    console.log(userData)

    const handleUserButton = async () => {
        await uploadFollower();

        userData.user.followings.push(user);
    };

    const uploadFollower = async () => {
        try {
            await axios.post('http://localhost:5000/friends/follow', {
                userToFollow: user,
                currentUser: userData.user,
            })
        } catch (err) {
            console.log(err.response.data.msg);
        }
    };
    
    return (
        <>
            <ListItem button>
                <Avatar>{user.displayName[0]}</Avatar>
                <Name>{user.displayName}</Name>
                <SyledButton variant='outlined' onClick={handleUserButton}>
                    Follow
                </SyledButton>
            </ListItem>
            <Divider />
        </>
    )
}

const Name = styled.div`
    display: flex;
    margin-left: 1em;
    font-size: 0.9em;
    font-weight: 600;
`;

const SyledButton = styled(Button)`
    text-transform: uppercase;
    width: 100px;
    height: 25px;
    background-color: lightgreen;
    position: absolute;
    right: 16px;
`;