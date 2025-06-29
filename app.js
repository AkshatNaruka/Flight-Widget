// FlightTracker Pro - Enhanced Flight Search Application

class FlightApp {
    constructor() {
        this.airports = [];
        this.airlines = [];
        this.currentResults = [];
        this.init();
    }

    async init() {
        await this.loadAirports();
        await this.loadAirlines();
        this.setupEventListeners();
        this.setDefaultDate();
    }

    // Load airport data
    async loadAirports() {
        // Using a comprehensive airport database
        this.airports = [
            { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
            { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
            { code: 'LHR', name: 'London Heathrow Airport', city: 'London', country: 'United Kingdom' },
            { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
            { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
            { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
            { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
            { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
            { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
            { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong' },
            { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
            { code: 'YYZ', name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada' },
            { code: 'GRU', name: 'São Paulo–Guarulhos International Airport', city: 'São Paulo', country: 'Brazil' },
            { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
            { code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city: 'Mumbai', country: 'India' },
            { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
            { code: 'PEK', name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China' },
            { code: 'SVO', name: 'Sheremetyevo International Airport', city: 'Moscow', country: 'Russia' },
            { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
            { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
            { code: 'ORD', name: 'O\'Hare International Airport', city: 'Chicago', country: 'United States' },
            { code: 'ATL', name: 'Hartsfield-Jackson Atlanta International Airport', city: 'Atlanta', country: 'United States' },
            { code: 'DFW', name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'United States' },
            { code: 'DEN', name: 'Denver International Airport', city: 'Denver', country: 'United States' },
            { code: 'LAS', name: 'McCarran International Airport', city: 'Las Vegas', country: 'United States' },
            { code: 'MIA', name: 'Miami International Airport', city: 'Miami', country: 'United States' },
            { code: 'SEA', name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'United States' },
            { code: 'SFO', name: 'San Francisco International Airport', city: 'San Francisco', country: 'United States' },
            { code: 'BOS', name: 'Logan International Airport', city: 'Boston', country: 'United States' },
            { code: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom' },
            { code: 'MUC', name: 'Munich Airport', city: 'Munich', country: 'Germany' },
            { code: 'ZUR', name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland' },
            { code: 'VIE', name: 'Vienna International Airport', city: 'Vienna', country: 'Austria' },
            { code: 'ARN', name: 'Stockholm Arlanda Airport', city: 'Stockholm', country: 'Sweden' },
            { code: 'CPH', name: 'Copenhagen Airport', city: 'Copenhagen', country: 'Denmark' }
        ];
    }

    // Load airline data
    async loadAirlines() {
        this.airlines = [
            { code: 'AA', name: 'American Airlines' },
            { code: 'DL', name: 'Delta Air Lines' },
            { code: 'UA', name: 'United Airlines' },
            { code: 'BA', name: 'British Airways' },
            { code: 'LH', name: 'Lufthansa' },
            { code: 'AF', name: 'Air France' },
            { code: 'KL', name: 'KLM Royal Dutch Airlines' },
            { code: 'EK', name: 'Emirates' },
            { code: 'QR', name: 'Qatar Airways' },
            { code: 'SQ', name: 'Singapore Airlines' },
            { code: 'CX', name: 'Cathay Pacific' },
            { code: 'JL', name: 'Japan Airlines' },
            { code: 'NH', name: 'All Nippon Airways' },
            { code: 'TK', name: 'Turkish Airlines' },
            { code: 'SU', name: 'Aeroflot' },
            { code: 'AI', name: 'Air India' },
            { code: 'ET', name: 'Ethiopian Airlines' },
            { code: 'VS', name: 'Virgin Atlantic' },
            { code: 'AC', name: 'Air Canada' },
            { code: 'QF', name: 'Qantas' }
        ];

        // Populate airline dropdown
        const airlineSelect = document.getElementById('airline');
        this.airlines.forEach(airline => {
            const option = document.createElement('option');
            option.value = airline.code;
            option.textContent = `${airline.name} (${airline.code})`;
            airlineSelect.appendChild(option);
        });
    }

    // Setup event listeners
    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Airport autocomplete
        const departureInput = document.getElementById('departure');
        const arrivalInput = document.getElementById('arrival');
        const airportInput = document.getElementById('airport');

        departureInput.addEventListener('input', (e) => this.showSuggestions(e.target, 'departure-suggestions'));
        arrivalInput.addEventListener('input', (e) => this.showSuggestions(e.target, 'arrival-suggestions'));
        airportInput.addEventListener('input', (e) => this.showSuggestions(e.target, 'airport-suggestions'));

        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.form-group')) {
                document.querySelectorAll('.suggestions').forEach(s => s.style.display = 'none');
            }
        });
    }

    // Set default date to today
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('date').value = today;
        document.getElementById('airline-date').value = today;
    }

    // Switch between tabs
    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Hide results
        this.hideResults();
    }

    // Show autocomplete suggestions
    showSuggestions(input, suggestionsId) {
        const suggestions = document.getElementById(suggestionsId);
        const query = input.value.toLowerCase().trim();

        if (query.length < 2) {
            suggestions.style.display = 'none';
            return;
        }

        const matches = this.airports.filter(airport => 
            airport.code.toLowerCase().includes(query) ||
            airport.name.toLowerCase().includes(query) ||
            airport.city.toLowerCase().includes(query) ||
            airport.country.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matches.length === 0) {
            suggestions.style.display = 'none';
            return;
        }

        suggestions.innerHTML = matches.map(airport => 
            `<div class="suggestion-item" onclick="app.selectAirport('${airport.code}', '${input.id}', '${suggestionsId}')">
                <strong>${airport.code}</strong> - ${airport.name}<br>
                <small>${airport.city}, ${airport.country}</small>
            </div>`
        ).join('');

        suggestions.style.display = 'block';
    }

    // Select airport from suggestions
    selectAirport(code, inputId, suggestionsId) {
        const airport = this.airports.find(a => a.code === code);
        document.getElementById(inputId).value = `${airport.code} - ${airport.city}`;
        document.getElementById(suggestionsId).style.display = 'none';
    }

    // Show loading state
    showLoading() {
        this.hideResults();
        document.getElementById('loading').style.display = 'block';
    }

    // Hide loading and results
    hideResults() {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('flight-results').style.display = 'none';
        document.getElementById('airport-info').style.display = 'none';
    }

    // Generate realistic flight data
    generateFlightData(departure, arrival, date) {
        const flights = [];
        const airlines = this.airlines.slice(0, 8); // Use first 8 airlines
        const basePrice = 200 + Math.random() * 800;

        airlines.forEach((airline, index) => {
            const flightNumber = `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`;
            const departureTime = new Date();
            departureTime.setHours(6 + index * 2, Math.floor(Math.random() * 60));
            
            const duration = 2 + Math.random() * 8; // 2-10 hours
            const arrivalTime = new Date(departureTime.getTime() + duration * 60 * 60 * 1000);
            
            const price = Math.round(basePrice + (Math.random() - 0.5) * 400);
            const statuses = ['On Time', 'Delayed', 'Boarding'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            flights.push({
                airline: airline.name,
                airlineCode: airline.code,
                flightNumber,
                departure: {
                    airport: departure,
                    time: departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                },
                arrival: {
                    airport: arrival,
                    time: arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                },
                duration: `${Math.floor(duration)}h ${Math.floor((duration % 1) * 60)}m`,
                price,
                status,
                aircraft: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350'][Math.floor(Math.random() * 4)],
                gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 20) + 1}`
            });
        });

        return flights;
    }

    // Search flights
    async searchFlights() {
        const departure = document.getElementById('departure').value;
        const arrival = document.getElementById('arrival').value;
        const date = document.getElementById('date').value;

        if (!departure || !arrival || !date) {
            alert('Please fill in all fields');
            return;
        }

        this.showLoading();

        // Simulate API delay
        setTimeout(() => {
            const flights = this.generateFlightData(departure, arrival, date);
            this.currentResults = flights;
            this.displayFlights(flights, departure, arrival);
        }, 1500);
    }

    // Display flight results
    displayFlights(flights, departure, arrival) {
        const resultsContainer = document.getElementById('flight-results');
        const flightsContainer = document.getElementById('flights-container');
        const resultCount = document.getElementById('result-count');

        resultCount.textContent = `Found ${flights.length} flights from ${departure.split(' - ')[0]} to ${arrival.split(' - ')[0]}`;

        flightsContainer.innerHTML = flights.map(flight => `
            <div class="flight-card">
                <div class="flight-header">
                    <div class="airline-info">
                        <div class="airline-logo">${flight.airlineCode}</div>
                        <div class="airline-details">
                            <h4>${flight.airline}</h4>
                            <div class="flight-number">${flight.flightNumber}</div>
                        </div>
                    </div>
                    <div class="price">
                        <div class="price-amount">$${flight.price}</div>
                        <div class="price-note">per person</div>
                    </div>
                </div>

                <div class="flight-route">
                    <div class="route-point departure">
                        <div class="time">${flight.departure.time}</div>
                        <div class="airport">${flight.departure.airport.split(' - ')[0]}</div>
                    </div>
                    <div class="route-line">
                        <i class="fas fa-plane"></i>
                        <span>${flight.duration}</span>
                    </div>
                    <div class="route-point arrival">
                        <div class="time">${flight.arrival.time}</div>
                        <div class="airport">${flight.arrival.airport.split(' - ')[0]}</div>
                    </div>
                </div>

                <div class="flight-details">
                    <div class="detail-item">
                        <div class="detail-label">Status</div>
                        <div class="detail-value">
                            <span class="status ${flight.status.toLowerCase().replace(' ', '-')}">${flight.status}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Aircraft</div>
                        <div class="detail-value">${flight.aircraft}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Gate</div>
                        <div class="detail-value">${flight.gate}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Flight Time</div>
                        <div class="detail-value">${flight.duration}</div>
                    </div>
                </div>
            </div>
        `).join('');

        document.getElementById('loading').style.display = 'none';
        resultsContainer.style.display = 'block';
    }

    // Search by airline
    async searchByAirline() {
        const airlineCode = document.getElementById('airline').value;
        const date = document.getElementById('airline-date').value;

        if (!airlineCode || !date) {
            alert('Please select an airline and date');
            return;
        }

        this.showLoading();

        setTimeout(() => {
            const airline = this.airlines.find(a => a.code === airlineCode);
            const flights = this.generateAirlineFlights(airline);
            this.displayAirlineFlights(flights, airline);
        }, 1500);
    }

    // Generate flights for specific airline
    generateAirlineFlights(airline) {
        const flights = [];
        const routes = [
            ['JFK - New York', 'LAX - Los Angeles'],
            ['LHR - London', 'CDG - Paris'],
            ['DXB - Dubai', 'SIN - Singapore'],
            ['NRT - Tokyo', 'SYD - Sydney'],
            ['FRA - Frankfurt', 'JFK - New York'],
            ['AMS - Amsterdam', 'BOM - Mumbai']
        ];

        routes.forEach((route, index) => {
            const flightNumber = `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`;
            const departureTime = new Date();
            departureTime.setHours(8 + index * 2, Math.floor(Math.random() * 60));
            
            const duration = 3 + Math.random() * 6;
            const arrivalTime = new Date(departureTime.getTime() + duration * 60 * 60 * 1000);
            
            const price = Math.round(300 + Math.random() * 700);
            const statuses = ['On Time', 'Delayed', 'Boarding', 'Departed'];
            const status = statuses[Math.floor(Math.random() * statuses.length)];

            flights.push({
                airline: airline.name,
                airlineCode: airline.code,
                flightNumber,
                departure: {
                    airport: route[0],
                    time: departureTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                },
                arrival: {
                    airport: route[1],
                    time: arrivalTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                },
                duration: `${Math.floor(duration)}h ${Math.floor((duration % 1) * 60)}m`,
                price,
                status,
                aircraft: ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A350'][Math.floor(Math.random() * 4)],
                gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 20) + 1}`
            });
        });

        return flights;
    }

    // Display airline flights
    displayAirlineFlights(flights, airline) {
        const resultsContainer = document.getElementById('flight-results');
        const flightsContainer = document.getElementById('flights-container');
        const resultCount = document.getElementById('result-count');

        resultCount.textContent = `${flights.length} flights for ${airline.name}`;

        flightsContainer.innerHTML = flights.map(flight => `
            <div class="flight-card">
                <div class="flight-header">
                    <div class="airline-info">
                        <div class="airline-logo">${flight.airlineCode}</div>
                        <div class="airline-details">
                            <h4>${flight.airline}</h4>
                            <div class="flight-number">${flight.flightNumber}</div>
                        </div>
                    </div>
                    <div class="price">
                        <div class="price-amount">$${flight.price}</div>
                        <div class="price-note">per person</div>
                    </div>
                </div>

                <div class="flight-route">
                    <div class="route-point departure">
                        <div class="time">${flight.departure.time}</div>
                        <div class="airport">${flight.departure.airport.split(' - ')[0]}</div>
                    </div>
                    <div class="route-line">
                        <i class="fas fa-plane"></i>
                        <span>${flight.duration}</span>
                    </div>
                    <div class="route-point arrival">
                        <div class="time">${flight.arrival.time}</div>
                        <div class="airport">${flight.arrival.airport.split(' - ')[0]}</div>
                    </div>
                </div>

                <div class="flight-details">
                    <div class="detail-item">
                        <div class="detail-label">Status</div>
                        <div class="detail-value">
                            <span class="status ${flight.status.toLowerCase().replace(' ', '-')}">${flight.status}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Aircraft</div>
                        <div class="detail-value">${flight.aircraft}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Gate</div>
                        <div class="detail-value">${flight.gate}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Flight Time</div>
                        <div class="detail-value">${flight.duration}</div>
                    </div>
                </div>
            </div>
        `).join('');

        document.getElementById('loading').style.display = 'none';
        resultsContainer.style.display = 'block';
    }

    // Get airport information
    async getAirportInfo() {
        const airportInput = document.getElementById('airport').value;

        if (!airportInput) {
            alert('Please enter an airport');
            return;
        }

        this.showLoading();

        setTimeout(() => {
            const airportCode = airportInput.split(' - ')[0];
            const airport = this.airports.find(a => a.code === airportCode);
            
            if (airport) {
                this.displayAirportInfo(airport);
            } else {
                alert('Airport not found');
                this.hideResults();
            }
        }, 1000);
    }

    // Display airport information
    displayAirportInfo(airport) {
        const airportInfoContainer = document.getElementById('airport-info');
        const airportDetails = document.getElementById('airport-details');
        const departuresBoard = document.getElementById('departures-board');

        // Generate airport details
        airportDetails.innerHTML = `
            <div class="airport-card">
                <h4><i class="fas fa-map-marker-alt"></i> Location</h4>
                <p><strong>Airport:</strong> ${airport.name}</p>
                <p><strong>City:</strong> ${airport.city}</p>
                <p><strong>Country:</strong> ${airport.country}</p>
                <p><strong>IATA Code:</strong> ${airport.code}</p>
            </div>
            <div class="airport-card">
                <h4><i class="fas fa-info-circle"></i> Information</h4>
                <p><strong>Terminals:</strong> ${Math.floor(Math.random() * 4) + 2}</p>
                <p><strong>Gates:</strong> ${Math.floor(Math.random() * 100) + 50}</p>
                <p><strong>Runways:</strong> ${Math.floor(Math.random() * 3) + 2}</p>
                <p><strong>Operating Hours:</strong> 24/7</p>
            </div>
        `;

        // Generate departures
        const departures = this.generateDepartures(airport);
        departuresBoard.innerHTML = `
            <table class="departures-table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Flight</th>
                        <th>Destination</th>
                        <th>Airline</th>
                        <th>Gate</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    ${departures.map(dep => `
                        <tr>
                            <td>${dep.time}</td>
                            <td>${dep.flight}</td>
                            <td>${dep.destination}</td>
                            <td>${dep.airline}</td>
                            <td>${dep.gate}</td>
                            <td><span class="status ${dep.status.toLowerCase().replace(' ', '-')}">${dep.status}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        document.getElementById('loading').style.display = 'none';
        airportInfoContainer.style.display = 'block';
    }

    // Generate departure data for airport
    generateDepartures(airport) {
        const departures = [];
        const destinations = this.airports.filter(a => a.code !== airport.code).slice(0, 10);
        const statuses = ['On Time', 'Delayed', 'Boarding', 'Departed', 'Cancelled'];

        destinations.forEach((dest, index) => {
            const airline = this.airlines[Math.floor(Math.random() * this.airlines.length)];
            const time = new Date();
            time.setHours(new Date().getHours() + index, Math.floor(Math.random() * 60));

            departures.push({
                time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                flight: `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`,
                destination: `${dest.code} - ${dest.city}`,
                airline: airline.name,
                gate: `${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(Math.random() * 20) + 1}`,
                status: statuses[Math.floor(Math.random() * statuses.length)]
            });
        });

        return departures;
    }

    // Sort results
    sortResults() {
        const sortBy = document.getElementById('sort-by').value;
        
        if (this.currentResults.length === 0) return;

        this.currentResults.sort((a, b) => {
            switch (sortBy) {
                case 'time':
                    return a.departure.time.localeCompare(b.departure.time);
                case 'price':
                    return a.price - b.price;
                case 'duration':
                    return parseFloat(a.duration) - parseFloat(b.duration);
                case 'airline':
                    return a.airline.localeCompare(b.airline);
                default:
                    return 0;
            }
        });

        // Re-render results
        const flightsContainer = document.getElementById('flights-container');
        flightsContainer.innerHTML = this.currentResults.map(flight => `
            <div class="flight-card">
                <div class="flight-header">
                    <div class="airline-info">
                        <div class="airline-logo">${flight.airlineCode}</div>
                        <div class="airline-details">
                            <h4>${flight.airline}</h4>
                            <div class="flight-number">${flight.flightNumber}</div>
                        </div>
                    </div>
                    <div class="price">
                        <div class="price-amount">$${flight.price}</div>
                        <div class="price-note">per person</div>
                    </div>
                </div>

                <div class="flight-route">
                    <div class="route-point departure">
                        <div class="time">${flight.departure.time}</div>
                        <div class="airport">${flight.departure.airport.split(' - ')[0]}</div>
                    </div>
                    <div class="route-line">
                        <i class="fas fa-plane"></i>
                        <span>${flight.duration}</span>
                    </div>
                    <div class="route-point arrival">
                        <div class="time">${flight.arrival.time}</div>
                        <div class="airport">${flight.arrival.airport.split(' - ')[0]}</div>
                    </div>
                </div>

                <div class="flight-details">
                    <div class="detail-item">
                        <div class="detail-label">Status</div>
                        <div class="detail-value">
                            <span class="status ${flight.status.toLowerCase().replace(' ', '-')}">${flight.status}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Aircraft</div>
                        <div class="detail-value">${flight.aircraft}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Gate</div>
                        <div class="detail-value">${flight.gate}</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Flight Time</div>
                        <div class="detail-value">${flight.duration}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Global functions for inline event handlers
function searchFlights() {
    app.searchFlights();
}

function searchByAirline() {
    app.searchByAirline();
}

function getAirportInfo() {
    app.getAirportInfo();
}

function sortResults() {
    app.sortResults();
}

// Initialize the app
const app = new FlightApp();
