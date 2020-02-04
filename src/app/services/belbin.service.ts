import { Injectable } from '@angular/core';

export const IMPLEMENTER_DIVIDE_BY_SCORE = 12;
export const COORDINATOR_DIVIDE_BY_SCORE = 7;
export const SHAPER_DIVIDE_BY_SCORE = 10;
export const PLANT_DIVIDE_BY_SCORE = 8;
export const RESOURCE_INVESTIGATOR_DIVIDE_BY_SCORE = 8
export const MONITOR_EVALUATOR_DIVIDE_BY_SCORE = 8;
export const TEAM_WORKER_DIVIDE_BY_SCORE = 10;
export const COMPLETER_FINISHER_DIVIDE_BY_SCORE = 7;

export enum BelbinType {
  IMPLEMENTER = 'IMPLEMENTER',
  COORDINATOR = 'COORDINATOR',
  SHAPER = 'SHAPER',
  PLANT = 'PLANT',
  RESOURCE_INVESTIGATOR = 'RESOURCE_INVESTIGATOR',
  MONITOR_EVALUATOR = 'MONITOR_EVALUATOR',
  TEAM_WORKER = 'TEAM_WORKER',
  COMPLETER_FINISHER = 'COMPLETER_FINISHER'
}

export type BelbinResult = Record<BelbinType, number>;

const initialBelbin: BelbinResult = {
  [BelbinType.COMPLETER_FINISHER]: 1,
  [BelbinType.COORDINATOR]: 1,
  [BelbinType.IMPLEMENTER]: 1,
  [BelbinType.MONITOR_EVALUATOR]: 1,
  [BelbinType.PLANT]: 1,
  [BelbinType.RESOURCE_INVESTIGATOR]: 1,
  [BelbinType.SHAPER]: 1,
  [BelbinType.TEAM_WORKER]: 1
}

const belbinCalculations = {
  [BelbinType.COMPLETER_FINISHER]: (result: number) => result / COMPLETER_FINISHER_DIVIDE_BY_SCORE,
  [BelbinType.COORDINATOR]: (result: number) => result / COORDINATOR_DIVIDE_BY_SCORE,
  [BelbinType.IMPLEMENTER]: (result: number) => result / IMPLEMENTER_DIVIDE_BY_SCORE,
  [BelbinType.MONITOR_EVALUATOR]: (result: number) => result / MONITOR_EVALUATOR_DIVIDE_BY_SCORE,
  [BelbinType.PLANT]: (result: number) => result / PLANT_DIVIDE_BY_SCORE,
  [BelbinType.RESOURCE_INVESTIGATOR]: (result: number) => result / RESOURCE_INVESTIGATOR_DIVIDE_BY_SCORE,
  [BelbinType.SHAPER]: (result: number) => result / SHAPER_DIVIDE_BY_SCORE,
  [BelbinType.TEAM_WORKER]: (result: number) => result / TEAM_WORKER_DIVIDE_BY_SCORE
};

@Injectable({
  providedIn: 'root'
})
export class BelbinService {

  constructor() { }

  sum(results: BelbinResult[]): BelbinResult {
    return results.reduce((_, currentResult) => {
      const belbinKeys = Object.keys(BelbinType);
      return belbinKeys.reduce((accumulator, key) => {
        accumulator[key] = currentResult[key] + accumulator[key]
        return accumulator;
      }, initialBelbin as BelbinResult) });
    };
    
  calculate(result: BelbinResult) {
    const finalResult = { ...result };
    const types = Object.keys(finalResult);
    for (let type of types) {
      const score = finalResult[type];
      const calculationMethod = belbinCalculations[type];
      finalResult[type] = calculationMethod(score);
    }
    return finalResult;
  }
}
