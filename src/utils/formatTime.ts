const formatTime = (seconds: number): string => {
  if (seconds <= 0) {
    return '00:00'
  }
  const minutes = Math.trunc(seconds / 60)
  const restSeconds = Math.trunc(seconds % 60)

  const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`
  const formattedSeconds = `${restSeconds < 10 ? '0' : ''}${restSeconds}`

  return `${formattedMinutes}:${formattedSeconds}`
}

export default formatTime
