import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import LoginContainer from "./components/login/LoginContainer.tsx";
import LoggedIn from "./components/homepage/LoggedIn.tsx";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {decodeJwt} from "jose";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        const checkLocalStorage = () => {
            const token = localStorage.getItem('accessToken')
            if (
               token &&
                Math.floor((new Date().getTime() / 1000)) > decodeJwt(token).exp) {
                setIsLoggedIn(false)
                localStorage.clear()
            } else {
                setIsLoggedIn(false)
            }
        }
        window.addEventListener('user-auth', checkLocalStorage)

        checkLocalStorage()

        /*
        I know this doesn't make sense here to clean up the listener, because
        App never unmounts in our case, but left it there for the good practice
         */
        return () => {
            window.removeEventListener('user-auth', checkLocalStorage)
        }
    }, [])
    console.log('app')
    return <>

        <BrowserRouter>
            <Header/>
            <Routes>

                <Route path={'/'} element={isLoggedIn ? <LoggedIn/> : <LoginContainer/>}></Route>
                <Route path={'/contact'} element={<h1>Hey, this is Contact page!</h1>}></Route>
                <Route path={'/about'} element={<h1>Hey, this is About page!</h1>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>

}

export default App