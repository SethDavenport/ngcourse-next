'use strict';

var expect = require('chai').expect;
var R = require('ramda');
var APP_URL = 'http://localhost:8080/index.html';
var S = require('./selectors');

var timeout = 1000;

describe('login page tests', () => {
  // Before this set of tests, navigate to the main page and wait for the
  // HTML to be rendered by the browser.
  before(() => {
    return browser.url(APP_URL)
      .then(() => browser.waitForVisible('body', 5000))
      .then(() => browser.pause(timeout));
  });

  // After this set of tests, clean up the browser instance.
  after(() => {
    return browser.end();
  });

  it('has the correct window title', () => {
    return browser.getTitle()
      .then((title) => expect(title).to.eql('NgCourse-Next Demo Application'));
  });

  it('shows login controls', () => {
    return Promise.all([
        browser.isVisible(S.LOGIN_FORM.USERNAME_INPUT),
        browser.isVisible(S.LOGIN_FORM.PASSWORD_INPUT),
        browser.isVisible(S.LOGIN_FORM.LOGIN_BUTTON)
      ])
      .then(results => expect(R.all(R.equals(true), results)).to.be.true);
  });

  it('allows a user to login', () => {
    return browser.setValue(S.LOGIN_FORM.USERNAME_INPUT, 'alice')
      .then(() => browser.pause(timeout))
      .then(() => browser.setValue(S.LOGIN_FORM.PASSWORD_INPUT, 'x'))
      .then(() => browser.pause(timeout))
      .then(() => browser.click(S.LOGIN_FORM.LOGIN_BUTTON))
      .then(() => browser.pause(timeout))
      // If login was successful, we should see a logout
      // button.
      .then(() => browser.waitForVisible(S.HEADER.LOGOUT_LINK))
      .then(() => browser.pause(timeout))
      .then(() => browser.click(S.HEADER.LOGOUT_LINK))
      .then(() => browser.pause(timeout));
  });
});
