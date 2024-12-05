import express from 'express';
import cors from 'cors';

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

const Vigenere = require('caesar-salad').Vigenere;

app.post('/decode', (req, res) => {
    const {password, message} = req.body;
    if (password && message) {
        const decodedMessage = Vigenere.Decipher(password).crypt(message);
        res.send(decodedMessage);
    }
});

app.post('/encode', (req, res) => {
    const { password, message } = req.body;
    if (password && message) {
        const encodedText = Vigenere.Cipher(password).crypt(message);
        res.send(encodedText);
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
