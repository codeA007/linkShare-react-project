import React, { useState } from 'react';
import '../styles/cardStyle.css';
import { BrowserRouter as Router, useHistory, Route, Switch } from 'react-router-dom';
import { useJwt } from "react-jwt";
import axios from 'axios';
import SmallLoader from './SmallLoader';

export default function Card({ title, link, id, upVotes, upVotesCheck }) {
    // const user
    // const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const { decodedToken, isExpired } = useJwt(token);
    const [upVotesNum, setUpVotesNum] = useState(upVotes.length);
    const [smallLoader, setSmallLoader] = useState(false);
    const [done, setDone] = useState('');
    // const userId = decodedToken.id;
    // console.log(decodedToken.id);
    // if (decodedToken != null) {
    //     setLoading(false)
    // }
    // console.log(decodedToken);
    const history = useHistory();
    const readMore = (id) => {
        history.push(`/readMore/${id}`);
    }
    const postControllers = (e) => {
        if (e.target.classList.contains('upVote')) {
            // e.target.style.borderRadius = '3px';
            // e.target.style.backgroundColor = ' #e5e5fe';
            // e.target.style.color = '#7b66ff';
            e.target.classList.add('active');
            e.target.classList.remove('upVote');
            setSmallLoader(true)
            likePost();
        }
        else if (e.target.classList.contains('active')) {
            likePost();
            // e.target.style.borderRadius = '0px';
            // e.target.style.backgroundColor = ' #fff';
            // e.target.style.color = 'black';
            e.target.classList.remove('active');
            e.target.classList.add('upVote');
        }
    }
    const likePost = async () => {
        const send = {
            postId: id,
            userId: decodedToken.id
        }
        const res = await axios.post('http://localhost:8080/upVote', send);
        setUpVotesNum(res.data.num)
        setDone(res.data.message);
        setSmallLoader(false)
    }
    return (
        <div className='cardContainer'>
            <div className="postHeader">
                <h3>{title}</h3>
                <p>27/11/2021</p>
            </div>
            <a href={link} target="_blank">{link}</a>
            <button className="readMore" onClick={() => readMore(id)}>ReadMore</button>
            <div className="cardFooter" onClick={postControllers}>
                <div className="upVoteContainer">
                    {(smallLoader) ? <SmallLoader /> : (upVotesCheck == 'liked' || done == 'done') ?
                        <i class="fas fa-heart active"></i> : <i class="fas fa-heart upVote" ></i>}
                    <p style={{
                        ' margin': '8px 0'
                    }}>{upVotesNum}</p>
                </div>
                <i class="fas fa-share-alt-square share"></i>
            </div>
        </div>
    )
}
