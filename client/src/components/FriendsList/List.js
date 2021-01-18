import styled from 'styled-components';

import SettingsIcon from '@material-ui/icons/Settings';
import { Divider } from '@material-ui/core';
import GenericList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

export default function List () {
    return (
        <ListCard>
            <Header>
                <Subheader>
                    <Name>List</Name>
                    <Info>4 online</Info>
                </Subheader>
                <StyledSettingsIcon color='disabled' />
            </Header>
            <Divider />
            <GenericList>
                {['Friend 1', 'Friend 2', 'Friend 3', 'Friend 4'].map((name) => (
                    <ListItem button key={name}>
                        <Avatar>AP</Avatar>
                        <FriendName>{name}</FriendName>
                    </ListItem>
                ))}
            </GenericList>
        </ListCard>
    )
}

const ListCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: white;
    width: 45vh;
    height: auto;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 2px;
`;

const Header = styled.div`
    display: flex;
    height: 10vh;
    justify-content: space-between;
    margin: 0.5em;
`;

const Subheader = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vh;
`;

const Name = styled.div`
    margin: 0.8em 0em 0em 1em;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 1em;
    color: lightgray;
    font-size: 0.8em;
`;

const StyledSettingsIcon = styled(SettingsIcon)`
    margin: 1em 1em 0 0;
`;

const FriendName = styled.div`
    display: flex;
    margin-left: 1em;
    font-size: 0.9em;
    font-weight: 600;
`;