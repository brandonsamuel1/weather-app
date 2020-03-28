const searchForm = document.querySelector('form')
const searchTerm = document.querySelector('input')
const msgOne = document.querySelector('.msg-one')
const msgTwo = document.querySelector('.msg-two')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    msgOne.textContent = 'Searching...'
    const location = searchTerm.value
    fetch(`http://localhost:3000/weather?location=${location}`)
        .then((res) => {
            res.json()
                .then((data) => {
                    if (data.error) {
                        msgOne.textContent = 'Sorry there must be a problem.. Please try again'
                        msgTwo.textContent = data.error
                    } else {
                        msgOne.textContent = data.location
                        msgTwo.textContent = data.forecast
                    }
                })
        })
    searchTerm.value = ''
})