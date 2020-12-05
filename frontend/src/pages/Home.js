import '../styles/home.css'
import { useEffect, useState } from 'react'
import cool from '../assets/icons/cool.svg'
import noCool from '../assets/icons/no-cool.svg'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'

function Home(props) {

    useEffect(() => {
        props.allOperations()
    }, [])

    const filterFirstTen = props.operations.slice(0, 10) //We shrink the array to a maximum of 10 elements.

    let accumulatorNumberList = 1; //Index of table 
    let totalIngress = 0; //Accumulator ingress
    let totalEgressAmount = 0; //Accumulator egress
    if (props.operations === null) {
        <p>Now Loading</p>
    } else {
        const totalIncome = props.operations.filter(operation => operation.type_operation === "ingress")
        for (let i = 0; i < totalIncome.length; i++) {
            totalIngress += totalIncome[i].amount;
        }
        const totalEgress = props.operations.filter(operation => operation.type_operation === "egress")
        for (let i = 0; i < totalEgress.length; i++) {
            totalEgressAmount += totalEgress[i].amount;
        }
    }

    return (
        <div className="container__home">
            <div className="resulting">
                <div>
                    <img src={cool} alt="" />
                    <p>Total income: <span>${totalIngress}</span></p>
                </div>
                <div>
                    <img src={noCool} alt="" />
                    <p>Total egress: <span>${totalEgressAmount}</span> </p>
                </div>
            </div>
            <div className="last__ten">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Concept</th>

                        </tr>
                    </thead>
                    <tbody>
                        {filterFirstTen.map(operation => {
                            return (
                                <tr>
                                    <th scope="row">{accumulatorNumberList++}</th>
                                    <td class={operation.type_operation === 'ingress' ? "ingress" : "egress"}>{operation.concept}</td>
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
