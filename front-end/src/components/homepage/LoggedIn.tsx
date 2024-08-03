import LoggedInCSS from './loggedin.module.css'

export function LoggedIn() {
    const token = localStorage.getItem('accessToken')

    return <div className={LoggedInCSS['wrapper']}>
        <h2>Hey! You are logged in</h2>


        <div className={LoggedInCSS['user-btns']}>

            <button>Get Profile Data</button>
            <button onClick={() => {
                localStorage.clear()
                window.dispatchEvent(new Event("user-auth"))
            }}>Log out!</button>

        </div>

    </div>

}


export default LoggedIn