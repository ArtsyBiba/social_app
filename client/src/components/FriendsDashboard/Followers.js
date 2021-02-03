import styled from 'styled-components';
import { useState, useContext } from 'react';
import SearchArea from './SearchArea';

import List from '@material-ui/core/List';

import User from './User';
import UserContext from '../../context/UserContext';

export default function Followers () {
    const { userData } = useContext(UserContext);
    const savedFollowers = userData.user.followers;
    
    const [query, setQuery] = useState('');

    return (
        <Dashboard>
            <SearchArea query={query} setQuery={setQuery} />
            <List>
                {savedFollowers && savedFollowers
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