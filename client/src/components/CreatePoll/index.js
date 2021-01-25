import styled from 'styled-components';
import { useState, useContext } from 'react';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import UserContext from '../../context/UserContext';

export default function CreatePoll ({ openCreatePoll, setOpenCreatePoll }) {
    const { userData } = useContext(UserContext);
    
    const initialPoll = {
        question: '', 
        friendlist: 'List 1',
        error: null,
        userId: userData.user.id,
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
    const [fileInputStateOne, setFileInputStateOne] = useState('');
    const [fileInputStateTwo, setFileInputStateTwo] = useState('');
    const [previewSourceOne, setPreviewSourceOne] = useState();
    const [previewSourceTwo, setPreviewSourceTwo] = useState();

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

    const handleFileInputChangeOne = (e) => {
        const file = e.target.files[0];
        previewFileOne(file);
    };

    const previewFileOne = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSourceOne(reader.result);
        };
    };

    const handleFileInputChangeTwo = (e) => {
        const file = e.target.files[0];
        previewFileTwo(file);
    };

    const previewFileTwo = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSourceTwo(reader.result);
        };
    };
    
    const handleSubmitPoll = (e) => {
        e.preventDefault();
        if(!newPoll) return;
        uploadImage(previewSourceOne, previewSourceTwo, newPoll);
        setNewPoll(initialPoll);
        setPreviewSourceOne('');
        setPreviewSourceTwo('');
        setOpenCreatePoll(false);
    };

    const uploadImage = async (previewSourceOne, previewSourceTwo, newPoll) => {
        try {
            await axios.post('http://localhost:5000/polls/upload', {
                imageOne: previewSourceOne, 
                imageTwo: previewSourceTwo,
                question: newPoll.question,
                friendlist: newPoll.friendlist,
                userId: newPoll.userId,
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
                            {previewSourceOne ? (
                                <ImageContainer>
                                    <Image src={previewSourceOne} alt='chosenOne' />
                                </ImageContainer>
                            ) : (
                                <Prompt>Select Image #1</Prompt>
                            )}
                            <StyledForm>
                                <StyledInput 
                                    type='file' 
                                    name='imageOne' 
                                    onChange={handleFileInputChangeOne}
                                    value={fileInputStateOne}
                                />
                            </StyledForm>
                            {previewSourceTwo ? (
                                <ImageContainer>
                                    <Image src={previewSourceTwo} alt='chosenTwo' />
                                </ImageContainer>
                            ) : (
                                <Prompt>Select Image #2</Prompt>
                            )}
                            <StyledForm>
                                <StyledInput 
                                    type='file' 
                                    name='imageTwo' 
                                    onChange={handleFileInputChangeTwo}
                                    value={fileInputStateTwo}
                                />
                            </StyledForm>
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

const ImagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 1em;
    margin-left: 1em;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 40vh;
    margin: 1em;
    margin-left: 2em;
`;

const StyledForm = styled.form`
    margin: auto;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`;

const StyledInput = styled.input`
    display: block;
    margin-bottom: 10px;
`;

const Prompt = styled.div`
    margin: auto;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    color: lightgray;
`;

const Image = styled.img`
    height: 70px;
    width: 70px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
`;