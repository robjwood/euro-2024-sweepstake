---
title: Components
tags: nav
---

<style>
  section {
    border-bottom: 1px solid var(--grey-200);
    padding-bottom: 56px;
    margin-bottom: 56px;
  }

  .c-colour {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(var(--spacing-xl), 1fr));
    gap: var(--spacing-l);
  }

    .c-colour__swatch {
      border-radius: var(--border-radius-xs);
      width: 100%;
      height: var(--spacing-xl);
    }
    
    .c-colour__description {
      color: var(--grey-900);
      font-size: var(--font-size-xs);
      font-weight: bold;
      text-align: center;
      margin: 0;
    }
  .c-card-wrap {
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(18rem,1fr));
    gap: var(--spacing-l);
  }
</style>

Maybe a slightly misleading title because these are technically Nunjucks macros.
<section class="flow">
  <h2>Colours</h2>
  <div class="c-colour">
    <div>
      <div class="c-colour__swatch" style="background-color: var(--white);">
      </div>
      <p class="c-colour__description">white</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-100);">
      </div>
      <p class="c-colour__description">grey-100</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-200);">
      </div>
      <p class="c-colour__description">grey-200</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-300);">
      </div>
      <p class="c-colour__description">grey-300</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-400);">
      </div>
      <p class="c-colour__description">grey-400</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-500);">
      </div>
      <p class="c-colour__description">grey-500</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-600);">
      </div>
      <p class="c-colour__description">grey-600</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-700);">
      </div>
      <p class="c-colour__description">grey-700</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-800);">
      </div>
      <p class="c-colour__description">grey-800</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--grey-900);">
      </div>
      <p class="c-colour__description">grey-900</p>
    </div>
    <div>
      <div class="c-colour__swatch" style="background-color: var(--black);">
      </div>
      <p class="c-colour__description">black</p>
    </div>
</section>

<section class="flow">
<h2>Buttons</h2>

{% from "macros/Buttons/Buttons.njk" import button %}

{{
  button({
    text: 'Button',
    type: 'button'
  })
}}

{{
  button({
    text: 'Submit button',
    type: 'submit'
  })
}}

{{
  button({
    text: 'Reset button',
    type: 'reset'
  })
}}

{{
  button({
    href: '#',
    text: 'Link button',
    type: 'button'
  })
}}



<!--
{{ button({
  text: "Secondary",
  purpose: "secondary"
}) }}

{{ button({
  text: "Tertiary",
  purpose: "tertiary"
}) }}
-->






<!--
## Small `<button>` element

{{ button({
  text: "Primary",
  purpose: "primary",
  size: 'small'
}) }}

{{ button({
  text: "Secondary",
  purpose: "secondary",
  size: 'small'
}) }}

{{ button({
  text: "Tertiary",
  purpose: "tertiary",
  size: 'small'
}) }}
-->
<!--
## The `<a>` element

{{ button({
  text: "Primary",
  purpose: "primary",
  href: "#"
}) }}

{{ button({
  text: "Secondary",
  purpose: "secondary",
  href: "#"
}) }}

{{ button({
  text: "Tertiary",
  purpose: "tertiary",
  href: "#"
}) }}

## `<input>` element

{{ button({
  text: "Primary",
  purpose: "primary",
  href: "#"
}) }}

{{ button({
  text: "Secondary",
  purpose: "secondary",
  href: "#"
}) }}

{{ button({
  text: "Tertiary",
  purpose: "tertiary",
  href: "#"
}) }}
-->

</section>

<section class="flow">
  <h2>Cards</h2>
  {% from "macros/Cards/Card.njk" import card %}

  <div class="c-card-wrap">  
  {{ card({
    URL: "https://bbc.co.uk",
    title: "This is a title",
    copy: "Here are a few more words to read"
  }) }}

  {{ card({
    URL: "https://bbc.co.uk",
    img: "/img/47.jpg",
    title: "This is a title",
    copy: "Here are a few words to read"
  }) }}

  {{ card({
    layout: "text-top",
    URL: "https://bbc.co.uk",
    img: "/img/51.jpg",
    title: "This is a title",
    copy: "Here are a few more words to read"
  }) }}
  </div>
</section>