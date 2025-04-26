import { Sun, Wind, Droplets, Eye, Gauge, Activity, Sunrise, Sunset } from "lucide-react"

interface HighlightsGridProps {
  id: string
  uv: number
  wind: number
  windDirection: string
  humidity: number
  visibility: number
  pressure: number
  aqi: number
  sunrise: string
  sunset: string
}

export default function HighlightsGrid({
  id,
  uv,
  wind,
  windDirection,
  humidity,
  visibility,
  pressure,
  aqi,
  sunrise,
  sunset,
}: HighlightsGridProps) {
  const getUVDescription = (value: number) => {
    if (value <= 2) return "Düşük"
    if (value <= 5) return "Orta"
    if (value <= 7) return "Yüksek"
    if (value <= 10) return "Çok Yüksek"
    return "Aşırı"
  }

  const getAQIDescription = (value: number) => {
    if (value === 1) return "İyi"
    if (value === 2) return "Orta"
    if (value === 3) return "Hassas Gruplar İçin Sağlıksız"
    if (value === 4) return "Sağlıksız"
    if (value === 5) return "Çok Sağlıksız"
    return "Tehlikeli"
  }

  return (
    <div id={id} className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* UV Index */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Sun className="h-8 w-8 text-yellow-300 mb-2" />
        <div className="text-2xl font-bold text-white">{uv}</div>
        <p className="text-white/80 text-sm">{getUVDescription(uv)}</p>
        <p className="text-white/60 text-xs mt-1">UV İndeksi</p>
      </div>

      {/* Wind */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Wind className="h-8 w-8 text-white mb-2" />
        <div className="text-2xl font-bold text-white">{wind}m/s</div>
        <p className="text-white/80 text-sm">{windDirection}</p>
        <p className="text-white/60 text-xs mt-1">Rüzgar</p>
      </div>

      {/* Humidity */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Droplets className="h-8 w-8 text-blue-300 mb-2" />
        <div className="text-2xl font-bold text-white">{humidity}%</div>
        <p className="text-white/80 text-sm">{humidity < 30 ? "Düşük" : humidity > 70 ? "Yüksek" : "Normal"}</p>
        <p className="text-white/60 text-xs mt-1">Nem</p>
      </div>

      {/* Visibility */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Eye className="h-8 w-8 text-white mb-2" />
        <div className="text-2xl font-bold text-white">{visibility} km</div>
        <p className="text-white/80 text-sm">{visibility >= 10 ? "Mükemmel" : visibility >= 5 ? "İyi" : "Kısıtlı"}</p>
        <p className="text-white/60 text-xs mt-1">Görüş Mesafesi</p>
      </div>

      {/* Pressure */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Gauge className="h-8 w-8 text-white mb-2" />
        <div className="text-2xl font-bold text-white">{pressure} hPa</div>
        <p className="text-white/80 text-sm">{pressure > 1013 ? "Yüksek" : pressure < 1013 ? "Düşük" : "Normal"}</p>
        <p className="text-white/60 text-xs mt-1">Basınç</p>
      </div>

      {/* AQI */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Activity className="h-8 w-8 text-green-300 mb-2" />
        <div className="text-2xl font-bold text-white">{aqi}</div>
        <p className="text-white/80 text-sm">{getAQIDescription(aqi)}</p>
        <p className="text-white/60 text-xs mt-1">Hava Kalitesi</p>
      </div>

      {/* Sunrise */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Sunrise className="h-8 w-8 text-yellow-300 mb-2" />
        <div className="text-2xl font-bold text-white">{sunrise}</div>
        <p className="text-white/80 text-sm">Gün Doğumu</p>
        <p className="text-white/60 text-xs mt-1">&nbsp;</p>
      </div>

      {/* Sunset */}
      <div className="glass-card p-4 rounded-xl flex flex-col items-center justify-center">
        <Sunset className="h-8 w-8 text-orange-300 mb-2" />
        <div className="text-2xl font-bold text-white">{sunset}</div>
        <p className="text-white/80 text-sm">Gün Batımı</p>
        <p className="text-white/60 text-xs mt-1">&nbsp;</p>
      </div>
    </div>
  )
}
