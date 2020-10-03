const data = {
    "users": [{
            "user": "admin",
            "pass": "password",
            "id": 1,
        },
        {
            "user": "admin1",
            "pass": "password2",
            "id": 2,
        },
    ],
};
//extract from db
function getRow(id) {
    for (let item of data.users) {
        if (item.id == id) {
            return item;
        }
    }
    return false;
}

function findID(users, id) {
    return users.indexOf(getRow(id));
}

exports.findID = findID;
exports.data = data;
exports.getRow = getRow;