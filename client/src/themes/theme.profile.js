import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 170;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignContent: 'center',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default useStyles;