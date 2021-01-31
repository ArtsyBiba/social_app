import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import useStyles from '../themes/theme.profile';

import AppBar from '@material-ui/core/AppBar';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar/index';
import CreatePoll from '../components/CreatePoll/index';
import UserContext from '../context/UserContext';
import TextField from '@material-ui/core/TextField';
 
export default function Profile () {   
    const { userData, reload, setReload } = useContext(UserContext);
    const classes = useStyles();
    const [openCreatePoll, setOpenCreatePoll] = useState(false);

    const dataToUpdate = {
        displayName: '',
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

    console.log(updatedUser)

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
