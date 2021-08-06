import React, { Component } from 'react';
import './App.css';

class Comp extends Component {
  constructor() {
    super();

    this.state = {
      launchData: {}
    }
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v4/launches/'+this.props.launchId)
    .then(resp => resp.json())
    .then(launchObj => this.setState({launchData: launchObj}))
  }
  
  render() {
    return (
      <div>
        <p>{this.state.launchData.name}</p>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      launchpads: []
    }
  }

  componentDidMount() {
    fetch('https://api.spacexdata.com/v4/launchpads')
    .then(resp => resp.json())
    .then(launchpadsData => this.setState({launchpads: launchpadsData}))
  }

  render() {
    return (
      <div>
        {
          this.state.launchpads.map((launchpad) => {
            // console.log(launchpad.launches.length)
            return (
              <div key={launchpad.id}>
                <h2>LaunchPad Name</h2>
                <h3>{launchpad.full_name}</h3>
                <h4>First three Lanunches of {launchpad.full_name}</h4>
                {
                  launchpad.launches.filter((ele,i) =>i < 3)
                  .map((launchId,i) => {
                      return <Comp key={launchId} launchId={launchId}/>
                  })
                }
                
              </div>
            )
          })
        }<p></p>
        <p></p>
        <p></p>

      </div>
    )
  }
}

export default App;
