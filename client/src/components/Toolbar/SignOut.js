import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function User () {
    return ( 
        <>
            <Typography component='p' style={{paddingRight: '15px'}}>
                Sign Out
            </Typography>
            <ExitToAppIcon />
        </>
    )
};