import {Link} from 'react-router-dom'
import '../styles/header.css'
import logo from '../assets/images/logo-header.png'

function Header() {
    return (
        <header>
            <div>
                <Link to="/"><img src={logo} alt=""/></Link>
            </div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/operations">Operations</Link>
            </nav>
        </header>
    )
}
export default Header
