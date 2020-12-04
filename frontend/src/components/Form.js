import axios from 'axios';
import {useState} from 'react'
import '../styles/form.css'

function Form() {

    const [newOperation, setNewOperation] = useState({
        concept:'', amount:'', date_operation:'', type_operation:""
    })

    const readInput = e => {
        const textBox = e.target.name
        const value = e.target.value
        setNewOperation({
            ...newOperation,
            [textBox]: value
        })
    }

    const sendInfo = async e => {
        e.preventDefault()
        await axios.post('http://localhost:4800/operation', newOperation)   
    }
   
    return (
        <form>
            <div>
                <label htmlFor="" >Concept</label>
                <input type="text" onChange={readInput} name="concept"/>
            </div>
            <div>
                <label htmlFor="">Amount</label>
                <input type="number"onChange={readInput} name="amount"/>
            </div>

            <div>
                <label htmlFor="">Fecha</label>
                <input type="date" onChange={readInput} name="date_operation"/>
            </div>

            <div>
                <label htmlFor="income-form">Ingress</label>
                <input type="radio" id="income-form" name="type_operation" value="ingress" onChange={readInput}/>
                
                <label htmlFor="egress-form">Egress</label>
                <input type="radio" id="egress-form" name="type_operation" value="egress" onChange={readInput}/>
            </div>
            <button onClick={sendInfo}>Sent</button>
        </form>
    )
}

export default Form