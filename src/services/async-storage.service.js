export const storageService = {
  query,
  get,
  post,
  put,
  remove,
}

function query(entityType, delay = 500) {
  const entitie = JSON.parse(localStorage.getItem(entityType))
  return new Promise((resolve) => setTimeout(() => resolve(entitie), delay))
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity._id === entityId)
    if (!entity)
      throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    return entity
  })
}

function post(entityType, newEntity) {
  let updatedEntity = newEntity._id ? newEntity : { ...newEntity, _id: _makeId() }
  if (entityType === 'FavoriteCities') {
    return query(entityType).then((favCities) => {
      updatedEntity = favCities.concat(updatedEntity)
      _save(entityType, updatedEntity)
    })
  }
  _save(entityType, updatedEntity)
  return updatedEntity
}

function put(entityType, updatedEntity) {
  updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      )
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    if (idx < 0)
      throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
    entities.splice(idx, 1)
    _save(entityType, entities)
    return entities
  })
}

// Private functions
function _save(entityType, entity) {
  localStorage.setItem(entityType, JSON.stringify(entity))
  // localStorage.setItem(entityType, entity)
}

function _makeId(length = 5) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
