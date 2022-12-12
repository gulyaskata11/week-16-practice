import React from 'react'

function Beer({beerData}) {
  
    return (
      <div >
        <h2>{beerData.name}</h2>
        <h3>{beerData.tagline}</h3>
        <h4>{beerData.abv}</h4>
      </div>
    );
  }
  
  export default Beer;