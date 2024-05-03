// Change data-js-enabled to true
document.body.dataset.jsEnabled = 'true';

// Get the form element by its ID.
const formEl = document.querySelector('#the-form');

// Turn off built-in form submit validation. 
formEl.setAttribute('novalidate', '');

// Handle form submit validation via JS instead.
formEl.addEventListener('submit', onSubmit);

