import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'
import { useLogoutContext } from '../hooks/useLogoutContext'
import { useAuthContext } from '../hooks/useAuthContext';
export default function Navbar(){
    const {logout} = useLogoutContext();
    const {user} = useAuthContext();
    console.log(user)
    return(
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>My Money</li>
                {!user && (
                <>
                <li><Link to='/login'>Sign In</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                </>
                )}
                {user && (
               <>
               <li>Hello, {user.displayName}</li>
               <li>
                    <button className='btn' onClick={logout}>Logout</button>
                </li>
                </>
               )}
            </ul>
        </nav>
    )
}