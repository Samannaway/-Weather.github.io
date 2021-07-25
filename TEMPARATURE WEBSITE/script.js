//api key = 46246f71c36f822f9a267bc463c184cd
//https://api.openweathermap.org/data/2.5/weather?q=kolkata&appid=46246f71c36f822f9a267bc463c184cd


let weatherConverter = {
    "APIKEY" : "46246f71c36f822f9a267bc463c184cd" ,
    fetchWeather : function(city){
        fetch("https://api.openweathermap.org/data/2.5/weather?q="
        +city
        +"&appid="
        +this.APIKEY
        +"&units=metric")
        .then((response)=>response.json()).then((data)=>this.weatheroutput(data))
    },

    weatheroutput : function(data){
        const {description,icon} = data.weather[0]
        const {temp,feels_like,humidity} = data.main
        const {visibility} = data
        const {speed} = data.wind
        const {name} = data
        const wanSpeed = Math.trunc(`${(speed*3.6)}`)
        const time = new Date().toLocaleTimeString()
        const wanVisibility = Math.trunc(`${(visibility/1000)}`)
        
        document.getElementById("PlaceName").innerHTML="Weather of "+ name
        document.getElementById("weather").innerHTML=description
        document.getElementById("temperature").innerHTML=temp+"°C"
        document.getElementById("windSpeed").innerHTML="wind speed : "+wanSpeed+"km/h"
        document.getElementById("realFeel").innerHTML = "real feel : "+feels_like+"°C"
        document.getElementById("humidity").innerHTML="humidity : " + humidity + "%"
        document.getElementById("updatedAt").innerHTML = "updated at : " + time 
        document.getElementById("visibility").innerHTML = "visibility : " + wanVisibility + "kms"
        document.getElementById("icon").src= "https://openweathermap.org/img/wn/" + icon +".png"

    },

    search: function () {
        this.fetchWeather(document.getElementById("searchCity").value)
    }
}

const button = document.getElementById("btn")
const searchBar = document.getElementById("searchCity")

button.addEventListener("click",function () {
    weatherConverter.search()
})

searchBar.addEventListener("keypress",function (event) {
    if (event.key == "Enter" ) {
        weatherConverter.search()
    }
})