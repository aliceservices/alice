/// <reference path="./index.d.ts" />
import { spawn } from 'child_process'
import { writeFileSync } from 'fs'

import { findAndTerminate } from './src/server/util'
import { WEBPACK_SERVER_PID_FILE } from './src/constants'

process.once('SIGUSR2', () => {
  findAndTerminate(WEBPACK_SERVER_PID_FILE)

  process.kill(process.pid, 'SIGUSR2')
})

const webpackServer = spawn(
  'webpack-dev-server',
  [],
  { stdio: 'inherit' }
)

writeFileSync(WEBPACK_SERVER_PID_FILE, `${webpackServer.pid}
`)
