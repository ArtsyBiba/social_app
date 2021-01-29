import styled from 'styled-components';
import { useState, useContext } from 'react';
import SearchArea from './SearchArea';

import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

import User from './User';
import UserContext from '../../context/UserContext';

export default function Followings () {
    const { userData } = useContext(UserContext);
    const savedFollowings = userData.user.followings;
    
    const [query, setQuery] = useState('');

    return (
        <Dashboard>
            <SearchArea query={query} setQuery={setQuery} />
            <List>
                {savedFollowings && savedFollowings
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