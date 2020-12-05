const initialState =  {
    listOperations: []
}

const operationsReducer = (state = initialState, action)=>{
    switch(action.type){
        case 'ALL_OPERATIONS':
            return{
                ...state,
                listOperations : action.payload
            }
            default: 
            return state
    }
}

export default operationsReducer