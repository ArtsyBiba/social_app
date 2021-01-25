import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import SearchArea from './SearchArea';

export default function FriendsDashboard () {
    const { userData } = useContext(UserContext);

    return (
        <Container>
            <HeaderWrapper>
                <Subheader>Suggestions</Subheader>
                <Subheader>Followers</Subheader>
                <Subheader>Followings</Subheader>
            </HeaderWrapper>
            <Dashboard>
                <SearchArea />
            </Dashboard>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 90vh;
    width: 75%;
    margin: auto;
    margin-top: 0.5em;
`;

const HeaderWrapper = styled.div`
    display: flex;
    height: 8vh;
    align-content: center;
    justify-content: space-around;
`; 

const Subheader = styled.div`
    display: flex;
    font-weight: 600;
    font-size: 1em;
    justify-content: center;
    align-items: center;
    line-height: 8vh;
    text-transform: uppercase;
    width: 33%;
    cursor: pointer;

    &:hover {
        border-bottom: 4px solid rgba(245,60,47,0.85);
        transition: all 0.3s ease 0s;
    }
`; 

const Dashboard = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: white;
    box-shadow: 0 5px 15px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
`;