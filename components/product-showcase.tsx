"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sun, Droplets, Wind, Leaf } from "lucide-react"

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("roof")

  return (
    <section className="py-16 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            weekend house <span className="text-[#00CED1]">3D</span> 交互展厅
          </h2>
          <p className="text-gray-400 md:text-xl max-w-3xl mx-auto">
            探索weekend house的零碳技术节点，了解可持续生活的未来
          </p>
        </div>

        {/* 3D展示区域 - 在实际项目中可以使用Three.js实现 */}
        <div
          className="relative h-[500px] rounded-xl overflow-hidden bg-gradient-to-b from-[#111] to-[#000] mb-8"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "overlay",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-4">3D交互展示区域</p>
              <p className="text-sm text-gray-500">在实际项目中，这里将使用Three.js实现完整的3D交互体验</p>
            </div>
          </div>

          {/* 技术节点标注 */}
          {activeTab === "roof" && (
            <div className="absolute top-1/4 right-1/4 flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#00CED1] animate-pulse"></div>
              <div className="ml-2 bg-black/70 p-2 rounded text-sm">一体化太阳能屋顶系统</div>
            </div>
          )}

          {activeTab === "water" && (
            <div className="absolute bottom-1/3 left-1/3 flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#00CED1] animate-pulse"></div>
              <div className="ml-2 bg-black/70 p-2 rounded text-sm">雨水收集与循环利用系统</div>
            </div>
          )}

          {activeTab === "ventilation" && (
            <div className="absolute top-1/3 left-1/4 flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#00CED1] animate-pulse"></div>
              <div className="ml-2 bg-black/70 p-2 rounded text-sm">被动式通风与保温设计</div>
            </div>
          )}

          {activeTab === "materials" && (
            <div className="absolute bottom-1/4 right-1/3 flex items-center">
              <div className="h-4 w-4 rounded-full bg-[#00CED1] animate-pulse"></div>
              <div className="ml-2 bg-black/70 p-2 rounded text-sm">可持续建材与零碳足迹</div>
            </div>
          )}
        </div>

        {/* 技术节点选择器 */}
        <Tabs defaultValue="roof" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 bg-black/20 w-full">
            <TabsTrigger value="roof" className="data-[state=active]:bg-[#00CED1] data-[state=active]:text-black">
              <Sun className="mr-2 h-4 w-4" />
              太阳能系统
            </TabsTrigger>
            <TabsTrigger value="water" className="data-[state=active]:bg-[#00CED1] data-[state=active]:text-black">
              <Droplets className="mr-2 h-4 w-4" />
              水循环系统
            </TabsTrigger>
            <TabsTrigger
              value="ventilation"
              className="data-[state=active]:bg-[#00CED1] data-[state=active]:text-black"
            >
              <Wind className="mr-2 h-4 w-4" />
              通风保温
            </TabsTrigger>
            <TabsTrigger value="materials" className="data-[state=active]:bg-[#00CED1] data-[state=active]:text-black">
              <Leaf className="mr-2 h-4 w-4" />
              可持续建材
            </TabsTrigger>
          </TabsList>

          <TabsContent value="roof" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3">一体化太阳能屋顶系统</h3>
                <p className="text-gray-400 mb-4">
                  weekend house采用最新一代高效太阳能屋顶系统，与建筑完美融合，不仅美观，更能满足房屋100%的用电需求。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>转化效率高达24.5%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>智能电池储能系统</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>25年质保，50年使用寿命</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-[#111] to-[#000] p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#00CED1] mb-2">技术数据</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">年发电量</div>
                    <div className="text-xl font-semibold">8,760 kWh</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">碳减排</div>
                    <div className="text-xl font-semibold">4.2 吨/年</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">系统容量</div>
                    <div className="text-xl font-semibold">6.5 kW</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">储能容量</div>
                    <div className="text-xl font-semibold">13.5 kWh</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="water" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3">雨水收集与循环利用系统</h3>
                <p className="text-gray-400 mb-4">
                  创新的雨水收集与净化系统，可满足日常生活用水需求，减少淡水资源消耗，实现水资源的可持续利用。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>多级过滤净化技术</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>智能水质监测系统</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>灰水回收再利用</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-[#111] to-[#000] p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#00CED1] mb-2">技术数据</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">储水容量</div>
                    <div className="text-xl font-semibold">5,000 L</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">年节水量</div>
                    <div className="text-xl font-semibold">80,000 L</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">净化效率</div>
                    <div className="text-xl font-semibold">99.9%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">碳减排</div>
                    <div className="text-xl font-semibold">1.8 吨/年</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ventilation" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3">被动式通风与保温设计</h3>
                <p className="text-gray-400 mb-4">
                  采用被动式建筑设计原则，通过自然通风和高效保温，大幅降低能源消耗，同时提供舒适的室内环境。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>三层高性能隔热玻璃</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>热回收通风系统</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>气密性设计，无热桥</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-[#111] to-[#000] p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#00CED1] mb-2">技术数据</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">墙体U值</div>
                    <div className="text-xl font-semibold">0.15 W/m²K</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">气密性</div>
                    <div className="text-xl font-semibold">0.6 ACH</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">热回收率</div>
                    <div className="text-xl font-semibold">92%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">碳减排</div>
                    <div className="text-xl font-semibold">3.5 吨/年</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="materials" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3">可持续建材与零碳足迹</h3>
                <p className="text-gray-400 mb-4">
                  精选全球顶级可持续建材，从生产到运输全程追踪碳足迹，确保weekend house真正实现零碳目标。
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>FSC认证木材</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>低碳混凝土</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                    <span>可回收绝缘材料</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-[#111] to-[#000] p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#00CED1] mb-2">技术数据</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">碳封存量</div>
                    <div className="text-xl font-semibold">25 吨/栋</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">材料可回收率</div>
                    <div className="text-xl font-semibold">95%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">VOC含量</div>
                    <div className="text-xl font-semibold">接近零</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">使用寿命</div>
                    <div className="text-xl font-semibold">100+ 年</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center">
          <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90 text-white">预约实地参观</Button>
        </div>
      </div>
    </section>
  )
}
