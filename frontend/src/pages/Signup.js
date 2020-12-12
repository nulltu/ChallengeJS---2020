import {useState} from 'react'
import {connect} from 'react-redux'
import userActions from '../redux/actions/userActions'

function Signup(props) {

    const [newUser, setNewUser] = useState({
        username: '', email: '', password:''
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
        const response = await props.createNewUser(newUser)
    }
    
    return (
        <form>
            <input type="text" placeholder="username" name="username" onChange={readInput}/>
            <input type="email" placeholder="email" name="email"  onChange={readInput}/>
            <input type="password" placeholder="password" name="password" onChange={readInput}/>
            <button onClick={sendInfo}>create account</button>
        </form>
    )
}



const mapDispatchToProps = {
createNewUser : userActions.createNewUser
}

export default connect(null, mapDispatchToProps)(Signup)
