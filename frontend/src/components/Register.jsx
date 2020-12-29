import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import errMsg from '../errormessages';


class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
            name:'',
            email:'',
            password:'',
            topic:'',
            validateFlag:'',
            registerFlag: false,
            validEmail:true,
            errorMsg:'',
        }
    }


    onChange = (e) => {
        this.setState ( { 
            [e.target.name] : e.target.value 
        } );
    }

    async apiCall(){
        var config = {
            headers: { 'Content-Type' : 'application/json' }
           };

        try{
            let mess= '';
            //await axios.post('http://192.168.99.100:3001/register', JSON.stringify(this.state), config)
            //await axios.post('http://localhost:3001/register', JSON.stringify(this.state), config)
            await axios.post('https://register-co5z3zrdzq-ue.a.run.app/register', JSON.stringify(this.state), config)
                        .then(response => {
                            console.log('response',response);
                            console.log('response.data',response.data);
                            mess=response.data;
                            return response.data
                        })
                        .catch((err) => {
                            console.log('err',err);
                            console.log('err.response',err.response);
                            console.log('err.response.data',err.response.data);
                            mess=err.response.data;
                            throw err.response.data
                        });

            if(mess === 6){

                alert(
                    "Registration is success. Click ok to login"
                ); 
                this.setState({
                    name:'',
                    email:'',
                    password:'',
                    topic:'',
                    registerFlag:true
                });
            } else {
                this.setState({
                    validateFlag: true,
                    errorMsg: errMsg[mess]
                });
            }
            
        } catch(err){
            console.log(err);
            this.setState({
                validateFlag: true,
                errorMsg: errMsg['11']
            });
        }
    }

    onRegister = (e) => {
        e.preventDefault();

        this.setState({
            validateFlag: false
        });

        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let validEmail = re.test(String(this.state.email).toLowerCase());

        if(!validEmail){
            this.setState({
                validEmail:validEmail,
                errorMsg: errMsg['14']
            });    
        }

        if(this.state && this.state.name && this.state.email && this.state.password && this.state.topic &&
            this.state!=={} && this.state.name !=='' && this.state.email !== '' && validEmail
                && this.state.password !== '' && this.state.topic !== ''){
                
                this.apiCall();

        } else {
            this.setState({
                validateFlag: true,
                errorMsg:errMsg['13']
            });
        }
    }

    render() {

        return(
            <div>

                <div className="registerbox">

                {this.state.registerFlag ? 
                
                <div>
                    <Redirect to ='/login' />
                </div>
                :null}

                <div className="registerDiv">
                    <div className="registerCard">
                        <div className="registerCard-body">

                            <form >

                                {this.state.validateFlag &&
                                    <p className="errorMsg" style={{ color: "red" }}>
                                        {this.state.errorMsg}
                                    </p>
                                }

                                <h3>Register</h3>

                                <div className="form-group">
                                    <label>Name*</label>
                                </div>

                                <div className="form-group">
                                    <input required type="name" name="name" 
                                        onChange={this.onChange} value={this.state.name}
                                        className="input" placeholder="Enter your name"
                                        />
                                </div>

                                <div className="form-group">
                                    <label>Email Address*</label>
                                </div>

                                <div className="form-group">
                                    <input required type="email" name="email" 
                                        onChange={this.onChange} 
                                        className="input" placeholder="Enter email address" />
                                </div>

                                {!this.state.validEmail &&
                                    <p className="errorMsg" style={{ color: "red" }}>
                                        {this.state.errorMsg}
                                    </p>
                                }

                                <div className="form-group">
                                    <label>Password*</label>
                                </div>

                                <div className="form-group">
                                    <input required type="password" name="password" 
                                        onChange={this.onChange}
                                        className="input" placeholder="Enter password" />
                                </div>

                                <div className="form-group">
                                    <label>Select Topic*</label>
                                    <p/>
                                </div>

                                <div className="form-group">
                                    <select required type="select" name="topic" 
                                        onChange={this.onChange}
                                        className="select-css" >
                                    
                                        <option value="">select</option>
                                        <option value="developer">AWS</option>
                                        <option value="manager">GCP</option>
                                        <option value="manager">Azure</option>

                                    </select>
                                </div>
                                <p></p>
                                <button onClick={this.onRegister} type="submit" className="myButton">Register</button>

                            </form>

                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Register;