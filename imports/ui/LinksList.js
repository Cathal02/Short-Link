import React from 'react'
import {Meteor} from 'meteor/meteor'
import {Tracker} from 'meteor/tracker'
import {Links} from '../api/links'
import LinksListItem from './LinksListItem'
import {Session} from 'meteor/session'
import FlipMove from 'react-flip-move'
export default class LinksList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      links: []
    }
  }

  returnLinks = () => {
    if(!this.state.links.length) return <div className="item"><p className="item__status-message">No Links Found</p></div>

    return this.state.links.map((link) => {
      const shortUrl = Meteor.absoluteUrl(link._id)
       return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
    })
  }

  componentDidMount() {
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links')
      const links = Links.find({visible: Session.get('showVisible')}).fetch();
      this.setState({links})
    })
  }

   componentWillUnmount() {
     this.linksTracker.stop()
  }
  render(){
    return(
        <FlipMove montainContainerHeight={true}>
        {this.returnLinks()}
        </FlipMove>
    )
  }
}
