import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import UserContext from '../../context/UserContext';

export default function Suggestions ({ user }) {
    const { userData, reload, setReload } = useContext(UserContext);
    const [followed, setFollowed] = useState(false);
    const history = useHistory();
    
    useEffect(() => {
        const checkIfFollowed = () => {
            return (
                setFollowed(userData.user.followings.some(e => e._id === user._id))
            )
        };

        checkIfFollowed();
    });

    const handleFollowButton = async () => {
        await uploadFollower();
        
        setReload(!reload);
    };

    const handleUnfollowButton = async () => {
        await removeFollower();

        setReload(!reload);
    };

    let token = localStorage.getItem('auth-token');

    const uploadFollower = async () => {
        try {
            await axios.put('http://localhost:5000/friends/follow', 
                { userToFollow: user }, 
                { headers: { 'x-auth-token': token } },
            )
        } catch (err) {
            console.log(err.response.data.msg);
        }
    };

    const removeFollower = async () => {
        try {
            await axios.put('http://localhost:5000/friends/unfollow',
                { userToUnfollow: user }, 
                { headers: { 'x-auth-token': token } },
            )
        } catch (err) {
            console.log(err.response.data.msg);
        }
    };

    const goToProfile = () => {
        setReload(!reload)
        
        history.push({
            pathname: `/${user._id}/profile`,
            state: { user }
        });
    };
    
    return (
        <>
            <ListItem>
                <StyledAvatar 
                    src={user.avatar} 
                    alt={user.displayName} 
                    onClick={() => goToProfile()}
                />
                <Name onClick={() => goToProfile()}>
                    {user.displayName}
                </Name>
                {followed ? 
                    <SyledButton active='active' variant='contained' onClick={handleUnfollowButton}>
                        Unfollow
                    </SyledButton> :
                    <SyledButton variant='outlined' onClick={handleFollowButton}>
                        Follow
                    </SyledButton>
                }
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
    cursor: pointer;
`;

const SyledButton = styled(Button)`
    text-transform: uppercase;
    width: 100px;
    height: 25px;
    background-color: ${props => props.active ? 'lightred' : 'lightgreen'};
    position: absolute;
    right: 16px;
`;

const StyledAvatar = styled(Avatar)`
    cursor: pointer;
`;