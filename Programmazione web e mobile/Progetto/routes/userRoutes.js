const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getUser
} = require('../controllers/userController');

// ---------------------------------------------------------------------------
//                              GESTIONE UTENTE
// ---------------------------------------------------------------------------

router.post('/user', createUser);
router.post('/user/login', loginUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/user/:id', getUser);

module.exports = router;