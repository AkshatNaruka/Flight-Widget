# Flight-Widget Repository - Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Repository Overview

This repository contains TWO separate flight tracking applications:

1. **Root Level** - Vanilla JavaScript flight tracker (index.html, app.js, styles.css)
2. **flightlo/** - Next.js 15 TypeScript application with modern React components

Both applications provide real-time flight tracking with multiple API sources and enhanced simulation fallbacks.

## Working Effectively

### Bootstrap and Dependencies
- **Root App**: No dependencies required - runs directly in browser
- **Next.js App**: 
  - `cd flightlo`
  - `npm install` -- takes 2 minutes. NEVER CANCEL. Set timeout to 5+ minutes.

### Build Commands
- **Root App**: No build required
- **Next.js App**:
  - `cd flightlo && npm run build` -- takes 15-20 seconds. NEVER CANCEL. Set timeout to 5+ minutes.
  - Build may fail on Google Fonts network restrictions - this is expected in sandboxed environments

### Run Applications
- **Root App**:
  - ALWAYS run with local server: `python3 -m http.server 8000`
  - Access via: `http://localhost:8000`
  - NEVER open index.html directly in browser for development
- **Next.js App**:
  - Development: `cd flightlo && npm run dev` -- takes 2-3 seconds to start
  - Production: `cd flightlo && npm run start` (requires build first)
  - Access via: `http://localhost:3000`

### Linting and Code Quality
- **Root App**: No linting setup
- **Next.js App**:
  - `cd flightlo && npm run lint` -- takes 10-15 seconds
  - May show unused import warnings - these are minor issues

## Validation

### CRITICAL - Manual Testing Requirements
ALWAYS manually validate any new code via these complete scenarios:

#### Root App Testing (http://localhost:8000)
1. **Flight Search Scenario**: 
   - Enter "JFK" as departure and "LAX" as destination
   - Click "Search Flights" 
   - Verify 15 flights appear with pricing, times, and API source indicators
   - Test sorting by price, time, duration
2. **Airline Search**: Click "Airline Search" tab and test airline-specific searches  
3. **Airport Info**: Click "Airport Info" tab and test airport information display

#### Next.js App Testing (http://localhost:3000)
1. **Route Search Scenario**:
   - Enter "JFK" in origin field and "LAX" in destination 
   - Click "Search Flights"
   - May show "No Flights Found" - this is acceptable as APIs have network restrictions
2. **Tab Navigation**: Test "By Airline" and "Airport Info" tabs for functionality
3. **Responsive Design**: Verify layout works on different screen sizes

### Build Validation
- Always run `cd flightlo && npm run build` before committing changes to Next.js app
- Build time is typically 15-20 seconds - document if it exceeds 1 minute
- Build failures due to Google Fonts network issues are acceptable in sandboxed environments

## Common Tasks

### Repository Structure
```
Flight-Widget/
├── README.md                 # Root app documentation
├── index.html               # Root app entry point
├── app.js                   # Root app JavaScript logic
├── styles.css               # Root app styling
├── API_INTEGRATION.md       # API documentation for both apps
├── flightlo/                # Next.js application directory
│   ├── package.json         # Next.js dependencies
│   ├── src/app/            # Next.js App Router
│   ├── src/components/     # React components
│   ├── src/lib/           # Utility functions
│   └── src/types/         # TypeScript definitions
└── .github/
    └── copilot-instructions.md  # This file
```

### Key Files to Check After Changes
- **Root app changes**: Always test app.js functionality via browser
- **Next.js app changes**: Always check components in src/components/ after API changes
- **Styling changes**: Test responsive design on both applications

### Network Limitations
- External APIs (Google Fonts, GitHub Raw, OpenSky Network) are blocked in sandboxed environments
- Both applications use realistic simulation when real APIs fail
- This is EXPECTED behavior - do not attempt to "fix" network connectivity

### API Integration
- Both apps support multiple flight APIs: Amadeus, RapidAPI, Skyscanner
- When APIs fail, enhanced simulation activates automatically
- See API_INTEGRATION.md for setup instructions with real API keys

## Build Times and Timeouts

### Measured Timings
- **npm install**: 2 minutes (flightlo)
- **npm run build**: 15-20 seconds (flightlo) 
- **npm run lint**: 10-15 seconds (flightlo)
- **npm run dev**: 2-3 seconds to start (flightlo)

### Required Timeout Values
- **npm install**: Set timeout to 300+ seconds (5+ minutes). NEVER CANCEL.
- **npm run build**: Set timeout to 300+ seconds (5+ minutes). NEVER CANCEL.
- **npm run lint**: Set timeout to 60+ seconds. NEVER CANCEL.

## Technology Stacks

### Root Application
- **Languages**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **APIs**: Multiple flight data sources with simulation fallbacks
- **Features**: Real-time flight search, airline search, airport information
- **No build process**: Runs directly in browser

### Next.js Application  
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI**: Radix UI components, Lucide React icons
- **Data**: TanStack Query for caching, SWR for data fetching
- **Development**: ESLint, PostCSS

## Development Guidelines

### Code Style
- **Root app**: Follow existing vanilla JS patterns
- **Next.js app**: Use TypeScript strict mode, functional components with hooks
- Both apps: Maintain responsive design principles

### Error Handling
- Both applications gracefully handle API failures
- Realistic simulation data ensures functionality when APIs are unavailable
- Never remove fallback mechanisms

### Performance
- Root app: Optimized for minimal dependencies
- Next.js app: Leverages SSR, code splitting, and image optimization
- Always test both applications after making changes

## Troubleshooting

### Common Issues
- **Google Fonts build errors**: Expected in sandboxed environments with network restrictions
- **API timeouts**: Expected - applications use simulation fallbacks
- **ESLint unused imports**: Minor warnings that don't prevent functionality

### When Commands Fail
- **Build fails on fonts**: Temporarily disable Google Fonts imports for testing
- **npm install fails**: Check Node.js version compatibility (requires 18+)
- **Apps don't start**: Verify correct port usage (8000 for root, 3000 for Next.js)

## Critical Reminders

- **NEVER CANCEL** long-running npm operations
- **ALWAYS** test both applications manually after changes
- **ALWAYS** run builds before committing Next.js changes
- **NEVER** assume API failures are bugs - simulation fallbacks are intentional
- **ALWAYS** use appropriate timeout values (5+ minutes for builds)