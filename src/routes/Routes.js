import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Login from '../pages/Login';
import Home from '../pages/Home';
import CreateTask from '../pages/CreateTask';
import UpdateTask from '../pages/UpdateTask';
import CreateUser from '../pages/CreateUser';

function RoutesFront() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path = '/' Component = {Login}/>
                <Route exact path = '/home' Component = {Home}/>
                <Route exact path = '/createTask' Component = {CreateTask}/>
                <Route exact path = '/updateTask' Component = {UpdateTask}/>
                <Route exact path = '/createUser' Component = {CreateUser}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesFront;
