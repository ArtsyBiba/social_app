import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SearchArea from './SearchArea';
import axios from 'axios';

import List from '@material-ui/core/List';

import User from './User';

export default function Suggestions () {
    const [users, setUsers] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            const token = localStorage.getItem('auth-token');
            
            try {
                await axios.get('http://localhost:5000/friends/', {
                    headers: { 'x-auth-token': token }
                })
                .then(
                    resp => {
                        setUsers(resp.data.filteredUsers);
                    })
            } catch (err) {
                console.log(err.response.data.msg);
            }
        };
        
        getUsers();
    }, []);

    return (
        <Dashboard>
            <SearchArea query={query} setQuery={setQuery} />
            <List>
                {users.length > 0 && users
                    .filter((user) => {
                        if (!query) return true
                        if (user.displayName.toLowerCase().includes(query)) return true
                        else return false
                    })
                    .map((user) => (
                        <User key={user._id} user={user} />
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