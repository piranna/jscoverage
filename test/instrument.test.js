var testMod = require('../lib/instrument.js');
var expect = require('expect.js');

describe('reporter/util.js', function () {
  var ist = new testMod();
  describe('util.getType(covlevel, coverage)', function () {
    it('should ok when ||', function () {
      ist.process('test', 'if (a > c || a > b){ }');
      expect(ist.code).to.eql('if (_$jscmd("test", "cond", "1_4_14", _$jscmd("test", "cond", "1_4_5", a > c) || _$jscmd("test", "cond", "1_13_5", a > b))) {}');
    });

    it('should ok when &&', function () {
      ist.process('test', 'if (a > c && a > b){ }');
      expect(ist.code).to.eql('if (_$jscmd("test", "cond", "1_4_14", _$jscmd("test", "cond", "1_4_5", a > c) && _$jscmd("test", "cond", "1_13_5", a > b))) {}');
    });

    it('should ok when instanceof', function () {
      ist.process('test', 'if (a instanceof b){}');
      expect(ist.code).to.eql('if (_$jscmd("test", "cond", "1_4_14", a instanceof b)) {}');
    });

    it('should ok when ? :', function () {
      ist.process('test', 'var a = b ? c : d;');
      expect(ist.code).to.eql('_$jscmd("test", "line", 1);\n\nvar a = b ? _$jscmd("test", "cond", "1_12_1", c) : _$jscmd("test", "cond", "1_16_1", d);');
    });
  });
});