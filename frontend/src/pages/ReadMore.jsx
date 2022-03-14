import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/readMoreStyle.css';
import TopNavbar from '../components/topNavbar';
import BottomNavbar from '../components/BottomNavbar';
import Comment from '../components/Comment';
import Loading from '../components/Loading';




export default function ReadMore(props) {

    const [postDetails, setPostDetails] = useState('');
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [posting, setPosting] = useState(false);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const [comments, setComments] = useState('')
    const id = props.match.params.id;
    const send = {
        token: localStorage.getItem('token'),
        postId: id
    }
    useEffect(async () => {
        const res = await axios.post('http://localhost:8080/readMore', send)
        setPostDetails(res.data.post)
        setLoading(false)
    }, [])

    const addComment = async (e) => {
        setPosting(true);
        const send = {
            token: localStorage.getItem('token'),
            postId: props.match.params.id,
            comment: comment,
        }
        const res = await axios.post('http://localhost:8080/addComment', send);
        if (res.data.message == 'done') {
            setPosting(false);
        }
    }
    const fetchComments = async (e) => {
        const send = {
            token: localStorage.getItem('token'),
            postId: props.match.params.id
        }
        const res = await axios.post('http://localhost:8080/fetchComments', send);
        setComments(res.data.comments)
        setCommentsLoading(false);
        // if (res.data.comments) {

        // }
    }
    return (
        <div className='readMoreContainer'>
            {
                (loading) ?
                    <Loading /> :
                    <>
                        <TopNavbar />
                        <div className="postDetails">
                            <h4>{postDetails.title}</h4>
                            <a href={postDetails.link} target="_blank">click here to vist</a>
                        </div>
                        <div className="postDesc">
                            <h4>Description</h4>
                            <p>{postDetails.desc}</p>
                        </div>
                        <div className="addComment">
                            <h4> Add Comment</h4>
                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} name="" id="" cols="40" rows="3"></textarea>
                            {(posting === false) ?
                                <button className='postComment' onClick={addComment}>Post</button> : <button className='postComment' disabled >Posting...</button>}
                        </div>
                        <div className="loadComments">
                            <button onClick={fetchComments}>Load Comments</button>
                        </div>
                        {(commentsLoading) ? '' :
                            <div className="comments">
                                {(comments.length == 0) ? <p style={{
                                    'textAlign': ' center',
                                    'fontSize': '20px',
                                    'fontWeight': 'bold',
                                    'paddingBotttom': '15px'
                                }}>No comments to show</p> : comments.map(comment => { return <Comment username={comment.userId.username} comment={comment.comment} /> })}
                            </div>}
                    </>
            }
        </div>
    )
}