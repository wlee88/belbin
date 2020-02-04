import { TestBed } from '@angular/core/testing';

import { BelbinService, BelbinType, BelbinResult, TEAM_WORKER_DIVIDE_BY_SCORE, SHAPER_DIVIDE_BY_SCORE, RESOURCE_INVESTIGATOR_DIVIDE_BY_SCORE, PLANT_DIVIDE_BY_SCORE, MONITOR_EVALUATOR_DIVIDE_BY_SCORE, IMPLEMENTER_DIVIDE_BY_SCORE, COORDINATOR_DIVIDE_BY_SCORE, COMPLETER_FINISHER_DIVIDE_BY_SCORE } from './belbin.service';

describe('BelbinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));
  beforeAll(()=> {
    sut = TestBed.get(BelbinService);
  });
  let sut: BelbinService

  const belbinResult: BelbinResult = {
    [BelbinType.COMPLETER_FINISHER]: 1,
    [BelbinType.COORDINATOR]: 1,
    [BelbinType.IMPLEMENTER]: 1,
    [BelbinType.MONITOR_EVALUATOR]: 1,
    [BelbinType.PLANT]: 1,
    [BelbinType.RESOURCE_INVESTIGATOR]: 1,
    [BelbinType.SHAPER]: 1,
    [BelbinType.TEAM_WORKER]: 1
  }

  const belbinResults: BelbinResult[] = [
    belbinResult, belbinResult
  ]

  describe('sum:', () => {
    it('should sum up the correct values', () => {
      const expected = {
        [BelbinType.COMPLETER_FINISHER]: 2,
        [BelbinType.COORDINATOR]: 2,
        [BelbinType.IMPLEMENTER]: 2,
        [BelbinType.MONITOR_EVALUATOR]: 2,
        [BelbinType.PLANT]: 2,
        [BelbinType.RESOURCE_INVESTIGATOR]: 2,
        [BelbinType.SHAPER]: 2,
        [BelbinType.TEAM_WORKER]: 2
      };
      const actual = sut.sum(belbinResults);
      expect(actual).toEqual(expected);
    });
  });

  describe('calculate:', () => {
    const weightedBelbinResult: BelbinResult = {
      [BelbinType.COMPLETER_FINISHER]: COMPLETER_FINISHER_DIVIDE_BY_SCORE,
      [BelbinType.COORDINATOR]: COORDINATOR_DIVIDE_BY_SCORE,
      [BelbinType.IMPLEMENTER]: IMPLEMENTER_DIVIDE_BY_SCORE,
      [BelbinType.MONITOR_EVALUATOR]: MONITOR_EVALUATOR_DIVIDE_BY_SCORE,
      [BelbinType.PLANT]: PLANT_DIVIDE_BY_SCORE,
      [BelbinType.RESOURCE_INVESTIGATOR]: RESOURCE_INVESTIGATOR_DIVIDE_BY_SCORE,
      [BelbinType.SHAPER]: SHAPER_DIVIDE_BY_SCORE,
      [BelbinType.TEAM_WORKER]: TEAM_WORKER_DIVIDE_BY_SCORE
    }

    const testCases = [
      {type: BelbinType.COMPLETER_FINISHER, expectedScore: 1},
      {type: BelbinType.COORDINATOR, expectedScore: 1},
      {type: BelbinType.IMPLEMENTER, expectedScore: 1},
      {type: BelbinType.MONITOR_EVALUATOR, expectedScore: 1},
      {type: BelbinType.PLANT, expectedScore: 1},
      {type: BelbinType.RESOURCE_INVESTIGATOR, expectedScore: 1},
      {type: BelbinType.SHAPER, expectedScore: 1},
      {type: BelbinType.TEAM_WORKER, expectedScore: 1}
    ];
    
    testCases.forEach(test => {
      it(`should calculate ${test.type} to be ${test.expectedScore}`, () => {
        expect(sut.calculate(weightedBelbinResult).COMPLETER_FINISHER).toEqual(test.expectedScore);
      });
    });
  });
});
