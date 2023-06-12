import { Component, React } from 'react';
import { Form, FormGroup, FormControl, Button, Card, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import axios from 'axios';

const baseUrl = 'http://localhost:3001/users/';

export default class Login extends Component {
    state = {
        username: '',
        password: '',
        name: '',
        email: ''
    }

    register = async () => {
        await axios.post(baseUrl, {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name,
            email: this.state.email,
        })
        .then(response => {
            window.location.href='./';
        })
        .catch(error => {
            console.log(error);
        });
    }

    goLogin(){
        window.location.href='./';
    }

    render() {
        return (
            <div className='overlay d-flex justify-content-center align-items-center'>
                <Card className='card-form'>
                    <Card.Body>
                        <Card.Title>Register</Card.Title>
                        <Form className='rounded p-4 p-sm-3' id='loginForm'>
                            <FormGroup className='mb-3' controlId='username'>
                                <FormLabel>Username</FormLabel>
                                <FormControl 
                                    type='text' 
                                    placeholder='Enter your Username' 
                                    name='username' 
                                    onChange={e => this.setState({ username: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='password'>
                                <FormLabel>Password</FormLabel>
                                <FormControl 
                                    type='password' 
                                    placeholder='Enter your Password' 
                                    name='password'
                                    onChange={e => this.setState({ password: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='name'>
                                <FormLabel>Name</FormLabel>
                                <FormControl 
                                    type='text' 
                                    placeholder='Enter your Name' 
                                    name='name'
                                    onChange={e => this.setState({ name: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='email'>
                                <FormLabel>Email</FormLabel>
                                <FormControl 
                                    type='email' 
                                    placeholder='Enter your Email' 
                                    name='email'
                                    onChange={e => this.setState({ email: e.target.value })}
                                />
                            </FormGroup>
                            <FormGroup className='mb-3' controlId='submit'>
                                <Button className='login-button' onClick={this.register}>
                                    Register
                                </Button>  &nbsp;
                                <Button className='cancel-button' onClick={this.goLogin}>
                                    Return Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}