import React from 'react'
import {Link} from 'react-router'
import {Accounts} from 'meteor/accounts-base'

export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    let email = this.refs.email.value.trim()
    let password = this.refs.password.value.trim()

    if(password.length < 6){
      return this.setState({error: 'Password must be more then 5 characters'})
    }
    Accounts.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: 'Error! ' + err.reason})
      } else{
        this.setState({error: ''})
      }
    })
  }

  render(){
    return(
      <div className="boxed-view">
          <div className="boxed-view__box">
            <h1>Signup</h1>

            {this.state.error ? <p>{this.state.error}</p> : undefined}

            <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" ref="email" name="email" placeholder="Email"/>
              <input type="password" ref="password" name="password" placeholder="Password"/>
              <button className="button">Create account</button>
            </form>
            <Link to="login">Already have an account?</Link>

          </div>
      </div>
    )
  }
}
