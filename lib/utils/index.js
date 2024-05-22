export const checkNull = (field) => {
    if(field === null || field === undefined) {
        return true;
    }else{
        return false;
    }
}

export const removeParentDuplicate = (obj, fields, uid) => {
    let entry = obj;
    for(let i = 0; i < fields.length; i++){
        for(let j = 0; j < entry[fields[i]].length; j++){
            if(entry[fields[i]][j].uid === uid){
                entry[fields[i]].splice(j, 1);
                break;
            }
        }
    }
    return entry
}

export const getAggregateValue = (type, uid) => {
    const aggregateValues = {
        book: {
            aggregateOptions: [

            ],
            parentCheckArr: []
        },
        chapter: {
            aggregateOptions: [
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "writer",
                        connectToField: "uid",
                        as: "writer"
                    }
                }
            ],
            parentCheckArr: ["writer"]
        },
        easton: {
            aggregateOptions: [
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "personLookup",
                        connectToField: "uid",
                        as: "personLookup"
                    }
                }
            ],
            parentCheckArr: ["personLookup"]
        },
        event: {
            aggregateOptions: [
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "participants",
                        connectToField: "uid",
                        as: "participants"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "verses",
                        connectToField: "uid",
                        as: "verses"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "locations",
                        connectToField: "uid",
                        as: "locations"
                    }
                }
            ],
            parentCheckArr: ["participants", "verses", "locations"]
        },
        peopleGroup: {
            aggregateOptions: [

            ],
            parentCheckArr: []
        },
        people: {
            aggregateOptions: [
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "father",
                        connectToField: "uid",
                        as: "father"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "mother",
                        connectToField: "uid",
                        as: "mother"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "siblings",
                        connectToField: "uid",
                        as: "siblings"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "children",
                        connectToField: "uid",
                        as: "children"
                    }
                }
            ],
            parentCheckArr: ["father", "mother", "siblings", "children"]
        },
        period: {
            aggregateOptions: [
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "peopleBorn",
                        connectToField: "uid",
                        as: "peopleBorn"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "peopleDied",
                        connectToField: "uid",
                        as: "peopleDied"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "booksWritten",
                        connectToField: "uid",
                        as: "booksWritten"
                    }
                }
            ],
            parentCheckArr: ["peopleBorn", "peopleDied", "booksWritten"]
        },
        place: {
            aggregateOptions: [
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "eventsHere",
                        connectToField: "uid",
                        as: "eventsHere"
                    }
                }
            ],
            parentCheckArr: ["eventsHere"]
        },
        verse: {
            aggregateOptions: [
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "book",
                        connectToField: "uid",
                        as: "book"
                    }
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "chapter",
                        connectToField: "uid",
                        as: "chapter"
                    }
                }
            ],
            parentCheckArr: ["book", "chapter"]
        }
    }

    return aggregateValues[type]
}