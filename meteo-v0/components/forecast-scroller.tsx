"use client"

import { useState } from "react"
import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ForecastDay {
  day: string
  date: string
  temp_max: number
  temp_min: number
  icon: string
}

interface ForecastScrollerProps {
  id: string
  forecast: ForecastDay[]
}

export default function ForecastScroller({ id, forecast }: ForecastScrollerProps) {
  const [activeTab, setActiveTab] = useState<"2" | "10" | "30">("2")

  const getWeatherIcon = (icon: string) => {
    switch (icon.substring(0, 2)) {
      case "01":
        return <Sun className="h-10 w-10 text-yellow-300" />
      case "02":
      case "03":
      case "04":
        return <Cloud className="h-10 w-10 text-white" />
      case "09":
      case "10":
        return <CloudRain className="h-10 w-10 text-white" />
      case "11":
        return <CloudLightning className="h-10 w-10 text-white" />
      case "13":
        return <CloudSnow className="h-10 w-10 text-white" />
      default:
        return <Cloud className="h-10 w-10 text-white" />
    }
  }

  return (
    <div id={id} className="glass-card p-4 rounded-2xl">
      <div className="flex space-x-2 mb-4">
        <Button
          variant="ghost"
          className={cn(
            "rounded-full px-4 text-white hover:bg-white/20",
            activeTab === "2" && "bg-[#047481] hover:bg-[#047481]/90",
          )}
          onClick={() => setActiveTab("2")}
        >
          2 Gün
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "rounded-full px-4 text-white hover:bg-white/20",
            activeTab === "10" && "bg-[#047481] hover:bg-[#047481]/90",
          )}
          onClick={() => setActiveTab("10")}
        >
          10 Gün
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "rounded-full px-4 text-white hover:bg-white/20",
            activeTab === "30" && "bg-[#047481] hover:bg-[#047481]/90",
          )}
          onClick={() => setActiveTab("30")}
        >
          30 Gün
        </Button>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 min-w-max">
          {forecast.map((day, index) => (
            <div key={index} className="glass-card-light p-4 rounded-xl flex flex-col items-center min-w-[100px]">
              <p className="text-white font-medium">{day.day}</p>
              <p className="text-white/70 text-xs mb-2">{day.date}</p>
              {getWeatherIcon(day.icon)}
              <div className="mt-2 flex justify-between w-full">
                <span className="text-white font-medium">{day.temp_min}°</span>
                <span className="text-white font-medium">{day.temp_max}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
