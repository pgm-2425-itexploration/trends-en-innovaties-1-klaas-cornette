import { Mongo } from 'meteor/mongo';
//haal de messages collectie op
export const Messages = new Mongo.Collection('messages');
