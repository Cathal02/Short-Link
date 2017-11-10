import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'
import React from 'react'
import ReactDom from 'react-dom'
import {Session} from 'meteor/session'
import {onAuthChange, routes} from '../imports/routes/routes'
import '../imports/startup/simple-schema-configuration.js'
import {Links} from '../imports/api/links'

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);
})

Meteor.startup(() => {
  Session.set('showVisible', true)
ReactDom.render(routes, document.getElementById('app'));
})
