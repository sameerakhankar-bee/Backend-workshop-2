const express = require("express");
const router = express.Router();

const roleController = require("../controller/role");

router.post(
    "/create",
    roleController.createRole
);

router.get(
    "/all",
    roleController.getRoles
);

router.get(
    "/:id",
    roleController.getRoleById
);

router.put(
    "/:id",
    roleController.updateRole
);

router.delete(
    "/:id",
    roleController.deleteRole
);

module.exports = router;