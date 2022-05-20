declare module "khmer-name-generator" {
  interface Name {
    getRandomName(): string
    getRandomFirstname(): string
    getRandomLastname(): string
  }

  const name: Name

  const provincewithlatlong: {
    getProvinceWithLatLong(): string
  }

  const khmerDate: {
    getKhmerMonth(): string
    getKhmerDay(): string
  }

  const generateWord: {
    generateSentence(numberOfWords: number): Promise<string>
  }

  declare const Image: {
    name
    provincewithlatlong
    khmerDate
    generateWord
  }

  export default Image
}
