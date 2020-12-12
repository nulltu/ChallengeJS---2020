import {Link} from 'react-router-dom'
import '../styles/header.css'
import {connect} from 'react-redux'
import Icon from '@material-ui/core/Icon';
import userActions from '../redux/actions/userActions'

function Header(props) {

    const logout = () => {
        props.logoutApp();
    }


    return (
        <header>
          <div className="container__header">
              <div className="logo__text">
                    <Icon>saved</Icon>
                    <Link to="/home">OP</Link>
              </div>
              <div className="container__hrefs">
                    <Link to="home">Home</Link>
                    <Link to="/operations">Operations</Link>
              </div>
              <div className="container__status__login">
                    {
                    !props.tokenLogged
                    ?<Link to="signin">Signin</Link>
                    :<><Link to="signin">{props.username}</Link>
                    <Link  onClick={logout}><Icon>power_settings_new</Icon></Link></>
                    }
              </div>
          </div>
        </header>
        
    )
}

const mapStateToProps = (state) => {
    return {
        username: state.users.username,
        tokenLogged: state.users.accessToken
    }
}

const mapDispatchToProps = {
    logoutApp: userActions.logoutApp
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
