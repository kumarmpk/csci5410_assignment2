import React, { Component } from 'react';
import '../css/Login.css';
import axios from 'axios';
import errMsg from '../errormessages';
import auth from '../auth';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            flag: false,
            errorMsg:'',
            forceLogin: false,
            userList:[],
        }

    }

    componentDidMount(){

    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async forceLoginBackend(){
        var config = {
            headers: {
                 'Content-Type' : 'application/json'
            }};
        try{
            //const res = await axios.post('http://192.168.99.100:3002/forcelogin', JSON.stringify(this.state), config);
            //const res = await axios.post('http://localhost:3002/forcelogin', JSON.stringify(this.state), config);
            const res = await axios.post('https://login-co5z3zrdzq-ue.a.run.app/forcelogin', JSON.stringify(this.state), config);
            let data = res.data;

            if(data === '8' || data === 8){

                auth.login( () => {
                    this.props.history.push({
                        pathname: '/home',
                        state: {
                            email : this.state.email,
                        }
                    });
                });
                this.setState({
                    email:'',
                    password:''
                });

            } else{
                if(data === '2' || data === 2){
                    this.setState({
                        forceLogin: true
                    });
                }
                this.setState({
                    errorMsg: errMsg[data]
                });
            }
        } catch(err){
            console.log(err);
        }
    }

    async backendCall(){
        let config = {
            headers: {
                 'Content-Type' : 'application/json'
            }
        };
        try{
            //const res = await axios.post('http://192.168.99.100:3002/login', JSON.stringify(this.state), config);
            //const res = await axios.post('http://localhost:3002/login', JSON.stringify(this.state), config);
            const res = await axios.post('https://login-co5z3zrdzq-ue.a.run.app/login', JSON.stringify(this.state), config);

            let data = res.data;
            console.log('data',data);
            if(data){
                if(data === 8 || data === '8'){
 
                    auth.login( () => {
                        this.props.history.push({
                            pathname: '/home',
                            state: {
                                email : this.state.email
                            }
                        });
                    });
                    this.setState({
                        email:'',
                        password:''
                    });
    
                } else{
                    if(data === 2 || data === '2'){
                        console.log('inside 2 block');
                        this.setState({
                            forceLogin: true
                        });
                    }
                    this.setState({
                        errorMsg: errMsg[data]
                    });
                }    
            } else {
                this.setState({
                    errorMsg: errMsg['10']
                });
            }
        } catch(err){
            console.log(err);
            this.setState({
                errorMsg: errMsg['11']
            });
        }
    }

    onForceLogin = (e) => {
        e.preventDefault();
        this.setState({
            flag: false,
            errorMsg:''
        });

        if(this.state && this.state.email && this.state.password &&
            this.state !== {} && this.state.email !== '' && this.state.password !== ''){
                this.forceLoginBackend();
        } else {
            this.setState({
                flag:true,
                errorMsg: errMsg['13']
            });
        }
    }

    onLogin = (e) => {
        e.preventDefault();
        this.setState({
            flag: false,
            errorMsg:''
        });

        if(this.state && this.state.email && this.state.password &&
            this.state !== {} && this.state.email !== '' && this.state.password !== ''){
                this.backendCall();
        } else {
            this.setState({
                flag:true,
                errorMsg: errMsg['13']
            });
        }
    }

    render() {
        return(
            <div>
                <div className="loginbox">
                <div className="login">

                    <form>


                        <div>
                            <p style={{ color: "red" }}>
                                {this.state.errorMsg ? this.state.errorMsg:null}
                            </p>

                            {this.state.forceLogin?
                            <button type="submit" onClick={this.onForceLogin}
                                className="myButton">Force Login</button>
                            :null}
                        </div>

                        <p/>
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Email address</label>
                        </div>
                        <div className="form-group">
                            <input type="email" name="email" onChange={this.onChange}
                                className="input" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" onChange={this.onChange}
                                className="input" placeholder="Enter password" />
                        </div>

                        <p/>
                        <button type="submit" onClick={this.onLogin}
                            className="myButton">Login</button>

                        <p className="register text-left">
                            Don't have an account yet? Register <a href="/register">here?</a>
                        </p>
                        
                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;