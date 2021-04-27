const express = require('express')
const axios = require('axios')
const app = express()
const ART_API = 'https://collectionapi.metmuseum.org/public/collection/v1';

const convertorImage = (image) => ({
  title: image.title,
  fullImage: image.primaryImage,
  smallImage: image.primaryImageSmall,
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', async (req, res) => {
  const { data: products } = await axios.get(`${ART_API}/objects?departmentIds=12`)
  console.log('products',products)
  res.send(products);
})

app.get('/api/products/:productId', async (req, res) => {
  const image = await axios.get(`${ART_API}/objects/${req.params.productId}`)
  console.log('image',image.data)
  res.send(convertorImage(image.data))
})


module.exports = app;