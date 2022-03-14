import React, { useState } from 'react';
import axios from 'axios';
import TopNavbar from '../components/topNavbar';
import '../styles/postPageStyles.css';
import BottomNavbar from '../components/BottomNavbar';
// import axios from 'axios';

export default function PostPage(props) {
    if (localStorage.getItem('token') == undefined) {
        props.history.push('/login');
    }

    const [postData, setPostData] = useState(
        {
            title: '',
            link: '',
            desc: '',
            category: '',
            token: localStorage.getItem('token')
        }
    );
    const { title, link, desc, category } = postData;
    const onChange = (e) => { setPostData({ ...postData, [e.target.name]: e.target.value }) }
    function selector(e) {
        setPostData({ ...postData, category: e.target.value })
    }

    const post = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:8080/addPost', postData);
        if (res.data) {
            props.history.push('/')
        }
    }

    return (
        <div className='postPageContainer'>
            <TopNavbar />
            <h3>Post Link</h3>
            <form action="">
                <label htmlFor="">Post Title</label>
                <input type="text" name='title' value={title} onChange={onChange} />
                <label htmlFor="">Add Link</label>
                <input type="text" name='link' value={link} onChange={onChange} />
                <label htmlFor="">Description</label>
                <textarea name="" id="" cols="30" rows="10" name='desc' value={desc} onChange={onChange} ></textarea>
                <select name="" id="" onChange={selector}>
                    <option value="" >Select Category</option>
                    <option value="movies">Movies</option>
                    <option value="sports">Sports</option>
                    <option value="news">News</option>
                    <option value="comedy">Comedy</option>
                </select>
                <button className="post" onClick={post}>POST</button>
            </form>
            <BottomNavbar />
        </div>
    )
}
