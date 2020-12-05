var container = document.querySelector('.container')
var seats  = document.querySelectorAll('.row .seat:not(.occupied)')
var count = document.getElementById('count')
var total = document.getElementById('total')
var movieSelect = document.getElementById('movie')
var ticketPrice = +movieSelect.value
var screen = document.querySelector('.screen')

populateUi();
//FUNCTIONS
//set selected movie data
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex' , movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)

}
//Picture set
function picSet(){
    if(movieSelect.selectedIndex == 0){
        document.getElementById('img').src = "assets/ae.jpg"
    }
    if(movieSelect.selectedIndex == 1){
        document.getElementById('img').src = "assets/j.jpg"
    }
    if(movieSelect.selectedIndex == 2){
        document.getElementById('img').src = "assets/ts.jpg"
    }
    if(movieSelect.selectedIndex == 3){
        document.getElementById('img').src = "assets/lk.jpg"
    }
}
// Update total and count
function updateSelectedCount(){
    const selectedSeats = 
    document.querySelectorAll('.row .seat.selected')
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    })
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice +'$'
    picSet()
}
//get data from localStorage and populate UI
function populateUi(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice')
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })

    }
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex
        ticketPrice = Number(selectedMoviePrice)
    }

}
//Event listeners
//MOVIE SELECT EVENT
movieSelect.addEventListener('change',function(e){
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex , e.target.value)
    updateSelectedCount()
})
//SEAT CLICK EVENT
container.addEventListener('click', function(e){
    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')

        updateSelectedCount();
}  
})
//initial count and total
updateSelectedCount();