type assertT = typeof import('assert')

interface Global {
  assert: assertT
}

declare const assert: assertT
