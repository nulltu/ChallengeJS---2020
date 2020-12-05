import { Link } from 'react-router-dom'
import trash from '../assets/icons/delete.svg'
import edit from '../assets/icons/edit.svg'

function Operation(props) {
    return (
        <tr>
        <td>{props.operation.concept}</td>
        <td>${props.operation.amount}</td>
        <td>{props.operation.formatDate|| props.operation.date_operation}</td>
        <td class={props.operation.type_operation === 'ingress' ? "ingress" : "egress"}>
            {props.operation.type_operation}
        </td>
        <td className="container__icons__operation">
            <Link className="remove" to={`/operationDelete/${props.operation.id}`}><img src={trash}></img></Link>
            <Link className="update" to={`/operationModify/${props.operation.id}`}><img src={edit}></img></Link>
        </td>
    </tr>
    )
}

export default Operation
