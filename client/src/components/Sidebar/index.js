import useStyles from '../../themes/theme.profile';
import styled from 'styled-components';

import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

export default function Sidebar () {
    const classes = useStyles();

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
                    {['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4'].map((name) => (
                        <ListItem button key={name}>
                            <Avatar>AP</Avatar>
                            <Name>{name}</Name>
                        </ListItem>
                    ))}
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