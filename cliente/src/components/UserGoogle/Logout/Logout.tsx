import { signOut } from 'firebase/auth';
import { auth } from '../../../services/firebase.service';

const Logout = () => {
    const logout = () => {
        signOut(auth);
    }
    return (
        <button
            className='btn-logout btn'
            onClick={logout}><i className="fa-brands fa-google"></i> Log Out
        </button>
    )
}

export default Logout