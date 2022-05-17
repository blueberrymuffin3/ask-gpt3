![Ask GPT-3 logo](/static/img/ask-gpt-3.svg)
# Ask GPT-3

*This project was created for Shopify's [Front End Developer Intern Challenge](https://docs.google.com/document/d/1O7mCynsz_cBXkEaCFGSZAuvAOY84QVq35l20xJwjOYg/edit).*

The name "Ask GPT-3" is a parody of the 90's search engine "Ask Jeeves". I tried to make the user interface as simple as possible, starting with only a textbox and a button. The app sends you query to a [simple backend server](/src/routes/api/gpt3.ts), which forwards the request to OpenAi. It also keeps a history of your querys in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Features
- API key stored safely in a Cloudflare worker instance, not included in the app
- Saves a histroy of your requests in localStorage
- Reactive design optimized for mobile and desktop usage
- Acessable design created with sematic HTML
- Low code weight (*29 KiB total*)
- Fast loading (*100 on [pagespeed.web.dev](https://pagespeed.web.dev/report?url=https%3A%2F%2Fask-gpt3.pages.dev%2F)*)

## Screenshots
![Screenshots](https://user-images.githubusercontent.com/12852902/168701365-6e129521-e4a5-426d-b839-ab624a9f7959.png)

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/blueberrymuffin3/ask-gpt3)

