---
title: Elements
---
<style>section {border-bottom: 1px solid lightgray; padding-bottom: 40px;}</style>
<!-- HTML5 Kitchen based on a previous effort by @dbox -->
{% from "macros/Buttons/Buttons.njk" import button %}

<!-- HTML5 Kitchen based on a previous effort by @dbox -->
<section class="flow">
  <h1>Heading 1</h1>
  <p>This is paragraph text. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <h2>Heading 2</h2>
  <p>This is paragraph text. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <h3>Heading 3</h3>
  <p>This is paragraph text. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <h4>Heading 4</h4>
  <p>This is paragraph text. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <h5>Heading 5</h5>
  <p>This is paragraph text. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  <h6>Heading 6</h5>
</section>

<section class="flow">
  <article>
    <p>This paragraph is nested inside an article. It contains many different, sometimes useful, <a href="https://www.w3schools.com/tags/">HTML5 tags</a>. Of course there are classics like <em>emphasis</em>, <strong>strong</strong>, and <small>small</small> but there are many others as well. Hover the following text for abbreviation tag: <abbr title="abbreviation">abbr</abbr>. Similarly, you can use acronym tag like this: <acronym title="For The Win">ftw</acronym>.</p>
    <p>You can also use <code>&lt;code&gt;</code> tags. Not to be mistaken with blockquotes below, the quote tag lets you denote something as <q>quoted text</q>. Lastly don't forget the sub (H<sub>2</sub>O) and sup (E = MC<sup>2</sup>) tags.</p>
  </article>
  <aside>This is an aside.</aside>
  <footer>This is footer for this section</footer>
</section>


<section class="flow">
  <h2>Links and buttons</h2>
  <p>We all need <a href="https://developer.mozilla.org/en-US/">to have links</a>. It's also great to have buttons like the one below</p>

  {{
    button({
      text: 'Button',
      type: 'button'
    })
  }}
</section>

<section class="flow">
  <h2>Lists</h2>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>

  <ol>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ol>

  <ul>
    <li>Unordered List item one
      <ul>
        <li>Nested list item
          <ul>
            <li>Level 3, item one</li>
            <li>Level 3, item two</li>
            <li>Level 3, item three</li>
            <li>Level 3, item four</li>
          </ul>
        </li>
        <li>List item two</li>
        <li>List item three</li>
        <li>List item four</li>
      </ul>
    </li>
    <li>List item two</li>
    <li>List item three</li>
    <li>List item four</li>
  </ul>
</section>

<section class="flow">
  <h2>Blockquotes</h2>
  <blockquote>
    <p>Blockquote: I quickly explained that many big jobs involve few hazards</p>
  </blockquote>
  <blockquote>
    <p>This is a multi-line blockquote with a cite reference. People think focus means saying yes to the thing you've got to focus on. But that's not what it means at all. It means saying no to the hundred other good ideas that there are. You have to pick carefully. I'm actually as proud of the things we haven't done as the things I have done. Innovation is saying no to 1,000 things.
    <cite>Steve Jobs - Apple Worldwide Developers' Conference, 1997</cite>
    </p>
  </blockquote>
</section>

<section>
  <h2>Tables</h2>
  <table>
    <caption>Tables can have captions now.</caption>
    <tbody>
      <tr>
        <th>Person</th>
        <th>Number</th>
        <th>Third Column</th>
      </tr>
      <tr>
        <td>Someone Lastname</td>
        <td>900</td>
        <td>Nullam quis risus eget urna mollis ornare vel eu leo.</td>
      </tr>
      <tr>
        <td><a href="#">Person Name</a></td>
        <td>1200</td>
        <td>Vestibulum id ligula porta felis euismod semper. Donec ullamcorper nulla non metus auctor fringilla.</td>
      </tr>
      <tr>
        <td>Another Person</td>
        <td>1500</td>
        <td>Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nullam id dolor id nibh ultricies vehicula ut id elit.</td>
      </tr>
      <tr>
        <td>Last One</td>
        <td>2800</td>
        <td>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</td>
      </tr>
    </tbody>
  </table>
</section>

<section>
  <h2>Code</h2>
  <pre>
pre {
  display: block;
  padding: 7px;
  background-color: #F5F5F5;
  border: 1px solid #E1E1E8;
  border-radius: 3px;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: Menlo, Monaco;
  line-height: 160%;
}
</pre>
</section>

<section class="flow">
  <h2>Images</h2>
  <figure>
    <img src="https://picsum.photos/id/58/400/300">
    <figcaption>Fig1. A picture from <a href="https://picsum.photos/">Lorem Picsum</a></figcaption>
  </figure>
</section>

<section class="flow">
  <h2>Forms</h2>
  <form class="flow">
    <p>
      <label for="example-input-email">Email address</label>
      <input type="email" id="example-input-email" placeholder="Enter email">
    </p>
    <p>
      <label for="example-input-number">Number</label>
      <input type="number" id="example-input-number" placeholder="Number">
    </p>
    <p>
      <label for="example-input-password">Password</label>
      <input type="password" id="example-input-password" placeholder="Password">
    </p>
    <p>
      <label for="example-input-search">Search</label>
      <input type="search" id="example-input-search" placeholder="Search">
    </p>
    <p>
      <label for="example-input-tel">Telephone number</label>
      <input type="tel" id="example-input-tel" placeholder="Telephone number">
    </p>
    <p>
      <label for="example-input-text">Text</label>
      <input type="text" id="example-input-text" placeholder="Enter some text here">
    </p>
    <p>
      <label for="example-input-date">Date</label>
      <input type="date" id="example-input-date" placeholder="date">
    </p>
    <p>
      <label for="example-select1">Example select</label>
      <select id="example-select1">
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
        <option>Four</option>
        <option>Five</option>
      </select>
    </p>
    <p>
      <label for="example-select2">Example multiple select</label>
      <select multiple id="example-select2">
        <option>One</option>
        <option>Two</option>
        <option>Three</option>
        <option>Four</option>
        <option>Five</option>
      </select>
    </p>
    <p>
      <label for="example-textarea">Example textarea</label>
      <textarea id="example-textarea" rows="3"></textarea>
    </p>
    <p>
      <label for="example-input-file">File input</label>
      <input type="file" id="example-input-file">
    </p>
    <fieldset>
      <legend>I am legend</legend>
      <div>
        <label>
          <input type="radio" name="options-radios" id="optionsR-radios1" value="option1" checked>Option one is this and that&mdash;be sure to include why it's great
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="options-radios" id="options-radios2" value="option2">Option two can be something else and selecting it will deselect option one
        </label>
      </div>
      <div>
        <label>
          <input type="radio" name="optionsRadios" id="options-radios3" value="option3" disabled>Option three is disabled
        </label>
      </div>
    </fieldset>
    <fieldset>
      <legend>I am also legend</legend>
      <label><input type="checkbox">Check me out</label>
      <label><input type="checkbox">Or check me out</label>
    </fieldset>
  </form>
</section>