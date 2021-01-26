import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import SearchArea from './SearchArea';
import axios from 'axios';

import List from '@material-ui/core/List';

import User from './User';
import UserContext from '../../context/UserContext';

export default function Suggestions () {
    const { userData } = useContext(UserContext);
    
    const [users, setUsers] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        const getUsers = async () => {
            try {
                await axios.get('http://localhost:5000/friends/usersList')
                    .then(
                        resp => {
                            const filtered = resp.data.user.filter((user) => user._id !== userData.user.id)
                            setUsers(filtered);
                        })
            } catch (err) {
                console.log(err.response.data.msg);
            }
        };
        
        getUsers();
    }, [userData.user.id]);

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