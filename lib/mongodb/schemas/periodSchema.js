import {Schema} from "mongoose";

const peopleGroupSchema = Schema({
    yearNum: String,
    peopleBorn: [String],
    events: String,
    isoYear: Number,
    'BC-AD': String,
    formattedYear: String,
    modified: String,
    peopleDied: [String],
    booksWritten: [String],
    uid: String,
    type: String
});

export default peopleGroupSchema;