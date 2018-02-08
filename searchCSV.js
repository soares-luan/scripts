//node V6.10
/* 
read the csv file and save data found in
the same directory as the script executed

how to run
node searchCSV.js ~/Downloads/ipanema_bindings_homolog.csv "productId (N)"
*/
const fs = require('fs')
const assert = require('assert')

const searchCsv = () => {
  assert(process.argv[2], 'path not especified')
  assert(process.argv[3], 'field not especified')

  let path = process.argv[2] // absolute path of file
  let field = process.argv[3] // header 

  const csv = fs.readFileSync(path, 'utf8')

  const lines = csv.split('\n')

  let dataFound = []
  let fieds = []
  let position

  let header = lines.shift()

  const headers = header.split(',')
  position = headers.findIndex(d => {
    return d.indexOf(field) > -1
  })

  lines.forEach((data, i) => {
    data = data.replace(/"/g, "").replace(/'/g, "").split(',')
    if (data[position] != null && dataFound.indexOf(data[position]) < 0)
      dataFound.push(data[position])
  })
  let date = new Date()
  fs.writeFile(`extracted_${field}_${date.getTime()}.txt`, dataFound.join(','))
  console.log(`Data Founded ${dataFound.length} lines`)
}

searchCsv()