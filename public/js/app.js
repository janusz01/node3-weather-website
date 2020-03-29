console.log('Client side javascript is loading')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    if (!location) {
        // console.log('Please enter a location')
        messageOne.textContent = 'Please enter a location'
        messageTwo.textContent = ''
    } else {
        fetch('http://localhost:3000/weather?address=' + location).then((response) => {
            response.json().then((data) => {
                if (data.error){
                    // return console.log(data.error)
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                } else {
                    // console.log(data.location, data.forecast)
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    }
})