import { useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

import UserContext from '../../context/UserContext';
import useStyles from '../../themes/theme.profile';

export default function Sidebar () {
    const { userData, reload, setReload } = useContext(UserContext);
    const classes = useStyles();
    const history = useHistory();

    const followings = userData.user.followings;

    const goToProfile = (user) => {
        setReload(!reload)
        
        history.push({
            pathname: `/${user._id}/profile`,
            state: { user }
        });
    };

    return (
        <Drawer
            className={classes.drawer}
            variant='permanent'
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {followings.length > 0 && 
                        followings.map((user) => (
                            <ListItem button key={user._id} onClick={() => goToProfile(user)}>
                                <Avatar src={user.avatar}/>
                                <Name>{user.displayName}</Name>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        </Drawer>
    )
}   

const Name = styled.div`
    display: flex;
    margin-left: 1em;
    font-size: 0.9em;
    font-weight: 600;
`;