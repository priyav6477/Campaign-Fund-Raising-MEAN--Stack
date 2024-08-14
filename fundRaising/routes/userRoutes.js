const express = require('express');
const { validateId, validate } = require('../utils/validate');
const { getUserById, getAllUsers, getUsersByRole, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/get/:id',validateId,validate,getUserById);
router.get('/getAll',getAllUsers);
router.get('/getByRole/:role',getUsersByRole);
router.put('/update/:id',validateId,validate,updateUser);
router.delete('/delete/:id',validateId,validate,deleteUser);

module.exports = router;