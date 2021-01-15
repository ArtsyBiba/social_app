import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const User = ({ userName }) => { 
    return ( 
        <>
            <Typography component='p' style={{paddingRight: '15px'}}>
                {userName}
            </Typography>
            <AccountBoxIcon />
        </>
    )
};

export default User;