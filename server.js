const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let dataStore = [];
let currentId = 1;

app.get('/data', (req, res) => {
    res.json(dataStore);
});

app.post('/data', (req, res) => {
    const { value } = req.body;
    const newItem = { id: currentId++, value };
    dataStore.push(newItem);
    res.status(201).json(newItem);
});

app.put('/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { value } = req.body;
    const item = dataStore.find(d => d.id === id);

    if (item) {
        item.value = value;
        res.json(item);
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

app.delete('/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    dataStore = dataStore.filter(d => d.id !== id);
    res.status(204).send();
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
