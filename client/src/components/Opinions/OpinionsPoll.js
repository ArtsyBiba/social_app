import styled from 'styled-components';

import ImageOpinions from './ImageOpinions';

export default function OpinionsPoll ({ poll }) {   
    return (
        <PollCard>
            <Header>
                <Question>{poll.question}</Question>
            </Header>
            <Subheader>{poll.votedForImageOne.length + poll.votedForImageTwo.length} answers</Subheader>
            <Images>
                <ImageOpinions imageUrl={poll.imageOneUrl} imageVotes={poll.imageOneVotes} />
                <ImageOpinions imageUrl={poll.imageTwoUrl} imageVotes={poll.imageTwoVotes} />
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
    margin: auto;
    margin-top: 0;
    margin-bottom: 0;
`;

const Question = styled.div`
    align-self: center;
    text-align: center;
    font-weight: 600;
    width: 40vh;
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

