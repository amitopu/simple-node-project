const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello from my smart app");
});

const users = [
    { id: 1, name: "Sabuj", age: 21 },
    { id: 2, name: "Obuj", age: 23 },
    { id: 3, name: "Labu Mia", age: 31 },
    { id: 4, name: "Boroi Chowdhury", age: 45 },
    { id: 5, name: "Kaji Mia", age: 20 },
    { id: 6, name: "Latapata Khan", age: 33 },
    { id: 7, name: "Random Vai", age: 18 },
];
app.get("/users", (req, res) => {
    console.log(req.query);
    if (req.query.name) {
        const search = req.query.name.toLowerCase();
        const matched = users.filter((u) =>
            u.name.toLowerCase().includes(search)
        );
        res.send(matched);
    } else {
        res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    console.log(req.params);
    const data = users.filter((user) => {
        return user.id == req.params.id;
    });
    if (data.length == 0) {
        res.send("Data not found");
    } else {
        res.send(data);
    }
});

app.post("/user", (req, res) => {
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
});

app.listen(port, () => {
    console.log(`app is running and listening on port ${port}`);
});
