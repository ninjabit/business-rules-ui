describe('BusinessRules.RuleEngine', function() {
  var engine;

  beforeEach(function() {
    engine = new BusinessRules.RuleEngine();
  });

  describe('initialization', function() {
    context("with no arguments", function() {
      it('sets rule to null', function() {
        expect(engine.rule).toBeUndefined();
      });
    });

    context("with a single rule", function() {
      var rule;
      beforeEach(function() {
        rule = {conditions: {}, actions: []};
        engine = new BusinessRules.RuleEngine(rule);
      });

      it('adds the given rule', function() {
        expect(engine.rule).toEqual(rule);
      });
    });
  });

  describe('standard operators', function() {
    describe('present', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "name", operator: "present", value: null}]}
        };
      });

      it('matches a truthy value', function() {
        expect(engine.matches({name: "Chris"})).toBeTruthy();
      });

      it('does not match a falsy value', function() {
        expect(engine.matches({name: ""})).toBeFalsy();
      });
    });

    describe('blank', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "name", operator: "blank", value: null}]}
        };
      });

      it('matches a falsy value', function() {
        expect(engine.matches({name: ""})).toBeTruthy();
      });

      it('does not match a truthy value', function() {
        expect(engine.matches({name: "Chris"})).toBeFalsy();
      });
    });

    describe('equalTo', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "num", operator: "equalTo", value: "123"}]}
        };
      });

      it('returns true with matching string', function() {
        expect(engine.matches({num: "123"})).toBeTruthy();
      });

      it('returns true with matching integer', function() {
        expect(engine.matches({num: 123})).toBeTruthy();
      });

      it('returns false otherwise', function() {
        expect(engine.matches({num: "124"})).toBeFalsy();
      });
    });

    describe('notEqualTo', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "num", operator: "notEqualTo", value: "123"}]}
        };
      });

      it('returns false with matching string', function() {
        expect(engine.matches({num: "123"})).toBeFalsy();
      });

      it('returns false with matching integer', function() {
        expect(engine.matches({num: 123})).toBeFalsy();
      });

      it('returns true otherwise', function() {
        expect(engine.matches({num: "124"})).toBeTruthy();
      });
    });

    describe('greaterThan', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "num", operator: "greaterThan", value: "123"}]}
        };
      });

      it('returns false when greater than value', function() {
        expect(engine.matches({num: 124})).toBeTruthy();
        expect(engine.matches({num: "124"})).toBeTruthy();
        expect(engine.matches({num: "123.5"})).toBeTruthy();
      });

      it('returns false when equal value', function() {
        expect(engine.matches({num: 123})).toBeFalsy();
        expect(engine.matches({num: "123"})).toBeFalsy();
        expect(engine.matches({num: "123.000"})).toBeFalsy();
      });

      it('returns false when less than value', function() {
        expect(engine.matches({num: 122})).toBeFalsy();
        expect(engine.matches({num: "122"})).toBeFalsy();
        expect(engine.matches({num: "122.5"})).toBeFalsy();
      });
    });

    describe('greaterThanEqual', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "num", operator: "greaterThanEqual", value: "123"}]}
        };
      });

      it('returns false when greater than value', function() {
        expect(engine.matches({num: 124})).toBeTruthy();
        expect(engine.matches({num: "124"})).toBeTruthy();
        expect(engine.matches({num: "123.5"})).toBeTruthy();
      });

      it('returns true when equal value', function() {
        expect(engine.matches({num: 123})).toBeTruthy();
        expect(engine.matches({num: "123"})).toBeTruthy();
        expect(engine.matches({num: "123.000"})).toBeTruthy();
      });

      it('returns false when less than value', function() {
        expect(engine.matches({num: 122})).toBeFalsy();
        expect(engine.matches({num: "122"})).toBeFalsy();
        expect(engine.matches({num: "122.5"})).toBeFalsy();
      });
    });

    describe('lessThan', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "num", operator: "lessThan", value: "123"}]}
        };
      });

      it('returns false when greater than value', function() {
        expect(engine.matches({num: 124})).toBeFalsy();
        expect(engine.matches({num: "124"})).toBeFalsy();
        expect(engine.matches({num: "123.5"})).toBeFalsy();
      });

      it('returns false when equal value', function() {
        expect(engine.matches({num: 123})).toBeFalsy();
        expect(engine.matches({num: "123"})).toBeFalsy();
        expect(engine.matches({num: "123.000"})).toBeFalsy();
      });

      it('returns true when less than value', function() {
        expect(engine.matches({num: 122})).toBeTruthy();
        expect(engine.matches({num: "122"})).toBeTruthy();
        expect(engine.matches({num: "122.5"})).toBeTruthy();
      });
    });

    describe('lessThanEqual', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "num", operator: "lessThanEqual", value: "123"}]}
        };
      });

      it('returns false when greater than value', function() {
        expect(engine.matches({num: 124})).toBeFalsy();
        expect(engine.matches({num: "124"})).toBeFalsy();
        expect(engine.matches({num: "123.5"})).toBeFalsy();
      });

      it('returns true when equal value', function() {
        expect(engine.matches({num: 123})).toBeTruthy();
        expect(engine.matches({num: "123"})).toBeTruthy();
        expect(engine.matches({num: "123.000"})).toBeTruthy();
      });

      it('returns true when less than value', function() {
        expect(engine.matches({num: 122})).toBeTruthy();
        expect(engine.matches({num: "122"})).toBeTruthy();
        expect(engine.matches({num: "122.5"})).toBeTruthy();
      });
    });

    describe('includes', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{field: "name", operator: "includes", value: "Joe"}]}
        };
      });

      it('returns true when value is included', function() {
        expect(engine.matches({name: "Joe Smith"})).toBeTruthy();
      });

      it('returns false when value is not included', function() {
        expect(engine.matches({name: "Giuseppe"})).toBeFalsy();
      });
    });

    describe('matchesRegex', function() {
      beforeEach(function() {
        engine.rule = {
          conditions: {all: [{
            field: "num", 
            operator: "matchesRegex", 
            value: "/\\(\\d{3}\\) \\d{3}-\\d{4}/"
          }]}
        };
      });

      it('returns true when value matches Regex', function() {
        expect(engine.matches({num: "(123) 456-7890"})).toBeTruthy();
      });

      it('returns false when value does not match Regex', function() {
        expect(engine.matches({num: "123.456.7890"})).toBeFalsy();
      });
    });
  });

  describe('custom operators', function() {
    beforeEach(function() {
      engine.rule = {
        conditions: {all: [{field: "name", operator: "longerThan", value: "5"}]}
      };
      engine.addOperators({
        longerThan: function(actual, length) {
          return actual.length > parseInt(length, 10);
        }
      });
    });

    it('uses custom logic from added operators', function() {
      expect(engine.matches({name: "Joe"})).toBeFalsy();
      expect(engine.matches({name: "Giuseppe"})).toBeTruthy();
    });
  });

  describe('complex logic', function() {
    beforeEach(function() {
      engine.rule = {
        conditions: {all: [
          {field: "name", operator: "present", value: null},
          {any: [
            {field: "age", operator: "greaterThanEqual", value: "18"},
            {field: "permissionSlipSigned", operator: "present", value: null}
          ]}
        ]}
      };
    });

    it('matches nested all/any conditions', function() {
      expect(engine.matches({name: "Joe", age: 22})).toBeTruthy();
      expect(engine.matches({name: "Joe", age: 17, permissionSlipSigned: true})).toBeTruthy();
      expect(engine.matches({name: "Joe", age: 17, permissionSlipSigned: false})).toBeFalsy();
      expect(engine.matches({name: "Joe", age: 17})).toBeFalsy();
      expect(engine.matches({name: "", age: 22})).toBeFalsy();
    });
  });
});
