import { RandomSpellsOptionsParameters } from "../../model/data-query.model";
import { Spell } from "../../model/spell.model";
import { SpellApi } from "../api/spell.api";
import { filter, pick } from "../deprecated-query/spell.query";

export class RandomSpellService {

  constructor(
    private readonly spellApi: SpellApi
  ) { }

  public getRandomSpells({ spellRank, numberOfSpells }: RandomSpellsOptionsParameters): Promise<Spell[]> {
    return this.spellApi.fetchData()
      .then(filter(s => ['cantrip', 'focus', 'ritual'].every(trait => !s.traits.includes(trait))))
      .then(filter(s => s.level === spellRank))
      .then(pick(numberOfSpells))
  }
}