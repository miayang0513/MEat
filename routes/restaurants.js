const express = require('express')
const router = express.Router()
const Restaurant = require('../models/restaurant')

/*
prefix: "/restaurants"
*/

router.get('/new', (req, res) => {
  res.render('new')
})

// 新增店家
router.post('/', (req, res) => {
  const restaurant = Restaurant({
    ...req.body,
    userId: req.user._id }
  )

  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect(`/`)
  })
})

// 收尋店家
router.get('/search', (req, res) => {
  const regKeyword = RegExp(`${req.query.keyword}`, 'i')
  const region = req.query.region ? req.query.region : { $exists: true }
  const sort = req.query.sort ? req.query.sort.split('_') : ['name', 'asc']
  Restaurant.find({
    region: region,
    $or: [
      { name: regKeyword },
      { category: regKeyword }
    ]
  }).sort({ [sort[0]]: sort[1] }).exec((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants, keyword: req.query.keyword, region: req.query.region })
  })
})

// 詳細店家頁面
router.get('/:id', (req, res) => {
  Restaurant.findOne({ _id: req.params.id }, (err, restaurant) => {
    if (err) return console.error(err)
    Restaurant.find({ userId: { $ne: req.user._id }, _id: { $ne: req.params.id } }, (err, restaurants) => {
      if (err) return console.error(err)
      return res.render('show', { restaurant, recommend: restaurants })
    })
  })
})

// 修改頁面
router.get('/:id/edit', (req, res) => {
  Restaurant.findOne({ userId: req.user._id, _id: req.params.id }, (err, restaurant) => {
    if (err) return console.error(err)
    console.log(restaurant)
    return res.render('edit', { restaurant })
  })
})

// 修改單筆資料
router.put('/:id', (req, res) => {
  Restaurant.findOne({ userId: req.user._id, _id: req.params.id }, (err, restaurant) => {
    if (err) return console.error(err)
    for (let item in req.body) {
      restaurant[item] = req.body[item]
    }
    restaurant.save(err => {
      if (err) return console.error(err)
      return res.redirect(`/restaurants/${req.params.id}`)
    })
  })
})

// 刪除店家資料
router.delete('/:id', (req, res) => {
  console.log(req.params.id)
  Restaurant.findOne({ userId: req.user._id, _id: req.params.id }, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

module.exports = router
