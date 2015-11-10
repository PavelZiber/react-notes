/* eslint-env node */
'use strict';
var baseUrl = 'http://localhost:9000/';
var PageObject = function() {
  this.getTitle = function() {
    return browser.driver.getTitle();
  };

  this.get = function() {
    return browser.driver.get(baseUrl);
  };

  this.getAddButton = function() {
    return $('#add-note');
  };

};


describe('Notes', function() {
  var page = new PageObject();
  page.get();

  it('Test the title of the page ', function() {
    expect(page.getTitle()).toEqual('Notes');
  });

});




