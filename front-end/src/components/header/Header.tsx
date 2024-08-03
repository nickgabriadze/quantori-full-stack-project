import HeaderCSS from './header.module.css'
import UserIcon from '../../images/icons/account-icon.svg'

export function Header(){


    return <header className={HeaderCSS['header-container']}>
        <div className={HeaderCSS['navigation-wrapper']}>
            <div className={HeaderCSS['user-icon']}>
                <img src={UserIcon as string} width={45} alt={'User icon'}/>
            </div>

            <nav className={HeaderCSS['nav-links']}>
                <a>Home</a>
                <a>Contact</a>
                <a>About</a>
            </nav>
        </div>

        <button className={HeaderCSS['login-btn']}>Login</button>
    </header>


}

export default Header