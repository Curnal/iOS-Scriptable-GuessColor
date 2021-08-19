const user = "Aditya" // Your name here!
const telegram = "LanguageArtsGrade"  // 
const github = "curnal" // Your github here!
const api = 'API-KEY-HERE'; // Openweatherapp API Key here!
//////////////////////////////////////////////////////////////////////////////////////
 
let latLong = {}
try {
    Location.setAccuracyToKilometer()
    latLong = await Location.current()
} catch (e) {}
const LAT = latLong.latitude
const LON = latLong.longitude
var response = await Location.reverseGeocode(LAT, LON)
var LOCATION_NAME = response[0].postalAddress.city + ", " + response[0].postalAddress.state
log(LOCATION_NAME)
 
 
const data = await fetchData()
const widget = new ListWidget()
createWidget(data)
 
 
Script.setWidget(widget)
Script.complete()
 
 
 
 
function createWidget(data) {
  console.log(data)
  
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")]
  bgColor.locations = [0.0, 1.0]
  widget.backgroundGradient = bgColor
  widget.setPadding(12, 15, 15, 12)
  widget.spacing = 6
 
  const time = new Date()
  const dfTime = new DateFormatter()
  dfTime.locale = "en"
  dfTime.useMediumDateStyle()
  dfTime.useNoTimeStyle()
 
  const firstLine = widget.addText(`[😎] ${user} ~$ 🟢 `)
  firstLine.textColor = Color.white()
  firstLine.textOpacity = 0.7
  firstLine.font = new Font("Menlo", 11)
  
  const timeLine = widget.addText(`[🗓] ${dfTime.string(time)}`)
  timeLine.textColor = Color.white()
  timeLine.font = new Font("Menlo", 11)
  const batteryLine = widget.addText(`[🔋] ${renderBattery()}`)
  batteryLine.textColor = new Color("#6ef2ae")
  batteryLine.font = new Font("Menlo", 11)
  
  const telegramLine = widget.addText(`[️️📬] Telegram: ${data.telegram}`)
  telegramLine.textColor = new Color("#7dbbae")
  telegramLine.font = new Font("Menlo", 11)
  const githubLine = widget.addText(`[📟] GitHub: ${data.github} 👥`)
  githubLine.textColor = new Color("#ff9468")
  githubLine.font = new Font("Menlo", 11)
  
  const locationLine = widget.addText("[📍] Location: "+ LOCATION_NAME)
  locationLine.textColor = new Color("#7dbbae")
  locationLine.font = new Font("Menlo", 11)
  
  const weatherTest = widget.addText(`[☁️] Weather: 70•F`)
  weatherTest.textColor = new Color("#7dbbae")
  weatherTest.font = new Font("Menlo", 11)
  //return w
}
 
async function fetchData() {
  const url = `https://api.spencerwoo.com/substats/?source=jikeFollower&queryKey=`
    + `&source=telegram&queryKey=${telegram}`
    + `&source=github&queryKey=${github}`
    + `&source=sspai&queryKey=`
  const request = new Request(url)
  const res = await request.loadJSON()
  return res.data.subsInEachSource
  
  
}
 
function renderBattery() {
  const batteryLevel = Device.batteryLevel()
  const juice = "#".repeat(Math.floor(batteryLevel * 8))
  const used = ".".repeat(8 - juice.length)
  const batteryAscii = `[${juice}${used}] ${Math.round(batteryLevel * 100)}%`
  return batteryAscii
}
