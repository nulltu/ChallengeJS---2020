import { useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import {Link} from 'react-router-dom'
import { TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import '../styles/signup.css'

function Signup(props) {

    const [newUser, setNewUser] = useState({
        username: '', email: '', password: ''
    })


    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setNewUser({
            ...newUser,
            [textBox]: value
        })
    }


    const sendInfo = async e => {
        e.preventDefault()
        await props.createNewUser(newUser)
    }

    return (

        <div className="container__signup">
            <div>
                <TextField id="standard-basic" label="username"
                    type="text" name="username" onChange={readInput} />
            </div>
            <div>
                <TextField id="standard-basic" label="email"
                    type="email" placeholder="email" name="email" onChange={readInput} />
            </div>
            <div>
                <TextField id="standard-basic" label="password"
                    type="password" name="password" onChange={readInput} />
            </div>
            <div>
                <Button variant="outlined" onClick={sendInfo}>Login</Button>
                <span>Do you already have an account?</span>
                <Link to="/signin">Signin</Link>

            </div>
        </div>



    )
}



const mapDispatchToProps = {
    createNewUser: userActions.createNewUser
}

export default connect(null, mapDispatchToProps)(Signup)
