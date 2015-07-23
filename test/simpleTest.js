describe('theAnswer()', function() {
  it('should be 42', function() {
   	theAnswer().should.be.exactly(42);
  });
});


function theAnswer() {
  return 42;
}