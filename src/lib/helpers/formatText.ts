// kebabToNormal("hello-world"); Output: "Hello World"
// kebabToNormal("foo-bar-baz"); Output: "Foo Bar Baz"
// kebabToNormal(""); Output: null
// kebabToNormal(123); Output: null
// kebabToNormal(null); Output: null

export function kebabToNormal(text: string) {
  if (typeof text === 'string' && !!text.trim()) {
    return text
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  return null
}

// kebabCase("Hello World"); Output: "hello-world"
// kebabCase("This is a test!"); Output: "this-is-a-test"
// kebabCase("foo_bar_baz"); Output: "foo-bar-baz"
// kebabCase("   Hello   World   "); Output: "hello-world"
// kebabCase("!@#$%^&*()"); Output: null
// kebabCase("    "); Output: null
// kebabCase(""); Output: null
// kebabCase(null); Output: null
// kebabCase(undefined); Output: null

export function kebabCase(text: string) {
  const kebabText = text
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

  return kebabText.trim() ? kebabText : null
}

// input: "example word" => output: "Example Word"
export const capitalizeFirstLetterFromLowercase = (
  string = '',
  separator = ' ',
) => {
  if (!string) {
    return '-'
  }

  return string
    .split(separator) // " " for "EXAMPLE WORD", "_" for "EXAMPLE_WORD", and so on...
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(' ')
}

export function convertToSlug(text = '') {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-') // Ganti spasi dengan tanda strip
    .replace(/[^\w\-]+/g, '') // Hapus karakter non-word dan non-stripped
    .replace(/\-\-+/g, '-') // Ganti dua strip atau lebih dengan satu strip
    .replace(/^-+/, '') // Hapus strip dari awal teks
    .replace(/-+$/, '') // Hapus strip dari akhir teks
}

export function convertSlugToText(slug = '') {
  // Ubah strip menjadi spasi dan ubah teks menjadi huruf kapital setiap kata
  const text = slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return text
}
