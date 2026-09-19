"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Home, Sun, Droplets, Wind, Cpu } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"
import Reveal from "@/components/motion/reveal"

const exteriorOptions = [
  {
    id: "titanium",
    name: "深灰色钛锌板",
    description: "高端金属质感，耐候性极佳",
    price: 30000,
    image: "/house1.avif",
  },
  {
    id: "aluminum",
    name: "白色铝板",
    description: "简约现代，轻量耐用",
    price: 12000,
    image: "/house-new1.png",
  },
  {
    id: "wood",
    name: "实木外墙板",
    description: "自然温润，与环境融为一体",
    price: 18000,
    image: "/house5.avif",
  },
]

const powerOptions = [
  { id: "power-none", name: "不需要", price: 0 },
  { id: "power-small", name: "13kWh 储能系统", price: 50000 },
  { id: "power-medium", name: "25kWh 储能系统", price: 80000 },
  { id: "power-large", name: "36kWh 储能系统", price: 120000 },
]

const additionalOptions = [
  { id: "terrace", name: "室外露台", description: "拓展生活空间，亲近自然", price: 25000, icon: Home },
  { id: "skylight", name: "屋顶天窗", description: "引入自然光线和星空视野", price: 16000, icon: Sun },
  { id: "shade", name: "外窗遮阳系统", description: "智能调节光照，节约能耗", price: 18000, icon: Wind },
  { id: "kitchen", name: "厨房电器系统", description: "进口厨电全套配置", price: 9000, icon: Home },
  { id: "water", name: "全屋净水软水系统", description: "保障用水品质", price: 12000, icon: Droplets },
  { id: "ai", name: "AI 智能伴侣", description: "智能家居控制与个性化陪伴", price: 9000, icon: Cpu },
]

const BASE_PRICE = 350000

function formatPrice(price: number) {
  return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", minimumFractionDigits: 0 }).format(price)
}

export default function OrderPage() {
  const [selectedExterior, setSelectedExterior] = useState(exteriorOptions[0].id)
  const [selectedPower, setSelectedPower] = useState(powerOptions[0].id)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])

  const currentExterior = exteriorOptions.find((o) => o.id === selectedExterior) ?? exteriorOptions[0]

  const totalPrice = useMemo(() => {
    let price = BASE_PRICE
    price += currentExterior.price
    const power = powerOptions.find((o) => o.id === selectedPower)
    if (power) price += power.price
    selectedAddons.forEach((id) => {
      const addon = additionalOptions.find((o) => o.id === id)
      if (addon) price += addon.price
    })
    return price
  }, [selectedExterior, selectedPower, selectedAddons, currentExterior.price])

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white pt-16">
        {/* Header */}
        <section className="py-10 bg-[#0a0a0a] text-white">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl md:text-5xl">
              定制您的 <span className="text-primary">WEEKEND HOUSE</span>
            </h1>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">选择适合您的配置，打造专属零碳生活空间</p>
          </div>
        </section>

        <div className="container px-4 py-12 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left: Product image + price (2 cols) */}
            <div className="lg:col-span-2">
              <div className="sticky top-20 space-y-6">
                <Reveal>
                  <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={currentExterior.image}
                      alt={currentExterior.name}
                      fill
                      className="object-cover transition-all duration-500"
                    />
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                      {currentExterior.name}
                    </div>
                  </div>
                </Reveal>

                <div className="bg-brand-cream rounded-2xl p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-muted-foreground">总价</span>
                    <span className="text-3xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">含税价格，交付时间约90天</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-primary hover:bg-primary/90 rounded-full">立即订购</Button>
                    <Button variant="outline" className="rounded-full">预约咨询</Button>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "建筑面积", value: "60 m²" },
                    { label: "交付周期", value: "90 天" },
                    { label: "基础价格", value: formatPrice(BASE_PRICE) },
                    { label: "质保期", value: "10 年" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white border rounded-xl p-3">
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                      <div className="font-semibold">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Configuration (3 cols) */}
            <div className="lg:col-span-3 space-y-10">
              {/* Exterior */}
              <Reveal>
                <div>
                  <h3 className="text-xl font-bold mb-5">外立面材料</h3>
                  <RadioGroup value={selectedExterior} onValueChange={setSelectedExterior} className="space-y-3">
                    {exteriorOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          selectedExterior === option.id ? "border-primary bg-primary/5 shadow-sm" : "hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                        <Label htmlFor={option.id} className="flex justify-between items-center cursor-pointer">
                          <div className="flex items-center gap-3">
                            {selectedExterior === option.id ? (
                              <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-gray-200 flex-shrink-0" />
                            )}
                            <div>
                              <div className="font-medium">{option.name}</div>
                              <div className="text-sm text-muted-foreground">{option.description}</div>
                            </div>
                          </div>
                          <span className="font-semibold text-sm whitespace-nowrap">+{formatPrice(option.price)}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </Reveal>

              {/* Power */}
              <Reveal delay={0.1}>
                <div>
                  <h3 className="text-xl font-bold mb-5">光伏发电与储能系统</h3>
                  <RadioGroup value={selectedPower} onValueChange={setSelectedPower} className="space-y-3">
                    {powerOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          selectedPower === option.id ? "border-primary bg-primary/5 shadow-sm" : "hover:border-gray-300"
                        }`}
                      >
                        <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                        <Label htmlFor={option.id} className="flex justify-between items-center cursor-pointer">
                          <div className="flex items-center gap-3">
                            {selectedPower === option.id ? (
                              <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-gray-200 flex-shrink-0" />
                            )}
                            <span className="font-medium">{option.name}</span>
                          </div>
                          <span className="font-semibold text-sm">
                            {option.price > 0 ? `+${formatPrice(option.price)}` : "包含"}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </Reveal>

              {/* Addons */}
              <Reveal delay={0.15}>
                <div>
                  <h3 className="text-xl font-bold mb-5">附加选项</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {additionalOptions.map((option) => (
                      <div
                        key={option.id}
                        className={`border rounded-xl p-4 cursor-pointer transition-all ${
                          selectedAddons.includes(option.id) ? "border-primary bg-primary/5 shadow-sm" : "hover:border-gray-300"
                        }`}
                        onClick={() => toggleAddon(option.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <Checkbox
                              id={option.id}
                              checked={selectedAddons.includes(option.id)}
                              className="mt-0.5"
                            />
                            <div>
                              <Label htmlFor={option.id} className="font-medium cursor-pointer block">
                                {option.name}
                              </Label>
                              <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
                            </div>
                          </div>
                          <span className="font-semibold text-sm whitespace-nowrap ml-2">+{formatPrice(option.price)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Mobile price summary */}
              <div className="bg-brand-cream rounded-2xl p-6 lg:hidden">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium">总价</span>
                  <span className="text-2xl font-bold text-primary">{formatPrice(totalPrice)}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full">立即订购</Button>
                  <Button variant="outline" className="rounded-full">预约咨询</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
