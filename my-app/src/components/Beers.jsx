import React from 'react'
import Beer from './Beer';

function Beers({beers}) {
  
    return (
      <div >
         {beers.map((beer, index) => <Beer key={index} beerData={beer} />)}
      </div>
    );
  }
  
  export default Beers;