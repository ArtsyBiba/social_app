import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import SearchArea from './SearchArea';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export default function FriendsDashboard () {
    const { userData } = useContext(UserContext);

    const [users, setUsers] = useState('');
    console.log(users);

    useEffect(() => {
        getUsers();
    }, []);
    
    const getUsers = async () => {
        try {
            await axios.get('http://localhost:5000/friends/usersList')
                .then(resp => setUsers(resp.data.user))
        } catch (err) {
            console.log(err.response.data.msg);
        }
    };

    return (
        <Container>
            <HeaderWrapper>
                <Subheader>Suggestions</Subheader>
                <Subheader>Followers</Subheader>
                <Subheader>Followings</Subheader>
            </HeaderWrapper>
            <Dashboard>
                <SearchArea />
                <List>
                    {users && users.map((user) => (
                        <>
                            <ListItem button key={user._id}>
                                <Avatar>{user.displayName[0]}</Avatar>
                                <Name>{user.displayName}</Name>
                                <SyledButton variant='outlined'>
                                    Follow
                                </SyledButton>
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </Dashboard>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 90vh;
    width: 75%;
    margin: auto;
    margin-top: 0.5em;
`;

const HeaderWrapper = styled.div`
    display: flex;
    height: 8vh;
    align-content: center;
    justify-content: space-around;
`; 

const Subheader = styled.div`
    display: flex;
    font-weight: 600;
    font-size: 1em;
    justify-content: center;
    align-items: center;
    line-height: 8vh;
    text-transform: uppercase;
    width: 33%;
    cursor: pointer;

    &:hover {
        border-bottom: 4px solid rgba(245,60,47,0.85);
        transition: all 0.3s ease 0s;
    }
`; 

const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
`;

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