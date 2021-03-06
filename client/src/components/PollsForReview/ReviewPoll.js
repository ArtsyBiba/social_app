import styled from 'styled-components';

import ImageReview from './ImageReview';

export default function ReviewPoll ({ poll, userId }) {   
    return (
        <PollCard>
            <Header>
                <Question>{poll.question}</Question>
            </Header>
            <Subheader>Created by {poll.author}</Subheader>
            <Images>
                <ImageReview 
                    imageUrl={poll.imageOneUrl}
                    imageVotes={poll.imageOneVotes}
                    votedForThisImage={poll.votedForImageOne}
                    votedForOtherImage={poll.votedForImageTwo}
                    image='one'
                    pollId={poll._id}
                    userId={userId}
                />
                <ImageReview 
                    imageUrl={poll.imageTwoUrl}
                    imageVotes={poll.imageTwoVotes}
                    votedForThisImage={poll.votedForImageTwo}
                    votedForOtherImage={poll.votedForImageOne}
                    image='two'
                    pollId={poll._id}
                    userId={userId}
                />
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

