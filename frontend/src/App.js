import React from 'react';
import './styles/appStyle.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createAccount from './pages/createAccount';
import AuthState from './context/authState'
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import ReadMore from './pages/ReadMore';
import SearchPage from './pages/SearchPage'
import AccountPage from './pages/AccountPage';
import Category from './pages/Category';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <AuthState>
            <Router>
                <Switch>
                    <Route exact path='/createAccount' component={createAccount} />
                    <Route exact path='/' component={HomePage} />
                    <Route exact path='/addPost' component={PostPage} />
                    <Route exact path='/readMore/:id' component={ReadMore} />
                    <Route exact path='/search' component={SearchPage} />
                    <Route exact path='/account' component={AccountPage} />
                    <Route exact path='/category' component={Category} />
                    <Route exact path='/login' component={LoginPage} />
                </Switch>
            </Router>
        </AuthState>
    )
}
export default App
