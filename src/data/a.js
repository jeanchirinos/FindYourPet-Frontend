// const distritos = require('./distritos.json')

// function generateData() {
//   const fs = require('fs')

//   const newDistritos = Object.values(distritos).flat()

//   fs.writeFileSync('src/data/distritosConverted.json', JSON.stringify(newDistritos))
// }

// generateData()

// const provincias = require('./provincias.json')

// function generateData() {
//   const fs = require('fs')

//   const newProvincias = Object.values(provincias).flat()

//   fs.writeFileSync('src/data/provinciasConverted.json', JSON.stringify(newProvincias))
// }

// generateData()

const distritos = require('./distritos.json')

function generateData() {
  const fs = require('fs')

  const newDistritos = Object.values(distritos).flat()

  fs.writeFileSync('src/data/distritosConverted.json', JSON.stringify(newDistritos))
}

generateData()
