import React from 'react'

export default function Loading() {
    return (
        <div className='loadingContainer'>
            <img style={{
                'width': '100%', 'position': 'absolute', 'top': '50%',
                'transform': 'translateY(-50%)'
            }} src='./images/loading3.gif' />
        </div>
    )
}
