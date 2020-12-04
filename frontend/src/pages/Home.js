import '../styles/home.css'
import { useEffect, useState } from 'react'
import cool from '../assets/icons/cool.svg'
import noCool from '../assets/icons/no-cool.svg'

function Home() {

    const [operations, setOperations] = useState([])

    useEffect(() => {
        getData()
    }, [])


    const getData = async () => {
        const data = await fetch('http://localhost:4800/operations/lastTen')
        const operations = await data.json()
        setOperations(operations)
    }


    const totalIncome = operations.filter(operation => operation.type_operation === "ingress")
    let totalIncomeAmount = 0;
    for (let i = 0; i < totalIncome.length; i++) {
        totalIncomeAmount += totalIncome[i].amount;
    }

    const totalEgress = operations.filter(operation => operation.type_operation === "egress")
    let totalEgressAmount = 0;
    for (let i = 0; i < totalEgress.length; i++) {
        totalEgressAmount += totalEgress[i].amount;
    }

    let contador = 1;

    return (
        <div className="container__home">
            <div className="resulting">
                <div>
                    <img src={cool} alt="" />
                    <p>Total income: <span>${totalIncomeAmount}</span></p>
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

                        {operations.map(operation => {
                            return (
                                <tr>
                                    <th scope="row">{contador++}</th>
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

export default Home
