const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const app = express();
const viewsPath = path.join(__dirname, 'app', 'views');
const govukFrontendPath = path.join(__dirname, 'node_modules', 'govuk-frontend', 'dist');
const indexRouter = require('./app/routes/index');
const PORT = process.env.PORT || 3000;

// Serve GOV.UK Frontend static assets at /assets
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/dist/govuk')))

nunjucks.configure([viewsPath, govukFrontendPath], {
    express: app,
    noCache: true,
});

app.use('/', indexRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error.njk', { title: 'Page not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});