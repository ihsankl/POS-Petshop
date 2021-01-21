import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { compose } from "redux";
import { connect } from 'react-redux';
import { checkConnection } from './Redux/action/checkConnection'
import firebase from './Firebase'
import Home from './Pages/Home';
import Barang from './Pages/Barang';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import MultiTab from './Components/Utils/MultiTab';
import Disconnected from './Components/Utils/Disconnected';


const App = (props) => {
  const [isMultiTab, setIsMultiTab] = useState(false)
  const [Unsupported, setUnsupported] = useState(false)


  useEffect(() => {
    enablePersistence()
    window.addEventListener('online', handleConnectionChange)
    window.addEventListener('offline', handleConnectionChange);
    handleConnectionChange()
    return () => {
      window.removeEventListener('online', handleConnectionChange)
      window.removeEventListener('offline', handleConnectionChange)
    }
  }, [])

  const enablePersistence = () => {
    firebase.firestore().enablePersistence()
      .catch(function (err) {
        console.log(err)
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          setIsMultiTab(true)
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          setUnsupported(true)
        }
      });
  }

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
      {props.connection.connectionStatus === 'disconnected' &&
        <Disconnected disconnected={props.connection.connectionStatus === 'disconnected'} />
      }
      {isMultiTab &&
        <MultiTab isMultiTab={isMultiTab} />
      }
      {Unsupported && <div>Sorry, your browser is Unsupported.</div>}
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/barang">
            <Barang />
          </Route>
          <Route path="*">
            <NotFound />
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