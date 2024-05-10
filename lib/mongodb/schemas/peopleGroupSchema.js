import {Schema} from "mongoose";

const peopleGroupSchema = Schema({
    groupName: String,
    members: [String],
    events_dev: [String],
    modified: String,
    verses: [String],
    partOf: [String],
    events: String,
    uid: String,
    type: String
  });

export default peopleGroupSchema;