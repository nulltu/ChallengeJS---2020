import '../styles/home.css'
import { useEffect } from 'react'
import cool from '../assets/images/cool.svg'
import noCool from '../assets/images/no-cool.svg'
import neutral from '../assets/images/neutral.svg'
import { connect } from 'react-redux'
import operationsActions from '../redux/actions/operationsActions'
import {Link} from 'react-router-dom'

import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Home(props) {

    const useStyles = makeStyles({
        root: {
          maxWidth: 100,
        },
        media: {
          height: '30vh',
          backgroundSize: '30%'
        },
      });


      
        const classes = useStyles();

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
         
            <div className="container__results">
            <Card >
      <CardActionArea>
        <CardMedia
           className={classes.media}
           image={cool}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Total Balance: ${totalBalance}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {
          totalBalance > 0 
                        ? <span>Great! You have to save ...</span> 
                        : totalBalance === 0 ? <span>You have everything under control</span> 
                        : <span>Your expenses are excessive</span>
             }
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to="/operations">
        Register a new operation
        </Link>
      </CardActions>
    </Card>
            </div>

            <div>
           <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    #
                                </TableCell>
                                <TableCell>
                                    Last 10 operations
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterFirstTen.map((operation) => (
                                <TableRow key={operation.id}>
                                    <TableCell component="th" scope="row">
                                        {accumulatorNumberList++}
                                    </TableCell>
                                    <TableCell component="th" scope="row"
                                     className={operation.type_operation === 'ingress' ? "ingress" : "egress"}>
                                        {operation.concept}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
