const express = require('express')
const router = express.Router()
const Car = require('../models/cars')

// GET /cars
router.get('/', (req, res) => {
    Car.find({}, (err, cars) => {
        if (err) return res.status(500).send({ error: 'database failure' })
        res.json(cars)
    })
})

// GET /new 50 cars
router.get('/new50', async (req, res) => {
    try {
        const cars = await Car.find().limit(50).sort({_id: -1})
        res.send(cars)
    } catch (error) {
        res.status(500).json({Error: error.message})
    }
})


// POST /car
// router.post('/', async (req, res) => {
//     // if (req.body.carId.lenght != 7) {
//     //     return res.status(400).json({error: "Bad Request!"})
//     // }
//     const car = new Car()
//     car.stat = req.body.stat
//     car.carId = req.body.carId
//     car.carNum = req.body.carNum
//     car.points = req.body.points

//     try {
//         const newCar = await car.save()
//         res.status(201).json(newCar)
//     } catch (error) {
//         res.status(500).json({ error: 'database failure' })
//     }
// })



module.exports = router