"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AnimatedNumber value={target} />
          {suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  )
}

function AnimatedNumber({ value }: { value: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {value.toLocaleString()}
    </motion.span>
  )
}

export default function HeroSection() {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const orbY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'url("/house1.avif")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          scale: bgScale,
          opacity: bgOpacity,
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

      {/* Floating orb */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-primary/30 to-brand-earth/20 blur-3xl"
        style={{
          x: "-50%",
          y: orbY,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/40 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              animation: `particle-drift ${12 + i * 3}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="container relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white md:px-6 pt-16"
        style={{ y: contentY }}
      >
        <motion.h1
          className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="text-primary">WEEKEND HOUSE</span>
          <br />
          <span className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl mt-2 block text-white/90">
            开启一段理想的可持续生活
          </span>
        </motion.h1>

        <motion.p
          className="mb-10 max-w-[600px] text-lg text-white/70 md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          全球首个以"零碳周末生活"为核心的未来生活方式平台
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base" size="lg">
            <Link href="/stay">
              预订体验 <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-white/30 bg-white/5 text-white hover:bg-white/10 rounded-full px-8 h-12 text-base backdrop-blur-sm"
            size="lg"
            onClick={() => router.push("/about")}
          >
            了解更多
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { value: 12, suffix: "吨", label: "每年减少CO₂排放" },
            { value: 100, suffix: "%", label: "可再生能源供应" },
            { value: 50, suffix: "+", label: "精选度假地点" },
            { value: 10000, suffix: "+", label: "社区成员" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
