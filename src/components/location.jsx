import axios from 'axios'
import { useEffect, useState } from 'react'
import Loader from './Loader'


const Location = () => {

    const [city, setCity] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const [isFaranheit, setIsFaranheit] = useState(true)
    const [country, setCountry] = useState("");
    const [location, setLocation] = useState("")
    const [isLoadingCity, setIsLoadingCity] = useState(false);
    const changeUnits = () => { 
        setIsFaranheit(!isFaranheit)
    }
   

    useEffect(() => {

        function success(pos) {
            const crd = pos.coords;

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=ee8466060c4c759ff35f8a01ca9f1032`)
             .then(resp => {
                setCity(resp.data)
                setIsLoading(false)
                console.log(resp.data)
                console.log(crd.longitude)
                console.log(crd.latitude)
            })
            .catch(error => console.error(error))


          }
          
          function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
          }

        navigator.geolocation.getCurrentPosition(success, error) 

          
          
        }, [])


        const onSubmit = (e) => {
            e.preventDefault();

            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=ee8466060c4c759ff35f8a01ca9f1032`)
            .then(resp => {
               setLocation(resp.data)
               setIsLoadingCity(true)
               console.log(resp.data)


           })
           
           .catch(error => {
            console.error(error)
          })
  
          
        }

        const temperature = Math.round(city.main?.temp -273)
        const tempFeels = Math.round(city.main?.feels_like - 273)
        const temperatureLocation = Math.round(location.main?.temp -273)
        const tempFeelsLocation = Math.round(location.main?.feels_like - 273)

        const Form = () => {
            if (isLoadingCity === false) {
                return(
                  <>
          <div className='container_principal'>
            <h1 className='city'>
              {city.name}, {city.sys?.country}.
            </h1>

            <div className='simbol'>
            <img src={`https://openweathermap.org/img/wn/${city.weather?.[0].icon}@2x.png`} alt="" />
            <h1>{city.weather?.[0].main}</h1>
            </div>
            <div className='temp'>
              <h1> { isFaranheit ? temperature : Math.round((temperature * 1.8) + 32) } {isFaranheit ? "°C" : "°F"} </h1>
              <button onClick={ changeUnits } className='btn-units'>°F/°C</button>
            </div>
            </div>
              
            <div className='info-container'>
            <div className='info'>
              <p>Humedad</p>
              <h1>{city.main?.humidity}%</h1>
            </div>
            <div className='info'>
                <p>Wind</p>
                <h1>{(city.wind?.speed * 3.6).toFixed()} Km/h</h1>
            </div>
            <div className='info'>
                <p>Feels like</p>
                <h1>{isFaranheit ? tempFeels : Math.round((tempFeels * 1.8) + 32) } {isFaranheit ? "°C" : "°F"} </h1>
            </div>
        
            </div>
          
          </>


                )
            } else {
                return(
                  <>
                  <div className='container_form'>
          <h1 className='city'>
            {location.name}, {location.sys?.country}.
          </h1>

          <div className='simbol'>
            <img src={`https://openweathermap.org/img/wn/${location.weather?.[0].icon}@2x.png`} alt="" />
            <h1>{location.weather?.[0].main}</h1>
          </div>
          <div className='temp'>
              <h1> { isFaranheit ? temperatureLocation : Math.round((temperatureLocation * 1.8) + 32) } {isFaranheit ? "°C" : "°F"} </h1>
              <button onClick={ changeUnits } className='btn-units'>°F/°C</button>
          </div> 
          </div>
          <div className='info-container'>
            <div className='info'>
              <p>Humedad</p>
              <h1>{location.main?.humidity}%</h1>
            </div>
            <div className='info'>
                <p>Wind</p>
                <h1>{(location.wind?.speed * 3.6).toFixed()} Km/h</h1>
            </div>
            <div className='info'>
                <p>Feels like</p>
                <h1>{isFaranheit ? tempFeelsLocation : Math.round((tempFeelsLocation * 1.8) + 32) } {isFaranheit ? "°C" : "°F"} </h1>
            </div>
            

          </div>
          
          
          </>
                )
              
            }
        }


      

      return (
        <>
          { isLoading && <Loader/> }
          <div className="container-input">
            <form onSubmit={onSubmit}>
                <div className="input">
                    <input type="text" name='inputCity' className="form-control" placeholder="Ciudad" value={country} required onChange={(e) =>setCountry(e.target.value)}/>
                    <button className="btn-input" type="submit">Buscar</button>
                </div>
            </form>
            </div>

            <Form/>
          
          
        </>
      )
}

export default Location