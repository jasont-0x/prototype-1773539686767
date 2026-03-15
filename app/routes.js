const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/time-period', function (req, res) {
  res.render('time-period')
})

router.post('/time-period', function (req, res) {
  const answer = req.session.data['time-period']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'time-period': 'Select which century you are from.' }
    return res.render('time-period')
  }
  res.redirect('/previous-visit')
})

router.get('/previous-visit', function (req, res) {
  res.render('previous-visit')
})

router.post('/previous-visit', function (req, res) {
  const answer = req.session.data['previous-visit']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'previous-visit': 'Select yes if this is your first visit to the present day.' }
    return res.render('previous-visit')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-previous-visit')
  }
  res.redirect('/social-situation')
})

router.get('/ineligible-previous-visit', function (req, res) {
  res.render('ineligible-previous-visit')
})

router.get('/social-situation', function (req, res) {
  res.render('social-situation')
})

router.post('/social-situation', function (req, res) {
  const answer = req.session.data['social-situation']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'social-situation': 'Select which social situation you need help with.' }
    return res.render('social-situation')
  }
  res.redirect('/contact-method')
})

router.get('/contact-method', function (req, res) {
  res.render('contact-method')
})

router.post('/contact-method', function (req, res) {
  const answer = req.session.data['contact-method']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'contact-method': 'Select how you want to receive your guide.' }
    return res.render('contact-method')
  }
  res.redirect('/full-name')
})

router.get('/full-name', function (req, res) {
  res.render('full-name')
})

router.post('/full-name', function (req, res) {
  const answer = req.session.data['full-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'full-name': 'Enter your full name.' }
    return res.render('full-name')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('PDE')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
