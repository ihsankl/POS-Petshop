import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { compose } from "redux";
import { connect } from 'react-redux';
import { checkConnection } from './Redux/action/checkConnection'
import firebase from './Firebase'
import Home from './Pages/Home';
import Barang from './Pages/Barang';


const App = (props) => {
  // const [MultiTab, setMultiTab] = useState(false)
  // const [Unsupported, setUnsupported] = useState(false)

  useEffect(() => {
    // enablePersistence()
    window.addEventListener('online', handleConnectionChange)
    window.addEventListener('offline', handleConnectionChange);
    handleConnectionChange()
    return () => {
      window.removeEventListener('online', handleConnectionChange)
      window.removeEventListener('offline', handleConnectionChange)
    }
  }, [])

  const handleConnectionChange = async () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
        () => {
          fetch('//google.com', {
            mode: 'no-cors',
          })
            .then(async () => {
              await props.dispatch(checkConnection('connected'))
              return clearInterval(webPing)
            }).catch(async () => await props.dispatch(checkConnection('disconnected')))
        }, 2000);
      return;
    }
    await props.dispatch(checkConnection('disconnected'))
  }

  return (
    <div>
      {props.connection.connectionStatus === 'disconnected' && <div>You're disconnected</div>}
      {MultiTab && <div>You opened a new tab. Please back at previous tab!</div>}
      {Unsupported && <div>Sorry, your browser is Unsupported.</div>}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/barang">
            <Barang />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    login: state.login,
    connection: state.checkConnection,
  }
}


export default compose(connect(mapStateToProps))(App)