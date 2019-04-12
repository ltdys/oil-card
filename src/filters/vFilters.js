const vFilter = {
  getDay: value => {
    return parseInt(Math.floor(value/3600) / 24)
  }
}

export default vFilter