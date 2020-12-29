import React, { Component } from "react";
import auth from "../auth";
import '../css/Login.css';
import axios from 'axios';

class Home extends Component {

     constructor(props){
        super(props);
        this.state = {
            email: this.props.location.state.email,
            currentUser: '',
            onlineUserList: [], 
        };

        this.backendCall();

        console.log('3', this.state);
    }

    async backendCall(){

        console.log('backendCall');
        let config = {
            headers: {
                 'Content-Type' : 'application/json'
        }};

        //const res = await axios.get(`http://192.168.99.100:3003/home`, JSON.stringify(this.state), config);
        //const res = await axios.get(`http://localhost:3003/home`, JSON.stringify(this.state), config);
        const res = await axios.get(`https://home-co5z3zrdzq-ue.a.run.app/home`, JSON.stringify(this.state), config);
        console.log('res', res);
        let data = res.data;
        let status = data.status;
        if(data){
            if(status === '9' || status === 9){
                let records = data.records;

                this.prepareDetails(records);
                
            }
        }


    }

     prepareDetails(records){

        let i = 0;
        let onlineUserList=[];
        let currentUser;

        for(i=0; i<records.length; i++){
            if(records[i].email === this.state.email){
                currentUser = records[i].name;
            } else {
                onlineUserList.push(records[i].name);
            }
        }

        this.setState({
            onlineUserList: onlineUserList,
            currentUser: currentUser
        });
        console.log('this.state 2',this.state);

    }

    async logoutBackend() {

        let config = {
            headers: {
                 'Content-Type' : 'application/json'
            }
        };
        console.log('this.state.email logout', this.state.email);
        //const res = await axios.post('http://192.168.99.100:3003/logout', JSON.stringify(this.state), config);
        //const res = await axios.post('http://localhost:3003/logout', JSON.stringify(this.state), config);
        const res = await axios.post('https://home-co5z3zrdzq-ue.a.run.app/logout', JSON.stringify(this.state), config);
        let data = res.data;
        if(data === '12' || data === 12){

            auth.logout( () => {
                this.props.history.push({
                    pathname: '/',
                });
            });
        }
    }

    onLogout = (e) => {

        e.preventDefault();
        this.logoutBackend();

    };

    render(){
        return(

            <div>

            <div className="homebox">
            <div className="home">

                <form>

                    <div>
                        <h4 className="homeMsg">Hi, {this.state.currentUser} you are logged in.</h4>
                    </div>

                    <div>
                        <button className="myButton" onClick={this.onLogout}>Logout</button>
                    </div>
                    <p />
                    <div className="form-group">
                        {this.state.onlineUserList.length > 0 ?
                            <p>Here are the other users who are online
                                {this.state.onlineUserList.map((result) => (
                                <p>{result}</p>
                            ))}</p>
                        : <p>No users are online currently.</p>
                        }
                    </div>
                </form>
                </div>
            </div>
        </div>
        );
    }
}

export default Home;