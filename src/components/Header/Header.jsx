import { NavLink } from 'react-router-dom'
import { useAuthContext } from '@/hooks/useAuthContext'
import logo from '@/assets/logo.png'
import './header.scss'

const Header = () => { 

    const { isAuth, logout } = useAuthContext()

    const linkIsActive = (isActive) => {
        return isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
    }
  return (
    <nav className='header'>
        <NavLink to="/" className='header__logo'>
    <img src={logo} alt="Logo de la aplicación" className='header__logo-image' />
</NavLink>
        <ul className='header__nav-list'>
            <li className='header__list-item'>
                <NavLink to="/" className={({isActive}) => linkIsActive(isActive)}>Home</NavLink>
            </li>
            <li className='header__list-item'>
                <NavLink to="/dashboard" className={({isActive}) => linkIsActive(isActive)}>Register</NavLink>
            </li>
            {isAuth
            ? (
                <>
                <li className='header__list-item'>
                    <NavLink to="/secret" className={({isActive}) => linkIsActive(isActive)}>Secret</NavLink>
                </li>
                <li className='header__list-item'>
                <NavLink to="/" className='header__item-link' onClick={logout}>Logout</NavLink>
            </li>
                </>
            )
            : (
                <>
            <li className='header__list-item'>
                <NavLink to="/login" className={({isActive}) => linkIsActive(isActive)}>Login</NavLink>
            </li>
            <li className='header__list-item'>
                <NavLink to="/signup" className={({isActive}) => linkIsActive(isActive)}>Signup</NavLink>
            </li>
                </>
            )
        }
        </ul>

    </nav>
  ) 
}

export default Header