import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginForms from '../Components/Login/LoginForms';
import firebase from '../Firebase'
import bg from "../Assets/bg-login.png";

const Login = () => {
    const [user, loading, error] = useAuthState(firebase.auth());

    return (
        <>
            {loading && <span>Loading . . .</span>}
            {error && <span>Error</span>}
            {!user &&
                <div className="flex ">
                    <img src={bg} className="h-screen" />
                    <LoginForms error={error} />
                </div>
            }
            {/* {user && 
                <div>
                    {user.displayName}
                    {user.email}
                    {user.photoURL}
                    {user.uid}
                </div>
            } */}
        </>
    )
}

export default Login
