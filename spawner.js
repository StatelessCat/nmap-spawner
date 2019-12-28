const { spawn } = require('child_process')
const fs = require('fs')

const fsPromises = fs.promises

const myspawn = (i) => {
  const command = spawn('nmap', [
    `82.${i}.0-255.0-255`,
    '-v', '-A', '-T5', '--randomize-hosts',
  ], {})

  const iprange = `nmapip:{82.${i}.0-255.0-255}`

  command.stdout.on('data', (data) => {
    fsPromises.appendFile('./out', iprange + data)
      // eslint-disable-next-line no-console
      .then(() => console.log('Write finished'))
      // eslint-disable-next-line no-console
      .catch(() => console.error('Write error'))
    // eslint-disable-next-line no-console
    console.log(`stdout: ${iprange}:${data}`)
  })

  command.stderr.on('data', (data) => {
    // eslint-disable-next-line no-console
    console.error(`stderr: ${data}`)
  })

  command.on('close', (code) => {
    // eslint-disable-next-line no-console
    console.log(`child process exited with code ${code}`)
  })
}

const count = 45
const start = 150

for (let i = start; i <= start + count; ++i) {
  setTimeout(() => {
    myspawn(i)
  }, Math.random() * 10000)
}
