"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Home, Sun, Droplets, Wind, Cpu } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Image from "next/image"

// 配置选项
const exteriorOptions = [
  {
    id: "titanium",
    name: "深灰色钛锌板",
    price: 30000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
  },
  {
    id: "aluminum",
    name: "白色铝板",
    price: 12000,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084",
  },
  {
    id: "wood",
    name: "实木外墙板",
    price: 18000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
  },
]

const powerOptions = [
  { id: "power-none", name: "不需要", price: 0 },
  { id: "power-small", name: "13kWh 储能系统", price: 50000 },
  { id: "power-medium", name: "25kWh 储能系统", price: 80000 },
  { id: "power-large", name: "36kWh 储能系统", price: 120000 },
]

const additionalOptions = [
  { id: "terrace", name: "室外露台", price: 25000, icon: <Home className="h-5 w-5" /> },
  { id: "skylight", name: "屋顶天窗", price: 16000, icon: <Sun className="h-5 w-5" /> },
  { id: "shade", name: "外窗遮阳系统", price: 18000, icon: <Wind className="h-5 w-5" /> },
  { id: "kitchen", name: "厨房电器系统", price: 9000, icon: <Home className="h-5 w-5" /> },
  { id: "water", name: "全屋净水和软水系统", price: 12000, icon: <Droplets className="h-5 w-5" /> },
  { id: "ai", name: "weekend伴侣人工智能伴侣", price: 9000, icon: <Cpu className="h-5 w-5" /> },
]

export default function OrderPage() {
  const basePrice = 350000
  const [selectedExterior, setSelectedExterior] = useState(exteriorOptions[0].id)
  const [selectedPower, setSelectedPower] = useState(powerOptions[0].id)
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [totalPrice, setTotalPrice] = useState(basePrice)
  const [currentImage, setCurrentImage] = useState(exteriorOptions[0].image)

  // 计算总价
  useEffect(() => {
    let price = basePrice

    // 添加外立面价格
    const exterior = exteriorOptions.find((opt) => opt.id === selectedExterior)
    if (exterior) {
      price += exterior.price
      setCurrentImage(exterior.image)
    }

    // 添加电力系统价格
    const power = powerOptions.find((opt) => opt.id === selectedPower)
    if (power) {
      price += power.price
    }

    // 添加附加选项价格
    selectedAddons.forEach((addonId) => {
      const addon = additionalOptions.find((opt) => opt.id === addonId)
      if (addon) {
        price += addon.price
      }
    })

    setTotalPrice(price)
  }, [selectedExterior, selectedPower, selectedAddons])

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", minimumFractionDigits: 0 }).format(
      price,
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-white">
        {/* 产品标题 */}
        <section className="py-8 bg-black text-white">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              定制您的 <span className="text-[#00CED1]">WEEKEND HOUSE</span>
            </h1>
            <p className="mt-4 text-gray-400 max-w-3xl mx-auto">选择适合您的配置，打造专属于您的零碳生活空间</p>
          </div>
        </section>

        <div className="container px-4 py-12 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* 左侧：产品图片 */}
            <div className="sticky top-20">
              <div className="relative h-[500px] rounded-xl overflow-hidden mb-4">
                <Image src={currentImage || "/placeholder.svg"} alt="WEEKEND HOUSE" fill className="object-cover" />
              </div>
              <div className="bg-[#f8f9fa] p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">总价</h2>
                  <div className="text-3xl font-bold text-[#00CED1]">{formatPrice(totalPrice)}</div>
                </div>
                <p className="text-sm text-gray-500 mb-4">价格包含增值税。交付时间约为订单确认后90天。</p>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90 w-full">立即订购</Button>
                  <Button variant="outline" className="w-full">
                    预约咨询
                  </Button>
                </div>
              </div>
            </div>

            {/* 右侧：配置选项 */}
            <div>
              {/* 基础信息 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">WEEKEND HOUSE</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">建筑面积</div>
                    <div className="font-semibold">60 m²</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">交付时间</div>
                    <div className="font-semibold">90 天</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">基础价格</div>
                    <div className="font-semibold">{formatPrice(basePrice)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">质保期</div>
                    <div className="font-semibold">10 年</div>
                  </div>
                </div>
                <p className="text-gray-600">
                  WEEKEND HOUSE
                  采用前沿零碳技术，从设计到建造全程遵循可持续原则，为您打造真正的零碳生活空间。基础配置包含主体结构、基础装修、基础家具、智能家居系统和被动式通风设计。
                </p>
              </div>

              {/* 外立面材料 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">外立面材料</h3>
                <RadioGroup
                  value={selectedExterior}
                  onValueChange={setSelectedExterior}
                  className="grid grid-cols-1 gap-4"
                >
                  {exteriorOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedExterior === option.id ? "border-[#00CED1] bg-[#00CED1]/5" : "hover:border-gray-400"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                      <Label htmlFor={option.id} className="flex justify-between items-center cursor-pointer">
                        <div className="flex items-center gap-3">
                          {selectedExterior === option.id ? (
                            <div className="h-5 w-5 rounded-full bg-[#00CED1] flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                          )}
                          <span>{option.name}</span>
                        </div>
                        <span className="font-semibold">
                          {option.price > 0 ? `+${formatPrice(option.price)}` : "包含"}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 光伏发电与储能系统 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">光伏发电与储能系统</h3>
                <RadioGroup value={selectedPower} onValueChange={setSelectedPower} className="grid grid-cols-1 gap-4">
                  {powerOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedPower === option.id ? "border-[#00CED1] bg-[#00CED1]/5" : "hover:border-gray-400"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                      <Label htmlFor={option.id} className="flex justify-between items-center cursor-pointer">
                        <div className="flex items-center gap-3">
                          {selectedPower === option.id ? (
                            <div className="h-5 w-5 rounded-full bg-[#00CED1] flex items-center justify-center">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                          )}
                          <span>{option.name}</span>
                        </div>
                        <span className="font-semibold">
                          {option.price > 0 ? `+${formatPrice(option.price)}` : "包含"}
                        </span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* 附加选项 */}
              <div className="mb-10">
                <h3 className="text-xl font-bold mb-4">附加选项</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {additionalOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddons.includes(option.id) ? "border-[#00CED1] bg-[#00CED1]/5" : "hover:border-gray-400"
                      }`}
                      onClick={() => toggleAddon(option.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={option.id}
                            checked={selectedAddons.includes(option.id)}
                            className={selectedAddons.includes(option.id) ? "bg-[#00CED1] border-[#00CED1]" : ""}
                          />
                          <div>
                            <Label htmlFor={option.id} className="font-medium cursor-pointer">
                              {option.name}
                            </Label>
                            <p className="text-sm text-gray-500">
                              {option.id === "ai" ? "智能家居控制与个性化陪伴" : "提升生活品质与舒适度"}
                            </p>
                          </div>
                        </div>
                        <span className="font-semibold">+{formatPrice(option.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 订单摘要 */}
              <div className="bg-[#f8f9fa] p-6 rounded-xl mb-6 lg:hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">总价</h2>
                  <div className="text-3xl font-bold text-[#00CED1]">{formatPrice(totalPrice)}</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90 w-full">立即订购</Button>
                  <Button variant="outline" className="w-full">
                    预约咨询
                  </Button>
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
