import React from 'react';
import '../styles/sortPostStyles.css';

export default function SortPosts({ sort, setSort, pageNo, setPageNo, setCall, call }) {
    const selector = (e) => {
        setSort(e.target.value);
        console.log(call);
        setPageNo(1000);
    }
    return (
        <div className='sortPostsContaier'>
            <select name="Sort By" id="" onChange={selector}>
                <option value="new" >New</option>
                <option value="top">Top</option>
            </select>
        </div>
    )
}
