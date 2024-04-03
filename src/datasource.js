const fs = require('fs')
const yml = require('js-yaml')
const {
  CHARASET,
  DATASOURCE_DIR,
  YAML_EXTENSION,
  YAML_TEMPLATE
} = require('./constants')

const getDataSouceName = (basename) => {
  return `${DATASOURCE_DIR}/${basename}.${YAML_EXTENSION}`
}

const initDataSource = (resource) => {
  const path = getDataSouceName(resource)
  const existsDataSource = fs.existsSync(path)
  if (!existsDataSource) {
    fs.writeFileSync(path, YAML_TEMPLATE, CHARASET)
  }
}

const findAll = (resource) => {
  const path = getDataSouceName(resource)
  const txt = fs.readFileSync(path, CHARASET)
  return yml.load(txt).items ?? []
}

const findById = (resource, id) => {
  const items = findAll(resource)
  return items.find((item) => item.id === Number(id)) ?? {}
}

const insertData = (resource, data) => {
  const path = getDataSouceName(resource)
  const items = findAll(resource)
  const id = items.length > 0
    ? Math.max(...items.map(v => v.id)) + 1
    : 1
  const txt = yml.dump([{ id, ...data }])
  fs.appendFileSync(path, txt, CHARASET)
}

const updateData = (resource, id, data) => {
  const path = getDataSouceName(resource)
  const items = findAll(resource)
    .filter(v => v.id !== Number(id))

  items
    .push({ id: Number(id), ...data })
  items
    .sort((a, b) => a.id - b.id)

  const txt = yml.dump(items)
  fs.writeFileSync(path, YAML_TEMPLATE, CHARASET)
  fs.appendFileSync(path, txt, CHARASET)
}

const deleteData = (resource, id) => {
  const path = getDataSouceName(resource)
  const items = findAll(resource)
    .filter(v => v.id !== Number(id))

  const txt = yml.dump(items)
  fs.writeFileSync(path, YAML_TEMPLATE, CHARASET)
  fs.appendFileSync(path, txt, CHARASET)
}

module.exports = {
  initDataSource,
  findAll,
  findById,
  insertData,
  updateData,
  deleteData
}
