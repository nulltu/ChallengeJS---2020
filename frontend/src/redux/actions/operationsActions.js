import axios from 'axios'

const path = 'http://127.0.0.1:4800/'

const operationsActions = {
    addOperation : newOperation => {
        return async (dispatch, getState) => {       
            const response = await axios.post(path + 'operation', newOperation)
            dispatch({
                type: 'NEW_OPERATION',
                payload:response.data
            })
            return response
        }
    },

    allOperations: () => {
        return async (dispatch, getState) => {
            const response = await axios.get(path + 'operations')
            const dataOperations = response.data
            console.log(dataOperations)
            dispatch({
                type: "ALL_OPERATIONS",
                payload: dataOperations
            })
        }
    },

}
export default operationsActions