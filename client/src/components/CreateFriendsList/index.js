import styled from 'styled-components';
import { useState, useContext } from 'react';
import axios from 'axios';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';

import UserContext from '../../context/UserContext';
import User from './User';

export default function CreateFriendsList ({ openCreateFriendsList, setOpenCreateFriendsList }) {
    const { userData, reload, setReload } = useContext(UserContext);

    const followers = userData.user.followers;
    
    const initialFriendsList = {
        listName: '', 
        friends: [],
    };

    const [newFriendsList, setNewFriendsList] = useState(initialFriendsList);
    const [error, setError] = useState(null);

    const handleClose = () => {
        setOpenCreateFriendsList(false);
        setNewFriendsList(initialFriendsList);
        setError(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewFriendsList(prevList => {
            return { 
                ...prevList, 
                [name]: value, 
            }
        });
    };
  
    const handleSubmitFriendsList = async (e) => {
        e.preventDefault();

        await createFriendsList(newFriendsList);
    };

    const closeModal = () => {
        setOpenCreateFriendsList(false);
        setReload(!reload);
        setNewFriendsList(initialFriendsList);
    };
    
    const createFriendsList = async (newFriendsList) => {
        const token = localStorage.getItem('auth-token');
        
        try {
            await axios.post('http://localhost:5000/friendsList', 
                { newFriendsList },
                { headers: { 'x-auth-token': token } },
            )
            .then(setError(null))
            .then(closeModal)
        } catch (err) {
            setError(err.response.data.msg);
        }
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
                                id='listName'
                                label='Enter the list name'
                                name='listName'
                                autoFocus
                                onChange={handleChange}
                            />
                        </InputsWrapper>
                        <FriendsContainer>
                            <List>
                                {followers && followers
                                    .map((user) => (
                                        <User 
                                            key={user._id} 
                                            user={user} 
                                            newFriendsList={newFriendsList} 
                                            setNewFriendsList={setNewFriendsList}
                                        />
                                    ))
                                }
                            </List>
                        </FriendsContainer>
                    </PollData>
                    <TypographyContainer>
                        <Typography color='secondary'>
                            {error ? error : ''}
                        </Typography>
                    </TypographyContainer>
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
    height: 80vh;
    width: 70vh;
    background-color: white;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
`;

const PollData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 70vh;
`;

const FriendsContainer = styled.div`
    margin: auto;
    margin-top: 0;
    margin-bottom: 1em;
    width: 85%;
`;

const SyledButton = styled(Button)`
    align-self: flex-end;
    text-transform: uppercase;
    width: 120px;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1.5em;
`;

const InputsWrapper = styled.div`
    display: flex;
    width: 40vh;
    margin: auto;
    margin-top: 1em;
    margin-bottom: 1em;
`;

const TypographyContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10px;
`;