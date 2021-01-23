import styled from 'styled-components';

export default function Image ({ source }) {
    return (
        <ImageWrapper>
            <StyledImage src={source} />
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
    height: 70px;
    width: 70px;
    margin: 1em 0.5em 1.5em 0.5em;
`;