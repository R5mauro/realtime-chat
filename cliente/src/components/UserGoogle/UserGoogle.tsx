import { auth } from "../../services/firebase.service"
import Login from "./Login/Login"
import Logout from "./Logout/Logout"
import { useAuthState } from "react-firebase-hooks/auth";
import UserProfile from "./UserProfile/UserProfile";


const UserGoogle = () => {
    const [user] = useAuthState(auth)

    return (
        <div className="user">
            {user && <UserProfile user={user} />}
            {!user ? <Login />
                : <Logout />}
        </div>
    )
}

export default UserGoogle