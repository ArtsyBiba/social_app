import { useContext } from 'react';
import UserContext from '../context/UserContext';
 
export default function Profile () {
    const { userData } = useContext(UserContext);
    
    return (
        userData.user ? (
            <div>Profile</div> 
        ) : (
            <div>Unauthorized access</div>
        )
    )
}