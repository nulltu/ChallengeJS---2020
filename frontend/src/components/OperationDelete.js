import { useEffect} from 'react'
import '../styles/operationModify.css'
import axios from 'axios'

function OperationDelete(props) {

    const idSearch = (props.match.params.id)

    useEffect(() => {
        goDelete()
        alert('La operación a sido eliminada')
    }, [])

    const goDelete = async () => {
        const response = await axios.delete(`http://localhost:4800/operations/ ${idSearch}`)
        if(response.status === 200) {
            props.history.push('/Operations')
        }
    }

    return (
        <>
        </>
    )
}

export default OperationDelete
