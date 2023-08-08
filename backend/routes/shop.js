const router = require('express').Router();
const Shop = require("../models/Shop");


router.get('/find', (req,res)=>{
  Shop.find({}, (err, findShops) => {
    if (!err) {
      res.send(findShops);
    }
  });
})

router.get('/find/:id', (req, res) => {
  const id = req.params.id;
  
  Shop.findById(id)
    .then(data => {
      if (!data) {
        res.status(404).send(
          { message: `Shop not found` });
      } else {
        res.send(data)
    }
    })
    .catch(err => {
    res.status(500).send({message: "Error"})
  })
    
  })


module.exports = router;
