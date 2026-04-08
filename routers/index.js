const express = require("express");

const router = express.Router();

router.use(require("./todoCreate"));
router.use(require("./todoShow"));
router.use(require("./todoUpdate"));
router.use(require("./todoDelete"));

module.exports = router;
