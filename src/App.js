import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { compose } from "redux";
import { connect } from 'react-redux';
import { checkConnection } from './Redux/action/checkConnection'
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from './Firebase'
import Home from './Pages/Home';
import Barang from './Pages/Barang/';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import MultiTab from './Components/Utils/MultiTab';
import Disconnected from './Components/Utils/Disconnected';
import MenuHeader from './Components/MenuHeader';
import Alert from './Components/Utils/Alert';
import AddBarang from './Pages/Barang/Add';
import UpdateBarang from './Pages/Barang/Update';

const App = (props) => {
  const [isMultiTab, setIsMultiTab] = useState(false)
  const [Unsupported, setUnsupported] = useState(false)
  const [user, loading, error] = useAuthState(firebase.auth());

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
    <>
      {props.connection.connectionStatus === 'disconnected' &&
        <Disconnected disconnected={props.connection.connectionStatus === 'disconnected'} />
      }
      {isMultiTab &&
        <MultiTab isMultiTab={isMultiTab} />
      }
      {props.notification.isError &&
        <Alert error={props.notification.isError} msg={props.notification.msg} />
      }
      {props.notification.isSuccess &&
        <Alert msg={props.notification.msg} success={props.notification.isSuccess} />
      }
      {Unsupported && <div>Sorry, your browser is Unsupported.</div>}
      <BrowserRouter>
        {user &&
          <MenuHeader />
        }
        <Switch>
          <Route exact path="/login">
            {!user ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {user ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/barang">
            {user ? <Barang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/barang/add">
            {user ? <AddBarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/barang/update">
            {user ? <UpdateBarang /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  )
}

const mapStateToProps = state => {
  return {
    connection: state.checkConnection,
    notification: state.notification
  }
}


export default compose(
  connect(mapStateToProps),
)(App)