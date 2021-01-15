import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
 
export default function Profile () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (!userData.user) {
            history.push('/');
        }
    }, [userData, history]);

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        
        localStorage.setItem('auth-token', '');
        history.push('/');
    };
    
    return (
        <>
            <div>Profile</div>
            <button onClick={logout}>Log Out</button> 
        </>
    )
}