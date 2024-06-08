import book from "../staticFIles/newBooks.json";
import chapter from "../staticFIles/newChapters.json";
import easton from "../staticFIles/newEaston.json";
import events from "../staticFIles/newEvents.json";
import people from "../staticFIles/newPeople.json";
import peopleGroups from "../staticFIles/newPeopleGroups.json";
import periods from "../staticFIles/newPeriods.json";
import places from "../staticFIles/newPlaces.json";
import verses from "../staticFIles/newVerses.json";

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
                },
                {
                    $graphLookup: {
                        from: "biblegraphs",
                        startWith: uid,
                        connectFromField: "book",
                        connectToField: "uid",
                        as: "book"
                    }
                }
            ],
            parentCheckArr: ["writer", "book"]
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
            parentCheckArr: ["eventsHere", "booksWritten"]
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

export const giveData = (type) => {
    switch(type){
        case "book":
            return book
        case "chapter":
            return chapter
        case "easton":
            return easton
        case "event":
            return events
        case "people":
            return people
        case "peopleGroup":
            return peopleGroups
        case "period":
            return periods
        case "place":
            return places
        case "verse":
            return verses
        default:
            return {
                ...book,
                ...chapter,
                ...easton,
                ...events,
                ...people,
                ...peopleGroups,
                ...periods,
                ...places,
                ...verses
            }
    }
}

export const graphValue = (fieldData, allData) => {
    switch(fieldData.type){
        case "book":
            return {
                ...fieldData
            }
        case "chapter":
            return {
                ...fieldData,
                writer: fieldData.writer.map((item) => {
                    return allData[item]
                }),
                book: fieldData.book.map((item) => {
                    return allData[item]
                })
            }
        case "easton":
            return {
                ...fieldData,
                personLookup: fieldData.personLookup.map((item) => {
                    return allData[item]
                })
            }
        case "event":
            return {
                ...fieldData,
                participants: fieldData.participants.map((item) => {
                    return allData[item]
                }),
                verses: fieldData.verses.map((item) => {
                    return allData[item]
                }),
                locations: fieldData.locations.map((item) => {
                    return allData[item]
                })
            }
        case "people":
            return {
                ...fieldData,
                father: fieldData.father.map((item) => {
                    return allData[item]
                }),
                mother: fieldData.mother.map((item) => {
                    return allData[item]
                }),
                siblings: fieldData.siblings.map((item) => {
                    return allData[item]
                }),
                children: fieldData.children.map((item) => {
                    return allData[item]
                })
            }
        case "peopleGroup":
            return {
                ...fieldData
            }
        case "period":
            return {
                ...fieldData,
                peopleBorn: fieldData.peopleBorn.map((item) => {
                    return allData[item]
                }),
                peopleDied: fieldData.peopleDied.map((item) => {
                    return allData[item]
                }),
                booksWritten: fieldData.booksWritten.map((item) => {
                    return allData[item]
                })
            }
        case "place":
            return {
                ...fieldData,
                eventsHere: fieldData.eventsHere.map((item) => {
                    return allData[item]
                }),
                booksWritten: fieldData.booksWritten.map((item) => {
                    return allData[item]
                })
            }
        case "verse":
            return {
                ...fieldData,
                book: fieldData.book.map((item) => {
                    return allData[item]
                }),
                chapter: fieldData.chapter.map((item) => {
                    return allData[item]
                }),
                people: fieldData.people.map((item) => {
                    return allData[item]
                })
            }
    }
}

export const minimizeFields = (data) => {
    switch(data.type){
        case "book":
            return {
                title: data.bookName,
                uid: data.uid,
                index: data.bookOrder
            }
        case "chapter":
            return {
                title: data.chapterNum,
                uid: data.uid,
                index: data.chapterNum
            }
        case "easton":
            return {
                title: data.termLabel,
                uid: data.uid,
                index: data.index
            }
        case "event":
            return {
                title: data.title,
                uid: data.uid,
                index: data.eventID
            }
        case "people":
            return {
                title: data.name,
                uid: data.uid,
                index: data.personID
            }
        case "peopleGroup":
            return {
                title: data.groupName,
                uid: data.uid,
                index: 0
            }
        case "period":
            return {    
                title: data.yearNum,
                uid: data.uid,
                index: data.isoYear
            }
        case "place":
            return {
                title: data.displayTitle,
                uid: data.uid,
                index: data.placeID
            }
        case "verse":
            return {
                title: data.verseText,
                uid: data.uid,
                index: data.verseID
            }
    }
}