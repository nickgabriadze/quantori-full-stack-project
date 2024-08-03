import HeaderCSS from './header.module.css'
import UserIcon from '../../images/icons/account-icon.svg'
import {useState} from "react";

export function Header() {
    const [dropDown, setDropDown] = useState<boolean>(false)
    const currentPath = window.location.pathname.slice(1,)




    return <header className={HeaderCSS['header-container']}>
        <div className={HeaderCSS['navigation-wrapper']}>
            <div className={HeaderCSS['user-icon']}>
                <img src={UserIcon as string} width={45} alt={'User icon'}/>
            </div>

            <nav className={HeaderCSS['nav-links']}
            >
                <a
                    style={currentPath.trim().length === 0 ? {backgroundColor: 'var(--main-color)', color: 'white'} : {}}

                    href={'/'}>Home</a>
                <a
                    style={currentPath === 'contact' ? {backgroundColor: 'var(--main-color)', color: 'white'} : {}}

                    href={'/contact'}>Contact</a>
                <a
                    style={currentPath === 'about' ? {backgroundColor: 'var(--main-color)', color: 'white'} : {}}

                    href={'/about'}>About</a>
            </nav>
        </div>

        <button className={HeaderCSS['login-btn-header']}>Login</button>
        <div

            className={HeaderCSS['dropdown-menu']}>


            <button
                onClick={() => setDropDown(prev => !prev)}
                className={HeaderCSS['dots']}>
                <span></span>
                <span></span>
                <span></span>
            </button>

            {dropDown &&
                <nav
                    className={HeaderCSS['nav-dropdown']}>
                    <a
                        style={currentPath.trim().length === 0 ? {backgroundColor: 'var(--main-color)', color: 'white'} : {}}

                        href={'/'}>Home</a>
                    <a
                        style={currentPath === 'contact' ? {backgroundColor: 'var(--main-color)', color: 'white'} : {}}

                        href={'/contact'}>Contact</a>
                    <a
                        style={currentPath === 'about' ? {backgroundColor: 'var(--main-color)', color: 'white'} : {}}

                        href={'/about'}>About</a>
                </nav>
            }

        </div>
    </header>


}

export default Header