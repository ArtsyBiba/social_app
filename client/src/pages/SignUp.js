import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import useStyles from '../themes/theme.signinup';
import Copyright from '../Copyright/index';
import UserContext from '../context/UserContext';

export default function SignUp() {
    const classes = useStyles();
    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const initialUser = {
        displayName: '',
        email: '', 
        password: '',
        passwordCheck: '',
        error: null,
    };

    const [user, setUser] = useState(initialUser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/users/register', user);
            const loginRes = await axios.post('http://localhost:5000/users/login', {
                email: user.email, 
                password: user.password,
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem('auth-token', loginRes.data.token);

            history.push('/profile');
        } catch (err) {
            err.response.data.msg && setUser({ ...user, error: err.response.data.msg });
        }
    };

    const isValid = user.name === '' || user.email === '' || user.password === '';

    return (
        <Grid container component='main' className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign Up
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => e.preventDefault()} noValidate>
                        
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='name'
                            label='Name'
                            name='displayName'
                            autoFocus
                            value={user.displayName}
                            onChange={handleChange}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                            onChange={handleChange}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                            onChange={handleChange}
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='passwordCheck'
                            label='Password Confirmation'
                            type='password'
                            id='passwordCheck'
                            autoComplete='passwordCheck'
                            onChange={handleChange}
                        />
                        <Typography className={classes.error} color='secondary'>
                            {user.error ? user.error : ''}
                        </Typography>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className={classes.submit}
                            onClick={handleSubmit}
                            disabled={isValid}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to='/' >
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <Footer>
                    <Copyright />
                </Footer>
            </Grid>
        </Grid>
    );
}

const Footer = styled.div`
    display: flex;
    justify-content: center;
    margin: auto;
`;