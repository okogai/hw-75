import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

const Vigenere = require('caesar-salad').Vigenere;


app.post('/decode', (req, res) => {
    const { password, message } = req.body;

    if (!message || !password) {
        res.status(400).json({ error: "Password and message are required" });
    }
    const decodedText = Vigenere.Decipher(password).crypt(message);
    res.send({ message: decodedText });
});

app.post('/encode', (req, res) => {
    const { password, message } = req.body;

    if (!message || !password) {
        res.status(400).json({ error: "Password and message are required" });
    }
    const encodedText = Vigenere.Cipher(password).crypt(message);
    res.send({ message: encodedText });
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
