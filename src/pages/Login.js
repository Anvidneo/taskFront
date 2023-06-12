import { Component, React } from 'react';
import { Form, FormGroup, FormControl, Button, Card, FormLabel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = 'http://localhost:3001/login/';
const cookies = new Cookies();

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    login = async () => {
        await axios.post(baseUrl, {
            username: this.state.username,
            password: this.state.password
        })
        .then(response => {
            return response.data;
        })
        .then(response => {
            if (response.token) {
                let { token } = response;
                cookies.set('token', token, { path: '/'});
                window.location.href='./home';
            } else {
                alert(response.error);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        let token = cookies.get('token');
        if (token) {
            window.location.href='./home';
        }
    }

    goRegister(){
        window.location.href='./createUser';
    }

    render() {
        return (
            <div className='overlay d-flex justify-content-center align-items-center'>
                <Card className='card-form'>
                    <Card.Body>
                        <Card.Title>Log in</Card.Title>
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
                            <FormGroup className='mb-3' controlId='submit'>
                                <Button className='login-button' onClick={this.login}>
                                    Login
                                </Button>  &nbsp;
                                <Button className='cancel-button' onClick={this.goRegister}>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}