import styled from 'styled-components';
import Pool from './Pool';

import Button from '@material-ui/core/Button';

export default function Pools () {
    return (
        <Container>
            <HeaderWrapper>
                <Header>Pools</Header>
                <SyledButton variant="outlined">Create Pool</SyledButton>
            </HeaderWrapper>
            <PoolsWrapper>
                <Pool />
            </PoolsWrapper>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

const HeaderWrapper = styled.div`
    display: flex;
    margin: 1em;
    justify-content: space-between;
`;

const Header = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
`;

const SyledButton = styled(Button)`
    align-self: flex-end;
    text-transform: uppercase;
    width: 120px;
`;

const PoolsWrapper = styled.div`
    display: flex;
    margin: 1em;
`;