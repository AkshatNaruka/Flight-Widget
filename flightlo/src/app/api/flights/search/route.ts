import { NextRequest, NextResponse } from 'next/server'
import { Flight, FlightStatus, Airport, SelfReliantAirline } from '@/types'

// Self-Reliant Real-Time Flight Data API - NO EXTERNAL DEPENDENCIES
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const origin = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const airline = searchParams.get('airline')
  const country = searchParams.get('country')

  try {
    console.log('🚀 Self-reliant real-time flight search:', { origin, destination, airline, country })
    
    // Generate advanced self-reliant flight data
    const flights = await generateAdvancedSelfReliantFlights({
      origin,
      destination,
      airline,
      country
    })

    return NextResponse.json({
      flights,
      source: 'Advanced Self-Reliant Simulation',
      timestamp: new Date().toISOString(),
      count: flights.length,
      realTime: true,
      selfReliant: true
    })

  } catch (error) {
    console.error('Self-reliant flight generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate flight data', flights: [] },
      { status: 500 }
    )
  }
}

// 🎯 Advanced Self-Reliant Flight Generation Engine
async function generateAdvancedSelfReliantFlights(searchParams: {
  origin?: string | null
  destination?: string | null
  airline?: string | null
  country?: string | null
}): Promise<Flight[]> {
  console.log('⚡ Generating advanced self-reliant flights...')
  
  const flights: Flight[] = []
  const currentTime = new Date()
  
  // Use robust fallback airport data
  const airports = getSelfReliantAirportDatabase()
  const airlines = getSelfReliantAirlineDatabase()
  
  // Filter based on search criteria
  let originAirports = airports
  let destinationAirports = airports
  let filteredAirlines = airlines
  
  if (searchParams.origin) {
    originAirports = airports.filter(airport => 
      airport.code.toLowerCase().includes(searchParams.origin!.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchParams.origin!.toLowerCase()) ||
      airport.name.toLowerCase().includes(searchParams.origin!.toLowerCase())
    )
  }
  
  if (searchParams.destination) {
    destinationAirports = airports.filter(airport => 
      airport.code.toLowerCase().includes(searchParams.destination!.toLowerCase()) ||
      airport.city.toLowerCase().includes(searchParams.destination!.toLowerCase()) ||
      airport.name.toLowerCase().includes(searchParams.destination!.toLowerCase())
    )
  }
  
  if (searchParams.airline) {
    filteredAirlines = airlines.filter(airline =>
      airline.name.toLowerCase().includes(searchParams.airline!.toLowerCase()) ||
      airline.code.toLowerCase().includes(searchParams.airline!.toLowerCase())
    )
  }
  
  // If no specific search, use popular routes
  if (!searchParams.origin && !searchParams.destination) {
    const popularRoutes = getPopularRoutes()
    const route = popularRoutes[Math.floor(Math.random() * popularRoutes.length)]
    originAirports = airports.filter(a => a.code === route.origin)
    destinationAirports = airports.filter(a => a.code === route.destination)
  }
  
  // Generate flights for each valid route
  for (const origin of originAirports.slice(0, 3)) {
    for (const destination of destinationAirports.slice(0, 3)) {
      if (origin.code === destination.code) continue
      
      const routeFlights = generateFlightsForRoute(origin, destination, filteredAirlines, currentTime)
      flights.push(...routeFlights)
      
      if (flights.length >= 15) break
    }
    if (flights.length >= 15) break
  }
  
  // If not enough flights, add more with realistic routes
  if (flights.length < 10) {
    const additionalFlights = generateRandomRealisticFlights(airports, airlines, currentTime, 15 - flights.length)
    flights.push(...additionalFlights)
  }
  
  // Apply real-time updates
  const realTimeFlights = applyRealTimeUpdates(flights, currentTime)
  
  console.log(`✅ Generated ${realTimeFlights.length} self-reliant real-time flights`)
  return realTimeFlights.slice(0, 15)
}

// Generate flights for a specific route
function generateFlightsForRoute(origin: Airport, destination: Airport, airlines: SelfReliantAirline[], currentTime: Date): Flight[] {
  const flights: Flight[] = []
  const distance = calculateDistance(origin, destination)
  
  // Select appropriate airlines for this route
  const routeAirlines = selectAirlinesForRoute(origin, destination, airlines)
  
  for (let i = 0; i < Math.min(5, routeAirlines.length); i++) {
    const airline = routeAirlines[i]
    const flight = createAdvancedFlight(origin, destination, airline, distance, currentTime, i)
    flights.push(flight)
  }
  
  return flights
}

// Create an advanced flight with realistic characteristics
function createAdvancedFlight(origin: Airport, destination: Airport, airline: SelfReliantAirline, distance: number, currentTime: Date, index: number): Flight {
  const flightNumber = `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`
  
  // Generate realistic departure time
  const departureTime = new Date(currentTime)
  const timeSlots = [6, 8, 10, 12, 14, 16, 18, 20, 22]
  const baseHour = timeSlots[index % timeSlots.length]
  departureTime.setHours(baseHour, Math.floor(Math.random() * 60))
  
  // Add realistic delays
  const delay = generateRealisticDelay(airline, currentTime)
  departureTime.setMinutes(departureTime.getMinutes() + delay)
  
  // Calculate flight duration and arrival
  const duration = calculateAdvancedFlightDuration(distance, airline)
  const arrivalTime = new Date(departureTime.getTime() + duration * 60 * 60 * 1000)
  
  // Generate dynamic pricing
  const price = calculateAdvancedDynamicPrice(distance, airline, departureTime, currentTime)
  
  // Determine real-time status
  const status = determineFlightStatus(departureTime, currentTime, delay)
  
  // Select appropriate aircraft
  const aircraft = selectAircraftForRoute(distance, airline)
  
  return {
    id: `SR_${flightNumber}_${Date.now()}`,
    airline: airline.name,
    flightNumber: flightNumber,
    aircraft: aircraft,
    departure: {
      airport: `${origin.name} (${origin.code})`,
      time: departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      city: origin.city,
      country: origin.country
    },
    arrival: {
      airport: `${destination.name} (${destination.code})`,
      time: arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      city: destination.city,
      country: destination.country
    },
    duration: formatDuration(duration),
    status: status,
    price: Math.round(price),
    source: 'Advanced Self-Reliant Engine'
  }
}

// Generate random realistic flights when search is too broad
function generateRandomRealisticFlights(airports: Airport[], airlines: SelfReliantAirline[], currentTime: Date, count: number): Flight[] {
  const flights: Flight[] = []
  const popularRoutes = getPopularRoutes()
  
  for (let i = 0; i < count; i++) {
    const route = popularRoutes[i % popularRoutes.length]
    const origin = airports.find(a => a.code === route.origin) || airports[0]
    const destination = airports.find(a => a.code === route.destination) || airports[1]
    const airline = airlines[i % airlines.length]
    
    const distance = calculateDistance(origin, destination)
    const flight = createAdvancedFlight(origin, destination, airline, distance, currentTime, i)
    flights.push(flight)
  }
  
  return flights
}

// Self-reliant airport database
function getSelfReliantAirportDatabase(): Airport[] {
  return [
    { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States', coordinates: { lat: 40.6413, lng: -73.7781 } },
    { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States', coordinates: { lat: 34.0522, lng: -118.2437 } },
    { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom', coordinates: { lat: 51.4700, lng: -0.4543 } },
    { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', coordinates: { lat: 49.0097, lng: 2.5479 } },
    { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates', coordinates: { lat: 25.2532, lng: 55.3657 } },
    { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', coordinates: { lat: 35.7720, lng: 140.3929 } },
    { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', coordinates: { lat: 1.3644, lng: 103.9915 } },
    { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', coordinates: { lat: 50.0379, lng: 8.5622 } },
    { code: 'AMS', name: 'Amsterdam Schiphol Airport', city: 'Amsterdam', country: 'Netherlands', coordinates: { lat: 52.3105, lng: 4.7683 } },
    { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong', coordinates: { lat: 22.3080, lng: 113.9185 } },
    { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia', coordinates: { lat: -33.9399, lng: 151.1753 } },
    { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada', coordinates: { lat: 43.6777, lng: -79.6248 } },
    { code: 'GRU', name: 'São Paulo–Guarulhos International Airport', city: 'São Paulo', country: 'Brazil', coordinates: { lat: -23.4356, lng: -46.4731 } },
    { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', coordinates: { lat: 37.4602, lng: 126.4407 } },
    { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India', coordinates: { lat: 19.0896, lng: 72.8656 } },
    { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', coordinates: { lat: 28.5562, lng: 77.1000 } },
    { code: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', coordinates: { lat: 40.0799, lng: 116.6031 } },
    { code: 'SVO', name: 'Sheremetyevo International Airport', city: 'Moscow', country: 'Russia', coordinates: { lat: 55.9736, lng: 37.4125 } },
    { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey', coordinates: { lat: 41.2753, lng: 28.7519 } },
    { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar', coordinates: { lat: 25.2731, lng: 51.6080 } },
    { code: 'ORD', name: 'O\'Hare International Airport', city: 'Chicago', country: 'United States', coordinates: { lat: 41.9742, lng: -87.9073 } },
    { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States', coordinates: { lat: 33.6367, lng: -84.4281 } },
    { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States', coordinates: { lat: 32.8998, lng: -97.0403 } },
    { code: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States', coordinates: { lat: 39.8561, lng: -104.6737 } },
    { code: 'LAS', name: 'McCarran International Airport', city: 'Las Vegas', country: 'United States', coordinates: { lat: 36.0840, lng: -115.1537 } },
    { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States', coordinates: { lat: 25.7959, lng: -80.2870 } },
    { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States', coordinates: { lat: 47.4502, lng: -122.3088 } },
    { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States', coordinates: { lat: 37.6213, lng: -122.3790 } },
    { code: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States', coordinates: { lat: 42.3656, lng: -71.0096 } },
    { code: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom', coordinates: { lat: 51.1481, lng: -0.1903 } },
    { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany', coordinates: { lat: 48.3538, lng: 11.7861 } },
    { code: 'ZUR', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', coordinates: { lat: 47.4647, lng: 8.5492 } }
  ]
}

// Self-reliant airline database
function getSelfReliantAirlineDatabase(): SelfReliantAirline[] {
  return [
    { code: 'AA', name: 'American Airlines', hubs: ['DFW', 'ORD', 'MIA', 'JFK'], tier: 'legacy' },
    { code: 'DL', name: 'Delta Air Lines', hubs: ['ATL', 'SEA', 'JFK', 'LAX'], tier: 'legacy' },
    { code: 'UA', name: 'United Airlines', hubs: ['ORD', 'DEN', 'SFO'], tier: 'legacy' },
    { code: 'BA', name: 'British Airways', hubs: ['LHR', 'LGW'], tier: 'legacy' },
    { code: 'AF', name: 'Air France', hubs: ['CDG'], tier: 'legacy' },
    { code: 'LH', name: 'Lufthansa', hubs: ['FRA', 'MUC'], tier: 'legacy' },
    { code: 'EK', name: 'Emirates', hubs: ['DXB'], tier: 'premium' },
    { code: 'SQ', name: 'Singapore Airlines', hubs: ['SIN'], tier: 'premium' },
    { code: 'QF', name: 'Qantas', hubs: ['SYD'], tier: 'premium' },
    { code: 'QR', name: 'Qatar Airways', hubs: ['DOH'], tier: 'premium' },
    { code: 'TK', name: 'Turkish Airlines', hubs: ['IST'], tier: 'international' },
    { code: 'AC', name: 'Air Canada', hubs: ['YYZ'], tier: 'international' },
    { code: 'NH', name: 'All Nippon Airways', hubs: ['NRT'], tier: 'international' },
    { code: 'AI', name: 'Air India', hubs: ['DEL', 'BOM'], tier: 'international' },
    { code: 'CX', name: 'Cathay Pacific', hubs: ['HKG'], tier: 'international' },
    { code: 'SU', name: 'Aeroflot', hubs: ['SVO'], tier: 'international' },
    { code: 'WN', name: 'Southwest Airlines', hubs: ['LAS', 'DEN'], tier: 'lowcost' },
    { code: 'B6', name: 'JetBlue Airways', hubs: ['JFK', 'BOS'], tier: 'lowcost' },
    { code: 'NK', name: 'Spirit Airlines', hubs: ['DFW', 'LAS'], tier: 'lowcost' },
    { code: 'F9', name: 'Frontier Airlines', hubs: ['DEN'], tier: 'lowcost' },
    { code: 'AS', name: 'Alaska Airlines', hubs: ['SEA'], tier: 'regional' },
    { code: 'VS', name: 'Virgin Atlantic', hubs: ['LHR'], tier: 'premium' }
  ]
}

// Popular flight routes for realistic generation
function getPopularRoutes() {
  return [
    { origin: 'JFK', destination: 'LAX' },
    { origin: 'LAX', destination: 'JFK' },
    { origin: 'LHR', destination: 'JFK' },
    { origin: 'JFK', destination: 'LHR' },
    { origin: 'CDG', destination: 'LAX' },
    { origin: 'LAX', destination: 'CDG' },
    { origin: 'DXB', destination: 'LHR' },
    { origin: 'LHR', destination: 'DXB' },
    { origin: 'NRT', destination: 'LAX' },
    { origin: 'LAX', destination: 'NRT' },
    { origin: 'SIN', destination: 'LHR' },
    { origin: 'LHR', destination: 'SIN' },
    { origin: 'ORD', destination: 'LAX' },
    { origin: 'ATL', destination: 'LAX' },
    { origin: 'DFW', destination: 'JFK' },
    { origin: 'SFO', destination: 'JFK' },
    { origin: 'BOS', destination: 'LAX' },
    { origin: 'SEA', destination: 'JFK' }
  ]
}

// Select appropriate airlines for route based on hubs and characteristics
function selectAirlinesForRoute(origin: Airport, destination: Airport, airlines: SelfReliantAirline[]): SelfReliantAirline[] {
  // Prioritize airlines with hubs at origin or destination
  const prioritized = airlines.map(airline => ({
    ...airline,
    priority: calculateAirlinePriority(airline, origin, destination)
  })).sort((a, b) => b.priority - a.priority)
  
  return prioritized.slice(0, 8) // Return top 8 airlines
}

function calculateAirlinePriority(airline: SelfReliantAirline, origin: Airport, destination: Airport): number {
  let priority = 50 // Base priority
  
  // Higher priority for hub airlines
  if (airline.hubs?.includes(origin.code)) priority += 30
  if (airline.hubs?.includes(destination.code)) priority += 30
  
  // Route type preferences
  const isInternational = origin.country !== destination.country
  const distance = calculateDistance(origin, destination)
  
  if (isInternational && ['premium', 'legacy'].includes(airline.tier)) priority += 20
  if (!isInternational && ['legacy', 'lowcost'].includes(airline.tier)) priority += 15
  if (distance > 3000 && airline.tier === 'premium') priority += 25
  
  return priority + Math.random() * 10 // Add randomness
}

// Generate realistic delays
function generateRealisticDelay(airline: SelfReliantAirline, currentTime: Date): number {
  const hour = currentTime.getHours()
  let baseDelay = 0
  
  // Weather delays (simulated)
  if (Math.random() < 0.15) baseDelay += Math.random() * 30
  
  // Peak hour delays
  if (hour >= 7 && hour <= 9 || hour >= 17 && hour <= 19) {
    baseDelay += Math.random() * 15
  }
  
  // Airline reliability
  const reliabilityFactors: Record<string, number> = {
    legacy: 1.0,
    premium: 0.7,
    international: 1.1,
    lowcost: 1.3,
    regional: 0.9
  }
  
  baseDelay *= (reliabilityFactors[airline.tier] || 1.0)
  
  return Math.round(baseDelay)
}

// Calculate advanced flight duration
function calculateAdvancedFlightDuration(distance: number, airline: SelfReliantAirline): number {
  let baseDuration = distance / 800 // Base speed 800 km/h
  
  // Premium airlines might be slightly faster due to better routes
  if (airline.tier === 'premium') baseDuration *= 0.95
  
  // Add realistic variance
  baseDuration += (Math.random() - 0.5) * 0.3
  
  return Math.max(baseDuration, 0.5)
}

// Calculate advanced dynamic pricing
function calculateAdvancedDynamicPrice(distance: number, airline: SelfReliantAirline, departureTime: Date, currentTime: Date): number {
  let basePrice = distance * 0.15 // Base price per km
  
  // Airline tier pricing
  const tierMultipliers: Record<string, number> = {
    premium: 1.5,
    legacy: 1.2,
    international: 1.1,
    lowcost: 0.8,
    regional: 0.9
  }
  
  basePrice *= (tierMultipliers[airline.tier] || 1.0)
  
  // Time-based pricing
  const hour = departureTime.getHours()
  if (hour >= 6 && hour <= 9) basePrice *= 1.2 // Morning premium
  if (hour >= 17 && hour <= 20) basePrice *= 1.25 // Evening premium
  if (hour >= 22 || hour <= 5) basePrice *= 0.8 // Red-eye discount
  
  // Days until departure (simulated)
  const daysUntil = Math.random() * 30
  if (daysUntil < 7) basePrice *= 1.3 // Last minute premium
  if (daysUntil > 21) basePrice *= 0.9 // Early bird discount
  
  // Seasonal demand
  const month = currentTime.getMonth()
  const seasonalFactors = [0.8, 0.8, 1.0, 1.1, 1.2, 1.3, 1.4, 1.3, 1.1, 1.0, 1.2, 1.3]
  basePrice *= seasonalFactors[month]
  
  return Math.max(basePrice, 50)
}

// Determine flight status based on current time and delays
function determineFlightStatus(departureTime: Date, currentTime: Date, delay: number): FlightStatus {
  const timeDiff = (departureTime.getTime() - currentTime.getTime()) / (1000 * 60) // minutes
  
  if (timeDiff < -60) return 'Departed'
  if (timeDiff < -30) return 'Departed'
  if (timeDiff < -15) return 'Departed'
  if (timeDiff < 0) return delay > 15 ? 'Delayed' : 'Boarding'
  if (timeDiff < 30) return delay > 10 ? 'Delayed' : 'Boarding'
  if (timeDiff < 60) return delay > 15 ? 'Delayed' : 'On Time'
  
  return delay > 20 ? 'Delayed' : 'On Time'
}

// Select appropriate aircraft for route
function selectAircraftForRoute(distance: number, airline: SelfReliantAirline): string {
  const aircraftByType = {
    short: ['Boeing 737-800', 'Airbus A320', 'Embraer E190', 'CRJ-900'],
    medium: ['Boeing 757-200', 'Airbus A321', 'Boeing 767-300', 'Airbus A330-200'],
    long: ['Boeing 777-300ER', 'Boeing 787-9', 'Airbus A350-900', 'Boeing 747-8'],
    premium: ['Airbus A380', 'Boeing 787-10', 'Airbus A350-1000']
  }
  
  let aircraftPool: string[]
  
  if (distance < 1500) {
    aircraftPool = aircraftByType.short
  } else if (distance < 4000) {
    aircraftPool = aircraftByType.medium
  } else {
    aircraftPool = airline.tier === 'premium' ? aircraftByType.premium : aircraftByType.long
  }
  
  return aircraftPool[Math.floor(Math.random() * aircraftPool.length)]
}

// Apply real-time updates to flights
function applyRealTimeUpdates(flights: Flight[], currentTime: Date): Flight[] {
  return flights.map(flight => {
    // Randomly update some prices and statuses for real-time feeling
    if (Math.random() < 0.1 && flight.price) { // 10% chance of price change
      const adjustment = 0.95 + Math.random() * 0.1 // ±5% variation
      flight.price = Math.round(flight.price * adjustment)
    }
    
    return {
      ...flight,
      lastUpdated: currentTime.toISOString()
    }
  }).sort((a, b) => {
    // Sort by departure time
    const timeA = new Date(`1970/01/01 ${a.departure?.time}`)
    const timeB = new Date(`1970/01/01 ${b.departure?.time}`)
    return timeA.getTime() - timeB.getTime()
  })
}

// Utility functions
function calculateDistance(origin: Airport, destination: Airport): number {
  if (!origin.coordinates || !destination.coordinates) return 1000

  const R = 6371 // Earth's radius in km
  const dLat = (destination.coordinates.lat - origin.coordinates.lat) * Math.PI / 180
  const dLng = (destination.coordinates.lng - origin.coordinates.lng) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(origin.coordinates.lat * Math.PI / 180) * Math.cos(destination.coordinates.lat * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

function formatDuration(hours: number): string {
  const h = Math.floor(hours)
  const m = Math.floor((hours % 1) * 60)
  return `${h}h ${m}m`
}