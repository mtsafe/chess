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

## Make it work for GitHub
`$ npm install gh-pages --save-dev`

In the package.json file add "predeploy" and "deploy".
```
 "homepage": "https://<username>.github.io/<repo>/",
  ...
  "scripts": {
...
"build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
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