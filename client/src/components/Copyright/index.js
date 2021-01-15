import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <StyledCopyright>
            <Typography variant='body2' color='textSecondary' align='center'>
                {'Made with ❤️ by '}
                <Link color='inherit' href='https://www.artsybiba.com/'>
                    Artsy Biba
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </StyledCopyright>
    );
}

const StyledCopyright = styled.div`
    display: flex;
    margin: auto;
    margin-top: 1.5em;
    margin-bottom: 1em;
`;

export default Copyright;