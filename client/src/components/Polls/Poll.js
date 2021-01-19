import styled from 'styled-components';
import Image from './Image';

export default function Poll () {
    return (
        <PollCard>
            <Header>Question</Header>
            <Subheader># of answers</Subheader>
            <Images>
                <Image />
                <Image />
            </Images>
        </PollCard>
    )
}

const PollCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: white;
    width: 45vh;
    height: 40vh;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 2px;
`;

const Header = styled.h4`
    align-self: center;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`;

const Subheader = styled.span`
    align-self: center;
    color: lightgray;
    font-size: 0.8em;
`;

const Images = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1em;
`;

