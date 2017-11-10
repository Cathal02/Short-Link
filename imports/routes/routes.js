import React from 'react'
import {Router, Route, browserHistory} from 'react-router'
import {Meteor} from 'meteor/meteor'
import Signup from '../ui/Signup'
import Home from '../ui/Home'
import Login from '../ui/Login'
import NotFound from '../ui/NotFound'

const unauthenticatedPages = ['/', '/signup', '/login']
const authenticatedPages = ['/links']
window.browserHistory = browserHistory;

const onEnterPublicPage = () => {
  if(Meteor.userId()){
    browserHistory.replace('/links')
  }
}

const onEnterPrivatePage = () => {
  if(!Meteor.userId()){
    browserHistory.replace('/')
  }
}

export const onAuthChange = (isAuthenticated) => {
  
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/links')
  } else if (isAuthenticatedPage && !isAuthenticated ){
    browserHistory.replace('/login');
  }
}
export const routes = (
    <Router history={browserHistory} >
      <Route path="/" component={Login}/>
      <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
      <Route path="/login" component={Login} onEnter={onEnterPublicPage}/>
      <Route path="/links" component={Home} onEnter={onEnterPrivatePage}/>
      <Route path="*" component={NotFound}/>
    </Router>
);
