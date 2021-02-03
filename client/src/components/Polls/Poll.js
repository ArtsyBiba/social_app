import styled from 'styled-components';
import Image from './Image';
import axios from 'axios';
import { useContext } from 'react';

import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import UserContext from '../../context/UserContext';

export default function Poll ({ poll }) {
    const { userData, reload, setReload } = useContext(UserContext);
    
    const handleDeletePoll = async () => {
        try {
            await axios.delete('http://localhost:5000/polls/delete', {
                data: {
                    pollId: poll._id,
                    userId: userData.user.id,
                }
            })
            .then(setReload(!reload))
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
        <PollCard>
            <Header>
                <Question>{poll.question}</Question>
                <StyledDeleteOutlinedIcon onClick={handleDeletePoll} />
            </Header>
            <Subheader># of answers</Subheader>
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
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Question = styled.div`
    align-self: center;
    text-align: center;
    font-weight: 600;
    width: 40vh;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 2em;
`;

const StyledDeleteOutlinedIcon = styled(DeleteOutlinedIcon)`
    margin-right: 0.5em;

    &:hover {
        cursor: pointer;
        box-shadow: 0 5px 15px 0 rgba(0,0,0,0.25);

        transition: all 0.3s ease 0s;
    }
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

