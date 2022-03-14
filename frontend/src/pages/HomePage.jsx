import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BottomNavbar from '../components/BottomNavbar.jsx';
import Loading from '../components/Loading.jsx';
import TopNavbar from '../components/topNavbar';
import '../styles/homePageStyle.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Card from '../components/Card.jsx';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import SortPosts from '../components/SortPosts.jsx';
import Error from '../components/Error'
// import BottomNavbar from '../components/BottomNavbar';
axios.defaults.withCredentials = true;

export default function HomePage(props) {
    const [loading, setLoading] = useState({
        tokenStatus: true,
        responseStatus: true
    });
    let [posts, setPosts] = useState([])
    const [pageNo, setPageNo] = useState(1);
    const [endStatus, setEndStatus] = useState(false);
    const [callState, setCallState] = useState(false);
    const [sort, setSort] = useState('new');
    useEffect(async () => {
        setPageNo(1)

        setPosts([]);
        setLoading({ tokenStatus: true })
        setEndStatus(false);

    }, [sort]);
    useEffect(async () => {
        if (pageNo != 1000) {
            setEndStatus(false)
            fun();
        }


    }, [pageNo])
    const fun = async () => {
        const token = localStorage.getItem('token');
        if (token == null || token == '') {
            return props.history.push('/createAccount');
        }
        const send = {
            token: token,
            pageNo: pageNo,
            sortBy: sort
        }
        const res = await axios.post('http://localhost:8080/fetchPosts', send,)
        const fechedPosts = res.data.posts;
        if (fechedPosts.length == 0) {
            setEndStatus(true);
        }
        fechedPosts.forEach((post) => {
            setPosts((prevPosts) => [...prevPosts, post]);
        })
        setLoading({ tokenStatus: false, responseStatus: false });
    }
    const selector = (e) => {
        let categoryies = document.querySelectorAll('.category');
        if (e.target.classList.contains('category')) {
            categoryies.forEach((category) => {
                category.style.backgroundColor = '#e5e5fe';
                category.style.color = '#343e62';
            })
            e.target.style.backgroundColor = '#7B66FF';
            e.target.style.color = '#fff';
        }
    }
    const onScroll = () => {
        setPageNo(pageNo + 1);
    }
    const postControlls = (e) => {
        if (e.target.classList.contains('upVote')) {
            e.target.style.borderRadius = '3px';
            e.target.style.backgroundColor = ' #e5e5fe';
            e.target.style.color = '#7b66ff';
            e.target.classList.add('active');
            e.target.classList.remove('upVote');

        }
        else if (e.target.classList.contains('active')) {
            e.target.style.borderRadius = '0px';
            e.target.style.backgroundColor = ' #fff';
            e.target.style.color = 'black';
            e.target.classList.remove('active');
            e.target.classList.add('upVote');
        }
    }
    const readMore = (id) => {
        props.history.push(`/readMore/id=${id}`);
    }
    const linkTypes = (e) => {
        console.log(e.target);
        let linkTypes = document.querySelectorAll('.linkType');
        console.log(linkTypes);
        if (e.target.parentElement.classList.contains('linkType')) {
            linkTypes.forEach((linkType, index) => {
                linkType.style.backgroundColor = '#fff';
                linkType.style.color = 'black';
            })
            e.target.parentElement.style.backgroundColor = '#7B66FF';
            e.target.parentElement.style.color = '#fff';
        }
    }
    return (
        <div className="displayContainer">
            <div className='homeContainer'>
                <TopNavbar />
                <SortPosts sort={sort} setSort={setSort} pageNo={pageNo} setPageNo={setPageNo} setCall={setCallState} call={callState} />
                {(loading.tokenStatus == false && loading.responseStatus == false) ?
                    <InfiniteScroll
                        dataLength={posts.length} //This is important field to render the next data
                        next={onScroll}
                        hasMore={true}
                        loader={<img style={{ 'width': '30px' }} src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif' />}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>please refresh to see new posts</b>
                            </p>
                        }>
                        {posts.map((post, index) => (
                            <Card title={post.title} link={post.link} key={index} id={post._id} upVotes={post.upVotes} upVotesCheck={post.upVotecheck} />
                        ))}
                    </InfiniteScroll> : <Loading />
                }
                <h4>{(endStatus == true) ? 'no more posts' : ''}</h4>
                <BottomNavbar />
            </div >
        </div>
    )
}
