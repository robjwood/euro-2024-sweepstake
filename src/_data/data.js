const EleventyFetch = require("@11ty/eleventy-fetch");

const rootPath = "https://api.football-data.org/v4/competitions/EC";

module.exports = async function() {
  /* Get the teams
  ==========================================================================*/
  let getTeams = await EleventyFetch (`${rootPath}/teams`, {
    duration: "1d",
    type: "json",
    fetchOptions: {
      headers: {
        'X-Auth-Token': `${process.env.API_KEY}`
      }
    }
  });

  let teams = getTeams.teams.map(team => {
    return {
      name: team.name,
      crest: `/images/crests/${team.name.replace(/ /g, '-').toLowerCase()}.png`
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
    duration: "1d",
    type: "json",
    fetchOptions: {
      headers: {
        'X-Auth-Token': `${process.env.API_KEY}`
      }
    }
  });

  // Group fixtures by date 
  let fixtures = getFixtures.matches.reduce((acc, match) => {
    const time = new Date(match.utcDate).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
    const group = match.stage === 'GROUP_STAGE' ? match.group.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : match.stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
    
    const homeTeam = match.homeTeam.name === null ? 'TBC' : match.homeTeam.name;
    const awayTeam = match.awayTeam.name === null ? 'TBC' : match.awayTeam.name;
    
    const homeTeamScore = match.score.fullTime.homeTeam;
    const awayTeamScore = match.score.fullTime.awayTeam;

    const homeTeamCrest = match.homeTeam.crest;
    const awayTeamCrest = match.awayTeam.crest;

    function teamScore(team) {
      return match.score.fullTime[team] !== undefined ? `${match.score.fullTime[team]}` : '';
    }
    
    function dateString(date) {
      return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    }

    if (!acc[dateString(match.utcDate)]) {
      acc[dateString(match.utcDate)] = [];
    }

    acc[dateString(match.utcDate)].push({
      date: dateString(match.utcDate),
      group,
      homeTeam,
      awayTeam,
      homeTeamCrest,
      awayTeamCrest,
      time,
      scoreHomeTeam: teamScore(homeTeamScore),
      scoreAwayTeam: teamScore(awayTeamScore)
    });

    return acc;
  }, {});


  // let fixtures = getFixtures.matches.map(match => {
  //   const time = new Date(match.utcDate).toLocaleTimeString('en-GB', {
  //     hour: '2-digit',
  //     minute: '2-digit'
  //   });
    
  //   function dateString(date) {
  //     return new Date(date).toLocaleDateString('en-GB', {
  //       day: 'numeric',
  //       month: 'short',
  //       year: 'numeric'
  //     });
  //   }

  //   return {
  //     date: dateString(match.utcDate),
  //     // Get a grouped array of matches by dateString
  //     matches: getFixtures.matches.filter(fixture => dateString(fixture.utcDate) === dateString(match.utcDate)).map(fixture => {
  //       return {
  //         homeTeam: fixture.homeTeam.name,
  //         awayTeam: fixture.awayTeam.name,
  //         homeTeamCrest: fixture.homeTeam.crest,
  //         awayTeamCrest: fixture.awayTeam.crest,
  //         time: time,
  //         score: fixture.score.fullTime.homeTeam === null ? 'TBC' : `${fixture.score.fullTime.homeTeam} - ${fixture.score.fullTime.awayTeam}`
  //       }
  //     })
  //   }
  // });

  console.log(fixtures);



  /* Get the standings
  ==========================================================================*/
  let getStandings = await EleventyFetch (`${rootPath}/standings`, {
    duration: "1d",
    type: "json",
    fetchOptions: {
      headers: {
        'X-Auth-Token': `${process.env.API_KEY}`
      }
    }
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
    duration: "1d",
    type: "json",
    fetchOptions: {
      headers: {
        'X-Auth-Token': `${process.env.API_KEY}`
      }
    }
  });


  let topScorers = getTopScorers;


  return {
    allocatedTeams,
    fixtures,
    standings,
    topScorers
  };
};