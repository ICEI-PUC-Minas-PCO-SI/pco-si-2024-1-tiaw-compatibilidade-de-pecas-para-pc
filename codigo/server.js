const cpuRoute = require('./public/assets/data/cpus.json')
const gpuRoute = require('./public/assets/data/gpus.json')
const ramRoute = require('./public/assets/data/rams.json')
const storageRoute = require('./public/assets/data/storages.json')
const motherboardRoute = require('./public/assets/data/motherboards.json')
const coolingRoute = require('./public/assets/data/cooling.json')
const setupRoute = require('./public/assets/data/setups.json')

const jsonServer = require('json-server')
const cors = require('cors')

const routes = {
    cpu: cpuRoute,
    gpu: gpuRoute,
    ram: ramRoute,
    storage: storageRoute,
    motherboard: motherboardRoute,
    cooling: coolingRoute,
    setup: setupRoute,
}

const server = jsonServer.create()
const router = jsonServer.router(routes)
const middlewares = jsonServer.defaults()

server.use(cors())
server.use(middlewares)
server.use(router)
server.listen(3000, () => console.log('🖥️ - Servidor aberto em: http://localhost:3000'))
