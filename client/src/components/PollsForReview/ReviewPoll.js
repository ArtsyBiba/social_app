import styled from 'styled-components';

import Image from '../Polls/Image';

export default function ReviewPoll ({ poll }) {   
    return (
        <PollCard>
            <Header>
                <Question>{poll.question}</Question>
            </Header>
            <Subheader>Created by</Subheader>
            <Images>
                <Image source={poll.imageOneUrl} alt='imageOne' />
                <Image source={poll.imageTwoUrl} alt='imageTwo' />
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
    margin-right: 1em;
    cursor: pointer;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
`;

const Question = styled.div`
    align-self: center;
    text-align: center;
    font-weight: 600;
    width: 40vh;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 1em;
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

