import { FormEvent, useContext, useState } from "react"
import { UserContext } from "../../../context/TemporalUserContext"
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useUsuariosConectados } from "../../../hooks/useUsuariosConectados";
import { temporalUserValidate } from "../../../utilities/temporalUserValidate.utility";

const LoginTemporal = () => {
    const [name, setName] = useState("")
    const { dispatch } = useContext(UserContext)
    const { usuarios } = useUsuariosConectados();


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        temporalUserValidate({ usuarios, name, dispatch })
        setName("");
    }



    return (
        <div className="login-temporal">
            <Link to="/" className="btn"><i className="fa-sharp fa-solid fa-arrow-left"></i> Chat Principal</Link>
            <form className='login-temporal glassmorphism' onSubmit={handleSubmit}>
                <input type="text"
                    autoComplete="off"
                    id='user-name'
                    value={name}
                    placeholder="Your Name"
                    onChange={e => setName(e.target.value)} />
                <button type='submit' className='btn'>Login</button>
            </form>
            <Toaster position="top-right"
                reverseOrder={false} />
        </div>
    )
}

export default LoginTemporal