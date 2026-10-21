const express = require('express');
const router = express.Router();

const {
    getMealById,
    getMeals
} = require('../controllers/mealController');

// ---------------------------------------------------------------------------
//                          INFORMAZIONI PIATTI
// ---------------------------------------------------------------------------

router.get('/meals', getMeals);
router.get('/meals/:id', getMealById);

module.exports = router;