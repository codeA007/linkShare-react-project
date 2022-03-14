import React, { useState } from 'react'
import BottomNavbar from '../components/BottomNavbar'
import TopNavbar from '../components/topNavbar';
import '../styles/searchPageStyles.css';
import axios from 'axios';
import Card from '../components/Card';

export default function SearchPage(props) {
    if (localStorage.getItem('token') == undefined) {
        props.history.push('/login');
    }
    const [value, setValue] = useState('');
    const [posts, setPosts] = useState([]);

    const search = async (e) => {
        const send = {
            term: value
        }
        const res = await axios.post('http://localhost:8080/searchPosts', send)
        setPosts(res.data.posts)
    }
    return (
        <div className='searchContainer'>
            <TopNavbar />
            <input type="text" placeholder='Search Title...' value={value} onChange={(e) => setValue(e.target.value)} />
            <button onClick={search}>Search</button>
            <div className="postsContainer">
                {(posts.length != 0) ?
                    posts.map(post =>
                        (<Card title={post.title} link={post.link} key={post._id} id={post._id} upVotes={post.upVotes} upVotesCheck={post.upVotecheck} />)) : ''}
            </div>
            <BottomNavbar />
        </div>
    )
}
