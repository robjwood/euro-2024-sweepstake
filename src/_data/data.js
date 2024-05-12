const EleventyFetch = require("@11ty/eleventy-fetch");

const rootPath = "https://api.football-data.org/v4/competitions/EC";
const apiOptions = {
  duration: "1d",
  type: "json",
  fetchOptions: {
    headers: {
      'X-Auth-Token': `${process.env.API_KEY}`
    }
  }
};
  

module.exports = async function() {
  /* Get the teams
  ==========================================================================*/
  let getTeams = await EleventyFetch (`${rootPath}/teams`, {
    apiOptions
  });

  let teams = getTeams.teams.map(team => {
    return {
      name: team.name,
      crest: team.crest
    }
  });

  // Clone teams array and add a new property called 'family_member'
  let addFamilyMember = teams.map(team => {
    return {
      ...team,
      family_member: 
        team.name === 'Switzerland' || team.name === 'Scotland' ? 'Rob' :
        team.name === 'Hungary' || team.name === 'Italy' ? 'Anna' :
        team.name === 'Albania' || team.name === 'Slovenia' ? 'Grandad' :
        team.name === 'Croatia' || team.name === 'Austria' ? 'Erin' :
        team.name === 'Serbia' || team.name === 'Slovakia' ? 'Clare' :
        team.name === 'France' || team.name === 'England' ? 'Ben' :
        team.name === 'Romania' || team.name === 'Ukraine' ? 'Evie' :
        team.name === 'Turkey' || team.name === 'Georgia' ? 'Harry' :
        team.name === 'Germany' || team.name === 'Netherlands' ? 'Oscar' :
        team.name === 'Czech Republic' ? 'Lola' :
        team.name === 'Portugal' || team.name === 'Denmark' ? 'Freddie' :
        team.name === 'Belgium' ? 'Jack' :
        team.name === 'Poland' ? 'Steve' :
        team.name === 'Spain' ? 'Meg' :
        ''
    }
  });

  // Group teams by family member 
  let groupByFamilyMember = addFamilyMember.reduce((acc, team) => {
    if (!acc[team.family_member]) {
      acc[team.family_member] = [];
    }
    acc[team.family_member].push(team);
    return acc;
  }, {});

  // Loop through each family member and return the team names and crest
  let allocatedTeams = Object.keys(groupByFamilyMember).map(familyMember => {
    return {
      familyMember,
      teams: groupByFamilyMember[familyMember].map(team => {
        return {
          name: team.name,
          crest: team.crest
        }
      })
    }
  });


  
  /* Get the fixtures
  ==========================================================================*/
  let getFixtures = await EleventyFetch (`${rootPath}/matches`, {
    apiOptions
  });

  // Group fixtures by date and create an array of objects
  let fixtures = getFixtures.matches.reduce((acc, match) => {
    if (!acc[match.utcDate.slice(0, 10)]) {
      acc[match.utcDate.slice(0, 10)] = [];
    }
    acc[match.utcDate.slice(0, 10)].push({
      group: match.group ? match.group.replace(/_/g, ' ').replace('GROUP', 'Group') : '',
      homeTeam: match.homeTeam.name,
      awayTeam: match.awayTeam.name,
      homeCrest: match.homeTeam.crest,
      awayCrest: match.awayTeam.crest,
      date: match.utcDate.slice(0, 10),
      time: match.utcDate.slice(11, 16),
      status: match.status
    });
    return acc;
  }, {});

  console.log(fixtures);



  /* Get the standings
  ==========================================================================*/
  let getStandings = await EleventyFetch (`${rootPath}/standings`, {
    apiOptions
  });

  // Group the standing by groups
  let standings = getStandings.standings.map(standing => {
    return {
      group: standing.group,
      table: standing.table.map(team => {
        return {
          position: team.position,
          team: team.team.name,
          crest: team.team.crest,
          playedGames: team.playedGames,
          won: team.won,
          draw: team.draw,
          lost: team.lost,
          points: team.points,
          goalsFor: team.goalsFor,
          goalsAgainst: team.goalsAgainst,
          goalDifference: team.goalDifference,
          familyMember: addFamilyMember.find(familyMember => familyMember.name === team.team.name).family_member
        }
      })
    }
  });



  /* Get the top scorers
  ==========================================================================*/
  let getTopScorers = await EleventyFetch (`${rootPath}/scorers`, {
    apiOptions
  });


  let topScorers = getTopScorers;
  // console.log(getTopScorers);



  return {
    allocatedTeams,
    fixtures,
    standings,
    topScorers
  };
};