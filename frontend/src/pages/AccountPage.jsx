import React, { useState, useEffect } from 'react'
import BottomNavbar from '../components/BottomNavbar'
import TopNavbar from '../components/topNavbar';
import '../styles/accountPageStyles.css';
import axios from 'axios';
import Card from '../components/Card';
import Loading from '../components/Loading'

export default function AccountPage(props) {
    if (localStorage.getItem('token') == undefined) {
        props.history.push('/login');
    }
    const [details, setDetails] = useState('');
    useEffect(async () => {
        const send = {
            token: localStorage.getItem('token'),
        }
        const res = await axios.post('http://localhost:8080/user/userDetails', send);
        setDetails(res.data.user)
    }, [])
    return (
        <>
            <TopNavbar />
            {(details == '') ? <Loading /> :
                <div className='accountContainer'>
                    <div className="userDetails">
                        <h4>{details.username}</h4>
                        <div className="userAccountControls">
                            <div className="posts">
                                <p>{details.posts.length}</p>
                                <p>posts</p>
                            </div>
                            <button>Edit Profile</button>
                        </div>
                    </div>
                    {details.posts.map((post) => (<Card title={post.title} link={post.link} id={post._id} key={post._id} upVotes={post.upVotes} />))}
                </div>
            }
            <BottomNavbar />
        </>
    )
}
