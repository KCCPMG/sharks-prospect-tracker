import React from 'react';
import {useState} from 'react';
import './stylesheets/bootstrap.css'
import logo from './assets/sharks-logo.jpeg'
import axios from 'axios';
import {Container, Table} from 'react-bootstrap';

const numOrHyphen = (x) => {
  return Number(x) > 0 ? Number(x) : "-";
}

const BASE_URL = 'https://dobberprospects.com/player/'
const PLAYERS = [
  {name: 'Ivan Chekhovich', url: BASE_URL + 'ivan-chekhovich', position: 'LW'},
  {name: 'Jayden Halbgewachs', url: BASE_URL + 'jayden-halbgewachs', position: 'LW'},
  {name: 'Jonathan Dahlén', url: BASE_URL + 'jonathan-dahlen', position: 'LW'},
  {name: 'John Leonard', url: BASE_URL + 'john-leonard', position: 'LW'},
  {name: 'Danil Yurtaikin', url: BASE_URL + 'danil-yurtaikin', position: 'LW'},
  {name: 'Dillon Hamaliuk', url: BASE_URL + 'dillon-hamaliuk', position: 'LW'},
  {name: 'Lean Bergmann', url: BASE_URL + 'lean-bergmann', position: 'LW'},
  {name: 'Adam Raska', url: BASE_URL + 'adam-raska', position: 'LW'},
  {name: 'Jacob Jackson', url: BASE_URL + 'jacob-jackson', position: 'LW'},

  {name: 'Thomas Bordeleau', url: BASE_URL + 'thomas-bordeleau', position: 'C'},
  {name: 'Noah Gregor', url: BASE_URL + 'noah-gregor', position: 'C'},
  {name: 'Alexander True', url: BASE_URL + 'alexander-true', position: 'C'},
  {name: 'Dylan Gambrell', url: BASE_URL + 'dylan-gambrell', position: 'C'},
  {name: 'Maxim Letunov', url: BASE_URL + 'maxim-letunov', position: 'C'},
  {name: 'Yegor Spiridonov', url: BASE_URL + 'yegor-spiridonov', position: 'C'},
  {name: 'Antti Suomela', url: BASE_URL + 'antti-suomela', position: 'C'},
  {name: 'Jasper Weatherby', url: BASE_URL + 'jasper-weatherby', position: 'C'},
  {name: 'Scott Reedy', url: BASE_URL + 'scott-reedy', position: 'C'},
  {name: 'Joel Kellman', url: BASE_URL + 'joel-kellman', position: 'C'},
  {name: 'Tim Clifton', url: BASE_URL + 'tim-clifton', position: 'C'},
  {name: 'Marcus Vela', url: BASE_URL + 'marcus-vela', position: 'C'},

  {name: 'Alexander (Sasha) Chmelevski', url: BASE_URL + 'alexander-sasha-chmelevski', position: 'RW'},
  {name: 'Daniil Guschchin', url: BASE_URL + 'daniil-gushchin', position: 'RW'},
  {name: 'Tristen Robins', url: BASE_URL + 'tristen-robins', position: 'RW'},
  {name: 'Vladislav Kotkov', url: BASE_URL + 'vladislav-kotkov', position: 'RW'},
  {name: 'Jake McGrew', url: BASE_URL + 'jake-mcgrew', position: 'RW'},
  {name: 'Joachim Blichfeld', url: BASE_URL + 'joachim-blichfeld', position: 'RW'},
  {name: 'Jonny Brodzinski', url: BASE_URL + 'jonny-brodzinski', position: 'RW'},
  {name: 'Ozzy Wiesblatt', url: BASE_URL + 'ozzy-wiesblatt', position: 'RW'},
  {name: 'Brandon Coe', url: BASE_URL + 'brandon-coe', position: 'RW'},
  {name: 'Manuel Wiederer', url: BASE_URL + 'manuel-wiederer', position: 'RW'},

  {name: 'Artemi Knyazev', url: BASE_URL + 'artemi-knyazev', position: 'LD'},
  {name: 'Mario Ferraro', url: BASE_URL + 'mario-ferraro', position: 'LD'},
  {name: 'Brinson Pasichnuk', url: BASE_URL + 'brinson-pasichnuk', position: 'LD'},
  {name: 'Radim Simek', url: BASE_URL + 'radim-simek', position: 'LD'},
  {name: 'Santeri Hatakka', url: BASE_URL + 'santeri-hatakka', position: 'LD'},
  {name: 'Tony Sund', url: BASE_URL + 'tony-sund', position: 'LD'},
  {name: 'Jacob Middleton', url: BASE_URL + 'jacob-middleton', position: 'LD'},
  {name: 'Karlis Cukste', url: BASE_URL + 'karlis-cukste', position: 'LD'},
  {name: 'Trevor Carrick', url: BASE_URL + 'trevor-carrick', position: 'LD'},

  {name: 'Ryan Merkley', url: BASE_URL + 'ryan-merkley', position: 'RD'},
  {name: 'Nicolas Meloche', url: BASE_URL + 'nicolas-meloche', position: 'RD'},
  {name: 'Nick DeSimone', url: BASE_URL + 'nick-desimone', position: 'RD'},
]

const HEADERS = [
  {
    colKey: 1,
    text: "Name",
    rightBorder: false,
    playerKey: "name"
  },
  {
    colKey: 2,
    text: "Position",
    rightBorder: false,
    playerKey: "position"
  },
  {
    colKey: 3,
    text: "Year",
    rightBorder: false,
    playerKey: "year"
  },
  {
    colKey: 4,
    text: "Team",
    rightBorder: false,
    playerKey: "team"
  },
  {
    colKey: 5,
    text: "League",
    rightBorder: true,
    playerKey: "league"
  },
  {
    colKey: 6,
    text: "GP",
    rightBorder: false,
    playerKey: "gamesPlayed"
  },
  {
    colKey: 7,
    text: "Goals",
    rightBorder: false,
    playerKey: "goals"
  },
  {
    colKey: 8,
    text: "Assists",
    rightBorder: false,
    playerKey: "assists"
  },
  {
    colKey: 9,
    text: "Points",
    rightBorder: false,
    playerKey: "totalPoints"
  },
  {
    colKey: 10,
    text: "PIM",
    rightBorder: true,
    playerKey: "pim"
  },
  {
    colKey: 11,
    text: "Goals",
    rightBorder: false,
    playerKey: "goalsPG"
  },
  {
    colKey: 12,
    text: "Assists",
    rightBorder: false,
    playerKey: "assistsPG"
  },
  {
    colKey: 13,
    text: "Points",
    rightBorder: false,
    playerKey: "totalPointsPG"
  },
  {
    colKey: 14,
    text: "PIM",
    rightBorder: true,
    playerKey: "pimPG"
  },
  {
    colKey: 15,
    text: "GP",
    rightBorder: false,
    playerKey: "playoffGamesPlayed"
  },
  {
    colKey: 16,
    text: "Goals",
    rightBorder: false,
    playerKey: "playoffGoals"
  },
  {
    colKey: 17,
    text: "Assists",
    rightBorder: false,
    playerKey: "playoffAssists"
  },
  {
    colKey: 18,
    text: "Points",
    rightBorder: false,
    playerKey: "playoffTotalPoints"
  },
  {
    colKey: 19,
    text: "PIM",
    rightBorder: true,
    playerKey: "playoffPim"
  },
  {
    colKey: 20,
    text: "Goals",
    rightBorder: false,
    playerKey: "playoffGoalsPG"
  },
  {
    colKey: 21,
    text: "Assists",
    rightBorder: false,
    playerKey: "playoffAssistsPG"
  },
  {
    colKey: 22,
    text: "Points",
    rightBorder: false,
    playerKey: "playoffTotalPointsPG"
  },
  {
    colKey: 23,
    text: "PIM",
    rightBorder: false,
    playerKey: "playoffPimPG"
  },
]

class App extends React.Component {
  constructor(props) {
    super(props);
    let playerID = 1;
    let players = JSON.parse(JSON.stringify(PLAYERS))
    players.forEach(player => {
      player.id = playerID;
      playerID++;

      player.year = "-";
      player.team = "-";
      player.league = "-";
      player.gamesPlayed = "-";
      player.goals = "-";
      player.assists = "-";
      player.totalPoints = "-";
      player.pim = "-";
      player.playoffGamesPlayed = "-";
      player.playoffGoals = "-";
      player.playoffAssists = "-";
      player.playoffTotalPoints = "-";
      player.playoffPim = "-";
      
      player.goalsPG = "-";
      player.assistsPG = "-";
      player.totalPointsPG = "-";
      player.pimPG = "-";
      player.playoffGoalsPG = "-";
      player.playoffAssistsPG = "-";
      player.playoffTotalPointsPG = "-";
      player.playoffPimPG = "-";

    })
    this.state = {
      sortBy: null,
      sortDescending: null,
      players, 
      hoverColKey: null,
      hoverGroupHeadKey: null,
      hoverRowKey: null
    };
  }

  setHighlight = (rowKey, colKey) => {
    let groupHeadKey;

    // Column Spans: 5,5,4,5,4
    if (colKey>=1 && colKey<=5) groupHeadKey = 1;
    else if (colKey>=6 && colKey<=10) groupHeadKey = 2;
    else if (colKey>=11 && colKey<=14) groupHeadKey = 3;
    else if (colKey>=15 && colKey<=19) groupHeadKey = 4;
    else if (colKey>=20 && colKey<=24) groupHeadKey = 5;
    
    this.setState({
      hoverColKey: colKey,
      hoverGroupHeadKey: groupHeadKey,
      hoverRowKey: rowKey
    })

  }

  clearHighlight = () => {
    this.setState({
      hoverColKey: null,
      hoverGroupHeadKey: null,
      hoverRowKey: null
    })
  }

  sort = (colKey) => {
    let foundHeader = HEADERS.find(player => player.colKey===colKey);
    let playerKey = foundHeader.playerKey;

    let sortDescending;
    if (this.state.sortBy===colKey) {
      sortDescending = !this.state.sortDescending;
    } else sortDescending = true;

    this.setState({
      sortBy: colKey,
      sortDescending
    }, () => {
      let players = JSON.parse(JSON.stringify(this.state.players));

      if (players.every(player => typeof player[playerKey] === "string")) {
        if (sortDescending) players.sort((a,b) => b[playerKey].localeCompare(a[playerKey]))
        else players.sort((a,b) => a[playerKey].localeCompare(b[playerKey]))

      } else {
        if (sortDescending) players.sort((a,b) => {
          let aVal = Number(a[playerKey]) || 0;
          let bVal = Number(b[playerKey]) || 0;
          return bVal-aVal;
        })
        else players.sort((a,b) => {
          let aVal = Number(a[playerKey]) || 0;
          let bVal = Number(b[playerKey]) || 0;
          return aVal-bVal;
        })
      }
      this.setState({players})
    })
  }

  getPlayerData = () => {
    let players = JSON.parse(JSON.stringify(this.state.players))
    console.log('about to initiate attempt');
    try {
      players.forEach((player, i) => {
        axios.get(player.url)
        .then(response => {
          let dummyDOM = document.createElement('html');
          dummyDOM.innerHTML = JSON.stringify(response.data);
          console.log('response obtained');
  
          let statTable = dummyDOM.querySelectorAll('table')[1];
          let statTableRowCount = statTable.querySelectorAll('tr').length;
          let lastRow = statTable.querySelectorAll('tr')[statTableRowCount-1];
          let lastRowDetails = Array.from(lastRow.querySelectorAll('td')).map(td => td.innerText)

          player.year = lastRowDetails[0];
          let firstEligibleRowIndex = statTableRowCount-1;
          let lastEligibleRowIndex = statTableRowCount-1;

          // Find year given that it will only be listed once and potentially for multiple teams 
          let yearRE = /\d\d\d\d/g;
          if (!player.year.match(yearRE)) {
            for (let i=statTableRowCount-2; i>=0; i--) {
              let currentRow = statTable.querySelectorAll('tr')[i];
              let currentRowDetails = Array.from(currentRow.querySelectorAll('td')).map(td => td.innerText);
              if (currentRowDetails[0].match(yearRE)) {
                firstEligibleRowIndex = i;
                player.year = currentRowDetails[0];
                break;
              }
            }
          }

          let currentRowIndex=firstEligibleRowIndex;
          let maxGamesPlayed = 0;

          for (let i=firstEligibleRowIndex; i<=lastEligibleRowIndex; i++) {
            let row = statTable.querySelectorAll('tr')[i];
            let details = Array.from(row.querySelectorAll('td')).map(td => td.innerText);
            let gamesPlayed = Number(details[3]);
            if (gamesPlayed>maxGamesPlayed) {
              currentRowIndex = i;
              maxGamesPlayed = gamesPlayed;
            }
          }

          console.log(player.name, maxGamesPlayed);

          let correctRow = statTable.querySelectorAll('tr')[currentRowIndex]
          let correctRowDetails = Array.from(correctRow.querySelectorAll('td')).map(td => td.innerText)

          player.team = correctRowDetails[1];
          player.league = correctRowDetails[2];
          player.gamesPlayed = numOrHyphen(correctRowDetails[3]);
          player.goals = numOrHyphen(correctRowDetails[4]);
          player.assists = numOrHyphen(correctRowDetails[5]);
          player.totalPoints = numOrHyphen(correctRowDetails[6]);
          player.pim = numOrHyphen(correctRowDetails[7]);
          player.playoffGamesPlayed = numOrHyphen(correctRowDetails[10]);
          player.playoffGoals = numOrHyphen(correctRowDetails[11]);
          player.playoffAssists = numOrHyphen(correctRowDetails[12]);
          player.playoffTotalPoints = numOrHyphen(correctRowDetails[13]);
          player.playoffPim = numOrHyphen(correctRowDetails[14]);
          
          player.goalsPG = Math.floor(100 * (player.goals / player.gamesPlayed)) / 100 || "-";
          player.assistsPG = Math.floor(100 * (player.assists / player.gamesPlayed)) / 100 || "-";
          player.totalPointsPG = Math.floor(100 * (player.totalPoints / player.gamesPlayed)) / 100 || "-";
          player.pimPG = Math.floor(100 * (player.pim / player.gamesPlayed)) / 100 || "-";
          player.playoffGoalsPG = Math.floor(100 * (player.playoffGoals / player.playoffGamesPlayed)) / 100 || "-";
          player.playoffAssistsPG = Math.floor(100 * (player.playoffAssists / player.playoffGamesPlayed)) / 100 || "-";
          player.playoffTotalPointsPG = Math.floor(100 * (player.playoffTotalPoints / player.playoffGamesPlayed)) / 100 || "-";
          player.playoffPimPG = Math.floor(100 * (player.playoffPim / player.playoffGamesPlayed)) / 100 || "-";

          this.setState({players});
        })
      })
    } catch(e) {
      console.log(e);
      setTimeout(this.getPlayerData, 5000);
    }
  }

  componentDidMount = () => {
    this.getPlayerData();
  }
  
  render() {
    let players = this.state.players.map(player => {
      return(
        <Player 
          key={`playerID-${player.id}`} 
          player={player} 
          setHighlight={this.setHighlight} 
          clearHighlight={this.clearHighlight}
          hoverRowKey={this.state.hoverRowKey}
        />
      )
    })

    let headers = HEADERS.map(header => {
      return (
        <TableHeader
          hoverColKey={this.state.hoverColKey}
          colKey={header.colKey}
          text={header.text} 
          sort={this.sort}
          rightBorder={header.rightBorder}
          sortBy={this.state.sortBy}
          sortDescending={this.state.sortDescending}
        />
      )
    })


    return (
      <div className="App">
        <Container className="img-container">
          <img className="App-logo" src={logo} alt="team-logo" />
        </Container>
        <Container className="header-container">
          <h1>SAN JOSE SHARKS</h1>
          <h2>Prospect Tracker</h2>
        </Container>
        <Container className="table-container">
          <Table className="stat-table" style={{marginBottom: "0px", borderCollapse:"separate"}} borderless>
            <thead>
              <tr className="sticky-head-row">
                <th 
                  groupHeadKey={1} 
                  colSpan={5} 
                  highlight={this.state.hoverGroupHeadKey===1}
                  className={`sticky-head right-border ${this.state.hoverGroupHeadKey===1 ? "highlight" : ""}`}
                >
                  Player
                </th>
                <th groupHeadKey={2} colSpan={5} className={`sticky-head right-border ${this.state.hoverGroupHeadKey===2 ? "highlight" : ""}`}>Regular Season</th>
                <th groupHeadKey={3} colSpan={4} className={`sticky-head right-border ${this.state.hoverGroupHeadKey===3 ? "highlight" : ""}`}>Regular Season Per Game</th>
                <th groupHeadKey={4} colSpan={5} className={`sticky-head right-border ${this.state.hoverGroupHeadKey===4 ? "highlight" : ""}`}>Playoffs</th>
                <th groupHeadKey={5} colSpan={4} className={`sticky-head right-border ${this.state.hoverGroupHeadKey===5 ? "highlight" : ""}`}>Playoffs Per Game</th>
              </tr>
              <tr className="sticky-subhead-row">
                {headers}
              </tr>
            </thead>
            <tbody>
              {players}
            </tbody>            
          </Table>
        </Container>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>    
      </div>
    );
  }  
}



function TableHeader(props) {
  const [sortTip, showSortTip] = useState(false);
  let {colKey, text, sort, rightBorder, sortBy, sortDescending, hoverColKey} = props;
  let symbol = "";

  if (sortBy===colKey) {
    if (sortDescending) symbol = "▼"
    else symbol = "▲"
  }

  let className="sticky-subhead";
  if (rightBorder) className+=" sticky-subhead-right-border";
  if (sortBy===colKey) className+=" sorted";
  if (hoverColKey===colKey) className+=" highlight";

  return (
    <th 
      colKey={colKey} 
      onClick={() => sort(colKey)}
      className={className}
      onMouseEnter={showSortTip}
      onMouseLeave={()=>showSortTip(false)}
    >
      {text}
      {symbol}
      {(sortTip && sortBy!==colKey) ? "\n▼▲" : ""}
    </th>
  )
}

function Player(props) {
  return (
    <tr rowKey={props.player.id} className={`${props.hoverRowKey===props.player.id ? "highlight" : ""}`}>
      <td 
        colKey={1} 
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 1)
        }}
        onMouseLeave={props.clearHighlight}
      >
        <a href={props.player.url}>{props.player.name}</a>
      </td>
      <td 
        colKey={2}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 2)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.position}
      </td>
      <td 
        colKey={3}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 3)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.year}
      </td>
      <td 
        colKey={4}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 4)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.team}
      </td>
      <td 
        colKey={5}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 5)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.league}
      </td>

      <td 
        colKey={6}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 6)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.gamesPlayed}
      </td>
      <td 
        colKey={7}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 7)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.goals}
      </td>
      <td 
        colKey={8}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 8)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.assists}
      </td>
      <td 
        colKey={9}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 9)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.totalPoints}
      </td>
      <td 
        colKey={10}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 10)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.pim}
      </td>
      <td 
        colKey={11}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 11)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.goalsPG}
      </td>
      <td 
        colKey={12}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 12)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.assistsPG}
      </td>
      <td 
        colKey={13}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 13)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.totalPointsPG}
      </td>
      <td 
        colKey={14}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 14)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.pimPG}
      </td>
      <td 
        colKey={15}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 15)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffGamesPlayed}
      </td>
      <td 
        colKey={16}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 16)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffGoals}
      </td>
      <td 
        colKey={17}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 17)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffAssists}
      </td>
      <td 
        colKey={18}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 18)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffTotalPoints}
      </td>
      <td 
        colKey={19}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 19)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffPims}
      </td>
      <td 
        colKey={20}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 20)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffGoalsPG}
      </td>
      <td 
        colKey={21}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 21)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffAssistsPG}
      </td>
      <td 
        colKey={22}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 22)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffTotalPointsPG}
      </td>
      <td 
        colKey={23}
        onMouseEnter={()=>{
          props.setHighlight(props.player.id, 23)
        }}
        onMouseLeave={props.clearHighlight}
      >
        {props.player.playoffPimPG}
      </td>
    </tr>
  )
}

export default App;
