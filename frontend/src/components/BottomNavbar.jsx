import React from 'react';
import '../styles/homePageStyle.css';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

export default function BottomNavbar() {
    const navigation = (e) => {
        let icons = document.querySelectorAll('.icon');
        if (e.target.classList.contains('icon')) {
            icons.forEach((icon) => {
                icon.style.backgroundColor = '#fff';
                icon.style.color = '#343e62';
            })
            e.target.style.backgroundColor = '#e5e5fe';
            e.target.style.color = '#7b66ff';
            if (e.target.classList.contains('post')) {

            }
        }
    }
    return (
        <div>
            <div className="bottomNav"  >
                <NavLink exact to='/' activeClassName='bottomNavActive'>
                    <i class="icon fas fa-home"></i></NavLink>
                <NavLink exact to='/search' activeClassName='bottomNavActive'>
                    <i class="icon fas fa-search"></i></NavLink>
                <NavLink exact to='/addPost' activeClassName='bottomNavActive'>
                    <i class="icon fas fa-plus-square post"></i></NavLink>
                <NavLink exact to='/account' activeClassName='bottomNavActive'>
                    <i class="icon fas fa-user"></i></NavLink>
            </div>
        </div>
    )
}
