import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import SearchArea from './SearchArea';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import UserContext from '../../context/UserContext';

export default function Followings () {
    const { userData } = useContext(UserContext);
    
    const [followings, setFollowings] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        userData.user.followings && setFollowings(userData.user.followings);
    }, [userData]);

    return (
        <Dashboard>
            <SearchArea query={query} setQuery={setQuery} />
            <List>
                {followings && followings
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