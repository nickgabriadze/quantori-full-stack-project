import HeaderCSS from './header.module.css'
import UserIcon from '../../images/icons/account-icon.svg'
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";

export function Header() {
    const [dropDown, setDropDown] = useState<boolean>(false)
    const currentPath = useLocation().pathname.slice(1,)


    return <>
            <header className={HeaderCSS['header-container']}>
                <div className={HeaderCSS['navigation-wrapper']}>
                    <div className={HeaderCSS['user-icon']}>

                        <img src={UserIcon as string} width={45} alt={'User icon'}/>
                    </div>

                    <nav className={HeaderCSS['nav-links']}
                    >
                        <Link to={'/'}
                              style={currentPath.trim().length === 0 ? {
                                  backgroundColor: 'var(--main-color)',
                                  color: 'white'
                              } : {}}

                        >Home</Link>
                        <Link to={'/contact'}
                              style={currentPath === 'contact' ? {
                                  backgroundColor: 'var(--main-color)',
                                  color: 'white'
                              } : {}}

                              href={'/contact'}>Contact</Link>
                        <Link to={'about'}
                              style={currentPath === 'about' ? {
                                  backgroundColor: 'var(--main-color)',
                                  color: 'white'
                              } : {}}

                        >About</Link>
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
                            <Link to={'/'}
                                  style={currentPath.trim().length === 0 ? {
                                      backgroundColor: 'var(--main-color)',
                                      color: 'white'
                                  } : {}}

                            >Home</Link>
                            <Link to={'/contact'}
                                  style={currentPath === 'contact' ? {
                                      backgroundColor: 'var(--main-color)',
                                      color: 'white'
                                  } : {}}

                            >Contact</Link>
                            <Link to={'/about'}
                                  style={currentPath === 'about' ? {
                                      backgroundColor: 'var(--main-color)',
                                      color: 'white'
                                  } : {}}

                            >About</Link>
                        </nav>
                    }

                </div>
            </header>
        </>


}

export default Header