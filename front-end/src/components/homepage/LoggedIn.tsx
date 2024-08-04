import LoggedInCSS from './loggedin.module.css'
import profile from "../../apis/get/profile.ts";
import {useState} from "react";

export function LoggedIn() {
    const [loading, setLoading] = useState<boolean>(false)
    const [userData, setUserData] = useState<{
        email: string,
        username: string
    } | undefined>(undefined)
    const [error, setError] = useState<{
        status: number,
        message: string
    }>({status: NaN, message: ''})

    const getProfileData = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('accessToken')
            setUserData(undefined)

            if (!loading) {
                const request = await profile(token)
                const user = request.data
                setLoading(false)
                if (user.status === 200){
                    setUserData(user.data)
                    setError({
                        status: NaN,
                        message: ''
                    })
                }
                if(user.status === 401 || user.status === 404){
                    setError({
                        status: user.status,
                        message: user.message
                    })
                    setUserData(undefined)
                }

            }
        } catch (err) {
            }
    }




    return <div className={LoggedInCSS['wrapper']}>
        <h2>Hey! You are logged in</h2>


        {error.status === 401 || error.status === 404 ? <h5>{error.message}</h5> : <div className={LoggedInCSS['user-info']}>
            <h5>Username: <span>{userData?.username}</span></h5>
            <h5>email: <span>{userData?.email}</span></h5>
        </div>}

        <div className={LoggedInCSS['user-btns']}>

            <button onClick={() => getProfileData()}>Get Profile Data</button>
            <button onClick={() => {
                localStorage.clear()
                window.dispatchEvent(new Event("user-auth"))
            }}>Log out!
            </button>

        </div>

    </div>

}


export default LoggedIn