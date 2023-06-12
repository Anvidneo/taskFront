import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Cookies from 'universal-cookie';
import NavbarComponent from '../components/Navbar';
import Tasks from '../components/Tasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

const cookies = new Cookies();

export default class Home extends Component {
    redirectForm = () => {
        window.location.href='./createTask';
    }

    componentDidMount(){
        let token = cookies.get('token');
        if (!token) {
            window.location.href='./';
        }
    }

    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent> <br/>
                <div className='ag-format-container'>
                    <div className="ag-courses_box">
                        <Button className='task-button' onClick={this.redirectForm}>
                            Create task
                        </Button>
                    </div>
                </div>
                <Tasks></Tasks>
            </div>
        )
    }
}
