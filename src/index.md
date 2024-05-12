---
title: Euro 2024 sweepstake
description: Euro 2024 sweepstake
layout: page.njk
---

<div class="o-css-grid">
  {% for item in data.allocatedTeams %}
  <div class="family">
    <h2>{{ item.familyMember }}</h2>
    {% for team in item.teams %}
      <div class="team">
        <p>{{ team.name }}</p>
        <img src="{{ team.crest }}" alt="Flag of {{ team.name }}" width="32" />
      </div>
    {% endfor %}
  </div>
  {% endfor %}
</div>
