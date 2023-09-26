import { describe, expect, it } from 'vitest'
import { compareVersion, getMaxVersion } from '../src'

describe('should', () => {
  it('exported', () => {
    expect(1).toEqual(1)
  })
})

describe('compareVersion', () => {
  it('exported pre', () => {
    expect(compareVersion('1.3.2-alpha', '1.3.2-beta')).toMatchInlineSnapshot('-1')
  })

  it('exported version', () => {
    expect(compareVersion('1.2.1', '1.2.0')).toMatchInlineSnapshot('1')
  })
})

describe('maxVersion', () => {
  it('exported pre', () => {
    expect(getMaxVersion('1.3.2-alpha', '1.3.2-beta')).toMatchInlineSnapshot('"1.3.2-beta"')
  })

  it('exported version', () => {
    expect(getMaxVersion('1.2.1', '1.2.0')).toMatchInlineSnapshot('"1.2.1"')
  })
})
