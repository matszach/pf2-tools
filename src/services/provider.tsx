import { SpellApi } from "./api/spell.api";
import { RandomSpellService } from "./random/random-spell.service";

const spellApi = new SpellApi()
const randomSpellService = new RandomSpellService(spellApi)

const provider = {
  spellApi, 
  randomSpellService
}

export default provider