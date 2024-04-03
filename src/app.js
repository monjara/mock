const express = require('express')
const { PORT } = require('./constants')
const {
  initDataSource,
  findAll,
  findById,
  insertData,
  updateData,
  deleteData
} = require('./datasource')

const app = express()

app.disable('etag')
app.use(express.json())

app.use('/:resource', (req, _res, next) => {
  initDataSource(req.params.resource)
  next()
})

app.get('/:resource', (req, res) => {
  const { resource } = req.params
  const items = findAll(resource)
  res.status(200).json(items)
})

app.get('/:resource/:id', (req, res) => {
  const { resource, id } = req.params
  const item = findById(resource, id)
  res.status(200).json(item)
})

app.post('/:resource', (req, res) => {
  const { resource } = req.params
  const data = req.body
  insertData(resource, data)
  res.sendStatus(200)
})

app.put('/:resource/:id', (req, res) => {
  const { resource, id } = req.params
  const data = req.body
  updateData(resource, id, data)
  res.sendStatus(200)
})

app.delete('/:resource/:id', (req, res) => {
  const { resource, id } = req.params
  deleteData(resource, id)
  res.sendStatus(200)
})

app.listen((PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

