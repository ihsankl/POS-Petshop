import React, { useEffect } from 'react'
import { compose } from "redux";
import { connect } from 'react-redux';
import firebase from '../Firebase'

const Home = (props) => {
    useEffect(() => {
        return () => {

        }
    }, [])

    return (
        <div>
            <span>this is home</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        login: state.login,
        connection: state.checkConnection,
    }
}


export default compose(connect(mapStateToProps))(Home)