import ContentCard, { type ContentItemProps } from "./ContentCard"

interface ContentGridProps {
  items: ContentItemProps[]
}

export default function ContentGrid({ items }: ContentGridProps) {
  return (
    <div className="flex flex-wrap justify-center gap-16 mx-10">
      {items.map((item) => (
        <ContentCard key={item.id} {...item} />
      ))}
    </div>
  )
}

