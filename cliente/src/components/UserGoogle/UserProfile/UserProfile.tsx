// import {User as FirebaseUser} from "firebase/auth"
import { UserInfo } from "firebase/auth"
import userProfile from "../../../assets/user.png"

interface Props {
    user: UserInfo
}
const UserProfile = ({ user }: Props) => {
    const displayName: string = user.displayName ?? "user";
    const photoURL: string = user.photoURL ?? userProfile;

    return (
        <div className="user-profile glassmorphism">
            <picture>
                <source
                    src={photoURL}
                    srcSet={photoURL} />
                <img
                    src={photoURL}
                    srcSet={photoURL}
                    alt={displayName} />
            </picture>
            <p>{displayName}</p>
        </div>
    )
}

export default UserProfile