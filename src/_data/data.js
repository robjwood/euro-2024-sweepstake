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
        team.name === 'Switzerland' || team.name === 'Scotland' ? 'Rob' :
        team.name === 'Hungary' || team.name === 'Italy' ? 'Anna' :
        team.name === 'Albania' || team.name === 'Slovenia' ? 'Grandad' :
        team.name === 'Croatia' || team.name === 'Austria' ? 'Erin' :
        team.name === 'Serbia' || team.name === 'Slovakia' ? 'Clare' :
        team.name === 'France' || team.name === 'England' ? 'Ben' :
        team.name === 'Romania' || team.name === 'Ukraine' ? 'Evie' :
        team.name === 'Turkey' ? 'Harry' :
        team.name === 'Germany' || team.name === 'Netherlands' ? 'Oscar' :
        team.name === 'Czechia' || team.name === 'Georgia'? 'Lola' :
        team.name === 'Portugal' || team.name === 'Denmark' ? 'Freddie' :
        team.name === 'Belgium' ? 'Jack' :
        team.name === 'Poland' ? 'Steve' :
        team.name === 'Spain' ? 'Meg' :
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
    // Create a date string and force it to show BST on the server
    const time = new Date(match.utcDate).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/London'
    });

    const group = match.stage === 'GROUP_STAGE' ? match.group.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()) : match.stage.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());

    // Assign a fmaily member to each team    
    const homeTeam = match.homeTeam.name === null ? 'TBC' : match.homeTeam.name;
    const awayTeam = match.awayTeam.name === null ? 'TBC' : match.awayTeam.name;
    
    const homeTeamScore = match.score.fullTime.homeTeam;
    const awayTeamScore = match.score.fullTime.awayTeam;

    // Get the teamCrest
    // const homeTeamCrest = match.homeTeam.crest; 
    // const awayTeamCrest = match.awayTeam.crest;

    console.log(`/images/crests/${homeTeam.replace(/ /g, '-').toLowerCase()}.svg`);
    const homeTeamCrest = `/images/crests/${homeTeam.replace(/ /g, '-').toLowerCase()}.svg`; 
    const awayTeamCrest = `/images/crests/${awayTeam.replace(/ /g, '-').toLowerCase()}.svg`;

    function teamScore(team) {
      return match.score.fullTime[team] !== undefined ? `${match.score.fullTime[team]}` : '';
    }
    
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
      scoreHomeTeam: teamScore(homeTeamScore),
      scoreAwayTeam: teamScore(awayTeamScore),
      familyMemberHome: assignFamilyMember(match.homeTeam.name),
      familyMemberAway: assignFamilyMember(match.awayTeam.name)
    });

    return acc;
  }, {});


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
    topScorers,
  };
};