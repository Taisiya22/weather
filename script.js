const form = document.querySelector('form');
const list = document.querySelector('.list-js')

form.addEventListener('submit', getWeather);

function getFetch(city, days) { 
    return fetch(`http://api.weatherapi.com/v1/forecast.json?key=48cb2a8d61c54182a7c120347230702&q=${city}&days=${days}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json();
         } )
    
}


function getWeather(e) { 
    e.preventDefault()
    const input = form.elements.city.value;
    const select = form.elements.days.value;

    getFetch(input, select).then((res) => {
        renderMarkup(res.forecast.forecastday)
}) 
}

function renderMarkup(forecast) {
    const markup = forecast.map(({ date, day: { avgtemp_c, condition: { icon } } }) => {
        return `<ul>
    <li>${date}</li>
    <li>${avgtemp_c}</li>
    <img src="${icon}">
</ul>`
    }).join('');
    list.innerHTML = markup;
 }
