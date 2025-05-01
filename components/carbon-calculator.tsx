"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3 } from "lucide-react"

export default function CarbonCalculator() {
  const [distance, setDistance] = useState(100)
  const [days, setDays] = useState(2)
  const [people, setPeople] = useState(2)

  // 简单的碳排放计算逻辑
  const hotelEmission = distance * 0.2 + days * people * 15
  const traditionalEmission = distance * 0.2 + days * people * 10
  const weekendEmission = distance * 0.2 + days * people * 2

  const hotelSavings = hotelEmission - weekendEmission
  const traditionalSavings = traditionalEmission - weekendEmission

  return (
    <section className="py-16 bg-gradient-to-b from-white to-[#f8f9fa]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">碳足迹计算器</h2>
          <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
            对比住酒店/传统民宿与weekend house的碳排放差异，了解您的环保贡献
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>出行距离 (公里)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[distance]}
                  min={10}
                  max={500}
                  step={10}
                  onValueChange={(value) => setDistance(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>停留天数</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[days]}
                  min={1}
                  max={14}
                  step={1}
                  onValueChange={(value) => setDays(value[0])}
                  className="flex-1"
                />
                <Input type="number" value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-20" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>人数</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[people]}
                  min={1}
                  max={8}
                  step={1}
                  onValueChange={(value) => setPeople(value[0])}
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="w-20"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full bg-[#00CED1] hover:bg-[#00CED1]/90">
                计算碳足迹 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Tabs defaultValue="comparison">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="comparison">碳排放对比</TabsTrigger>
                <TabsTrigger value="savings">减排效益</TabsTrigger>
              </TabsList>

              <TabsContent value="comparison" className="pt-6">
                <div className="space-y-6">
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <div className="mb-2 text-sm font-medium">酒店</div>
                      <div
                        className="bg-red-500 h-[200px] rounded-t-md relative"
                        style={{ height: `${(hotelEmission / (hotelEmission + 20)) * 200}px` }}
                      >
                        <div className="absolute -top-6 left-0 right-0 text-center font-bold">
                          {hotelEmission.toFixed(1)} kg
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 text-sm font-medium">传统民宿</div>
                      <div
                        className="bg-yellow-500 h-[150px] rounded-t-md relative"
                        style={{ height: `${(traditionalEmission / (hotelEmission + 20)) * 200}px` }}
                      >
                        <div className="absolute -top-6 left-0 right-0 text-center font-bold">
                          {traditionalEmission.toFixed(1)} kg
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="mb-2 text-sm font-medium">weekend house</div>
                      <div
                        className="bg-green-500 h-[50px] rounded-t-md relative"
                        style={{ height: `${(weekendEmission / (hotelEmission + 20)) * 200}px` }}
                      >
                        <div className="absolute -top-6 left-0 right-0 text-center font-bold">
                          {weekendEmission.toFixed(1)} kg
                        </div>
                      </div>
                    </div>
                  </div>

                  <Card>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground">
                        选择weekend house，您的这次旅行将比入住酒店减少
                        <span className="font-bold text-green-500">{hotelSavings.toFixed(1)}kg</span>
                        的碳排放，相当于种植
                        <span className="font-bold text-green-500">{Math.round(hotelSavings / 10)}</span>
                        棵树的年吸碳量。
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="savings" className="pt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <BarChart3 className="h-10 w-10 text-[#00CED1] mb-2" />
                        <div className="font-bold text-2xl">{hotelSavings.toFixed(1)} kg</div>
                        <p className="text-sm text-muted-foreground">比酒店减少的碳排放</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <BarChart3 className="h-10 w-10 text-[#00CED1] mb-2" />
                        <div className="font-bold text-2xl">{traditionalSavings.toFixed(1)} kg</div>
                        <p className="text-sm text-muted-foreground">比传统民宿减少的碳排放</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-2">您的环保贡献相当于：</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                          <span>种植 {Math.round(hotelSavings / 10)} 棵树的年吸碳量</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                          <span>减少 {Math.round(hotelSavings * 0.4)} 公里的汽车行驶</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-[#00CED1]"></div>
                          <span>节约 {Math.round(hotelSavings * 5)} 度电的使用</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Button variant="link" className="text-[#00CED1]">
                了解更多碳足迹计算方法
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
