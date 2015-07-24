describe('/', function() {
  it('displays 42', function() {
    browser().navigateTo('index');  
    console.log(element('h3').text());
    /*element('body > div > div > main > div > div.demo-content.mdl-color--white.mdl-shadow--4dp.content.mdl-color-text--grey-800.mdl-cell.mdl-cell--8-col > h3:nth-child(2)').text()
    .should.be.exactly('Welcome to Express');*/
  });
});