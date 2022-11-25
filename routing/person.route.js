const express = require('express')
const router = express.Router()

let listOfPersons = [
    {
        id: 11,
        name: "Kraven",
        phone: 123456
    },
    {
        id: 12,
        name: "Shocker",
        phone: 234567
    },
    {
        id: 13,
        name: "NightCrawler",
        phone: 345678
    },
    {
        id: 14,
        name: "BlackBolt",
        phone: 456789
    },
    {
        id: 15,
        name: "Jennifer",
        phone: 567891
    }
];

function generateId() {
    const lastPerson = listOfPersons[listOfPersons.length - 1];
    return lastPerson.id + 1;
}

router.get('/:id', (req, res) => {
    const searchId = req.params.id;

    for (let person of listOfPersons) {
        if (person.id == searchId) {
            res.send(person);
            return;
        }
    }

    res.status(404);
    res.send({ message: `Person with id ${searchId} not found!` });
})

router.get('', (req, res) => {
    const searchName = req.query.name;

    if (searchName != undefined) {
        let result = [];

        for (let person of listOfPersons) {
            if (person.name == searchName) {
                result.push(person);
            }
        }

        res.send(result);
    } else {
        res.send(listOfPersons);
    }

})

router.post('', (req, res) => {

    let newPerson = req.body;
    newPerson.id = generateId();

    listOfPersons.push(newPerson);

    res.status(201);
    res.send(newPerson);
})

router.put('/:id', (req, res) => {

    const searchId = req.params.id;
    const dataToUpdate = req.body;

    for (let person of listOfPersons) {
        if (searchId == person.id) {
            person.name = dataToUpdate.name;
            person.phone = dataToUpdate.phone;
            res.send(person);
            return;
        }
    }

    res.status(404);
    res.send({ message: `Person with id ${searchId} not found!` });

})



router.delete('/:id', (req, res) => {

    const searchId = req.params.id;

    for (let pos in listOfPersons) {

        const personId = listOfPersons[pos].id;

        if (personId == searchId) {
            listOfPersons.splice(pos, 1);
            res.status(204);
            res.send();
            return;
        }
    }

    res.status(404);
    res.send({ message: `Person with id ${searchId} not found!` });

})


module.exports = router;