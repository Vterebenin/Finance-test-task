export const roundPrice = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100
}

export const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
