import LoggedInCSS from './loggedin.module.css'
import profile from "../../apis/get/profile.ts";
import {useState} from "react";
import {useCalculateExpiration} from "../login/useCalculateExpiration.ts";

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

    const token = localStorage.getItem('accessToken')

    const expiresIn = useCalculateExpiration(token)

    const getProfileData = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('accessToken')
            setUserData(undefined)

            if (!loading) {
                const request = await profile(token)
                const user = request.data
                setLoading(false)
                if (user.status === 200) {
                    setUserData(user.data)
                    setError({
                        status: NaN,
                        message: ''
                    })
                }
                if (user.status === 401 || user.status === 404) {
                    /*
                    I have this 404 in case the user gets deleted while logged in,
                    so it will display that user couldn't be found
                    instead of some other error messages
                     */
                    setError({
                        status: user.status,
                        message: user.message
                    })
                    setUserData(undefined)
                }

            }
        } catch (err) {
            setError({
                status: 500,
                message: `${err.message}, please reload the page and try again!`
            })
        }
    }


    return <div className={LoggedInCSS['wrapper']}>
        <h2 align={'center'}>{error.status === 401 || error.status === 404 ? "Hey! You are not logged in anymore" : "Hey! You are logged in"}</h2>


        {error.status === 401 || error.status === 404 || error.status === 500 ? <h5 align={'center'} style={{color: 'darkred'}}>{error.message}</h5> :
            <div className={LoggedInCSS['user-info']}>
                <h6 align={'center'}>Click the button to get profile data</h6>
                <h5>Username: <span>{userData?.username}</span></h5>
                <h5>email: <span>{userData?.email}</span></h5>

                {expiresIn !== 'null' &&
                    <span style={{color: 'darkred'} }>{expiresIn === "Expired" ? expiresIn : `Your token will expire in ${expiresIn}`}</span>
                }
            </div>
        }

        <div className={LoggedInCSS['user-btns']}>

            <button onClick={() => getProfileData()}>Get Profile Data</button>
            <button onClick={() => {
                localStorage.clear()
                window.dispatchEvent(new Event("user-auth"))
            }}>Log out
            </button>

        </div>

    </div>

}


export default LoggedIn