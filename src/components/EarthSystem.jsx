import React, {Component} from 'react';
import Orbit from './Orbit.jsx';
import Earth from './Earth.jsx';




class EarthSystem extends Component{

  render() {
    return (
      <div className="earth-system">
        <Orbit/>
        <Earth/>
      </div>
    )
  }
}

export default EarthSystem;
