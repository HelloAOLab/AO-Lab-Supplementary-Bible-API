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