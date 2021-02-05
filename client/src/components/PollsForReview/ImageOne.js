import styled from 'styled-components';
import { useContext } from 'react';
import axios from 'axios';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import UserContext from '../../context/UserContext';

export default function ImageOne ({ userId, poll }) {
    const { reload, setReload } = useContext(UserContext);
    const { imageOneUrl, imageOneVotes, voted } = poll;
    const pollId = poll._id;

    const handleAddVote = async () => {
        if (voted && voted.includes(userId)) return
        await addVote();

        setReload(!reload);
    };

    const addVote = async () => {
        let token = localStorage.getItem('auth-token');
        
        try {
            await axios.put('http://localhost:5000/polls/vote-one', 
                { pollId, imageOneVotes }, 
                { headers: { 'x-auth-token': token } },
            )
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <ImageWrapper>
            <StyledImage src={imageOneUrl} alt='pollImage' />
            <Likes>
                {imageOneVotes
                    ? <StyledFavoriteIcon /> 
                    : <StyledFavoriteBorderIcon onClick={handleAddVote} />
                }
                {imageOneVotes}
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