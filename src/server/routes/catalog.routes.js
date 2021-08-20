const Router = require("express");
const router = new Router();
const catalogController = require("../controllers/catalog.controller");

router.post("/catalog", catalogController.getCatalog);
router.post("/catalog-search", catalogController.searchCatalog);
router.post("/catalog-del", catalogController.deleteProduct);
router.put("/catalog-edit", catalogController.editProduct);
router.post("/catalog-add", catalogController.addProduct);
router.post("/catalog-sort", catalogController.sortCatalog);
router.post("/catalog-replace", catalogController.replaceCatalog);

module.exports = router;
