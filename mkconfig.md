# **To Do List Project**

**A Beginner React Tutorial**
**Based upon youtube.com/watch?v=Rh3tobg7hEo**
Open up the terminal to the project directory.

`$ npm create vite@latest`

Project name: react-vite-todo-list

Select a framework: React

Select a variant: JavaScript + SWC

(JavaScript + SWC is just a little faster.)

`$ npm i`

It says:

> Done. Now run:
>
> cd react-vite-todo-list
>
> npm install
>
> npm run dev



After executing "`npm run dev`", Node is a running process that is running Vite to serve your React web page.

## Added react hooks linter
`$ npm install eslint-plugin-react-hooks --save-dev`

## Added jest

`$ npm install jest --save-dev`

## Added cypress

````sh
$ npm install cypress --save-dev
$ npx cypress open
````

Using cypress for end-to-end testing.

In the package.json file add script "cypress:open" and change "dev" to specify the localhost by ip address.

```json
...
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run --spec \"cypress/e2e/chess/*.cy.js\"",
    "dev": "vite --host 127.0.0.1",
...
```

## Make it work for GitHub

`$ npm install gh-pages --save-dev`

In the package.json file add "predeploy" and "deploy". The final scripts will look like this:
```json
 "homepage": "https://<username>.github.io/<repo>/",
  ...
 "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run --spec \"cypress/e2e/chess/*.cy.js\"",
    "dev": "vite --host 127.0.0.1",
    "build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "lint": "eslint src --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "test": "jest"
  },
...
```
In the vite.config.js file add this line before plugins: [react()],
`base: "/YOUR_REPOSITORY_NAME",`

Change YOUR_REPOSITORY_NAME to the name of your GitHub repository.
`$ npm run deploy`
You now have a gh-pages branch in your repository and your app is deployed (you can check it under Settings -> Pages )

## Optional Domain Deployment
For a custom domain, change
in vite.config.js
`base: "/"`
and in package.json
`"homepage": "your-custom-domain",`