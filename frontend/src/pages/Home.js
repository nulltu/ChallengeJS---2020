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
    let sumIngress = 0;
    let sumEgress = 0;
    if (props.operations === null) {
        <p>Now Loading</p>
    } else {

        const totalIngress = props.operations.filter(operation => operation.type_operation === "ingress")
             sumIngress = totalIngress.reduce((sum, value) => (sum + parseFloat(value.amount)), 0)

        
        const totalEgress = props.operations.filter(operation => operation.type_operation === "egress")
        sumEgress = totalEgress.reduce((sum, value) => (sum + parseFloat(value.amount)), 0)
        
    }

    const totalBalance = sumIngress - sumEgress;

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
                        <span>${totalBalance.toFixed(2)}</span>
                    </div>
                </div>
                <div>
                    <p className="ingress">Total Ingress: ${sumIngress}</p>
                    <p className="egress">Total Egress: ${sumEgress}</p>
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
