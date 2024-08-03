import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import LoginContainer from "./components/login/LoginContainer.tsx";
import LoggedIn from "./components/homepage/LoggedIn.tsx";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const checkLocalStorage = () => {
            if (localStorage.getItem('accessToken')) {
                setIsLoggedIn(true)
            } else {
                setIsLoggedIn(false)
            }
        }
        window.addEventListener('user-auth', checkLocalStorage)

        return () => {
            window.removeEventListener('user-auth', checkLocalStorage)
        }
    }, [localStorage.getItem('accessToken')])

    return <>

        <BrowserRouter>
            <Header/>
            <Routes>

                <Route path={'/'} element={isLoggedIn ? <LoggedIn/> : <LoginContainer/>}></Route>
                <Route path={'/contact'} element={<h1>Hello</h1>}></Route>
                <Route path={'/about'} element={<h1>Hello</h1>}></Route>
            </Routes>
            <Footer/>
        </BrowserRouter>
    </>

}

export default App