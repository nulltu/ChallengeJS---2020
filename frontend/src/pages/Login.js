import { Link } from 'react-router-dom'
import { useState } from 'react'
import { connect } from 'react-redux'
import '../styles/login.css'
import userActions from '../redux/actions/userActions'
import Button from '@material-ui/core/Button';
import '../styles/login.css'
import { TextField } from "@material-ui/core";

function Login(props) {

    const inputStyle = { WebkitBoxShadow: "0 0 0 1000px white inset" };

    const [loginData, setLoginData] = useState({ username: '', password: '' })

    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setLoginData({
            ...loginData,
            [textBox]: value
        })
    }

    console.log(props)

    const sendInfo = async e => {
        e.preventDefault()
        const response = await props.loginApp(loginData)
        console.log(response.data)
        if (response.data.message === "Authentication successful") {
            setLoginData({
                username: '',
                password: ''
            })

            props.history.push('/operations')
        }
    }

    return (
        <div className="container__login">
            <div>
                <TextField id="standard-basic" label="username"
                    type="text" name="username" value={loginData.username} onChange={readInput} />
            </div>
            <div>
                <TextField id="standard-basic" label="password"
                    type="password" name="password" value={loginData.password} onChange={readInput} />
            </div>
            <div>
                <Button variant="outlined" onClick={sendInfo}>Login</Button>
                <span>You do not have an account?</span>
                <Link to="/signup">create account</Link>
            </div>

        </div>
    )
}

const mapDispatchToProps = {
    createNewUser: userActions.createNewUser,
    loginApp: userActions.loginApp
}


export default connect(null, mapDispatchToProps)(Login)
