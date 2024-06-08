---
title: Top scorers
---

{% for item in data.topScorers.scorers %}
<section class="day-wrapper">
  <h2>{{ item.player.name }}</h2>
  <img src="{{ item.team.crest }}" alt="Flag of {{ item.team.name }}" width="32" />
  <p>{{ item.goals }}</p>
</section>
{% endfor %}