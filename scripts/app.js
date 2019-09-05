const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {
    const cityDets = data.cityDets;
    const weather = data.weather;
    // night and day

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);
    
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = 'img/day.svg';
    }
    else{
        timeSrc ='img/night.svg';
    }
    time.setAttribute('src',timeSrc);

    //update details
    details.innerHTML = 
    `<h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    </div>`

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }


};





const updateCity = async (city) => {
   
    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return { cityDets,weather };

};







cityForm.addEventListener('submit', e => {

    e.preventDefault();
    // get the city value
    const city = cityForm.city.value.trim();
    cityForm.reset() //clearing the textbox after giving input

    //update UI
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));


});