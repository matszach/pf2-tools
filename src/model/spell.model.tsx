import { Source } from "./source.model";

export interface Spell {
  name: string;
  key: string;
  level: number;
  description: string;
  cost: string;
  area: any; // todo
  defense: any; // todo
  source: Source;
  range: string;
  target: string;
  time: string;
  components: string;
  duration: any; // todo
  castingTime: string; // todo enum
  traditions: string[];
  traits: string[];
  rarity: string;
  requirements: string;
}
