import { Component, React } from 'react';
import { Form, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import NavbarComponent from '../components/Navbar';
import jwt from 'jwt-decode';

const baseUrl = 'http://localhost:3001/tasks/';
const cookies = new Cookies();

export default class CreateTask extends Component {
    state = {
        title: '',
        description: ''
    }

    submit = async () => {
        let token = cookies.get('token');
        const { iduser } = jwt(token);
        await axios.post(baseUrl, {
            iduser: iduser,
            title: this.state.title,
            description: this.state.description
        }, {
            headers: {
                Authorization: 'Bearer '+token
            }
        })
        .then(response => {
            if (response.data.error) {
                console.log(response.data.error);
            } else{
                window.location.href='./home';
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        let token = cookies.get('token');
        if (!token) {
            window.location.href='../home';
        }
    }

    cancel(){
        window.location.href='../home';
    }

    render() {
        return (
            <div>
                <NavbarComponent></NavbarComponent> <br/>
                <div className='overlay d-flex justify-content-center align-items-center'>
                    <div className="ag-courses_item">
                        <div className="ag-courses-item_link">
                            <div className="ag-courses-item_bg"></div>
                            <div className="ag-courses-item_title">
                                Task
                            </div>
                            <div className="ag-courses-item_description">
                                <Form className='rounded p-4 p-sm-3' id='loginForm'>
                                    <FormGroup className='mb-3' controlId='title'>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl 
                                            type='text' 
                                            placeholder='Enter your title' 
                                            name='title' 
                                            onChange={e => this.setState({ title: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup className='mb-3' controlId='description'>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl 
                                            type='description' 
                                            placeholder='Enter your description' 
                                            name='description'
                                            onChange={e => this.setState({ description: e.target.value })}
                                        />
                                    </FormGroup>
                                    <FormGroup className='mb-3' controlId='submit'>
                                        <Button className='task-button' onClick={this.submit}>
                                            Submit
                                        </Button> &nbsp;
                                        <Button className='cancel-button' onClick={this.cancel}>
                                            Cancel
                                        </Button>
                                    </FormGroup>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}