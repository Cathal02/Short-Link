import React from 'react'
import Modal from 'react-modal'
import {Meteor} from 'meteor/meteor'

export default class AddLinks extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        url: 'Cathal is a sex bomb',
        err: '',
        isOpen: false
    }
  }
  onSubmit = (e) => {
    const {url} = this.state
    e.preventDefault();

    if(url){
      Meteor.call('links.insert', url, (err, res) => {
        if(!err) {
          this.cleanupModal.bind(this)
        } else{
          this.setState({err})
        }
      })

    }
  }

  onChange = (e) => {
    this.setState({url: e.target.value.trim()})
  }

  cleanupModal() {
    this.setState({isOpen: false, url: '', err: ''})
  }

  render(){
    return(
    <div>
      <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
      <Modal
        onAfterOpen={() => this.refs.url.focus()}
        isOpen={this.state.isOpen}
        contentLabel="Add Links"
        onRequestClose={this.cleanupModal.bind(this)}
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal">

        <h1>Add link</h1>
        <p>{this.state.err ? this.state.err.reason : undefined}</p>

        <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
          <input ref="url" type="text" placeholder="Add a url" value={this.state.url} onChange={this.onChange.bind(this)}/>
          <button className="button" >Add Link</button>
          <button type="button" className="button button--secondary" onClick={this.cleanupModal.bind(this) }>Cancel</button>
        </form>



      </Modal>
    </div>

    )
  }
}
