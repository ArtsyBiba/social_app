import { useContext, useState } from 'react';
import styled from 'styled-components';
import useStyles from '../themes/theme.profile';
import axios from 'axios';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';
import UserContext from '../context/UserContext';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
 
export default function Profile () {   
    const { userData, reload, setReload } = useContext(UserContext);
    const classes = useStyles();
    const [openCreatePoll, setOpenCreatePoll] = useState(false);
    const [previewSource, setPreviewSource] = useState();
    const fileInputState = '';

    const dataToUpdate = {
        displayName: '',
        avatar: '',
        error: null,
    };

    const [updatedUser, setUpdatedUser] = useState(dataToUpdate);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevUser => {
            return { 
                ...prevUser, 
                [name]: value, 
            }
        });
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
        };
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if(!updatedUser) return;

        const updatedUserForUpload = {
            displayName: updatedUser.displayName,
            avatar: previewSource,
            userId: userData.user.id,
        }

        await updateUser(updatedUserForUpload);
        setReload(!reload);

        setPreviewSource('');
        setUpdatedUser(dataToUpdate);
    };

    const updateUser = async (updatedUserForUpload) => {
        try {
            await axios.put('http://localhost:5000/users/update', {
                updatedUserForUpload
            })
        } catch (err) {
            err.response.data.msg && setUpdatedUser({ ...updatedUser, error: err.response.data.msg });
        }
    };

    return (
        <StyledPage>
            {userData.user ? (
                <>
                    <AppBar position='fixed' className={classes.appBar}>
                        <Navbar setOpenCreatePoll={setOpenCreatePoll} />
                    </AppBar>
                    <Sidebar /> 
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <UserInputForm>
                            <UserInputLine>
                                <StyledTextField 
                                    label='Name'
                                    id='name'
                                    name='displayName'
                                    type='text'
                                    onChange={handleChange}
                                    value={updatedUser.displayName}
                                />
                                {userData && <SavedData>{userData.user.displayName}</SavedData>}
                            </UserInputLine>
                            <ImageUploader>
                                {previewSource ? (
                                    <ImageContainer>
                                        <Image src={previewSource} alt='chosenOne' />
                                    </ImageContainer>
                                ) : (
                                    <Prompt>Select Your Avatar</Prompt>
                                )}
                                <StyledForm>
                                    <StyledInput 
                                        type='file' 
                                        name='imageOne' 
                                        onChange={handleFileInputChange}
                                        value={fileInputState}
                                    />
                                </StyledForm>
                            </ImageUploader>
                            <SyledButton variant='outlined' onClick={handleUpdateProfile}>
                                Update Profile
                            </SyledButton>
                        </UserInputForm>
                    </main>
                    <CreatePoll 
                        openCreatePoll={openCreatePoll}
                        setOpenCreatePoll={setOpenCreatePoll}
                    />
                </>
            ) : (
                <div>Not authorized</div>
            )}
        </StyledPage>
    )
}

const StyledPage = styled.div`
    display: flex;
    background-color: #fafafa;
    height: 100%;
`;

const StyledTextField = styled(TextField)`
    text-align: center;
    font-size: 0.5em;
    flex: 7;
`;

const UserInputForm = styled.form`
    display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: space-between;
    margin: auto;
	margin-top: 1.5em;
`;

const UserInputLine = styled.div`
    display: flex;
`;

const SavedData = styled.div`
    margin: auto;
	color: grey;
    padding-top: 10px;
    flex: 3;
    text-align: center;
`;

const Image = styled.img`
    height: 70px;
    width: 70px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 2em;
`;

const StyledForm = styled.div`
    margin: auto;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    width: 50%;
`;

const StyledInput = styled.input`
    margin-top: 1em;
`;

const Prompt = styled.div`
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    color: lightgray;
    margin-top: 1.5em;
    margin-bottom: 1em;
`;

const ImageUploader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1em;
`;

const SyledButton = styled(Button)`
    align-self: flex-end;
    text-transform: uppercase;
    width: 140px;
    margin: auto;
    margin-top: 1.5em;
    margin-bottom: 0;
`;
