import AuthorizationCSS from './authorization.module.css'
import {FormEvent, useState} from "react";
import login from "../../apis/post/login.ts";

export function LoginContainer() {
    const [authInfo, setAuthInfo] = useState({
        email: '',
        password: ''
    })

    const clearForm = () => {
        setAuthInfo({email: '', password: ''})
    }

    const loginUser = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const request = await login(authInfo.email, authInfo.password)
        if (request.data.status === 403) {
            alert("Incorrect email or password!")
        }
        if (request.data.status === 200) {
            localStorage.setItem('accessToken', request.data.message)
            window.dispatchEvent(new Event("user-auth"))
        }
    }

    return <form className={AuthorizationCSS['login-form']}
                 onSubmit={(e) => loginUser(e)}
    >
        <h1>Login</h1>

        <div className={AuthorizationCSS['authorization-input-container']}>
            <label htmlFor={"email"}>Email</label>
            <input
                value={authInfo.email}
                autoComplete={'true'}
                onChange={(e) => setAuthInfo({...authInfo, email: e.target.value})}
                type={'email'} id={'email'} placeholder={'email@example.com'} maxLength={255} required/>
        </div>

        <div className={AuthorizationCSS['authorization-input-container']}>
            <label htmlFor={'password'}>Password</label>
            <input
                autoComplete={'true'}
                value={authInfo.password}
                onChange={(e) => setAuthInfo({...authInfo, password: e.target.value})}
                type={'password'} name={'password'} id={'password'} maxLength={255} required/>
        </div>

        <div className={AuthorizationCSS['cancel-submit']}>
            <button type={"button"}
                    name={'password'}
                    onClick={clearForm}
                    className={AuthorizationCSS['cancel-btn']}>Cancel
            </button>
            <button className={AuthorizationCSS['login-btn']}>Login</button>
        </div>
    </form>

}

export default LoginContainer;