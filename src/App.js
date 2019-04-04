import React from 'react';
import { BrowserRouter, NavLink, Route, Redirect, Switch } from 'react-router-dom';

const userData = {name: 'user', password: 'abc123'};

export class App extends React.Component {
  constructor(props) {
        super(props);
    this.state = ({username: '',
                password: '',
                correctInput: false,
                wrongInput: false,
                });
    this.nameInput = this.nameInput.bind(this);
    this.passwordInput = this.passwordInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  nameInput(ev) {
    this.setState({username: ev.target.value});
  }
  passwordInput(ev) {
    this.setState({password: ev.target.value});
  }
  handleSubmit(ev) {
    ev.preventDefault();
      userData.name === this.state.username && userData.password === this.state.password ?
      this.setState({correctInput: true,
                    wrongInput: false})
      :
      this.setState({correctInput: false,
                    wrongInput: true});
}
  unsubscribe(ev) {
    this.setState({correctInput: false});
  }
  resetFields() {
  this.setState({username: '', password: ''});
}

render() {
    return (
      <BrowserRouter>
        <React.Fragment>
            <Route exact path='/' render={()=> <StartingPage username={this.state.username} password={this.state.password} handleSubmit={this.handleSubmit} nameInput={this.nameInput} passwordInput={this.passwordInput}/>}/>

          <Switch>
            <Route path='/login' render={()=> <UsersPage unsubscribe={this.unsubscribe} username={this.state.username} password={this.state.password} handleSubmit={this.handleSubmit} nameInput={this.nameInput} passwordInput={this.passwordInput}/>}/>
            <Route path='/logout' render={()=> <LogoutPage resetFields={this.resetFields} unsubscribe={this.unsubscribe} />}/>
            {this.state.correctInput && <Redirect to='/login' />}
            {this.state.wrongInput && <ErrorMsg />}
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    )
  }
}
class StartingPage extends React.Component {
  render() {
            return (
                <div className="jumbotron m-1 p-2 bg-info">
                <form onSubmit={this.props.handleSubmit}>
                  <h2 className="lead">Welcome to the starting Page</h2>
                  <div className="form-group">
                    <span className="p-1 text-light">Username</span>
                    <input onChange={this.props.nameInput} value={this.props.username} placeholder="type 'user' as username" className="form-control" type="text" autoComplete="username"/>
                    <span className="p-1 text-light">Password</span>
                    <input onChange={this.props.passwordInput} value={this.props.password} placeholder="type 'abc123' as password" className="form-control" type="password" autoComplete="current-password"/>
                    <button type="submit" className="btn btn-dark m-2">login</button>
                  </div>
                </form>
              </div>
            )
          }
      }
class ErrorMsg extends React.Component {
  render() {
    return (
      <p className="m-1 p-2 bg-danger lead text-light text-center">This was a wrong input..please try again!</p>
    )
  }
}
class UsersPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loggingOut: false};
  }
  handleLogOut() {
    this.setState({loggingOut: true});
  };
  render() {
            return (
            <div className="jumbotron m-2">
              <ul className="nav">
                <NavLink className="m-2 nav-link text-dark" to="/login">Welcome</NavLink>
                <NavLink className="m-2 nav-link" to="/login/friends">Friends</NavLink>
                <NavLink className="m-2 nav-link" to="/login/whatever">Whatever</NavLink>
                <button onClick={this.handleLogOut.bind(this)} className="btn btn-danger">LOG OUT</button>
              </ul>
              {this.state.loggingOut && <Redirect to="/logout" />}

              <div className="container">
                <Route exact path="/login" render={()=> <p className="bg-light m-4 p-3 text-info">Welcome {userData.name}</p>}/>
                <Route path="/login/friends" render={()=> <p>You have 0 friends!</p>}/>
                <Route path="/login/whatever" render={()=> <p>.....whatever</p>}/>
              </div>
            </div>
          )
      }
  }
class LogoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isRedirectSet: false,
                  countdown: 3};
  }
  componentDidMount() {
  setTimeout(()=> this.setState({isRedirectSet: true}), 5000);
  this.props.resetFields();
  this.props.unsubscribe();
}

  render() {
    return (
      <div className="container my-4">
        <div className="jumbotron bg-info">
        <h2 className="lead">You clicked to log out!<br /> In 5 secs you will be redirected to the home page!</h2>
        <p className="title">If not, click <NavLink to='/'><span className="px-1 text-light">here</span></NavLink></p>
      </div>
      {this.state.isRedirectSet && <Redirect to="/" />}
    </div>
    )
  }
}
