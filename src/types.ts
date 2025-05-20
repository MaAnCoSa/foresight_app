export type AbilityScores = {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
  };
  
  export type Player = {
    id: number;
    level: number;
    class: string;
    hp: number;
    ac: number;
  } & AbilityScores;
  
  export type Monster = {
    id: number;
    name: string;
    cr: number;
    hp: number;
    ac: number;
  } & AbilityScores;
  
  export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard' | 'Deadly' | null;