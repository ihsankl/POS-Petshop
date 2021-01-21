import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { compose } from "redux";
import { connect } from 'react-redux';
import firebase from '../../Firebase'
import Alert from '../Utils/Alert'
import Loading from '../Utils/Loading';

const LoginForms = (props) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [PassVisible, setPassVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [Error, setError] = useState({
        state: false,
        msg: '',
        password: false,
        email: false
    })
    const [Values, setValues] = useState({
        email: '',
        password: ''
    })

    const focus = (ref) => {
        ref.current.focus()
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setValues({
            ...Values,
            [name]: value
        })
    }

    const handleSubmit = async () => {
        // e.preventDefault()
        console.log('Login Started')
        try {
            const res = await firebase.auth().signInWithEmailAndPassword(Values.email, Values.password);
            console.log(res)
        } catch (error) {
            console.log(error.code)
            switch (error.code) {
                case 'auth/user-not-found':
                    setError({
                        ...Error,
                        state: true,
                        msg: 'Maaf Username yang anda masukkan Salah !!!',
                        email: true
                    })
                    setTimeout(() => {
                        setError({
                            ...Error,
                            state: false,
                            msg: '',
                        })
                    }, 3000);
                    break;
                case 'auth/invalid-email':
                    setError({
                        ...Error,
                        state: true,
                        msg: 'Maaf Username yang anda masukkan Salah !!!',
                        email: true
                    })
                    setTimeout(() => {
                        setError({
                            ...Error,
                            state: false,
                            msg: '',
                        })
                    }, 3000);
                    break;
                case 'auth/wrong-password':
                    setError({
                        ...Error,
                        state: true,
                        msg: 'Maaf Kata Sandi yang anda masukkan Salah !!!',
                        password: true
                    })
                    setTimeout(() => {
                        setError({
                            ...Error,
                            state: false,
                            msg: '',
                        })
                    }, 3000);
                    break;
                case 'auth/too-many-requests':
                    setError({
                        ...Error,
                        state: true,
                        msg: 'Anda Terlalu Banyak Melakukan Login !!!',
                    })
                    setTimeout(() => {
                        setError({
                            ...Error,
                            state: false,
                            msg: '',
                        })
                    }, 3000);
                    break;
                default:
                    setError({
                        ...Error,
                        state: true,
                        msg: error.message,
                    })
                    setTimeout(() => {
                        setError({
                            ...Error,
                            state: false,
                            msg: '',
                        })
                    }, 3000);
                    break;
            }
        }
    }

    return (
        <div className="flex-1 flex items-center justify-center">
            {Error.state &&
                <Alert error={Error.state} msg={Error.msg} />
            }
            {isLoading &&
                <Loading loading={isLoading} />
            }
            <form className="flex flex-col items-center">
                <svg className="mb-10" width="338" height="62" viewBox="0 0 338 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="338" height="62" rx="30" fill="#8CFFFA" fillOpacity="0.38" />
                    <path d="M49.88 26.96C49.88 28.5867 49.5067 30.08 48.76 31.44C48.0133 32.7733 46.8667 33.8533 45.32 34.68C43.7733 35.5067 41.8533 35.92 39.56 35.92H35.32V46H28.48V17.92H39.56C41.8 17.92 43.6933 18.3067 45.24 19.08C46.7867 19.8533 47.9467 20.92 48.72 22.28C49.4933 23.64 49.88 25.2 49.88 26.96ZM39.04 30.48C40.3467 30.48 41.32 30.1733 41.96 29.56C42.6 28.9467 42.92 28.08 42.92 26.96C42.92 25.84 42.6 24.9733 41.96 24.36C41.32 23.7467 40.3467 23.44 39.04 23.44H35.32V30.48H39.04ZM66.7209 46.28C64.0809 46.28 61.6543 45.6667 59.4409 44.44C57.2543 43.2133 55.5076 41.5067 54.2009 39.32C52.9209 37.1067 52.2809 34.6267 52.2809 31.88C52.2809 29.1333 52.9209 26.6667 54.2009 24.48C55.5076 22.2933 57.2543 20.5867 59.4409 19.36C61.6543 18.1333 64.0809 17.52 66.7209 17.52C69.3609 17.52 71.7743 18.1333 73.9609 19.36C76.1743 20.5867 77.9076 22.2933 79.1609 24.48C80.4409 26.6667 81.0809 29.1333 81.0809 31.88C81.0809 34.6267 80.4409 37.1067 79.1609 39.32C77.8809 41.5067 76.1476 43.2133 73.9609 44.44C71.7743 45.6667 69.3609 46.28 66.7209 46.28ZM66.7209 40.04C68.9609 40.04 70.7476 39.2933 72.0809 37.8C73.4409 36.3067 74.1209 34.3333 74.1209 31.88C74.1209 29.4 73.4409 27.4267 72.0809 25.96C70.7476 24.4667 68.9609 23.72 66.7209 23.72C64.4543 23.72 62.6409 24.4533 61.2809 25.92C59.9476 27.3867 59.2809 29.3733 59.2809 31.88C59.2809 34.36 59.9476 36.3467 61.2809 37.84C62.6409 39.3067 64.4543 40.04 66.7209 40.04ZM91.7263 17.92V46H84.8863V17.92H91.7263ZM121.803 46H114.963L103.523 28.68V46H96.6831V17.92H103.523L114.963 35.32V17.92H121.803V46ZM146.961 17.92V23.4H139.521V46H132.681V23.4H125.241V17.92H146.961ZM230.828 46.28C228.774 46.28 226.934 45.9467 225.308 45.28C223.681 44.6133 222.374 43.6267 221.388 42.32C220.428 41.0133 219.921 39.44 219.868 37.6H227.148C227.254 38.64 227.614 39.44 228.228 40C228.841 40.5333 229.641 40.8 230.628 40.8C231.641 40.8 232.441 40.5733 233.028 40.12C233.614 39.64 233.908 38.9867 233.908 38.16C233.908 37.4667 233.668 36.8933 233.188 36.44C232.734 35.9867 232.161 35.6133 231.468 35.32C230.801 35.0267 229.841 34.6933 228.588 34.32C226.774 33.76 225.294 33.2 224.148 32.64C223.001 32.08 222.014 31.2533 221.188 30.16C220.361 29.0667 219.948 27.64 219.948 25.88C219.948 23.2667 220.894 21.2267 222.788 19.76C224.681 18.2667 227.148 17.52 230.188 17.52C233.281 17.52 235.774 18.2667 237.668 19.76C239.561 21.2267 240.574 23.28 240.708 25.92H233.308C233.254 25.0133 232.921 24.3067 232.308 23.8C231.694 23.2667 230.908 23 229.947 23C229.121 23 228.454 23.2267 227.948 23.68C227.441 24.1067 227.188 24.7333 227.188 25.56C227.188 26.4667 227.614 27.1733 228.467 27.68C229.321 28.1867 230.654 28.7333 232.468 29.32C234.281 29.9333 235.748 30.52 236.868 31.08C238.014 31.64 239.001 32.4533 239.828 33.52C240.654 34.5867 241.068 35.96 241.068 37.64C241.068 39.24 240.654 40.6933 239.828 42C239.028 43.3067 237.854 44.3467 236.308 45.12C234.761 45.8933 232.934 46.28 230.828 46.28ZM262.757 41.04H252.277L250.597 46H243.437L253.597 17.92H261.517L271.677 46H264.437L262.757 41.04ZM260.997 35.76L257.517 25.48L254.077 35.76H260.997ZM281.609 40.72H290.569V46H274.769V17.92H281.609V40.72ZM300.672 23.4V29.08H309.832V34.36H300.672V40.52H311.032V46H293.832V17.92H311.032V23.4H300.672Z" fill="#7579E7" />
                    <path d="M172.151 46.28C169.511 46.28 167.084 45.6667 164.871 44.44C162.684 43.2133 160.937 41.5067 159.631 39.32C158.351 37.1067 157.711 34.6267 157.711 31.88C157.711 29.1333 158.351 26.6667 159.631 24.48C160.937 22.2933 162.684 20.5867 164.871 19.36C167.084 18.1333 169.511 17.52 172.151 17.52C174.791 17.52 177.204 18.1333 179.391 19.36C181.604 20.5867 183.337 22.2933 184.591 24.48C185.871 26.6667 186.511 29.1333 186.511 31.88C186.511 34.6267 185.871 37.1067 184.591 39.32C183.311 41.5067 181.577 43.2133 179.391 44.44C177.204 45.6667 174.791 46.28 172.151 46.28ZM172.151 40.04C174.391 40.04 176.177 39.2933 177.511 37.8C178.871 36.3067 179.551 34.3333 179.551 31.88C179.551 29.4 178.871 27.4267 177.511 25.96C176.177 24.4667 174.391 23.72 172.151 23.72C169.884 23.72 168.071 24.4533 166.711 25.92C165.377 27.3867 164.711 29.3733 164.711 31.88C164.711 34.36 165.377 36.3467 166.711 37.84C168.071 39.3067 169.884 40.04 172.151 40.04ZM208.596 17.92V23.4H197.156V29.32H205.716V34.64H197.156V46H190.316V17.92H208.596Z" fill="#A3D8F4" />
                </svg>
                <div onClick={() => focus(emailRef)} className="items-center flex relative">
                    <svg className="absolute ml-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM12 14.5C13.46 14.5 16.93 15.09 18.36 16.83C19.38 15.49 20 13.82 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12C4 13.82 4.62 15.49 5.64 16.83C7.07 15.09 10.54 14.5 12 14.5ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM10.5 9.5C10.5 10.33 11.17 11 12 11C12.83 11 13.5 10.33 13.5 9.5C13.5 8.67 12.83 8 12 8C11.17 8 10.5 8.67 10.5 9.5Z" fill="#8B8686" />
                    </svg>
                    <input onChange={handleInputChange} value={Values.email} ref={emailRef} className={`focus:outline-none px-14 py-2 ${Error.email ? 'border-2 border-red-500' : 'border-2 border-blue-300'}`} type="text" name="email" placeholder="Email" />
                </div>
                <div onClick={() => focus(passwordRef)} className="items-center flex relative mt-4">
                    <svg className="absolute ml-4" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17 8.5H18C19.1 8.5 20 9.4 20 10.5V20.5C20 21.6 19.1 22.5 18 22.5H6C4.9 22.5 4 21.6 4 20.5V10.5C4 9.4 4.9 8.5 6 8.5H7V6.5C7 3.74 9.24 1.5 12 1.5C14.76 1.5 17 3.74 17 6.5V8.5ZM12 3.5C10.34 3.5 9 4.84 9 6.5V8.5H15V6.5C15 4.84 13.66 3.5 12 3.5ZM6 20.5V10.5H18V20.5H6ZM14 15.5C14 16.6 13.1 17.5 12 17.5C10.9 17.5 10 16.6 10 15.5C10 14.4 10.9 13.5 12 13.5C13.1 13.5 14 14.4 14 15.5Z" fill="#8B8686" />
                    </svg>
                    <input onChange={handleInputChange} value={Values.password} ref={passwordRef} className={`focus:outline-none px-14 py-2 ${Error.password ? 'border-2 border-red-500' : 'border-2 border-blue-300'}`} type={PassVisible ? 'text' : 'password'} name="password" placeholder="Password" />
                    {!PassVisible ?
                        <svg onClick={() => setPassVisible(!PassVisible)} className="absolute right-7" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.69 6.52499L2.01 3.84499L3.42 2.42499L21.15 20.165L19.74 21.575L16.32 18.155C14.98 18.685 13.52 18.975 12 18.975C7 18.975 2.73 15.865 1 11.475C1.77 9.50499 3.06 7.80499 4.69 6.52499ZM12 5.97499C15.79 5.97499 19.17 8.10499 20.82 11.475C20.23 12.695 19.4 13.745 18.41 14.595L19.82 16.005C21.21 14.775 22.31 13.235 23 11.475C21.27 7.08499 17 3.97499 12 3.97499C10.73 3.97499 9.51 4.17499 8.36 4.54499L10.01 6.19499C10.66 6.06499 11.32 5.97499 12 5.97499ZM10.93 7.11499L13 9.18499C13.57 9.43499 14.03 9.89499 14.28 10.465L16.35 12.535C16.43 12.195 16.49 11.835 16.49 11.465C16.5 8.98499 14.48 6.97499 12 6.97499C11.63 6.97499 11.28 7.02499 10.93 7.11499ZM9.51 11.345L12.12 13.955C12.08 13.965 12.04 13.975 12 13.975C10.62 13.975 9.5 12.855 9.5 11.475C9.5 11.45 9.5025 11.43 9.505 11.41L9.505 11.41L9.505 11.41C9.5075 11.39 9.51 11.37 9.51 11.345ZM7.86 9.69499L6.11 7.94499C4.9 8.86499 3.88 10.045 3.18 11.475C4.83 14.845 8.21 16.975 12 16.975C12.95 16.975 13.87 16.835 14.75 16.595L13.77 15.615C13.23 15.845 12.63 15.975 12 15.975C9.52 15.975 7.5 13.955 7.5 11.475C7.5 10.845 7.63 10.245 7.86 9.69499Z" fill="#8B8686" />
                        </svg> :
                        <svg onClick={() => setPassVisible(!PassVisible)} className="absolute right-7" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M1 12C2.73 7.61 7 4.5 12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12ZM20.82 12C19.17 8.63 15.79 6.5 12 6.5C8.21 6.5 4.83 8.63 3.18 12C4.83 15.37 8.21 17.5 12 17.5C15.79 17.5 19.17 15.37 20.82 12ZM12 9.5C13.38 9.5 14.5 10.62 14.5 12C14.5 13.38 13.38 14.5 12 14.5C10.62 14.5 9.5 13.38 9.5 12C9.5 10.62 10.62 9.5 12 9.5ZM7.5 12C7.5 9.52 9.52 7.5 12 7.5C14.48 7.5 16.5 9.52 16.5 12C16.5 14.48 14.48 16.5 12 16.5C9.52 16.5 7.5 14.48 7.5 12Z" fill="#8B8686" />
                        </svg>
                    }

                </div>
                <Link to="#" type="button" className="mt-4">Lupa kata sandi?</Link>
                <button onClick={handleSubmit} type="submit" className="shadow focus:outline-none mt-10 rounded-full text-white mt-10 py-3 px-14 bg-blue-400 active:bg-blue-700" type="button" value="Login" >Masuk</button>
            </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        connection: state.checkConnection,
    }
}


export default compose(connect(mapStateToProps))(LoginForms)