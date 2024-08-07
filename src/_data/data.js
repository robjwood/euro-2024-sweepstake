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
      crest: `/images/crests/${team.name.replace(/ /g, '-').toLowerCase()}.svg`
    }
  });

  // Clone teams array and add a new property called 'family_member'
  let addFamilyMember = teams.map(team => {
    return {
      ...team,
      family_member: 
        team.name === 'Ukraine' || team.name === 'Hungary' ? 'Rob' :
        team.name === 'Denmark' || team.name === 'Spain' ? 'Anna' :
        team.name === 'Poland' || team.name === 'England' ? 'Grandad' :
        team.name === 'Slovenia' ? 'Erin' :
        team.name === 'Slovakia' || team.name === 'Italy' ? 'Clare' :
        team.name === 'Portugal' || team.name === 'Austria' ? 'Ben' :
        team.name === 'Albania' || team.name === 'Romania' ? 'Evie' :
        team.name === 'Croatia' ? 'Harry' :
        team.name === 'Netherlands' || team.name === 'Serbia' ? 'Oscar' :
        team.name === 'Germany' || team.name === 'Belgium'? 'Lola' :
        team.name === 'Georgia' || team.name === 'Scotland' ? 'Freddie' :
        team.name === 'Switzerland' ? 'Jack' :
        team.name === 'France' || team.name === 'Turkey' ? 'Steve' :
        team.name === 'Czechia' ? 'Meg' :
        ''
    }
  });


  function assignFamilyMember(teamName) {
    const familyMemberEntry = addFamilyMember.find(familyMember => familyMember.name === teamName);
    return familyMemberEntry ? familyMemberEntry.family_member : 'Unknown';
  }


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
          crest: `/images/crests/${team.name.replace(/ /g, '-').toLowerCase()}.svg`
        }
      })
    };
  }).sort((a, b) => a.familyMember.localeCompare(b.familyMember));
  

  
  /* Matches
  ==========================================================================*/
  let getFixtures = await EleventyFetch (`${rootPath}/matches?status=SCHEDULED`, {
    duration: "0s",
    type: "json",
    fetchOptions: {
      headers: {
        'X-Auth-Token': `${process.env.API_KEY}`
      }
    }
  });

  // Group fixtures by date 
  let fixtures = getFixtures.matches.reduce((acc, match) => {
    // Create a date string and force it to show BST on the server
    const time = new Date(match.utcDate).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    });

    const group = match.stage === 'GROUP_STAGE' ? match.group.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : match.stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

    // Assign a family member to each team    
    const homeTeam = match.homeTeam.name === null ? 'TBC' : match.homeTeam.name;
    const awayTeam = match.awayTeam.name === null ? 'TBC' : match.awayTeam.name;
    
    // If the homeTeam is TBC, don't render the image, otherwise render the image
    const homeTeamCrest = match.homeTeam.name === null ? '' : `/images/crests/${homeTeam.replace(/ /g, '-').toLowerCase()}.svg`;

    const awayTeamCrest = `/images/crests/${awayTeam.replace(/ /g, '-').toLowerCase()}.svg`;
    
    function dateString(date) {
      const fixtureDate = new Date(date).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });

      return fixtureDate.replace(/, /g, " ");
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
      familyMemberHome: assignFamilyMember(match.homeTeam.name),
      familyMemberAway: assignFamilyMember(match.awayTeam.name),
      status: match.status
    });

    return acc;
  }, {});


  let getResults = await EleventyFetch (`${rootPath}/matches?status=FINISHED`, {
    duration: "0s",
    type: "json",
    fetchOptions: {
      headers: {
        'X-Auth-Token': `${process.env.API_KEY}`
      }
    }
  });

  // Group results by date
  let groupedResults = getResults.matches.reduce((acc, match) => {
    const group = match.stage === 'GROUP_STAGE' ? match.group.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : match.stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  
    // Assign a family member to each team
    const homeTeam = match.homeTeam.name === null ? 'TBC' : match.homeTeam.name;
    const awayTeam = match.awayTeam.name === null ? 'TBC' : match.awayTeam.name;
  
    const homeTeamScore = match.score.fullTime.home;
    const awayTeamScore = match.score.fullTime.away;
  
    const homeTeamCrest = `/images/crests/${homeTeam.replace(/ /g, '-').toLowerCase()}.svg`; 
    const awayTeamCrest = `/images/crests/${awayTeam.replace(/ /g, '-').toLowerCase()}.svg`;
  
    function dateString(date) {
      const fixtureDate = new Date(date).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
  
      return fixtureDate.replace(/, /g, " ");
    }
  
    if (!acc[dateString(match.utcDate)]) {
      acc[dateString(match.utcDate)] = [];
    }
    
    acc[dateString(match.utcDate)].push({
      group,
      homeTeam,
      awayTeam,
      homeTeamCrest,
      awayTeamCrest,
      scoreHomeTeam: homeTeamScore,
      scoreAwayTeam: awayTeamScore,
      familyMemberHome: assignFamilyMember(match.homeTeam.name),
      familyMemberAway: assignFamilyMember(match.awayTeam.name),
      status: match.status
    });
  
    return acc;
  }, {});
  
  let results = Object.keys(groupedResults).map(date => ({
    date,
    matches: groupedResults[date]
  }));
  
  // Sort results by reverse date order
  results.sort((a, b) => new Date(b.date) - new Date(a.date));

  /* Get the standings
  ==========================================================================*/
  let getStandings = await EleventyFetch (`${rootPath}/standings`, {
    duration: "0s",
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
          shortName: team.team.tla,
          crest: `/images/crests/${team.team.name.replace(/ /g, '-').toLowerCase()}.svg`,
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
  let getTopScorers = await EleventyFetch (`${rootPath}/scorers?limit=100`, {
    duration: "0s",
    type: "json",
    fetchOptions: {
      headers: {
        'X-Auth-Token': `${process.env.API_KEY}`
      }
    }
  });

  let topScorers = getTopScorers.scorers.map(scorer => {
    // If assists in null, return 0
    if (scorer.assists === null) {
      scorer.assists = 0;
    }

    

    return {
      player: scorer.player.lastName,  
      crest: `/images/crests/${scorer.team.name.replace(/ /g, '-').toLowerCase()}.svg`,
      team: scorer.team.name,
      goals: scorer.goals,
      assists: scorer.assists
    }
  });

  // Order the top scorers by goals, then assists, then name
  topScorers.sort((a, b) => {
    if (a.goals !== b.goals) {
      return b.goals - a.goals;
    } else if (a.assists !== b.assists) {
      return b.assists - a.assists;
    }
    return a.player.localeCompare(b.player);
  });


  
  
  return {
    allocatedTeams,
    fixtures,
    results,
    standings,
    topScorers,
  };
};