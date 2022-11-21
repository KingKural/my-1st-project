const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let listOfPersons = [{
    id: 11,
    name: "Jane",
    phone: 123456
}, {
    id: 12,
    name: "Jey",
    phone: 234567
}, {
    id: 13,
    name: "Jimmy",
    phone: 345678
}, {
    id: 14,
    name: "John",
    phone: 456789
}, {
    id: 15,
    name: "Julius",
    phone: 567891
},]

function generateID() {
    return listOfPersons[listOfPersons.length - 1].id + 1
}

app.get('/persons', (req, res) => {
    const searchName = req.query.name;


    if (searchName != undefined) {
        let result = [];
        for (let person of listOfPersons) {
            if (person.name == searchName) { result.push(person) }
        }
        res.send(result);
    } else {
        res.send(listOfPersons)
    }
})

app.get('/persons/:id', (req, res) => {
    const searchId = req.params.id
    for (let person of listOfPersons) {
        if (person.id == searchId) {
            res.send(person);
            return;
        }
    }
    res.status(404);
    res.send({ message: `The Princess id ${searchId} is in another castle!` });
})

app.put('/persons/:id', (req, res) => {
    const searchId = req.params.id;
    const dataToUpdate = req.body;

    for (let person of listOfPersons) {
        if (person.id == searchId) {
            person.name = dataToUpdate.name;
            person.phone = dataToUpdate.phone;
            res.send(person)
            return
        }
    }

    res.status(404);
    res.send({ message: `The Princess id ${searchId} is in another castle!` });

})

app.delete('/persons/:id', (req, res) => {
    const searchId = req.params.id;
    let position = ""
    for (let pos in listOfPersons) {
        if (listOfPersons[pos].id == searchId) { position = listOfPersons[pos] }}
        res.send(listOfPersons.splice(position, 1))
        res.status(204);
        res.send({ message: `The Princess id ${searchId} is Kaput!` });
        return
    
}


)

app.post('/persons', (req, res) => {
    req.body.id = generateID();
    res.send(listOfPersons.push(req.body))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})