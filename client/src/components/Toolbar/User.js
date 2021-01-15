import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const User = ({ userData }) => { 
    let currentUser = '';
    
    if (userData.user) {
        currentUser = userData.user.displayName;
    };

    return ( 
        <>
            <Typography component='p' style={{paddingRight: '15px'}}>
                {currentUser}
            </Typography>
            <AccountBoxIcon />
        </>
    )
};

export default User;