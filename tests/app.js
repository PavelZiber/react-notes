/* eslint-env node */
'use strict';
var PageObject = function() {
  this.getTitle = function() {
    return browser.driver.getTitle();
  };
  this.get = function() {
    browser.driver.get('http://localhost:9000/');
  };
};

describe('Notes', function() {
  it('Test the title of the page ', function() {
    var page = new PageObject();
    page.get();
    expect(page.getTitle()).toEqual('Notes');
  });
});




