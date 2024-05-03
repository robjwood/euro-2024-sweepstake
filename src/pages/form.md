---
title: Form
---

Here is an example form with some basic validation.

<form id="the-form" action="" method="post">
  <label for="name">
    Name <span aria-hidden="true">(required)</span>
  </label>
  <input
    type="text"
    id="name"
    name="name"
    required
  />

  <label for="name">
    Telephone <span aria-hidden="true">(required)</span>
  </label>
  <input
    type="number"
    id="number"
    number="name"
    required
  />

  <label for="number">Your Telephone Number</label>
  <input type="number" id="number" name="number">

  <label for="email">Your Email</label>
  <input type="email" id="email" name="email">

  <label for="message">Your Message</label>
  <textarea id="message" name="message"></textarea>

  <button type="submit">Submit</button>
</form>  

