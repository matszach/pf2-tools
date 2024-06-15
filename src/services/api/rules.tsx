import { FilterRule, Page } from "./api.model";

export function nameIncludes(phrase: string): FilterRule { 
  return ({ name }) => name.toLowerCase().includes(phrase.toLowerCase());
}

export function levelRange(min: number, max: number = min): FilterRule { 
  return ({ level }) => level >= min && level <= max;
}

export function page(size: number, offset: number): Page {
  return { size, offset };
}