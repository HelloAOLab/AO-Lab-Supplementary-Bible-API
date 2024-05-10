import {Schema} from "mongoose";

const verseSchema = Schema({
    osisRef: String,
    verseNum: String,
    verseText: String,
    book: [String],
    eventsDescribed: String,
    people: [String],
    yearNum: Number,
    chapter: [String],
    status: String,
    mdText: String,
    richText: String,
    verseID: String,
    timeline: [String],
    peopleCount: Number,
    placesCount: Number,
    modified: String,
    places: [String],
    peopleGroups: [String],
    uid: String,
    type: String
});

export default verseSchema;