import styled from 'styled-components';
import { useContext } from 'react';
import axios from 'axios';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import UserContext from '../../context/UserContext';
import { SocketContext } from '../../context/SocketContext';

export default function ImageReview ({ userId, pollId, imageUrl, imageVotes, votedForThisImage, votedForOtherImage, image }) {
    const { reload, setReload } = useContext(UserContext);
    const socketContext = useContext(SocketContext);

    const handleVote = async () => {
        if (votedForOtherImage && votedForOtherImage.includes(userId)) {
            return
        } else if (votedForThisImage && votedForThisImage.includes(userId)) {
            await removeVote();
        } else await addVote();

        setReload(!reload);
    };

    const addVote = async () => {
        let token = localStorage.getItem('auth-token');
        
        try {
            await axios.put('http://localhost:5000/polls/vote-add', 
                { pollId, imageVotes, image }, 
                { headers: { 'x-auth-token': token } },
            )
            socketContext.emit('user-add-vote', { pollId, imageVotes, image });
        } catch (err) {
            console.log(err);
        }
    };

    const removeVote = async () => {
        let token = localStorage.getItem('auth-token');
        
        try {
            await axios.put('http://localhost:5000/polls/vote-remove', 
                { pollId, imageVotes, image }, 
                { headers: { 'x-auth-token': token } },
            )
            socketContext.emit('user-remove-vote');
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <ImageWrapper>
            <StyledImage src={imageUrl} alt='pollImage' />
            <Likes>
                {votedForThisImage && votedForThisImage.includes(userId)
                    ? <StyledFavoriteIcon onClick={handleVote} /> 
                    : <StyledFavoriteBorderIcon onClick={handleVote} />
                }
                {imageVotes}
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