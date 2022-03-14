// 29147583
import React from 'react';
import '../styles/commentStyles.css';

export default function Comment({ username, comment }) {
    return (
        <div className='commentContainer'>
            <h4>{username}</h4>
            <p>{comment}</p>
        </div>
    )
}
