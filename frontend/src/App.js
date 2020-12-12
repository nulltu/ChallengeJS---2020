import Home from '../src/pages/Home'
import Operations from '../src/pages/Operations'
import userActions from '../src/redux/actions/userActions'
import Header from '../src/components/Header'
import Operation from '../src/components/Operation'
import OperationModify from '../src/components/OperationModify'
import OperationDelete from '../src/components/OperationDelete'
import Login from '../src/pages/Login'
import Signup from '../src/pages/Signup'
import { connect } from 'react-redux'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import React from 'react';

class App extends React.Component {

  render() {

    if (this.props.tokenLogged) {

      var routes = (
        <Switch>
          <Route path="/home" component={Home} />
          <Route path='/operations' component={Operations} />
          <Route path='/operation' component={Operation} />
          <Route path='/operationModify/:id' component={OperationModify} />
          <Route path='/operationDelete/:id' component={OperationDelete} />
          <Route path='/operation' component={Operation} />
          <Redirect to='/home' />
        </Switch>
      )
    }
    else if (localStorage.getItem('accessToken')) {
      this.props.forcedLogin(localStorage.getItem('accessToken'));
      console.log("hola")
    } else {
      var routes = (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <BrowserRouter>
        <Header />
        {routes}
      </BrowserRouter>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    tokenLogged: state.users.accessToken
  }
}

const mapDispatchToProps = {

  forcedLogin: userActions.forcedLogin
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
