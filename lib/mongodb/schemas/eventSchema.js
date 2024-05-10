import {Schema} from "mongoose";

const eventSchema = Schema({
    title: String,
    startDate: String,
    duration: String,
    participants: [String],
    verses: [String],
    eventID: Number,
    modified: String,
    verseSort: String,
    sortKey: Number,
    'people (from verses)': [String],
    locations: [String],
    partOf: [String],
    'places (from verses)': [String],
    predecessor: [String],
    rangeFlag: 'boolean',
    lag: String,
    lagType: String,
    notes: String,
    groups: [String],
    uid: String,
    type: String
});

export default eventSchema;