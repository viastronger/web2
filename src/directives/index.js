import scrollBot from './scrollBot'


const directives = {
  scrollBot,
}

export default (app) => {
  Object.keys(directives).forEach(name => {
    app.directive(name, directives[name])
  })
}