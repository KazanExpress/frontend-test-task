type assertT = typeof import('assert')

type process = {
  env: { DEBUG: boolean; NODE_ENV: 'development' | 'production' }
}

// interface Global {
//   assert: assertT
//   process: process
// }

declare const assert: assertT
declare const process: process
