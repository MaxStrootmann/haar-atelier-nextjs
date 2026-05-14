type PortableTextSpan = {
  _key?: string;
  text?: string;
  marks?: string[];
};

type PortableTextBlock = {
  _key?: string;
  children?: PortableTextSpan[];
};

interface SimpleBlockTextProps {
  blocks: PortableTextBlock[];
}

export default function SimpleBlockText({ blocks }: SimpleBlockTextProps) {
  return (
    <>
      {blocks.map((block) => (
        <p key={block._key}>
          {block.children?.map((span) => {
            if (span.marks?.includes("em")) {
              return <em key={span._key}>{span.text}</em>;
            }
            return span.text;
          })}
        </p>
      ))}
    </>
  );
}
