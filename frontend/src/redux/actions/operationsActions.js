import axios from 'axios'

const path = 'http://127.0.0.1:4800/'

const operationsActions = {

    allOperations: () => {
        return async (dispatch, getState) => {
            const response = await axios.get(path + 'operations')
            const dataOperations = response.data
            dispatch({
                type: "ALL_OPERATIONS",
                payload: dataOperations
            })
        }
    },

    addOperation : newOperation => {
        console.log(newOperation)
        return async (dispatch, getState) => {       
            const response = await axios.post(path + 'operation', newOperation)
            console.log(response.data)
        }
    }

}
export default operationsActions