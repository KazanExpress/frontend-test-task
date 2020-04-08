export const readFileInput = (
  isDir = false,
  isMultiple = false
): Promise<string | null> => {
  const createFileInput = ({
    isDir,
    isMultiple,
  }: {
    isDir: boolean
    isMultiple: boolean
  }) => {
    const inputElement = document.createElement('input')
    inputElement.type = 'file'
    inputElement.multiple = isMultiple
    // inputElement.webkitdirectory = isDir
    return inputElement
  }

  return new Promise((resolve, reject) => {
    const input = createFileInput({ isDir, isMultiple })
    input.addEventListener('change', (event) => {
      const file = (event.target as HTMLInputElement)?.files?.[0]
      if (!file) {
        reject(new Error('something wrong with user input'))
        return
      }

      const reader = new FileReader()

      reader.readAsText(file, 'UTF-8')
      reader.onload = (evt) => {
        assert(!(evt?.target?.result instanceof ArrayBuffer)) // why tf i even need this
        resolve(evt?.target?.result)
      }
      reader.onerror = (evt) => {
        console.error('error reading file')
        console.log(evt)

        reject(evt)
      }
    })
    input.click()
  })
}

export const jsonToFile = (
  content: BlobPart,
  fileName: string,
  contentType = 'application/json'
): void => {
  const a = document.createElement('a')
  const file = new Blob([content], { type: contentType })
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}
