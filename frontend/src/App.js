import Home from '../src/pages/Home'
import Operations from '../src/pages/Operations'
import Header from '../src/components/Header'
import Operation from '../src/components/Operation'
import OperationModify from '../src/components/OperationModify'
import OperationDelete from '../src/components/OperationDelete'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/operations' component={Operations} />
          <Route path='/operation' component={Operation} />
          <Route path='/operationModify/:id' component={OperationModify} />
          <Route path='/operationDelete/:id' component={OperationDelete} />
          <Route path='/operation' component={Operation} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
