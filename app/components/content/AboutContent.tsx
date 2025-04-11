interface AboutContentProps {
    description: string
  }
  
  export default function AboutContent({ description }: AboutContentProps) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">About this Content</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    )
  }
  
  