const Router = require('express')
const router = new Router()
const customerController = require('../controllers/customers.controller')

router.post('/customers', customerController.getCustomers)
router.post('/customers-search', customerController.searchCustomers)
router.put('/customer-complete', customerController.completeCustomer)
router.post('/customer-edit', customerController.editCustomers)
router.post('/customer-is-admin', customerController.isAdmin)


module.exports = router
