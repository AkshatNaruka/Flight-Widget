const tableBody = document.getElementById("table-body")

let flights = [
    {
        time: "08.11",
        destination: "INDIA",
        flight: "XEa112",
        gate: "B 12",
        remark: "ON TIME"        
    },
    {
        time: "18.11",
        destination: "USA",
        flight: "XEa113",
        gate: "D 7",
        remark: "DELAYED"        
    },
    {
        time: "03.11",
        destination: "JAPAN",
        flight: "XEa115",
        gate: "E 35",
        remark: "CANCELLED"        
    },
    {
        time: "12.45",
        destination: "FRANCE",
        flight: "XEa156",
        gate: "A 88",
        remark: "ON TIME"        
    },
    {
        time: "18.10",
        destination: "RUSSIA",
        flight: "XEa119",
        gate: "G 49",
        remark: "ON TIME"        
    }
]

const destinations = ['TOKYO','FRANKFURT','DUBAI','PARIS','OMAN','BEIRUT']
const remarks = ['ON TIME','DELAYED','CANCELLED']
let hour = 15

function populateTable() {
    for(const flight of flights){
        const tableRow = document.createElement("tr")

        for(const flightdetail in flight){
            const tablecell = document.createElement('td')
            const word = Array.from(flight[flightdetail])

            for(const [index,letter] of word.entries()){
                const letterElement = document.createElement('div')
                
                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent=letter
                    tablecell.append(letterElement)
                }, 100*index);
            }

            tableRow.append(tablecell)
        }

        tableBody.append(tableRow)

    }
}

populateTable()


function generateRandomNumber(maxNumber) {
    const numbers = '1234567890'
    if(maxNumber){
        const newNumbers = numbers.slice(0,maxNumber+1)
        return newNumbers.charAt(Math.floor(Math.random()*newNumbers.length))
    }
    return numbers.charAt(Math.floor(Math.random()*numbers.length))
}

function generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return alphabet.charAt(Math.floor(Math.random()*alphabet.length))
}

function generateTime() {
    let displayHour = hour

    if ( hour < 24){
        hour++
    }if(hour>=24){
         hour = 1 
         displayHour=hour
    }
    if(hour<10){
        displayHour = '0'+hour
    }
    return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber() 
}

function shuffleUp() {
    flights.shift()
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(Math.random()*destinations.length)],
        flight: generateRandomLetter() + generateRandomLetter() + generateRandomLetter() + generateRandomNumber() +generateRandomNumber()+generateRandomNumber(),
        gate: generateRandomLetter() +" " + generateRandomNumber() + generateRandomNumber(),
        remark: remarks[Math.floor(Math.random()*remarks.length)]       
    })
    tableBody.textContent = ""
    populateTable()
}

setInterval(shuffleUp,2000)
