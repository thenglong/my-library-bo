const objectArray = (arr: never[], key = "id") =>
  arr.reduce((acc, cur) => {
    acc[cur[key]] = cur
    return acc
  }, {})

export default objectArray
