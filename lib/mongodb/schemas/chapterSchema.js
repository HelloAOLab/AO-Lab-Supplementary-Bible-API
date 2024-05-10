import {Schema} from "mongoose";

const chapterSchema = Schema({
    osisRef: String,
    book: [String],
    chapterNum: Number,
    verses: [String],
    slug: String,
    peopleCount: Number,
    placesCount: Number,
    modified: String,
    'writer count': Number,
    writer: [String],
    uid: String,
    type: String
});

export default chapterSchema;