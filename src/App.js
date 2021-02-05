// CORE
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { compose } from "redux";
import { connect } from 'react-redux';
import dayjs from 'dayjs'

// REDUX ACTIONS
import { checkConnection } from './Redux/action/checkConnection'
import { getBarang } from './Redux/action/barang'
import { useAuthState } from 'react-firebase-hooks/auth';
import { confirm } from './Redux/action/confirm';
import { getPenjualan } from './Redux/action/penjualan';

// FIREBASE
import firebase from './Firebase'

// COMPONENTS
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
import Kasir from './Pages/Kasir/';
import ConfirmDialog from './Components/ConfirmDialog/ConfirmDialog';
import Riwayat from './Pages/Riwayat/';
import DetailPenjualan from './Pages/Riwayat/Detail';
import Distributor from './Pages/Distributor/';
import UpdateDistributor from './Pages/Distributor/Update';
import AddDistributor from './Pages/Distributor/Add';

const refBarang = firebase.firestore().collection("barang")
const refPenjualan = firebase.firestore().collection("penjualan")

const App = (props) => {
  const [isMultiTab, setIsMultiTab] = useState(false)
  const [Unsupported, setUnsupported] = useState(false)

  useEffect(() => {
    enablePersistence()
    initializeBarang()
    window.addEventListener('online', handleConnectionChange)
    window.addEventListener('offline', handleConnectionChange);
    handleConnectionChange()
    return () => {
      window.removeEventListener('online', handleConnectionChange)
      window.removeEventListener('offline', handleConnectionChange)
    }
  }, [])

  const enablePersistence = () => {
    // COMMENT INI
    const db = firebase.firestore();
    if (window.location.hostname === "localhost") {
      db.useEmulator("localhost", 8080);
      firebase.auth().useEmulator('http://localhost:9099/');
    }

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

  const initializeBarang = () => {
    refBarang.orderBy('nama_barang').onSnapshot(async (snapShots) => {
      const data = []
      snapShots.forEach(docs => {
        let currentID = docs.id
        let appObj = { ...docs.data(), ['id']: currentID }
        data.push(appObj)
      })
      await props.dispatch(getBarang(data))
    })
  }

  const closeDialog = async () => {
    await props.dispatch(confirm({
      ...props.confirm,
      visible: false
    }))
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
      {Unsupported &&
        <Alert error={Unsupported} msg={'Maaf browser anda tidak mendukung aplikasi ini.'} />
      }
      <ConfirmDialog
        title={props.confirm.title}
        open={props.confirm.visible}
        onClose={closeDialog}
        onConfirm={props.confirm.onConfirm}
      >
        {props.confirm.msg}
      </ConfirmDialog>
      <BrowserRouter>
        {props.user.isSigned &&
          <MenuHeader />
        }
        <Switch>
          <Route exact path="/login">
            {!props.user.isSigned ? <Login /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/">
            {props.user.isSigned ? <Kasir /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/barang">
            {props.user.isSigned ? <Barang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/barang/add">
            {props.user.isSigned ? <AddBarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/barang/update">
            {props.user.isSigned ? <UpdateBarang /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/riwayat">
            {props.user.isSigned ? <Riwayat /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/riwayat/detail">
            {props.user.isSigned ? <DetailPenjualan /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/distributor">
            {props.user.isSigned ? <Distributor /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/distributor/add">
            {props.user.isSigned ? <AddDistributor /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/distributor/update">
            {props.user.isSigned ? <UpdateDistributor /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/kasir">
            {props.user.isSigned ? <Kasir /> : <Redirect to="/login" />}
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
    notification: state.notification,
    confirm: state.confirm,
    user: state.user
  }
}


export default compose(
  connect(mapStateToProps),
)(App)