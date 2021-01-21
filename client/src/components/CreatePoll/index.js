import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

export default function CreatePoll ({ openCreatePoll, setOpenCreatePoll }) {
    const initialPoll = {
        question: '', 
        friendlist: 'List 1',
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

    const [newPoll, setNewPoll] = useState(initialPoll);
    const [friendList, setFriendList] = useState('List 1');
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState();

    const handleClose = () => {
        setOpenCreatePoll(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPoll(prevPoll => {
            return { 
                ...prevPoll, 
                [name]: value, 
            }
        });
    };

    const handleSelect = (e) => {
        const { name, value } = e.target;
        setNewPoll(prevPoll => {
            return { 
                ...prevPoll, 
                [name]: value, 
            }
        });

        setFriendList(e.target.value);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    };
    
    const handleSubmitPoll = (e) => {
        e.preventDefault();
        if(!newPoll) return;
        uploadImage(previewSource, newPoll);
    };

    const uploadImage = async (base64EncodedImage, newPoll) => {
        try {
            await axios.post('http://localhost:5000/polls/upload', {
                image: base64EncodedImage, 
                question: newPoll.question,
                friendlist: newPoll.friendlist,
            });
        } catch (err) {
            err.response.data.msg && setNewPoll({ ...newPoll, error: err.response.data.msg });
        }
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
                                name='friendlist'
                                value={friendList}
                                onChange={handleSelect}
                            >
                                {friendLists.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </InputsWrapper>
                        <ImagesWrapper>
                            <StyledForm>
                                <StyledInput 
                                    type='file' 
                                    name='image' 
                                    onChange={handleFileInputChange}
                                    value={fileInputState}
                                />
                            </StyledForm>
                            {previewSource && (
                                <img src={previewSource} alt='chosen' style={{height: '150px'}} />
                            )}
                        </ImagesWrapper>
                    </PollData>
                    <Typography color='secondary'>
                        {newPoll.error ? newPoll.error : ''}
                    </Typography>
                    <SyledButton variant='outlined' onClick={handleSubmitPoll}>
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
`;

const StyledForm = styled.form`
    margin-bottom: 2rem;
`;

const StyledInput = styled.input`
    display: block;
    margin-bottom: 10px;
`;

