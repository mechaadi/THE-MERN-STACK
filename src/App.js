import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";

import logo from "./logo.svg";
import Axios from "axios";

class App extends Component {

  state={
    usernames:[],
    firstnames:[],
    lastnames:[],
    emails:[],
    descriptions:[],
    duration:[]
  }


  addnote(){
    console.log("addnote dn")
    var note = document.getElementById('note').value
    var username = document.getElementById('username').value
    var duration = document.getElementById('duration').value

    Axios.post('http://localhost:5000/exercises/add',{
      'description' : note,
      'duration' : duration,
      'date' : '24th September',
      'username' : username
    }).then((f)=>{
      console.log(f.data);
      this.fetch();
    }).catch((c)=>{
      console.log(c);
    })
  }


  fetch(){
    this.setState({
      usernames:[],
      duration:[],
      descriptions:[]
    })
    Axios.get('http://localhost:5000/exercises').then((f)=>{
      console.log(f.data)
      f.data.forEach(element => {
        //console.log(element['username']);
        this.setState({
          usernames: [...this.state.usernames, element['username']],
          descriptions:[...this.state.descriptions, element['description']],
          duration:[...this.state.duration, element['duration']],


        });
      });
      console.log(this.state.descriptions)
      console.log(this.state.duration)
      console.log(this.state.usernames)

    }).catch((c)=>{
      console.log(c);
    })
  }
  constructor(){
    super();
    this.fetch();
    
  }

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">A7A - MERN STACK</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link"></Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link"></Link>
                </li>
              </ul>
            </div>

           
          </nav>


          <br/>
          {/* <Route path="/" exact component={TodosList} />
          <Route path="/edit/:id" component={EditTodo} />
          <Route path="/create" component={CreateTodo} /> */}

<br/> 
  <div class="form-group">
    <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter username..."></input>
          <br/>
    <input type="email" class="form-control" id="duration" aria-describedby="emailHelp" placeholder="Enter duration.."></input>
    <br/>
    <input type="email" class="form-control" id="note" aria-describedby="emailHelp" placeholder="Enter note..."></input>
    <br/> 
    <button class="btn btn-success text-center" onClick={this.addnote.bind(this)}>ADD</button>
  </div>
  
  <br/>   <br/><br/>   <br/>

          <div class="container">
            <div class="row">
              <div class="col-3">
                {this.state.usernames.map(q=>{
                  return <div> {q} </div>
                })}
              </div>

              <div class="col-3">
              {this.state.descriptions.map(q=>{
                  return <div> {q} </div>
                })}
              </div>

              <div class="col-3">
              {this.state.duration.map(q=>{
                  return <div> {q} </div>
                })}
              </div>

              {/* <div class="col-3">
              {this.state.emails.map(q=>{
                  return <div> {q} </div>
                })}
              </div> */}
            </div>
              
            </div>
        </div>
      </Router>
    );
  }
}

export default App;