import React, { useState, useContext, useRef } from 'react';

import '../styles/createAccountStyles.css';
import AuthContext from '../context/authContext';
import Error from '../components/Error';

export default function CreateAccount(props) {
    if (localStorage.getItem('token')) {
        props.history.push('/')
    }
    const createContainer = useRef(null);
    const [userDetails, setUserDetails] = useState(
        {
            username: '',
            email: '',
            password: '',
            interests: []
        }
    )
    const [active, setActive] = useState({ state: false, message: '' })
    const authContext = useContext(AuthContext);
    const { register } = authContext;
    let { username, email, password, interests } = userDetails;
    const next = (e) => {
        e.preventDefault();
        document.querySelectorAll('.formContainer')[0].style.display = 'none';
        document.querySelectorAll('.categoryContainer')[0].style.display = 'block';
    }
    const back = (e) => {
        document.querySelectorAll('.formContainer')[0].style.display = 'block';
        document.querySelectorAll('.categoryContainer')[0].style.display = 'none';
    }
    const onChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    }
    const categorySelector = (e) => {
        var arr2 = [];
        if (e.target.className === 'category') {
            if (interests.length >= 4) return
            e.target.classList.remove('category')
            e.target.classList.add('activeCategory');
            // arr2.push(e.target.innerHTML.toLowerCase());
            interests.push(e.target.innerHTML.toLowerCase())
            // setUserDetails({ ...userDetails, interests: arr2 });
        }
        else if (e.target.className === 'activeCategory') {
            e.target.classList.add('category')
            e.target.classList.remove('activeCategory');
            let value = e.target.innerHTML.toLowerCase()
            let index = interests.indexOf(value);
            let newArr = interests.filter(item => item != value)
            interests = newArr
            setUserDetails({ ...userDetails, interests: newArr });
            // interests.push(e.target.innerHTML.toLowerCase())
        }
    }
    const createAccount = async (e) => {
        const res = await register(userDetails);

        if (res.statusText == 'Unauthorized') {
            setActive({ state: true, message: res.data.message })
            setInterval(() => {
                setActive({ state: false, message: '' })
            }, 5000)
        }
        else if (res.status == 201) {
            props.history.push('/')
        }
    }
    return (
        <div className='createAccountContainer' ref={createContainer}>
            {(active.state) ? <Error message={active.message} /> : ''}
            <div className="container2">
                <div className="brand">
                    <h3>BrandName.com</h3>
                    <img src="./images/welcome.svg" alt="" />
                </div>
                <div className="formContainer">
                    <h3>Create Account</h3>
                    <form action="">
                        <div className="username">
                            <label htmlFor="">Username</label>
                            <input type="text" className="username" value={username} name='username' onChange={onChange} />
                        </div>
                        <div className="email">
                            <label htmlFor="">Email</label>
                            <input type="text" className="email" value={email} name='email' onChange={onChange} />
                        </div>
                        <div className="password">
                            <label htmlFor="">Password</label>
                            <input type="password" className="password" value={password} name='password' onChange={onChange} />
                        </div>
                        <div>
                            <button className="next" onClick={next} >Next</button>
                        </div>
                    </form>
                </div>
                <div className="categoryContainer">
                    <h3>Select Interest</h3>
                    <p style={{ textAlign: "center", fontFamily: 'Zen Kurenaido' }}>Select any 4 of user intersts</p>
                    <div className="categorySelector" onClick={categorySelector} >
                        <h4 className='category' >Movies</h4>
                        <h4 className='category' >Sports</h4>
                        <h4 className='category' >News</h4>
                        <h4 className='category' >Technology</h4>
                        <h4 className='category' >Comedy</h4>
                        <h4 className='category' >Stocks</h4>
                        <h4 className='category' >Crypto</h4>
                        <h4 className='category' >Fasion</h4>
                        <h4 className='category' >AutoMobiles</h4>
                        <h4 className='category' >History</h4>
                        <h4 className='category' >Mythology</h4>
                        <h4 className='category' >Movies</h4>
                    </div>
                    <div className="actionBtn">
                        <button className="back" onClick={back} >Back</button>
                        <button className="createAccount" onClick={createAccount} >Create Account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


