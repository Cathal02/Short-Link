import { Mongo } from 'meteor/mongo'
import { Meteor} from 'meteor/meteor'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'
export const Links = new Mongo.Collection('links');

if(Meteor.isServer){
  Meteor.publish('links', function()  {
    return Links.find({userId: this.userId})
  })
}

Meteor.methods({
  'links.insert'(url) {
    if(!this.userId){
      throw new Meteor.Error('Not logged in', 'User must be logged in to create a link')
    }
      new SimpleSchema({
        url: {
          type: String,
          label: 'Your link',
          regEx: SimpleSchema.RegEx.Url
        }
      }).validate({url})
      const _id = shortid.generate()

      Links.insert({
        url, _id,
        userId: this.userId,
        visible: true,
        visitedCount: 0,
        lastVisitedAt: null})
    },

  'links.setVisibility'(_id, newVisibility){
    if(!this.userId){
      throw new Meteor.Error('Not logged in', 'User must be logged in to create a link')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      newVisibility: {
        type: Boolean
      }
    }).validate({_id, newVisibility})

    Links.update({_id, userId: this.userId}, {$set: {visible: newVisibility}})
  },

  'links.trackVisit'(_id){
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },

    }).validate({_id})

    Links.update({_id}, {$set:{lastVisitedAt: new Date().getTime()}, $inc: {visitedCount: 1}  })
  }
})
