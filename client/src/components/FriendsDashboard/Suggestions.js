import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SearchArea from './SearchArea';
import axios from 'axios';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export default function Suggestions () {
    const [users, setUsers] = useState('');
    const [query, setQuery] = useState('');

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
        <Dashboard>
            <SearchArea query={query} setQuery={setQuery} />
            <List>
                {users && users
                    .filter((user) => {
                        if (!query) return true
                        if (user.displayName.toLowerCase().includes(query)) return true
                        else return false
                    })
                    .map((user) => (
                        <div key={user._id}>
                            <ListItem button>
                                <Avatar>{user.displayName[0]}</Avatar>
                                <Name>{user.displayName}</Name>
                                <SyledButton variant='outlined'>
                                    Follow
                                </SyledButton>
                            </ListItem>
                            <Divider />
                        </div>
                    ))
                }
            </List>
        </Dashboard>
    )
}

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