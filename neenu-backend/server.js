const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
