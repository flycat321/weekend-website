"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Search, Upload, Trash2, Edit, Eye, ImageIcon, FileVideo } from "lucide-react"
import AdminHeader from "@/components/admin/admin-header"
import AdminSidebar from "@/components/admin/admin-sidebar"

// 模拟图片数据
const mockImages = [
  {
    id: 1,
    name: "首页背景图",
    path: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070",
    category: "背景",
    location: "首页",
  },
  {
    id: 2,
    name: "零碳房屋展示",
    path: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    category: "产品",
    location: "产品页",
  },
  {
    id: 3,
    name: "度假体验",
    path: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=2070",
    category: "体验",
    location: "服务页",
  },
  {
    id: 4,
    name: "绿色建材",
    path: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
    category: "建材",
    location: "商城页",
  },
  {
    id: 5,
    name: "家居设计",
    path: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070",
    category: "设计",
    location: "设计页",
  },
  {
    id: 6,
    name: "活动日历",
    path: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070",
    category: "社区",
    location: "社区页",
  },
]

// 模拟视频数据
const mockVideos = [
  {
    id: 1,
    name: "产品介绍视频",
    path: "/videos/product-intro.mp4",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    category: "产品",
    location: "产品页",
  },
  {
    id: 2,
    name: "零碳技术展示",
    path: "/videos/tech-showcase.mp4",
    thumbnail: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
    category: "技术",
    location: "技术页",
  },
]

export default function AdminMediaPage() {
  const [activeTab, setActiveTab] = useState("images")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<any>(null)

  // 过滤图片
  const filteredImages = mockImages.filter(
    (img) =>
      (selectedCategory === "all" || img.category === selectedCategory) &&
      (img.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.location.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // 过滤视频
  const filteredVideos = mockVideos.filter(
    (video) =>
      (selectedCategory === "all" || video.category === selectedCategory) &&
      (video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.location.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar activeItem="media" />

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">媒体管理</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">
                  <Upload className="mr-2 h-4 w-4" /> 上传媒体
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>上传新媒体</DialogTitle>
                  <DialogDescription>选择要上传的图片或视频文件</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="media-type">媒体类型</Label>
                    <Select defaultValue="image">
                      <SelectTrigger>
                        <SelectValue placeholder="选择媒体类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">图片</SelectItem>
                        <SelectItem value="video">视频</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="media-name">名称</Label>
                    <Input id="media-name" placeholder="输入媒体名称" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="media-category">分类</Label>
                    <Select defaultValue="background">
                      <SelectTrigger>
                        <SelectValue placeholder="选择分类" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="background">背景</SelectItem>
                        <SelectItem value="product">产品</SelectItem>
                        <SelectItem value="experience">体验</SelectItem>
                        <SelectItem value="materials">建材</SelectItem>
                        <SelectItem value="design">设计</SelectItem>
                        <SelectItem value="community">社区</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="media-location">使用位置</Label>
                    <Input id="media-location" placeholder="输入使用位置" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="media-file">选择文件</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-1">点击或拖拽文件到此处上传</p>
                      <p className="text-xs text-gray-400">支持 JPG, PNG, GIF, MP4, WebM 格式</p>
                      <Input id="media-file" type="file" className="hidden" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline">取消</Button>
                  <Button className="bg-[#00CED1] hover:bg-[#00CED1]/90">上传</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索媒体..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                <SelectItem value="背景">背景</SelectItem>
                <SelectItem value="产品">产品</SelectItem>
                <SelectItem value="体验">体验</SelectItem>
                <SelectItem value="建材">建材</SelectItem>
                <SelectItem value="设计">设计</SelectItem>
                <SelectItem value="社区">社区</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="images" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>图片 ({mockImages.length})</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <FileVideo className="h-4 w-4" />
                <span>视频 ({mockVideos.length})</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="images">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image) => (
                  <Card key={image.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={image.path || "/placeholder.svg"} alt={image.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{image.name}</h3>
                          <p className="text-xs text-gray-500">
                            {image.location} · {image.category}
                          </p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => setSelectedImage(image)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>{selectedImage?.name}</DialogTitle>
                              <DialogDescription>
                                {selectedImage?.location} · {selectedImage?.category}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="relative h-[400px] w-full">
                              {selectedImage && (
                                <Image
                                  src={selectedImage.path || "/placeholder.svg"}
                                  alt={selectedImage.name}
                                  fill
                                  className="object-contain"
                                />
                              )}
                            </div>
                            <DialogFooter>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                  <Edit className="h-3 w-3" />
                                  <span>编辑</span>
                                </Button>
                                <Button variant="destructive" size="sm" className="flex items-center gap-1">
                                  <Trash2 className="h-3 w-3" />
                                  <span>删除</span>
                                </Button>
                              </div>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                          <Edit className="h-3 w-3" />
                          <span>编辑</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center justify-center w-9 h-9 p-0">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredImages.length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到图片</h3>
                  <p className="text-gray-500">尝试更改搜索条件或上传新图片</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full bg-white/30 flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-[#00CED1]"
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{video.name}</h3>
                          <p className="text-xs text-gray-500">
                            {video.location} · {video.category}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 flex items-center justify-center gap-1">
                          <Edit className="h-3 w-3" />
                          <span>编辑</span>
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center justify-center w-9 h-9 p-0">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredVideos.length === 0 && (
                <div className="text-center py-12">
                  <FileVideo className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">没有找到视频</h3>
                  <p className="text-gray-500">尝试更改搜索条件或上传新视频</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
