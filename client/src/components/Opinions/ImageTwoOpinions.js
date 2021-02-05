import styled from 'styled-components';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export default function ImageTwo ({ poll }) {
    const { imageTwoUrl, imageTwoVotes } = poll;
    
    return (
        <ImageWrapper>
            <StyledImage src={imageTwoUrl} alt='pollImage' />
            <Likes>
                {imageTwoVotes
                    ? <FavoriteIcon /> 
                    : <FavoriteBorderIcon />
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