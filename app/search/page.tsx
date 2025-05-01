"use client"

import { useState, useMemo } from 'react';
// import dynamic from 'next/dynamic'; // Map removed for now
import Image from 'next/image'; // Use Next.js Image component
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// Import more icons as needed based on raus.life examples
import { MapPin, Users, Clock, Wifi, Dog, TreePine, MountainSnow, Waves, Wind, Droplet, PawPrint, Star, Sun, Tent, Heater, Sailboat, CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link'; // Import Link for navigation
// Date Picker imports
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils"; // Assuming Shadcn utility exists
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// 导入导航栏和页脚组件
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

// Define Feature type
type Feature = {
  icon: React.ElementType; // Use React.ElementType for icon components
  text: string;
  level?: number; // Optional level property
};

// Define House type using Feature type
type House = {
  id: number;
  name: string;
  region: string; // 使用中文区域/省份
  lat: number;
  lng: number;
  available: number;
  adults: number;
  dogsAllowed: boolean; // 筛选用：允许宠物
  hasSauna: boolean;    // 筛选用：有桑拿
  isLakeNearby: boolean;// 筛选用：近湖泊
  isSecluded: boolean;  // 筛选用：僻静
  description: string; // 中文描述
  scenery: string[];   // 中文风景标签
  activities: string[]; // 中文活动标签
  features: Feature[]; // Use the Feature type here
  travelTimes: { city: string; time: string }[]; // 中文城市
  price: number; // 价格 (可选，raus.life卡片上不直接显示)
  image: string;
};

// 更新模拟 Weekend House 数据结构和内容 (中文, 中国地点, 更多类型, 筛选属性)
const mockHouses: House[] = [ // Explicitly type the array
  {
    id: 1,
    name: '川西·森林秘境小屋',
    region: '四川·阿坝',
    lat: 31.8, lng: 103.5,
    available: 1, adults: 2,
    dogsAllowed: true, hasSauna: false, isLakeNearby: false, isSecluded: true,
    description: '坐落在川西高原的原始森林边缘，露台外即是壮丽山景，时有野生动物出没。体验远离尘嚣的宁静。',
    scenery: ['森林', '高山', '僻静'],
    activities: ['徒步', '观星', '放松'],
    features: [
      { icon: PawPrint, text: '允许携带宠物' },
      { icon: TreePine, text: '深入自然' },
      { icon: Sun, text: '僻静之所' },
      { icon: Star, text: '冒险等级', level: 2 }
    ],
    travelTimes: [ { city: '成都', time: '约3.5小时车程' } ],
    price: 1350, image: '/placeholder-forest-1.jpg' // 替换为实际图片
  },
  {
    id: 2,
    name: '洱海·湖光山色别墅',
    region: '云南·大理',
    lat: 25.7, lng: 100.1,
    available: 2, adults: 4, // 可住4人
    dogsAllowed: false, hasSauna: true, isLakeNearby: true, isSecluded: false,
    description: '直面洱海，全景落地窗将苍山洱海尽收眼底。配备私人桑拿房，享受极致的放松体验。',
    scenery: ['湖畔', '山景'],
    activities: ['环湖骑行', '皮划艇', '桑拿', '品茶'],
    features: [
      { icon: Waves, text: '一线湖景' },
      { icon: Heater, text: '配备桑拿' }, // Sauna icon
      { icon: Waves, text: '靠近水域' },
      { icon: Star, text: '冒险等级', level: 1 }
    ],
    travelTimes: [ { city: '大理古城', time: '约30分钟车程' } ],
    price: 1800, image: '/placeholder-lake-1.jpg' // 替换为实际图片
  },
  {
    id: 3,
    name: '内蒙·草原星空帐篷',
    region: '内蒙古·呼伦贝尔',
    lat: 49.2, lng: 119.7,
    available: 3, adults: 2,
    dogsAllowed: true, hasSauna: false, isLakeNearby: false, isSecluded: false,
    description: '豪华草原帐篷，夜晚可在私人露台上仰望璀璨星河。体验牧民生活，感受草原的辽阔与自由。',
    scenery: ['草原', '星空'],
    activities: ['骑马', '篝火晚会', '体验牧民生活'],
    features: [
      { icon: PawPrint, text: '允许携带宠物' },
      { icon: Tent, text: '特色帐篷体验' },
      { icon: Star, text: '冒险等级', level: 1 }
    ],
    travelTimes: [ { city: '海拉尔', time: '约2小时车程' } ],
    price: 980, image: '/placeholder-grassland-1.jpg' // 替换为实际图片
  },
  {
    id: 4,
    name: '长白山·林海雪原木屋',
    region: '吉林·长白山',
    lat: 42.5, lng: 128.0,
    available: 1, adults: 3,
    dogsAllowed: true, hasSauna: true, isLakeNearby: false, isSecluded: true,
    description: '隐藏在长白山深处的林海雪原中，冬季可体验滑雪乐趣。室内壁炉和桑拿带来温暖舒适。',
    scenery: ['森林', '雪山', '僻静'],
    activities: ['滑雪', '徒步雪林', '壁炉夜话', '桑拿'],
    features: [
       { icon: PawPrint, text: '允许携带宠物' },
       { icon: MountainSnow, text: '邻近雪场' },
       { icon: Heater, text: '配备桑拿' },
       { icon: Sun, text: '僻静之所' },
       { icon: Star, text: '冒险等级', level: 3 }
    ],
    travelTimes: [ { city: '长白山机场', time: '约1小时车程' } ],
    price: 1600, image: '/placeholder-snow-1.jpg' // 替换为实际图片
  },
   {
    id: 5,
    name: '莫干山·竹海幽居',
    region: '浙江·湖州',
    lat: 30.6, lng: 119.8,
    available: 2, adults: 2,
    dogsAllowed: false, hasSauna: false, isLakeNearby: false, isSecluded: true,
    description: '隐于莫干山竹海深处的设计师小屋，极简风格与自然融为一体。适合寻求宁静和创作灵感的旅客。',
    scenery: ['森林', '竹海', '僻静'],
    activities: ['徒步', '瑜伽冥想', '阅读'],
    features: [
       { icon: TreePine, text: '竹海环绕' },
       { icon: Sun, text: '僻静之所' },
       { icon: Star, text: '冒险等级', level: 1 }
    ],
    travelTimes: [ { city: '杭州', time: '约1.5小时车程' } ],
    price: 1100, image: '/placeholder-bamboo-1.jpg' // 替换为实际图片
  },
   {
    id: 6,
    name: '阳朔·漓江画境',
    region: '广西·桂林',
    lat: 24.7, lng: 110.4,
    available: 1, adults: 4,
    dogsAllowed: true, hasSauna: false, isLakeNearby: true, isSecluded: false,
    description: '坐落于漓江精华段，推窗即是喀斯特山水画卷。可在私人码头乘竹筏游览，或在露台品茗赏景。',
    scenery: ['河畔', '山景', '喀斯特地貌'],
    activities: ['竹筏漂流', '攀岩体验', '乡村骑行'],
    features: [
       { icon: PawPrint, text: '允许携带宠物' },
       { icon: Waves, text: '靠近水域' }, // River nearby
       { icon: Sailboat, text: '私人码头' },
       { icon: Star, text: '冒险等级', level: 2 }
    ],
    travelTimes: [ { city: '阳朔县城', time: '约20分钟车程' } ],
    price: 1500, image: '/placeholder-river-1.jpg' // 替换为实际图片
  }
  // 可以继续添加更多房源...
];

// Map component removed for now
// const MapComponent = dynamic(() => import('@/components/search/map-component'), { ... });

// 从数据中提取所有选项 (去重)
const allRegions = Array.from(new Set(mockHouses.map(h => h.region)));
// 如果需要风景和活动筛选，可以取消注释
// const allSceneries = Array.from(new Set(mockHouses.flatMap(h => h.scenery)));
// const allActivities = Array.from(new Set(mockHouses.flatMap(h => h.activities)));

export default function SearchPage() {
  // 日期选择器状态
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  // 筛选状态
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [selectedGuests, setSelectedGuests] = useState<string>('');

  // 标签筛选状态
  const filterTags = {
    dogsAllowed: false,
    hasSauna: false,
    isLakeNearby: false,
    isSecluded: false,
  };
  const [activeFilters, setActiveFilters] = useState(filterTags);

  // 切换筛选标签状态
  const toggleFilterTag = (tag: keyof typeof filterTags) => {
    setActiveFilters(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
  };

  // 筛选房源
  const filteredHouses = useMemo(() => {
    return mockHouses.filter(house => {
      // 区域筛选
      if (selectedRegion && selectedRegion !== 'all' && house.region !== selectedRegion) return false;
      
      // 人数筛选
      if (selectedGuests && selectedGuests !== 'any' && house.adults < parseInt(selectedGuests)) return false;
      
      // 标签筛选
      if (activeFilters.dogsAllowed && !house.dogsAllowed) return false;
      if (activeFilters.hasSauna && !house.hasSauna) return false;
      if (activeFilters.isLakeNearby && !house.isLakeNearby) return false;
      if (activeFilters.isSecluded && !house.isSecluded) return false;
      
      return true;
    });
  }, [selectedRegion, selectedGuests, activeFilters]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* 筛选栏 */}
        <div className="bg-[#f8f9fa] py-4 border-b">
          <div className="container mx-auto flex flex-wrap items-center gap-4 px-4 md:px-8">
            {/* 日期选择 */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "yyyy-MM-dd")} 至{" "}
                        {format(date.to, "yyyy-MM-dd")}
                      </>
                    ) : (
                      format(date.from, "yyyy-MM-dd")
                    )
                  ) : (
                    <span>选择日期</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>

            {/* 区域选择 */}
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="选择区域" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部区域</SelectItem>
                {allRegions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* 人数选择 */}
            <Select value={selectedGuests} onValueChange={setSelectedGuests}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="入住人数" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">不限</SelectItem>
                <SelectItem value="1">至少1人</SelectItem>
                <SelectItem value="2">至少2人</SelectItem>
                <SelectItem value="3">至少3人</SelectItem>
                <SelectItem value="4">至少4人</SelectItem>
              </SelectContent>
            </Select>

            {/* 筛选标签 */}
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={activeFilters.dogsAllowed ? "default" : "outline"} 
                size="sm"
                onClick={() => toggleFilterTag('dogsAllowed')}
                className="rounded-full"
              >
                <PawPrint className="h-4 w-4 mr-1" /> 允许宠物
              </Button>
              <Button 
                variant={activeFilters.hasSauna ? "default" : "outline"} 
                size="sm"
                onClick={() => toggleFilterTag('hasSauna')}
                className="rounded-full"
              >
                <Heater className="h-4 w-4 mr-1" /> 有桑拿
              </Button>
              <Button 
                variant={activeFilters.isLakeNearby ? "default" : "outline"} 
                size="sm"
                onClick={() => toggleFilterTag('isLakeNearby')}
                className="rounded-full"
              >
                <Waves className="h-4 w-4 mr-1" /> 近湖泊
              </Button>
              <Button 
                variant={activeFilters.isSecluded ? "default" : "outline"} 
                size="sm"
                onClick={() => toggleFilterTag('isSecluded')}
                className="rounded-full"
              >
                <Sun className="h-4 w-4 mr-1" /> 僻静
              </Button>
            </div>

            {/* 筛选按钮 */}
            <Button variant="ghost" className="ml-auto" onClick={() => {
              setSelectedRegion('');
              setSelectedGuests('');
              setActiveFilters(filterTags);
            }}>
              所有筛选
            </Button> {/* 示例筛选按钮 */}
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="container mx-auto py-8 px-4 md:px-8">
          {/* 房源列表区域 - 使用中文数据 */}
          <div>
            {filteredHouses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                {filteredHouses.map((house) => (
                  // 添加 Link 组件实现导航
                  <Link href={`/stay/${house.id}`} key={house.id} className="cursor-pointer group block">
                    <div className="aspect-video w-full overflow-hidden rounded-lg mb-4 relative">
                      <Image
                        src={house.image} // 使用模拟数据中的图片路径
                        alt={house.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={house.id <= 3} // 优先加载前几个图片
                        placeholder="blur" // 添加模糊占位符
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // 简单的模糊占位图
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{house.name}</h3>
                    {/* 房源/人数/标签行 */}
                    <div className="text-xs text-gray-600 mb-2 flex items-center flex-wrap gap-x-2 gap-y-1">
                      <span>{house.available} 间小屋 / 最多 {house.adults} 人</span>
                      {house.dogsAllowed && (
                        <span className="flex items-center"><PawPrint className="h-3 w-3 mr-1" /> 允许宠物</span>
                      )}
                      {house.hasSauna && (
                        <span className="flex items-center"><Heater className="h-3 w-3 mr-1" /> 有桑拿</span>
                      )}
                      {house.isLakeNearby && (
                        <span className="flex items-center"><Waves className="h-3 w-3 mr-1" /> 近湖泊</span>
                      )}
                      {house.isSecluded && (
                        <span className="flex items-center"><Sun className="h-3 w-3 mr-1" /> 僻静</span>
                      )}
                    </div>
                    {/* 描述 */}
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">
                      {house.description}
                    </p>
                    {/* 旅行时间 */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {house.travelTimes.map(tt => (
                        <Badge key={tt.city} variant="outline" className="rounded-full px-3 py-1 text-xs">
                          <Clock className="h-3 w-3 mr-1" /> {tt.time} 来自 {tt.city}
                        </Badge>
                      ))}
                    </div>
                    {/* 特性 */}
                    <div className="space-y-1 text-sm text-gray-800">
                      {house.features.map(feat => (
                        <div key={feat.text} className="flex items-center">
                          <feat.icon className="h-4 w-4 mr-2 flex-shrink-0 text-gray-600" />
                          <span>
                            {feat.text}
                            {feat.level !== undefined && ` ${feat.level}`} {/* 显示等级 */}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Link> // 结束 Link 组件
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-500">
                <p>抱歉，没有找到符合条件的 Weekend House。</p>
                <p>请尝试调整筛选条件。</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}