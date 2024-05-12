---
title: Standings
---

{% for item in data.standings %}
  <p>{{ item.group }}</p>
  <table class="standings">
    <thead>
      <tr>
        <th>Team</th>
        <th>Pld</th>
        <th>GD</th>
        <th>Pts</th>
      </tr>
    </thead>
    <tbody>
      {% for team in item.table %}
      <tr class="standings__team" >
        <td><img src="{{ team.crest }}" width="20" /> {{ team.team }} <span>{{ team.familyMember }}</span></td>
        <td>{{ team.playedGames }}</td>
        <td>{{ team.goalDifference }}</td>
        <td>{{ team.points }}</td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
{% endfor %}
