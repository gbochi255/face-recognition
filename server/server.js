


import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import knex from "knex";
import dotenv from "dotenv";
//import Clarifai from 'clarifai';
dotenv.config();

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //localhost
    port: 5432,
    user: "chigbogwunnamani",
    password: "",
    database: "smart_brain",
  },
});

const app = express();
//middleware
app.use(cors());
app.use(express.json());


//const clarifaiApp = new Clarifai.App({
  //  apiKey: process.env.CLARIFAI_API_KEY
//});




app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
    }
    try {
        const [loginRecord] = await db('login').select('hash').where({ email });
        if (!loginRecord) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const isValid = await bcrypt.compare(password, loginRecord.hash);
        if (!isValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const [user] = await db('users').select('*').where({ email });
        return res.json(user);

    }catch(err) {
        console.error('Signin error:', err);
        return res.status(500).json({ error: 'Unable to sign in' });
    }
});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing registration feilds' });
    }
    const hash = await bcrypt.hash(password, 12);
    try {
        const newUser = await db.transaction(async trx => {
            const [loginEmailRow] = await trx('login')
            .insert({ email, hash })
            .returning('email');

            const [user] = await trx('users')
            .insert({ 
                name,
                email: loginEmailRow.email,
                joined: new Date()
            })
            .returning('*');
            return user;
        });
        return res.json(newUser);
    }catch(err) {
        console.error('Registration error:', err);
        return res.status(500).json({ error: 'Unable to register' });
    }
});

app.get('/profile/:id', async(req, res) => {
    const { id } = req.params;
    try{
        const [user] =await db('users').select('*').where({ id });
        if(!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        return res.json(user);
    }catch(err) {
        console.error('Profile error:', err);
        return res.status(500).json({ error: 'Error retrieving user' });
    }
});

app.put('/image', async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: 'Missing user ID' });
    }
    try{
        const [updated] = await db('users')
        .where({ id })
        .increment('entries', 1)
        .returning('entries');
        return res.json({ entries: updated.entries });
    }catch(err) {
        console.error('Image entries error:', err);
        return res.status(500).json({ error: 'Unable to update entries' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
