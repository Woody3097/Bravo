const Router = require("express");
const router = new Router();
const catalogController = require("../controllers/catalog.controller");

router.post("/catalog", catalogController.getCatalog);
router.post("/catalog-search", catalogController.searchCatalog);
router.post("/catalog-del", catalogController.deleteCatalogEl);
//router.post("/catalog-add", catalogController.addCatalogEl);

module.exports = router;
