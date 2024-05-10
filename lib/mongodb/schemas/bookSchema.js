import {Schema} from "mongoose";

const bookSchema = Schema({
    osisName: String,
    bookName: String,
    bookDiv: String,
    shortName: String,
    bookOrder: Number,
    verses: [String],
    chapters: [String],
    testament: String,
    chapterCount: Number,
    verseCount: Number,
    writers: [String],
    slug: String,
    peopleCount: Number,
    placeCount: Number,
    yearWritten: [String],
    placeWritten: [String],
    uid: String,
    type: String
});

export default bookSchema;