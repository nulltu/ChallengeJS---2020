import axios from 'axios'

const path = 'http://localhost:4800/'

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
            dispatch({
                type: "ALL_OPERATIONS",
                payload: dataOperations
            })
        }
    },

    operationById: (idOperation) =>{
        return async (dispatch, getState) => {
            const response = await axios.get(path + 'operations/' + idOperation)
            const operationData = response.data
            return operationData
        }
    },

    updateOperation: (idOperation, dataOperation) => {
        return async (dispatch, getState) => {
            const response = await axios.put(path + 'operations/' + idOperation, dataOperation)
            const updateData = response.data
             return updateData
        }
    },

    deleteOperation: (idOperation) => {
        return async (dispatch, getState) => {
            const response = await axios.delete(path + 'operations/' + idOperation)
            return response
        }
    }
}
export default operationsActions