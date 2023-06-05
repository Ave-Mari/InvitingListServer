const pool = require("./../db/index");

const listsController = {
    testRoute: async (req, res) => {
        try {
            res.status(200).json({message: 'working!!!'})
        } catch (err) {
            console.error(err.message)
        }
    },
    getAllFromFriendsList: async (req, res) => {
        try {
            const allFriends = await pool.query('SELECT * FROM friendslist');
            res.json(allFriends.rows);
        } catch (err) {
            console.error(err.message)
        }
    },
    createAnEvent: async (req, res) => {
        const eventData = req.body;
        const eventDataModified = 'invitinglist_' + String(eventData.eventName) + '_' + String(eventData.eventDate);
        try {
            const createNewTable = await pool.query(`
                CREATE ${eventDataModified} (person_id, name, pic, email)
            `)
    
        } catch (error) {
            console.error(error.message);
        }
    }, 
    getListOfAllEvents: '',
    fromFriendslistToInvitinglist: async (req, res) => {
        try {
            const { person_id, name, pic }  = req.body;
            const personId = req.params.person_id;
    
            const moveToInvitingList = await pool.query(`
                INSERT INTO invitinglist (person_id, name, pic, email)   
                SELECT person_id, name, pic, email   
                FROM friendslist  
                WHERE person_id = ${personId} AND person_id IS NOT NULL AND name IS NOT NULL AND pic IS NOT NULL;
                `);
    
            const deleteFromFriendsList = await pool.query(`DELETE FROM friendslist WHERE person_id =${personId}
            `);       
    
            res.status(200).json({ message: 'Friend moved to Inviting List successfully' });
        } catch (err) {
            console.error(err.message);
        }
    },
    deleteFromInvitingList: async (req, res) => {
        try {
            const personId = req.params.person_id;
    
            const moveToFriendsList = await pool.query(`
            INSERT INTO friendslist (person_id, name, pic, email)
            SELECT person_id, name, pic, email
            FROM invitinglist
            WHERE person_id=${personId} AND person_id IS NOT NULL AND name IS NOT NULL AND pic IS NOT NULL AND email IS NOT NULL;
            `);
            const deleteFromInvitingList = await pool.query(`
            DELETE FROM invitinglist 
            WHERE person_id =${personId}
            `);
    
            res.status(200).json({ message: 'Friend moved to Friends List successfully' });
            
        } catch (error) {
            console.error(error.message)
        }
        
    }

}

module.exports = listsController;
