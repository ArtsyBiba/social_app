import { useState } from 'react';
import styled from 'styled-components';

import Suggestions from './Suggestions';
import Followers from './Followers';
import Followings from './Followings';

export default function FriendsDashboard () {
    const [ selectedHeader, setSelectedHeader ] = useState('suggestions');

    return (
        <Container>
            <HeaderWrapper>
                <Subheader onClick={() => setSelectedHeader('suggestions')}>Suggestions</Subheader>
                <Subheader onClick={() => setSelectedHeader('followers')}>Followers</Subheader>
                <Subheader onClick={() => setSelectedHeader('followings')}>Followings</Subheader>
            </HeaderWrapper>
            {selectedHeader === 'suggestions' && <Suggestions />}
            {selectedHeader === 'followers' && <Followers />}
            {selectedHeader === 'followings' && <Followings />}
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

