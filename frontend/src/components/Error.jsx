import React from 'react';
import '../styles/errorStyles.css';

export default function Error({ message }) {
    console.log(message);
    return (
        <div className='errorContainer'>
            <h4>{message}</h4>
        </div>
    )
}