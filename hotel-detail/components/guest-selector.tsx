"use client"
import { ChevronDown, Minus, Plus, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface GuestSelectorProps {
  adults: number
  setAdults: (count: number) => void
  children: number
  setChildren: (count: number) => void
}

export function GuestSelector({ adults, setAdults, children, setChildren }: GuestSelectorProps) {
  const totalGuests = adults + children

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span>{totalGuests} 位客人</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <h4 className="font-medium">成人</h4>
              <p className="text-sm text-muted-foreground">13岁以上</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                disabled={adults <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">减少成人数量</span>
              </Button>
              <span className="w-4 text-center">{adults}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setAdults(adults + 1)}
                disabled={adults + children >= 10}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">增加成人数量</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <h4 className="font-medium">儿童</h4>
              <p className="text-sm text-muted-foreground">2-12岁</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setChildren(Math.max(0, children - 1))}
                disabled={children <= 0}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">减少儿童数量</span>
              </Button>
              <span className="w-4 text-center">{children}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setChildren(children + 1)}
                disabled={adults + children >= 10}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">增加儿童数量</span>
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
