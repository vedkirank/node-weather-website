const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loc = document.querySelector('#location');
const forecast = document.querySelector('#forecast');
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                loc.textContent = data.error;
            }else{
                loc.textContent = data.location;
                forecast.textContent = data.forecast;
            }
        });
    });
})