import styled from 'styled-components';
import { useState, useContext } from 'react';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import UserContext from '../../context/UserContext';

export default function CreateFriendsList ({ openCreateFriendsList, setOpenCreateFriendsList }) {
    const { userData, reload, setReload } = useContext(UserContext);
    
    const initialFriendsList = {
        listName: '', 
        error: null,
    };

    const [newFriendsList, setNewFriendsList] = useState(initialFriendsList);

    const handleClose = () => {
        setOpenCreateFriendsList(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        newFriendsList(prevList => {
            return { 
                ...prevList, 
                [name]: value, 
            }
        });
    };
  
    const handleSubmitFriendsList = async (e) => {
        e.preventDefault();
        // if (!newPoll) return;

        // await uploadFriendsList(newPollForUpload);
        setReload(!reload);
        
        setOpenCreateFriendsList(false);
        setNewFriendsList(initialFriendsList);
    };
    
    const uploadFriendsList = async (newPollForUpload) => {
        // try {
        //     await axios.post('http://localhost:5000/polls/upload', {
        //         newPollForUpload
        //     })
        // } catch (err) {
        //     err.response.data.msg && setNewPoll({ ...newPoll, error: err.response.data.msg });
        // }
    };

    return (
        <StyledModal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={openCreateFriendsList}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openCreateFriendsList}>
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
                        </InputsWrapper>
                    </PollData>
                    <Typography color='secondary'>
                        {newFriendsList.error ? newFriendsList.error : ''}
                    </Typography>
                    <SyledButton variant='outlined' onClick={handleSubmitFriendsList}>
                        Create List
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
    justify-content: space-between;
    height: 60vh;
    width: 100vh;
    background-color: white;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
`;

const PollData = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 50vh;
`;

const SyledButton = styled(Button)`
    align-self: flex-end;
    text-transform: uppercase;
    width: 120px;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 40vh;
    margin: 1em;
    margin-left: 2em;
`;