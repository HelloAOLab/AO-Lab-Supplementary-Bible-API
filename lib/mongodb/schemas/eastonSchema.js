import {Schema} from "mongoose";

const eastonSchema = Schema({
    dictLookup: String,
    termID: String,
    termLabel: String,
    def_id: String,
    has_list: String,
    itemNum: Number,
    matchType: String,
    matchSlugs: String,
    dictText: String,
    index: Number,
    personLookup: [String],
    placeLookup: [String],
    uid: String,
    type: String
  });

export default eastonSchema;