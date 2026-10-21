const express = require('express');
const router = express.Router();

const {
    createOrder,
    getOrderById,
    addReview,
    getRestaurantOrders,
    updateOrderStatus,
    getRestaurantReview
} = require('../controllers/orderController');

// ---------------------------------------------------------------------------
//                              ORDINI CLIENTE
// ---------------------------------------------------------------------------

router.post('/order', createOrder);
router.get('/orders/client/:id', getOrderById);
router.patch('/order/:id/review', addReview);

// ---------------------------------------------------------------------------
//                              ORDINI RISTORANTE
// ---------------------------------------------------------------------------

router.get('/orders/restaurant/:id', getRestaurantOrders);
router.patch('/order/:id/status', updateOrderStatus);
router.get('/restaurant/:id/reviews', getRestaurantReview);

module.exports = router;