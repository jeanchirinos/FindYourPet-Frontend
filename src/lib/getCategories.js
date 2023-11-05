async function getCategories() {
  const res = await fetch('https://api-encuentratumascota.nijui.com/api/category ', {
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
  })

  const json = await res.json()

  // save json in json file
  const fs = require('fs')
  fs.writeFileSync('src/lib/categories.json', JSON.stringify(json))
}

getCategories()
