describe('/', function() {
  it('displays 42', function() {
    browser().navigateTo('/');  
    expect(element('body > div > div > main > div > '+
    	'div.demo-content.mdl-color--white.mdl-shadow--4dp.content.mdl-color-text--grey-800.mdl-cell.mdl-cell--8-col > '+
    	'h3:nth-child(2)').text())
    	.toBe('Welcome to Express');
  });
});