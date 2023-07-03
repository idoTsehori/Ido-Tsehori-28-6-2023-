import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'currentCity'

export const cityService = {
  query,
  getById,
  save,
  remove,
  getEmptyCar,
  addCarMsg,
}
window.cs = cityService

async function query() {
  const cities = await storageService.query(STORAGE_KEY)
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, 'i')
    cars = cars.filter((car) => regex.test(car.vendor) || regex.test(car.description))
  }
  if (filterBy.price) {
    cars = cars.filter((car) => car.price <= filterBy.price)
  }
  return cars
}

function getById(carId) {
  return storageService.get(STORAGE_KEY, carId)
}

async function remove(carId) {
  await storageService.remove(STORAGE_KEY, carId)
}

async function save(car) {
  var savedCar
  if (car._id) {
    savedCar = await storageService.put(STORAGE_KEY, car)
  } else {
    // Later, owner is set by the backend
    car.owner = userService.getLoggedinUser()
    savedCar = await storageService.post(STORAGE_KEY, car)
  }
  return savedCar
}

async function addCarMsg(carId, txt) {
  // Later, this is all done by the backend
  const car = await getById(carId)
  if (!car.msgs) car.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  car.msgs.push(msg)
  await storageService.put(STORAGE_KEY, car)

  return msg
}

function getEmptyCar() {
  return {
    vendor: 'Susita-' + (Date.now() % 1000),
    price: utilService.getRandomIntInclusive(1000, 9000),
  }
}

// TEST DATA
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Karov 1', price: 180})
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
// })()