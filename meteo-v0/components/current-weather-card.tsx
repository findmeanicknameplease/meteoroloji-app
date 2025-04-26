import { Cloud, CloudRain, CloudSnow, Sun, CloudLightning } from "lucide-react"

interface CurrentWeatherCardProps {
  id: string
  city: string
  date: string
  time: string
  temp: number
  feelsLike: number
  description: string
  icon: string
}

export default function CurrentWeatherCard({
  id,
  city,
  date,
  time,
  temp,
  feelsLike,
  description,
  icon,
}: CurrentWeatherCardProps) {
  const getWeatherIcon = () => {
    switch (icon.substring(0, 2)) {
      case "01":
        return <Sun className="h-24 w-24 text-yellow-300" />
      case "02":
      case "03":
      case "04":
        return <Cloud className="h-24 w-24 text-white" />
      case "09":
      case "10":
        return <CloudRain className="h-24 w-24 text-white" />
      case "11":
        return <CloudLightning className="h-24 w-24 text-white" />
      case "13":
        return <CloudSnow className="h-24 w-24 text-white" />
      default:
        return <Cloud className="h-24 w-24 text-white" />
    }
  }

  return (
    <div id={id} className="glass-card p-6 md:p-8 rounded-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-montserrat">{city}</h2>
          <p className="text-white/80 mt-1">{date}</p>
          <p className="text-white/80">{time}</p>
        </div>

        <div className="mt-6 md:mt-0 flex items-center">
          {getWeatherIcon()}
          <div className="ml-4">
            <div className="text-5xl md:text-7xl font-bold text-white font-montserrat">{temp}°</div>
            <p className="text-white/80 mt-1">{description}</p>
            <p className="text-white/80 text-sm">Hissedilen: {feelsLike}°</p>
          </div>
        </div>
      </div>
    </div>
  )
}
