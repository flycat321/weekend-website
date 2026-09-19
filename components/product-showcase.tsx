"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, Droplets, Wind, Leaf } from "lucide-react"
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion"
import Reveal from "@/components/motion/reveal"

const techSystems = [
  {
    id: "roof",
    icon: Sun,
    label: "太阳能系统",
    title: "一体化太阳能屋顶系统",
    description: "采用最新一代高效太阳能屋顶系统，与建筑完美融合，满足房屋100%的用电需求。",
    features: ["转化效率高达24.5%", "智能电池储能系统", "25年质保，50年使用寿命"],
    specs: [
      { label: "年发电量", value: "8,760 kWh" },
      { label: "碳减排", value: "4.2 吨/年" },
      { label: "系统容量", value: "6.5 kW" },
      { label: "储能容量", value: "13.5 kWh" },
    ],
    hotspot: { top: "20%", left: "55%" },
  },
  {
    id: "water",
    icon: Droplets,
    label: "水循环系统",
    title: "雨水收集与循环利用系统",
    description: "创新的雨水收集与净化系统，满足日常生活用水需求，减少淡水资源消耗。",
    features: ["多级过滤净化技术", "智能水质监测系统", "灰水回收再利用"],
    specs: [
      { label: "储水容量", value: "5,000 L" },
      { label: "年节水量", value: "80,000 L" },
      { label: "净化效率", value: "99.9%" },
      { label: "碳减排", value: "1.8 吨/年" },
    ],
    hotspot: { top: "70%", left: "30%" },
  },
  {
    id: "ventilation",
    icon: Wind,
    label: "通风保温",
    title: "被动式通风与保温设计",
    description: "采用被动式建筑设计原则，通过自然通风和高效保温，大幅降低能源消耗。",
    features: ["三层高性能隔热玻璃", "热回收通风系统", "气密性设计，无热桥"],
    specs: [
      { label: "墙体U值", value: "0.15 W/m²K" },
      { label: "气密性", value: "0.6 ACH" },
      { label: "热回收率", value: "92%" },
      { label: "碳减排", value: "3.5 吨/年" },
    ],
    hotspot: { top: "40%", left: "20%" },
  },
  {
    id: "materials",
    icon: Leaf,
    label: "可持续建材",
    title: "可持续建材与零碳足迹",
    description: "精选全球顶级可持续建材，从生产到运输全程追踪碳足迹，确保真正实现零碳目标。",
    features: ["FSC认证木材", "低碳混凝土", "可回收绝缘材料"],
    specs: [
      { label: "碳封存量", value: "25 吨/栋" },
      { label: "材料可回收率", value: "95%" },
      { label: "VOC含量", value: "接近零" },
      { label: "使用寿命", value: "100+ 年" },
    ],
    hotspot: { top: "60%", left: "70%" },
  },
]

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("roof")
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-300, 300], [3, -3])
  const rotateY = useTransform(mouseX, [-300, 300], [-3, 3])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const activeTech = techSystems.find((t) => t.id === activeTab) ?? techSystems[0]

  return (
    <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 font-serif">
              Weekend House <span className="text-primary">技术展厅</span>
            </h2>
            <p className="text-gray-500 md:text-lg max-w-2xl mx-auto">
              探索零碳技术节点，了解可持续生活的未来
            </p>
          </div>
        </Reveal>

        {/* 3D tilt product image */}
        <Reveal delay={0.2}>
          <div style={{ perspective: "1200px" }} className="mb-10">
            <motion.div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY }}
              transition={{ type: "spring", stiffness: 100, damping: 30 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black"
            >
              <Image
                src="/house-new1.png"
                alt="Weekend House"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />

              {/* Hotspot markers */}
              {techSystems.map((tech) => (
                <motion.button
                  key={tech.id}
                  className={`absolute z-20 flex items-center gap-2 cursor-pointer ${activeTab === tech.id ? "scale-110" : ""}`}
                  style={{ top: tech.hotspot.top, left: tech.hotspot.left }}
                  onClick={() => setActiveTab(tech.id)}
                  whileHover={{ scale: 1.2 }}
                >
                  <div
                    className={`h-4 w-4 rounded-full ${activeTab === tech.id ? "bg-primary animate-ripple" : "bg-white/60"} transition-colors`}
                  />
                  {activeTab === tech.id && (
                    <motion.span
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs whitespace-nowrap"
                    >
                      {tech.title}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </Reveal>

        {/* Tech tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-white/5 w-full h-auto p-1">
            {techSystems.map((tech) => (
              <TabsTrigger
                key={tech.id}
                value={tech.id}
                className="data-[state=active]:bg-primary data-[state=active]:text-black py-3"
              >
                <tech.icon className="mr-2 h-4 w-4" />
                {tech.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <AnimatePresence mode="wait">
            {techSystems.map((tech) => (
              <TabsContent key={tech.id} value={tech.id} className="mt-8" forceMount={activeTab === tech.id ? true : undefined}>
                {activeTab === tech.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 gap-8 items-start"
                  >
                    <div>
                      <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
                      <p className="text-gray-400 mb-5 leading-relaxed">{tech.description}</p>
                      <ul className="space-y-3">
                        {tech.features.map((f) => (
                          <li key={f} className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-gray-300">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                      <div className="text-sm font-medium text-primary mb-4 tracking-wider uppercase">技术数据</div>
                      <div className="grid grid-cols-2 gap-5">
                        {tech.specs.map((spec) => (
                          <div key={spec.label}>
                            <div className="text-xs text-gray-500 mb-1">{spec.label}</div>
                            <div className="text-lg font-semibold">{spec.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  )
}
