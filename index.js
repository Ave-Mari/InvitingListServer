const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES

//test route 
app.get('/', async (req, res) => {
    try {
        res.status(200).json({message: 'working!!!'})
    } catch (err) {
        console.error(err.message)
    }
})

//get all friends list DONE
app.get('/friends-list', async (req, res) => {
    try {
        const allFriends = await pool.query('SELECT * FROM friendslist');
        res.json(allFriends.rows);
    } catch (err) {
        console.error(err.message)
    }
})

//create an event
app.post('/create-new-inviting-list', async (req, res) => {
    const eventData = req.body;
    const eventDataModified = 'invitinglist_' + String(eventData.eventName) + '_' + String(eventData.eventDate);
    try {
        const createNewTable = await pool.query(`
            CREATE ${eventDataModified} (person_id, name, pic)
        `)

    } catch (error) {
        console.error(error.message);
    }
});

//get list of all events
app.get('/get-list-of-tables', async (req, res) => {
    try {
        const getListOfTables = await pool.query(`
                SELECT tablename
                FROM pg_catalog.pg_tables
                WHERE schemaname = 'public'
        `)

        res.json(getListOfTables);
    } catch (error) {
        console.error(error.message)
    }
})

//create an inviting list with date and event name (name type: "invitinglist_eventname_2023-05-23")
//get friends from inviting list DONE
app.get('/inviting-list', async (req, res) => {
    try {
        const allInvitedFriends = await pool.query('SELECT * FROM invitinglist');
        res.json(allInvitedFriends.rows);
    } catch (err) {
        console.error(err.message)
    }
})


//add a specific person from friendslist to invitinglist DONE
app.put('/move-to-inviting-list/:person_id', async (req, res) => {
    try {
        const { person_id, name, pic }  = req.body;
        const personId = req.params.person_id;

        const moveToInvitingList = await pool.query(`
            INSERT INTO invitinglist (person_id, name, pic)   
            SELECT person_id, name, pic   
            FROM friendslist  
            WHERE person_id = ${personId} AND person_id IS NOT NULL AND name IS NOT NULL AND pic IS NOT NULL;
            `);

        const deleteFromFriendsList = await pool.query(`DELETE FROM friendslist WHERE person_id =${personId}
        `);       

        res.status(200).json({ message: 'Friend moved to Inviting List successfully' });
    } catch (err) {
        console.error(err.message);
    }
});

//delete a specific person fronm inviting list and move them to friendslist DONE
app.put('/move-to-friends-list/:person_id', async (req, res) => {
    try {
        const personId = req.params.person_id;

        const moveToFriendsList = await pool.query(`
        INSERT INTO friendslist (person_id, name, pic)
        SELECT person_id, name, pic
        FROM invitinglist
        WHERE person_id=${personId} AND person_id IS NOT NULL AND name IS NOT NULL AND pic IS NOT NULL;
        `);
        const deleteFromInvitingList = await pool.query(`
        DELETE FROM invitinglist 
        WHERE person_id =${personId}
        `);

        res.status(200).json({ message: 'Friend moved to Friends List successfully' });
        
    } catch (error) {
        console.error(error.message)
    }
    
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000");
});
