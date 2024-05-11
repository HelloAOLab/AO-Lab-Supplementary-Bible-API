import {Schema} from "mongoose";

const peopleSchema = Schema({
    personLookup: String,
    personID: Number,
    name: String,
    isProperName: Boolean,
    gender: String,
    birthYear: [String],
    deathYear: [String],
    memberOf: [String],
    birthPlace: [String],
    deathPlace: [String],
    dictionaryLink: String,
    dictionaryText: String,
    verses: [String],
    siblings: [String],
    mother: [String],
    father: [String],
    children: [String],
    displayTitle: String,
    status: String,
    partners: [String],
    eastons: [String],
    timeline: [String],
    verseCount: Number,
    minYear: Number,
    maxYear: Number,
    alphaGroup: String,
    slug: String,
    "Easton's Count": Number,
    dictText: [String],
    modified: String,
    ambiguous: Boolean,
    'Disambiguation (temp)': String,
    events: String,
    alsoCalled: String,
    halfSiblingsSameMother: [String],
    halfSiblingsSameFather: [String],
    chaptersWritten: [String],
    surname: String,
    uid: String,
    type: String
});

export default peopleSchema;