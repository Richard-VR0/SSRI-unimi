const express = require('express');
const router = express.Router();

const {
    getRestaurants,
    searchRestaurants,
    getRestaurantById,
    getRestaurantMenu,
    searchRestaurantMenu,
    manageRestaurantMenu,
    saveRestaurantMenu
} = require('../controllers/restaurantController');

// ---------------------------------------------------------------------------
//                              LISTA RISTORANTI
// ---------------------------------------------------------------------------

router.get('/restaurants', getRestaurants);
router.get('/restaurants/search', searchRestaurants);

// ---------------------------------------------------------------------------
//                  VETRINA RISTORANTE (DETTAGLI + MENU)
// ---------------------------------------------------------------------------

router.get('/restaurant/:id', getRestaurantById);
router.get('/restaurant/:id/menu', getRestaurantMenu);
router.get('/restaurant/:id/menu/search', searchRestaurantMenu);

// ---------------------------------------------------------------------------
//                              GESTIONE MENU
// ---------------------------------------------------------------------------

router.get('/restaurant/:id/menu/gestione', manageRestaurantMenu);
router.post('/restaurant/:id/menu/save', saveRestaurantMenu);

module.exports = router;