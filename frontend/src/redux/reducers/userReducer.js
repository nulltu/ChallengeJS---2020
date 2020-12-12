const initialState =  {
    username: '',
    accessToken:''
}


const userReducer = (state = initialState, action)=>{
    
    switch(action.type){

        case 'LOGIN_APP':
            localStorage.setItem('accessToken', action.payload.accessToken)
            
            return  {
                    ...state,
                    username: action.payload.username,
                    accessToken: action.payload.accessToken
                    
                }
        case 'LOG_OUT':
            localStorage.clear()
            return{
                ...state,
                ...initialState
            }
            default: 
            return state
    }
}

export default userReducer