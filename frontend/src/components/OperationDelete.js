import { useEffect } from 'react'
import '../styles/operationModify.css'
import axios from 'axios'
import swal from 'sweetalert';
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'

function OperationDelete(props) {

    const idSearch = (props.match.params.id)
    
    useEffect(async () => {
        const response = await props.deleteOperation(idSearch)
        if (response.status === 200) {
            props.history.push('/Operations')
        }
        swal({ title: ' The operation has been successfully removed!' })
    }, [])

    return (
        <>
        </>
    )
}

const mapDispatchToProps = {
    deleteOperation: operationsActions.deleteOperation
}

export default connect(null, mapDispatchToProps)(OperationDelete)
