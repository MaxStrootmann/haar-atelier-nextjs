type PortableTextSpan = {
  _type?: string
  text?: string
  marks?: string[]
}

type PortableTextBlock = {
  _type?: string
  style?: string
  children?: PortableTextSpan[]
}

type LexicalTextNode = {
  type: 'text'
  text: string
  version: 1
  format: number
  style: string
  mode: 'normal'
  detail: number
}

type LexicalParagraphNode = {
  type: 'paragraph' | 'heading' | 'quote'
  version: 1
  format: string
  indent: number
  direction: null
  children: LexicalTextNode[]
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const markFormat = (marks: string[] = []) => {
  let format = 0
  if (marks.includes('strong')) format |= 1
  if (marks.includes('em')) format |= 2
  if (marks.includes('underline')) format |= 8
  if (marks.includes('strike-through')) format |= 4
  if (marks.includes('code')) format |= 16
  return format
}

const blockTypeForStyle = (style?: string): Pick<LexicalParagraphNode, 'type' | 'tag'> => {
  if (style === 'blockquote') return { type: 'quote' }
  if (style && /^h[1-6]$/.test(style)) return { type: 'heading', tag: style as LexicalParagraphNode['tag'] }
  return { type: 'paragraph' }
}

export const portableTextToLexical = (value: unknown) => {
  const blocks = Array.isArray(value) ? (value as PortableTextBlock[]) : []

  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: null,
      children: blocks
        .filter((block) => block?._type === 'block')
        .map((block): LexicalParagraphNode => {
          const blockType = blockTypeForStyle(block.style)

          return {
            ...blockType,
            version: 1,
            format: '',
            indent: 0,
            direction: null,
            children: (block.children || [])
              .filter((child) => child?._type === 'span' && child.text)
              .map((child): LexicalTextNode => ({
                type: 'text',
                text: child.text || '',
                version: 1,
                format: markFormat(child.marks),
                style: '',
                mode: 'normal',
                detail: 0,
              })),
          }
        }),
    },
  }
}
