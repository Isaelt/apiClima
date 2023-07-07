// import {useState, useEffect} from 'react';
// import axios from 'axios'

// const Form = () => {
//     const [country, setCountry] = useState("");
//     const [location, setLocation] = useState("")
//     const [isFaranheit, setIsFaranheit] = useState(true)
//     const [isLoadingCity, setIsLoadingCity] = useState(false);
//     const changeUnits = () => { 
//         setIsFaranheit(!isFaranheit)
//     }

//         const onSubmit = (e) => {
//             e.preventDefault();
//             if(country === "") return window.alert('ingrese una entrada valida');

//             axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=ee8466060c4c759ff35f8a01ca9f1032`)
//             .then(resp => {
//                setLocation(resp.data)
//                setIsLoadingCity(true)
//                console.log(resp.data)

//            })
//            .catch(error => console.error(error))
            
    
//         }

//         const temperature = Math.round(location.main?.temp -273)
//         const tempFeels = Math.round(location.main?.feels_like - 273)
 

//     return(

//         <div className="container-input">
//             <form onSubmit={onSubmit}>
//                 <div className="input">
//                     <input type="text" className="form-control" placeholder="Ciudad" value={country} required onChange={(e) =>setCountry(e.target.value)}/>
//                     <button className="btn-input" type="submit">Buscar</button>
//                 </div>
//             </form>
            
//           {isLoadingCity 
//           && 
//           <div className='container_form'>
//           <h1 className='city'>
//             {location.name}, {location.sys?.country}.
//           </h1>

//           <div className='simbol'>
//             <img src={`https://openweathermap.org/img/wn/${location.weather?.[0].icon}@2x.png`} alt="" />
//             <h1>{location.weather?.[0].main}</h1>
//           </div>
//           <div className='temp'>
//               <h1> { isFaranheit ? temperature : Math.round((temperature * 1.8) + 32) } {isFaranheit ? "°C" : "°F"} </h1>
//           </div> 
//           <div className='info-container'>
//             <div className='info'>
//               <p>Humedad</p>
//               <h1>{location.main?.humidity}%</h1>
//             </div>
//             <div className='info'>
//                 <p>Wind</p>
//                 <h1>{Math.round(location.wind?.speed * 3.6)} Km/h</h1>
//             </div>
//             <div className='info'>
//                 <p>Feels like</p>
//                 <h1>{isFaranheit ? tempFeels : Math.round((tempFeels * 1.8) + 32) } {isFaranheit ? "°C" : "°F"} </h1>
//             </div>
            

//           </div>
//           <button onClick={ changeUnits } className='btn-units'>°F/°C</button>
//           </div>
//           }        
           
//         </div>

//     );
// }

// export default Form;