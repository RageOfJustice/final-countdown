import { formatTime } from 'src/utils'

describe('formatTime', () => {
  it('works fine', () => {
    expect(formatTime(0)).toBe('00:00')
    expect(formatTime(-100)).toBe('00:00')
    expect(formatTime(60)).toBe('01:00')
    expect(formatTime(7200)).toBe('120:00')
    expect(formatTime(312)).toBe('05:12')
  })
})
