import styled from 'styled-components';

export default function Image () {
    return (
        <ImageWrapper>
            <StyledImage />
            <div>❤️ 10</div>
        </ImageWrapper>
    )
}

const ImageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledImage = styled.img`
    height: 20vh;
    width: 15vh;
    margin-left: 0.2em;
    margin-right: 0.2em;
    margin-bottom: 0.5em;
`;