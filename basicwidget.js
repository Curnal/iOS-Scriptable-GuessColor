// STEP 1.) Fill out the bellow const's
// STEP 2.) Create Account at openweathermap website for API Key and paste in line 16.
const user = "NAME" // You Name Here
const cityID = "YOUR CITY NAME" // Enter your city name here
const telegram = "LanguageArtsGrade" // Telegram Username Here
const github = "curnal" // Github Username here (displayes follower count)
const api = 'API-KEY-HERE'; // Openweatherapp API Key Here!
const geoApi = 'API-KEY-HERE'; // Get API Key from here: https://developers.google.com/maps/documentation/geolocation/overview

//////////////////////////////////////////////////////////////////////////////////////
const data = await fetchData()
const widget = createWidget(data)
Script.setWidget(widget)
Script.complete()

async function fetchSecond() {
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${geoApi}`
  const request = new Request(url)
  const res = await request.loadJSON()
  let lat = res.location.lat
  let lng = res.location.lng
  
  
}

function createWidget(data) {
  console.log(data)
  const w = new ListWidget()
  const bgColor = new LinearGradient()
  bgColor.colors = [new Color("#29323c"), new Color("#1c1c1c")]
  bgColor.locations = [0.0, 1.0]
  w.backgroundGradient = bgColor
  w.setPadding(12, 15, 15, 12)
  w.spacing = 6
 
  const time = new Date()
  const dfTime = new DateFormatter()
  dfTime.locale = "en"
  dfTime.useMediumDateStyle()
  dfTime.useNoTimeStyle()
 
  const firstLine = w.addText(`[😎] ${user} ~$ 🟢 `)
  firstLine.textColor = Color.white()
  firstLine.textOpacity = 0.7
  firstLine.font = new Font("Menlo", 11)
  
  const timeLine = w.addText(`[🗓] ${dfTime.string(time)}`)
  timeLine.textColor = Color.white()
  timeLine.font = new Font("Menlo", 11)
  const batteryLine = w.addText(`[🔋] ${renderBattery()}`)
  batteryLine.textColor = new Color("#6ef2ae")
  batteryLine.font = new Font("Menlo", 11)
  
  const telegramLine = w.addText(`[️️📬] Telegram: ${data.telegram}`)
  telegramLine.textColor = new Color("#7dbbae")
  telegramLine.font = new Font("Menlo", 11)
  const githubLine = w.addText(`[📟] GitHub: ${data.github} 👥`)
  githubLine.textColor = new Color("#ff9468")
  githubLine.font = new Font("Menlo", 11)
  
  const locationLine = w.addText(`[📍] Location: ${cityID}`)
  locationLine.textColor = new Color("#7dbbae")
  locationLine.font = new Font("Menlo", 11)
  
  const weatherTest = w.addText(`[☁️] Weather: ${getExtra()}`)
  weatherTest.textColor = new Color("#7dbbae")
  weatherTest.font = new Font("Menlo", 11)
  return w
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

