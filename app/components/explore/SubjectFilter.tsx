"use client"

interface SubjectFilterProps {
  selectedSubject: string | null
  setSelectedSubject: (subject: string) => void
  subjects: string[]
}

export default function SubjectFilter({ selectedSubject, setSelectedSubject, subjects }: SubjectFilterProps) {
  return (
    <div className="relative w-full md:w-48">
      <select
        value={selectedSubject || "All Subjects"}
        onChange={(e) => setSelectedSubject(e.target.value)}
        className="bg-white border border-white/20 rounded-md py-2 px-4 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-[#EACA91] text-gray-400"
      >
        {subjects.map((subject) => (
          <option key={subject} value={subject}>
            {subject}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}

