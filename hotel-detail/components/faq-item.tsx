"use client"

import * as React from "react"
import { ChevronDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface FaqItemProps {
  question: string
  answer: string
}

export function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="border-b border-gray-200 py-4">
      <button className="flex w-full items-center justify-between text-left" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-medium">{question}</h3>
        {isOpen ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <Plus className="h-5 w-5 text-gray-500" />}
      </button>
      <div
        className={cn(
          "mt-2 text-gray-600 overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96" : "max-h-0",
        )}
      >
        <p className="pb-4">{answer}</p>
      </div>
    </div>
  )
}
