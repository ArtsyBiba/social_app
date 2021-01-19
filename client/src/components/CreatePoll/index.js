import styled from 'styled-components';
import { useState } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function CreatePoll ({ openCreatePoll, setOpenCreatePoll }) {
    const initialUser = {
        email: '', 
        password: '', 
        error: null,
    };

    const friendLists = [
        {
          value: 'List 1',
        },
        {
          value: 'List 2',
        },
        {
          value: 'List 3',
        },
      ];

    const [user, setUser] = useState(initialUser);
    const [friendList, setFriendList] = useState('List 1');

    const handleClose = () => {
        setOpenCreatePoll(false);
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setUser(prevUser => {
        //     return { 
        //         ...prevUser, 
        //         [name]: value, 
        //     }
        // });
    };
    
    return (
        <StyledModal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={openCreatePoll}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openCreatePoll}>
                <CustomContainer>
                    <PollData>
                        <InputsWrapper>
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='question'
                                label='Enter your question'
                                name='question'
                                autoFocus
                                onChange={handleChange}
                            />
                            <TextField
                                id='standard-select-friendlist'
                                select
                                label='Select your friend list'
                                value={friendList}
                                onChange={handleChange}
                            >
                                {friendLists.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </InputsWrapper>
                        <ImagesWrapper>
                            Upload Images
                        </ImagesWrapper>
                    </PollData>
                    <SyledButton variant='outlined'>
                        Create Poll
                    </SyledButton>
                </CustomContainer>
            </Fade>
        </StyledModal>
    )
}

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
`;

const CustomContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 60vh;
    width: 100vh;
    background-color: white;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
`;

const PollData = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const SyledButton = styled(Button)`
    align-self: flex-end;
    text-transform: uppercase;
    width: 120px;
    margin: auto;
`;

const ImagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 40vh;
    margin: 1em;
    margin-top: 2em;
`;