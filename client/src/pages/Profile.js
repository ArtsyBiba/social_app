import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
 
export default function Profile () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        
        localStorage.setItem('auth-token', '');
        history.push('/');
    };
    
    return (
        userData.user ? (
            <>
                <div>Profile</div>
                <button onClick={logout}>Log Out</button> 
            </>
        ) : (
            <div>Unauthorized access</div>
        )
    )
}