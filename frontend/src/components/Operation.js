import { Link } from 'react-router-dom'

function Operation(props) {
    return (
        <tr>
        <th scope="row">{props.contador}</th>
        <td>{props.operation.concept}</td>
        <td>${props.operation.amount}</td>
        <td>{props.operation.formatDate}</td>
        <td class={props.operation.type_operation === 'ingress' ? "ingress" : "egress"}>
            {props.operation.type_operation}
        </td>
        <td>
            <Link to={`/operationDelete/${props.operation.id}`}>Remove</Link>
            <Link to={`/operationModify/${props.operation.id}`}>Modify</Link>
        </td>
    </tr>
    )
}

export default Operation
