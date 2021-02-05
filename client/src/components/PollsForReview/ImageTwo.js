import styled from 'styled-components';
import { useContext } from 'react';
import axios from 'axios';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import UserContext from '../../context/UserContext';

export default function ImageTwo ({ userId, poll }) {
    const { reload, setReload } = useContext(UserContext);
    const { imageTwoUrl, imageTwoVotes, votedForImageOne, votedForImageTwo } = poll;
    const pollId = poll._id;

    const handleVote = async () => {
        if (votedForImageOne && votedForImageOne.includes(userId)) {
            return
        } else if (votedForImageTwo && votedForImageTwo.includes(userId)) {
            await removeVote();
        } else await addVote();

        setReload(!reload);
    };

    const addVote = async () => {
        let token = localStorage.getItem('auth-token');
        
        try {
            await axios.put('http://localhost:5000/polls/vote-two-add', 
                { pollId, imageTwoVotes }, 
                { headers: { 'x-auth-token': token } },
            )
        } catch (err) {
            console.log(err);
        }
    };

    const removeVote = async () => {
        let token = localStorage.getItem('auth-token');
        
        try {
            await axios.put('http://localhost:5000/polls/vote-two-remove', 
                { pollId, imageTwoVotes }, 
                { headers: { 'x-auth-token': token } },
            )
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <ImageWrapper>
            <StyledImage src={imageTwoUrl} alt='pollImage' />
            <Likes>
                {imageTwoVotes
                    ? <StyledFavoriteIcon onClick={handleVote} /> 
                    : <StyledFavoriteBorderIcon onClick={handleVote} />
                }
                {imageTwoVotes}
            </Likes>
        </ImageWrapper>
    )
}

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Likes = styled.div`
    display: flex;
    width: 50px;
    justify-content: space-around;
`;

const StyledImage = styled.img`
    height: 70px;
    width: 70px;
    margin: 1em 0.5em 1.5em 0.5em;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
    cursor: pointer;
`;

const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
    cursor: pointer;
`;