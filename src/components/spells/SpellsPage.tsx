import React, { useEffect, useState } from 'react';
import './SpellsPage.scss';
import SpellsPreviewTable from './SpellsPreviewTable';
import { Spell } from '../../model/spell.model';
import provider from '../../services/provider';

function SpellsPage() {

  const [filterRules, setFilterRules] = useState([]);
  const [sortRules, setSortRules] = useState([]);
  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    provider.spellApi.fetchData().then(setSpells)
  })

  return (
    <div className='SpellsPage'>
      <h1>Spells</h1>
      <SpellsPreviewTable spells={spells}></SpellsPreviewTable>
    </div>
  );
}

export default SpellsPage;