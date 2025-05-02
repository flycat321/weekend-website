'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation'; // Use hooks for client components
import Link from 'next/link';
import dynamic from 'next/dynamic'; // Import dynamic for map

// --- Copying necessary imports, types, and data --- 
// (Ideally, move types/data to shared files like lib/types.ts, lib/data.ts later)
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Clock, PawPrint, Star, Sun, Tent, Heater, Waves, Sailboat, CalendarIcon, TreePine, MountainSnow, Droplet, Wind, BedDouble, ShowerHead, CookingPot, Utensils, Snowflake, Sofa, BookOpen, Wifi, Layers, ParkingSquare, Menu } from 'lucide-react';
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator"; // For visual separation
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Feature type
type Feature = {
  icon: React.ElementType;
  text: string;
  level?: number;
};

// Equipment item type
type EquipmentItem = {
  icon: React.ElementType;
  text: string;
};

// FAQ item type
type FAQItem = {
  question: string;
  answer: string;
};

// Type for generic content sections (now combined)
type ExploreItem = {
  category: '环境' | '美食' | '活动' | '额外服务'; // Add category
  title: string;
  description: string;
  image: string;
};

// Updated House type with new fields
type House = {
  id: number;
  name: string;
  region: string;
  province?: string;
  lat: number;
  lng: number;
  available: number;
  adults: number;
  checkInTime: string; // e.g., "下午 3:00"
  checkOutTime: string; // e.g., "上午 11:00"
  dogsAllowed: boolean;
  hasSauna: boolean;
  isLakeNearby: boolean;
  isSecluded: boolean;
  description: string;
  longDescription?: string; // Optional longer description
  scenery: string[];
  activities: string[];
  features: Feature[];
  keyInfo: Feature[]; // Specific key info section icons/text
  travelTimes: { city: string; time: string }[];
  hostName?: string;
  hostDescription?: string;
  hostImage?: string;
  equipment?: EquipmentItem[];
  gettingThere?: string; // Text for getting there section
  galleryImages?: string[];
  exploreItems?: ExploreItem[]; // Combined array for Surroundings, Cuisine, Activities, Extras
  faqs?: FAQItem[];
  price: number;
  image: string; // Main image
};

// Mock Data (Copied from search page - refactor later)
const mockHouses: House[] = [
  {
    id: 1,
    name: '川西·森林秘境小屋',
    region: '四川·阿坝',
    province: '四川',
    lat: 31.8, lng: 103.5,
    available: 1, adults: 2,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
    dogsAllowed: true, hasSauna: false, isLakeNearby: false, isSecluded: true,
    description: '坐落在川西高原的原始森林边缘，露台外即是壮丽山景，时有野生动物出没。体验远离尘嚣的宁静。',
    longDescription: '这间小屋专为寻求深度自然沉浸和绝对隐私的旅客设计。采用可持续材料建造，配备地暖和全景窗户，让您在舒适中欣赏四季变换的山林景色。夜晚，无光污染的环境是观星的绝佳场所。',
    scenery: ['森林', '高山', '僻静'],
    activities: ['徒步', '观星', '放松', '野生动物观察'],
    features: [
      { icon: TreePine, text: '全景森林视野' },
      { icon: Wifi, text: '高速无线网络' },
      { icon: Heater, text: '舒适地暖系统' },
      { icon: PawPrint, text: '允许携带宠物入住' },
      { icon: Wind, text: '新风与空气净化' },
      { icon: Star, text: '冒险等级', level: 2 }
    ],
    keyInfo: [
      { icon: Clock, text: '入住: 下午 3:00' },
      { icon: Clock, text: '退房: 上午 11:00' },
      { icon: Users, text: '最多 2 位成人' },
      { icon: PawPrint, text: '允许携带宠物' },
      { icon: Sun, text: '僻静之所' },
      { icon: Star, text: '冒险等级 2' }
    ],
    travelTimes: [ { city: '成都', time: '约3.5小时车程' } ],
    hostName: "阿明",
    hostDescription: "阿明是土生土长的本地向导，熟悉这里的每一条小径和动植物。他热衷于分享他对这片土地的热爱，并乐于为您的探险提供建议。",
    hostImage: "/placeholder-host.jpg",
    equipment: [
      { icon: BedDouble, text: '舒适大床及床品' }, { icon: ShowerHead, text: '淋浴设施' },
      { icon: CookingPot, text: '基础厨房用具' }, { icon: Utensils, text: '餐具' },
      { icon: Snowflake, text: '冰箱' }, { icon: Wifi, text: '无线网络' },
      { icon: Heater, text: '地暖' }, { icon: Layers, text: '毛巾与浴巾' },
      { icon: Sofa, text: '舒适沙发' }, { icon: BookOpen, text: '精选读物' },
      { icon: Wind, text: '新风系统' }, { icon: ParkingSquare, text: '免费停车位' }
    ],
    gettingThere: "建议自驾前往。从成都出发，沿G4217高速行驶至汶川，后转S303省道，根据导航指引即可抵达。冬季部分路段可能需要防滑链。",
    galleryImages: ['/placeholder-forest-1.jpg', '/placeholder-interior-1.jpg', '/placeholder-view-1.jpg'],
    exploreItems: [
      { category: '环境', title: "原始森林环抱", description: "小屋被数千公顷的原始森林环绕，空气清新，富含负氧离子。", image: "/placeholder-surrounding-forest.jpg" },
      { category: '环境', title: "高山草甸风光", description: "附近有广阔的高山草甸，季节性开放各种野花，是徒步和摄影的好去处。", image: "/placeholder-surrounding-meadow.jpg" },
      { category: '美食', title: "本地牦牛肉火锅", description: "选用当地牧场的新鲜牦牛肉，搭配特色藏式香料锅底，风味独特。", image: "/placeholder-cuisine-yak.jpg" },
      { category: '美食', title: "酥油茶与糌粑", description: "体验地道的藏式早点或下午茶，感受高原人民的饮食文化。", image: "/placeholder-cuisine-tea.jpg" },
      { category: '活动', title: "森林徒步探险", description: "跟随向导深入森林，探寻稀有植物和动物踪迹。", image: "/placeholder-activity-hiking.jpg" },
      { category: '活动', title: "星空摄影", description: "远离光污染的绝佳地点，指导您拍摄震撼的星空照片。", image: "/placeholder-activity-stars.jpg" },
      { category: '活动', title: "野生菌采摘 (季节性)", description: "在雨季，体验采摘新鲜野生菌的乐趣（需向导陪同）。", image: "/placeholder-activity-mushroom.jpg" },
      { category: '额外服务', title: "本地牦牛肉烧烤套餐", description: "包含新鲜本地牦牛肉、蔬菜和烧烤工具。", image: "/placeholder-bbq.jpg"},
      { category: '额外服务', title: "向导徒步服务", description: "由房东阿明带领，探索周边绝美路线。", image: "/placeholder-hiking.jpg"}
    ],
    faqs: [
      { question: "小屋适合带小孩入住吗？", answer: "由于地处偏远且更注重宁静体验，我们通常不建议年龄较小的儿童入住。具体情况请与我们联系。" },
      { question: "手机信号和网络怎么样？", answer: "小屋提供稳定的无线网络。手机信号方面，移动和电信覆盖较好，联通可能稍弱。" },
      { question: "包含早餐吗？", answer: "房价不包含早餐，但厨房设施齐全，您可自备食材烹饪。我们也可应要求提供付费的本地特色早餐篮。" }
    ],
    price: 1350, 
    image: '/placeholder-forest-1.jpg',
  },
  {
    id: 2,
    name: '洱海·湖光山色别墅',
    region: '云南·大理',
    province: '云南',
    lat: 25.7, lng: 100.1,
    available: 2, adults: 4,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
    dogsAllowed: false, hasSauna: true, isLakeNearby: true, isSecluded: false,
    description: '直面洱海，全景落地窗将苍山洱海尽收眼底。配备私人桑拿房，享受极致的放松体验。',
    scenery: ['湖畔', '山景'],
    activities: ['环湖骑行', '皮划艇', '桑拿', '品茶'],
    features: [
      { icon: Waves, text: '一线湖景' },
      { icon: Heater, text: '配备桑拿' },
      { icon: Waves, text: '靠近水域' },
      { icon: Star, text: '冒险等级', level: 1 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 3:00' }, { icon: Clock, text: '退房: 上午 11:00' }, { icon: Users, text: '最多 4 位成人' }, { icon: Heater, text: '有桑拿' }],
    travelTimes: [ { city: '大理古城', time: '约30分钟车程' } ],
    price: 1800,
    image: '/placeholder-lake-1.jpg',
    exploreItems: [
       { category: '环境', title: "洱海生态廊道", description: "出门即可漫步或骑行于风景优美的生态廊道。", image: "/placeholder-surrounding-erhai.jpg" },
       { category: '环境', title: "苍山国家地质公园", description: "距离苍山入口不远，可乘坐索道或徒步探索。", image: "/placeholder-surrounding-cangshan.jpg" },
       { category: '美食', title: "白族特色三道茶", description: "体验白族待客的最高礼仪，品味\"头苦、二甜、三回味\"。", image: "/placeholder-cuisine-tea3.jpg" },
       { category: '美食', title: "酸辣鱼与饵块", description: "品尝大理本地特色菜肴，如酸辣鱼、烤饵块等。", image: "/placeholder-cuisine-fish.jpg" },
       { category: '活动', title: "环洱海骑行", description: "提供自行车租赁，轻松享受洱海风光。", image: "/placeholder-activity-cycling.jpg" },
       { category: '活动', title: "皮划艇体验", description: "在平静的湖面上体验皮划艇的乐趣。", image: "/placeholder-activity-kayak.jpg" }
    ],
  },
  {
    id: 3,
    name: '内蒙·草原星空帐篷',
    region: '内蒙古·呼伦贝尔',
    province: '内蒙古',
    lat: 49.2, lng: 119.7,
    available: 3, adults: 2,
    checkInTime: "下午 2:00", checkOutTime: "中午 12:00",
    dogsAllowed: true, hasSauna: false, isLakeNearby: false, isSecluded: false,
    description: '豪华草原帐篷，夜晚可在私人露台上仰望璀璨星河。体验牧民生活，感受草原的辽阔与自由。',
    scenery: ['草原', '星空'],
    activities: ['骑马', '篝火晚会', '体验牧民生活'],
    features: [
      { icon: PawPrint, text: '允许携带宠物' },
      { icon: Tent, text: '特色帐篷体验' },
      { icon: Star, text: '冒险等级', level: 1 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 2:00' }, { icon: Clock, text: '退房: 中午 12:00' }, { icon: Users, text: '最多 2 位成人' }, { icon: PawPrint, text: '允许携带宠物' }],
    travelTimes: [ { city: '海拉尔', time: '约2小时车程' } ],
    price: 980,
    image: '/placeholder-grassland-1.jpg'
  },
  {
    id: 4,
    name: '长白山·林海雪原木屋',
    region: '吉林·长白山',
    province: '吉林',
    lat: 42.5, lng: 128.0,
    available: 1, adults: 3,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
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
    keyInfo: [{ icon: Clock, text: '入住: 下午 3:00' }, { icon: Clock, text: '退房: 上午 11:00' }, { icon: Users, text: '最多 3 位成人' }, { icon: PawPrint, text: '允许携带宠物' }, { icon: Heater, text: '有桑拿' }, { icon: Sun, text: '僻静之所' }],
    travelTimes: [ { city: '长白山机场', time: '约1小时车程' } ],
    price: 1600,
    image: '/placeholder-snow-1.jpg'
  },
   {
    id: 5,
    name: '莫干山·竹海幽居',
    region: '浙江·湖州',
    province: '浙江',
    lat: 30.6, lng: 119.8,
    available: 2, adults: 2,
    checkInTime: "下午 3:00", checkOutTime: "上午 11:00",
    dogsAllowed: false, hasSauna: false, isLakeNearby: false, isSecluded: true,
    description: '隐于莫干山竹海深处的设计师小屋，极简风格与自然融为一体。适合寻求宁静和创作灵感的旅客。',
    scenery: ['森林', '竹海', '僻静'],
    activities: ['徒步', '瑜伽冥想', '阅读'],
    features: [
       { icon: TreePine, text: '竹海环绕' },
       { icon: Sun, text: '僻静之所' },
       { icon: Star, text: '冒险等级', level: 1 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 3:00' }, { icon: Clock, text: '退房: 上午 11:00' }, { icon: Users, text: '最多 2 位成人' }, { icon: Sun, text: '僻静之所' }],
    travelTimes: [ { city: '杭州', time: '约1.5小时车程' } ],
    price: 1100,
    image: '/placeholder-bamboo-1.jpg'
  },
   {
    id: 6,
    name: '阳朔·漓江画境',
    region: '广西·桂林',
    province: '广西',
    lat: 24.7, lng: 110.4,
    available: 1, adults: 4,
    checkInTime: "下午 2:30", checkOutTime: "中午 12:00",
    dogsAllowed: true, hasSauna: false, isLakeNearby: true, isSecluded: false,
    description: '坐落于漓江精华段，推窗即是喀斯特山水画卷。可在私人码头乘竹筏游览，或在露台品茗赏景。',
    scenery: ['河畔', '山景', '喀斯特地貌'],
    activities: ['竹筏漂流', '攀岩体验', '乡村骑行'],
    features: [
       { icon: PawPrint, text: '允许携带宠物' },
       { icon: Waves, text: '靠近水域' },
       { icon: Sailboat, text: '私人码头' },
       { icon: Star, text: '冒险等级', level: 2 }
    ],
    keyInfo: [{ icon: Clock, text: '入住: 下午 2:30' }, { icon: Clock, text: '退房: 中午 12:00' }, { icon: Users, text: '最多 4 位成人' }, { icon: PawPrint, text: '允许携带宠物' }, { icon: Waves, text: '靠近水域' }],
    travelTimes: [ { city: '阳朔县城', time: '约20分钟车程' } ],
    price: 1500,
    image: '/placeholder-river-1.jpg'
  }
];

// Helper function to render a carousel section
const renderCarouselSection = (title: string, items: ExploreItem[] | undefined) => {
  if (!items || items.length === 0) return null;

  // Determine how many items per view approx. for button logic
  const itemsPerView = 3; // Target 3 items on larger screens

  return (
    <section className="mb-12 md:mb-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: items.length > itemsPerView, // Loop if more items than visible
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4"> {/* Keep consistent negative margin */}
          {items.map((item, index) => (
            <CarouselItem key={`${item.category}-${item.title}-${index}`} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"> {/* Full width on smallest, 1/2 on small, 1/3 on large+ */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg group h-full"> {/* Use 4/3 aspect ratio */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Adjusted sizes
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div> {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 p-4 md:p-5 text-white w-full"> {/* Slightly smaller padding */}
                  <span className="inline-block bg-[#00CED1] text-white text-[10px] font-semibold px-2 py-0.5 rounded mb-1.5">{item.category}</span> {/* Added category badge back, smaller */}
                  <h3 className="text-base md:text-lg font-bold mb-1 line-clamp-2">{item.title}</h3> {/* Adjusted text size */}
                  <p className="text-xs md:text-sm text-gray-200 line-clamp-2">{item.description}</p> {/* Adjusted line clamp */}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {items.length > itemsPerView && ( // Show arrows if items exceed target per view
           <>
              {/* Use standard shadcn button positioning */}
              <CarouselPrevious className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
              <CarouselNext className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 hidden sm:flex" />
           </>
        )}
      </Carousel>
    </section>
  );
}

export default function StayDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? parseInt(params.id) : 0;
  const [house, setHouse] = useState<House | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [guestCount, setGuestCount] = useState(1);

  // Dates formatted for display
  const dateRangeFormatted = date?.from && date?.to
    ? `${format(date.from, "MM.dd")} - ${format(date.to, "MM.dd")}`
    : "选择日期";

  // Get house data
  useEffect(() => {
    // Simulate loading
    setIsLoading(true);

    // Find the house with the given ID 
    const foundHouse = mockHouses.find(h => h.id === id);

    // Wait for a small delay to simulate API call
    setTimeout(() => {
      setHouse(foundHouse || null);
      setIsLoading(false);
    }, 300);

    // If there's a category in the URL hash, select it
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setSelectedCategory(hash);
      }
    }
  }, [id]);

  // If house not found, show 404
  if (!isLoading && !house) {
    return notFound();
  }

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fdf9f3]">
      <header className="p-4 bg-transparent absolute top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="font-bold text-2xl text-[#00CED1]">WEEKEND</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/search" className="text-zinc-800 hover:underline">探索</Link>
            <Link href="/journal" className="text-zinc-800 hover:underline">日志</Link>
            <Link href="/about" className="text-zinc-800 hover:underline">关于我们</Link>
            <Link href="/contact" className="text-zinc-800 hover:underline">联系</Link>
          </nav>
          <Button variant="ghost" className="md:hidden" size="icon" aria-label="菜单">
            <Menu />
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* 主标题区域 */}
        <section className="w-full pt-20 pb-10 px-5 md:px-10 lg:px-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-zinc-800 mb-6">{house!.name}</h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mb-6">
            <div className="max-w-2xl">
              <p className="text-zinc-700 text-lg mb-4">
                {house!.description}
              </p>
              <p className="text-zinc-700 mb-4">
                每晚{house!.price} 起
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {house!.scenery.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="rounded-full border-zinc-400 text-zinc-700">
                    {tag}
                  </Badge>
                ))}
                {house!.activities.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="rounded-full border-zinc-400 text-zinc-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {house!.keyInfo.map((info, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <info.icon className="h-5 w-5 text-zinc-700" />
                  <span className="text-sm text-zinc-700">{info.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 主图片区域 */}
        <section className="w-full aspect-[16/10] relative mb-10">
          <Image 
            src={house!.image}
            alt={house!.name}
            fill
            className="object-cover"
            priority
          />
        </section>

        {/* 详细内容和环境、活动区域 */}
        <section className="w-full px-5 md:px-10 lg:px-20 mb-20">
          <h2 className="text-2xl font-light text-zinc-800 mb-6">额外内容、活动与环境</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {house!.exploreItems?.map((item, idx) => (
              <div key={idx} className="rounded-lg overflow-hidden">
                <div className="aspect-[4/3] relative">
                  <Image 
                    src={item.image} 
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <div className="text-sm text-zinc-500 mb-1">{item.category}</div>
                  <h3 className="font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 设施区域 */}
        <section className="w-full px-5 md:px-10 lg:px-20 mb-20">
          <h2 className="text-2xl font-light text-zinc-800 mb-6">设备</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {house!.equipment?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-zinc-700" />
                <span className="text-sm text-zinc-700">{item.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 如何到达区域 */}
        <section className="w-full px-5 md:px-10 lg:px-20 mb-20">
          <h2 className="text-2xl font-light text-zinc-800 mb-6">如何到达</h2>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1">
              {/* 地图位置示意图 - 简化为一个圆圈 */}
              <div className="w-full aspect-square relative border border-zinc-300 rounded-full flex items-center justify-center">
                <div className="absolute w-[60%] h-[60%] rounded-full border border-zinc-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-medium text-zinc-700">{house!.region.split('·')[1]}</div>
                    <div className="text-xs text-zinc-500">1h</div>
                    <div className="text-xs text-zinc-500">2h</div>
                  </div>
                </div>
                <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-medium mb-4">乘火车</h3>
              <p className="text-zinc-700 mb-6">
                从汉堡乘坐火车约需2:00小时，继续小路后一段路也可以出租车黑车。
                我们建议您提前预订最早抵达时间表，并提前预订出租车以避免等待时间。
              </p>

              <h3 className="font-medium mb-4">自驾车</h3>
              <p className="text-zinc-700">
                距汉堡75公里，以1:00h的行车时间计算。
                {house!.gettingThere}
              </p>
            </div>
          </div>
        </section>

        {/* 常见问题区域 */}
        <section className="w-full px-5 md:px-10 lg:px-20 mb-40">
          <h2 className="text-2xl font-light text-zinc-800 mb-6">常见问题</h2>

          <div className="space-y-4">
            {house!.faqs?.map((faq, idx) => (
              <Accordion key={idx} type="single" collapsible>
                <AccordionItem value={`faq-${idx}`}>
                  <AccordionTrigger className="text-left font-normal">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </section>
      </main>

      {/* 固定在底部的预订区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffca28] p-4 z-50">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-zinc-800">预订日期</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto justify-start text-left font-normal bg-white border-none"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRangeFormatted}
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
                  className="bg-white"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="text-zinc-800">人数</div>
            <Select defaultValue="1" onValueChange={(value) => setGuestCount(parseInt(value))}>
              <SelectTrigger className="w-full sm:w-[120px] bg-white border-none">
                <SelectValue placeholder="人数" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 位客人</SelectItem>
                <SelectItem value="2">2 位客人</SelectItem>
                {house!.adults > 2 && (
                  <>
                    <SelectItem value="3">3 位客人</SelectItem>
                    <SelectItem value="4">4 位客人</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full sm:w-auto bg-[#ffa000] hover:bg-[#ff8f00] text-white font-medium px-8">
            现在预订
          </Button>
        </div>
      </div>

      <footer className="bg-white pt-16 pb-8 text-zinc-800">
        {/* ... */}
      </footer>
    </div>
  );
}