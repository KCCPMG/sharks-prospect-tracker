import React, {useState} from 'react';
import './App.css';
// import './stylesheets/bootstrap.css'
import axios from 'axios';
import {Container} from 'react-bootstrap';

import logo from './logo.svg';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
      <Container>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Year</td>
              <td>Team</td>
              <td>League</td>
              <td>Name</td>
              <td>GP</td>
              <td>Goals</td>
              <td>Assists</td>
              <td>Points</td>
              <td>PIM</td>
              <td>Playoff GP</td>
              <td>Playoff Goals</td>
              <td>Playoff Assists</td>
              <td>Playoff Points</td>
              <td>Playoff PIM</td>
              
            </tr>
          </thead>
          <tbody>
            <PlayerStats name="Ivan Chekhovich" url="https://dobberprospects.com/player/ivan-chekhovich/"/>
          </tbody>
          
        </table>
        
      </Container>
    );
  }
  
}

class PlayerStats extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      year: '',
      team: '',
      league: '',
      games_played: '',
      goals: '',
      assists: '',
      total_points: '',
      pim: '',
      playoff_games_played: '',
      playoff_goals: '',
      playoff_assists: '',
      playoff_total_points: '',
      playoff_pim: ''
    }

  }

  componentDidMount() {
    this.setState({name: this.props.name})
    axios.get(this.props.url)
    .then((response) => {
      this.setState({league: JSON.stringify(response)});
      // console.log(typeof (response))
      // console.log(response);

      let dummyDOM = document.createElement('html');
      dummyDOM.innerHTML = response.data;
      
      let statTable = dummyDOM.querySelectorAll('table')[1];

      let statTableRowCount = statTable.querySelectorAll('tr').length;

      let lastRow = statTable.querySelectorAll('tr')[statTableRowCount-1];

      let lastRowDetails = Array.from(lastRow.querySelectorAll('td')).map(td => td.innerText);

      this.setState({
        year: lastRowDetails[0] || "-",
        team: lastRowDetails[1] || "-",
        league: lastRowDetails[2] || "-",
        games_played: lastRowDetails[3] || "-",
        goals: lastRowDetails[4] || "-",
        assists: lastRowDetails[5] || "-",
        total_points: lastRowDetails[6] || "-",
        pim: lastRowDetails[7] || "-",
        playoff_games_played: lastRowDetails[10] || "-",
        playoff_goals: lastRowDetails[11] || "-",
        playoff_assists: lastRowDetails[12] || "-",
        playoff_total_points: lastRowDetails[13] || "-",
        playoff_pim: lastRowDetails[14] || "-"
      }, ()=>{console.log(this.state)})
    })
  }

  render() {

    let details = Object.keys(this.state).map(key => {
      return (
        <td key={key}>{this.state[key]}</td>
      )
    })

    return (
      <tr>
        {details}
      </tr>
    )
  }
}

export default App;
