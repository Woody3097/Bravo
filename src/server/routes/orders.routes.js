const Router = require("express");
const router = new Router();
const ordersController = require("../controllers/orders.controller");

router.post("/orders", ordersController.getOrders);
router.post("/orders-confirm", ordersController.confirmOrder);

module.exports = router;
