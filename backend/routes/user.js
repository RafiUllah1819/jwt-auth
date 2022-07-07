const router = require("express").Router();

const authmiddleware = require('../middlewares/authMiddleWares');

router.get("/get-user-info", authmiddleware, async(req,res)=>{
    try {
        res.send({success:true, data: req.body.user});
    } catch (error) {
        
    }
})

module.exports = router;