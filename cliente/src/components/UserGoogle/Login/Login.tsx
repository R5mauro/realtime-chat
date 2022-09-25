import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../services/firebase.service';
import toast from "react-hot-toast";

const Login = () => {

    const googleLogin = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        toast.success('Logueado correctamente.')
    }
    return (
        <>
            <button className='btn btn-login' onClick={googleLogin}>
                <i className="fa-brands fa-google"></i> Sign in with Google
            </button>
        </>
    )
}

export default Login