---
title: Fixtures
---

{% for item in data.fixtures %}
  <p>{{ item }}</p>
  <p>{{ item.homeTeam }} vs {{ item.awayTeam }}</p>
{% endfor %}


{% for date, matches in data.fixtures %}
<section>
  <h2>{{ date }}</h2>
  <ul>
    {% for match in matches %}
      <li>
        <p>{{ match.group }}</p>
        <div>
          <img src="{{ match.homeCrest }}" alt="{{ match.homeTeam }} Crest" width="28"> {{ match.homeTeam }}  
        </div>
        <div>
          <img src="{{ match.awayCrest }}" alt="{{ match.awayTeam }} Crest" width="28"> {{ match.awayTeam }}
        </div>
        <p>{{ match.time }}</p>
      </li>
    {% endfor %}
  </ul>
</section>
{% endfor %}

