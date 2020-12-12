import axios from 'axios'
import swal from 'sweetalert';

const userActions = {

    createNewUser : newUser => {
        return async (dispatch, getState) => {   
            const  response = await axios.post('http://127.0.0.1:8082/api/auth/signup', newUser)    
            dispatch({
                type: 'LOGIN_APP',
                payload: {
                    username: response.data.username,
                    accessToken: response.data.accessToken
                }
            })
            return response
        }
    },

    loginApp : loginData => {
        return async (dispatch, getState) => {
            const response = await axios.post('http://127.0.0.1:8082/api/auth/signin', loginData)
            if(response.data.message === "Authentication successful"){
                dispatch({
                    type: 'LOGIN_APP',
                    payload: {
                        username: response.data.username,
                        accessToken: response.data.accessToken
                    }
                })
            }else swal({title: 'The username and / or password is not valid.'})
            return response
        }
    },

    forcedLogin : token => {
     
        return async(dispatch, getState) => {
            const response = await axios.get('http://127.0.0.1:8082/api/test/user', {
                headers : {
        
                    'x-access-token':  `${token}`
                }
            })
            if(response.status === 200){
                dispatch({
                    type: 'LOGIN_APP', 
                    payload: {
                        username: "rusbent",
                        accessToken:token
                    }
                })
                
            }
        }
        
    },

    logoutApp : () => {
        return (dispatch, getState) =>{
            dispatch({ 
                type: 'LOG_OUT',
               
            })
        }
    }
}

export default userActions