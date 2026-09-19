"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  direction?: "up" | "left" | "right" | "down"
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: "200px 0px" })
  const offset = directionMap[direction]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0.01, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0.01, ...offset }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
