import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export default function SignIn() {
    const classes = useStyles();

    const initialUser = {
        id: null, 
        email: '', 
        password: '', 
        error: null, 
        auth: null
    };

    const [user, setUser] = useState(initialUser);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
     // to be populated
    };

    const isValid = user.email === '' || user.password === '';

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
                        Sign In
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => e.preventDefault()} noValidate>
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
                            helperText='For testing you can use: test@test.com'
                            FormHelperTextProps={{className: classes.helper}}
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
                            helperText='For testing you can use: password'
                            FormHelperTextProps={{className: classes.helper}}
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
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to='/signup'>
                                    {"Don't have an account? Sign Up"}
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