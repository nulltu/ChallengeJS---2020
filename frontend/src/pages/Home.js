import '../styles/home.css'
import { useEffect } from 'react'
import cool from '../assets/images/cool.svg'
import noCool from '../assets/images/no-cool.svg'
import neutral from '../assets/images/neutral.svg'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'

function Home(props) {

    useEffect(() => {
        props.allOperations()
    }, [])

    //We shrink the array to a maximum of 10 elements.
    const filterFirstTen = props.operations.slice(0, 10) 

    let accumulatorNumberList = 1; //Index of table 
    let totalIngressAmount = 0; //Accumulator ingress
    let totalEgressAmount = 0; //Accumulator egress
    if (props.operations === null) {
        <p>Now Loading</p>
    } else {
        const totalIngress = props.operations.filter(operation => operation.type_operation === "ingress")
        for (let i = 0; i < totalIngress.length; i++) {
            totalIngressAmount += totalIngress[i].amount;
        }
        const totalEgress = props.operations.filter(operation => operation.type_operation === "egress")
        for (let i = 0; i < totalEgress.length; i++) {
            totalEgressAmount += totalEgress[i].amount;
        }
    }
    //Total Balance
    const totalBalance = totalIngressAmount - totalEgressAmount;
    return (

        //Render Home
        <div className="container__home">
            <div className="resulting">
                <div>
                    {
                        totalBalance > 0 ? <img src={cool} alt="" />
                            : totalBalance === 0 ? <img src={neutral} alt="" />
                                : <img src={noCool} alt="" />
                    }
                    <div className="value__balance">
                        <p className="total__balance">Total Balance:</p>
                        <span>${totalBalance}</span>
                    </div>
                </div>
                <div>
                    <p className="ingress">Total Ingress: ${totalIngressAmount}</p>
                    <p className="egress">Total Egress: ${totalEgressAmount}</p>
                </div>
            </div>
            <div className="last__ten">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Concept</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterFirstTen.map(operation => {
                            return (
                                <tr  key={operation.id}>
                                    <th scope="row">{accumulatorNumberList++}</th>
                                    <td className={operation.type_operation === 'ingress' ? "ingress" : "egress"}>
                                        {operation.concept}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

const mapStateToProps = state => {
    return {
        operations: state.operations.listOperations
    }
}

const mapDispatchToProps = {
    allOperations: operationsActions.allOperations
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
