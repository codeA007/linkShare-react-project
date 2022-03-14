import React, { useState, useEffect, useContext } from 'react';
import TopNavbar from '../components/topNavbar';
import '../styles/loginPageStyles.css';
import '../styles/createAccountStyles.css';
import axios from 'axios';
import AuthContext from '../context/authContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

export default function LoginPage(props) {
    if (localStorage.getItem('token')) {
        props.history.push('/');
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);
    const [state, setState] = useState('');
    const [validation, setValidation] = useState()
    const { loginUser } = authContext;
    const [message, setMessage] = useState('please fill all details')
    const submit = async (e) => {
        e.preventDefault();
        if (username == '' || password == '') {
            setValidation(true)
            setInterval(() => {
                setValidation(false)
            }, 3000)
        }
        else {
            const res = await loginUser({ username: username, password: password })
            console.log(res);
            if (res.status == 404) {
                setMessage('user not found');
                setValidation(true)
                setInterval(() => {
                    setValidation(false)
                }, 3000)
            }
        }
    }
    return (
        <div>
            {(state == 'loading') ? <Loading /> :
                <div className="container2">
                    {(validation) ?
                        <Error message={message} /> : ''}
                    <div className="brand">
                        <h3>BrandName.com</h3>
                        <img src="./images/welcome.svg" alt="" />
                    </div>
                    <div className="formContainer">
                        <h3>Create Account</h3>
                        <form action="">
                            <div className="username">
                                <label htmlFor="">Username</label>
                                <input type="text" className="username" name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="password">
                                <label htmlFor="">Password</label>
                                <input type="password" className="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <button className="next" onClick={submit} >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}
