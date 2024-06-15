import React, { useEffect, useState } from 'react';
import './SpellsPage.scss';
import SpellsPreviewTable from './SpellsPreviewTable';
import { Spell } from '../../model/spell.model';
import provider from '../../services/provider';
import { SpellQueryBuilder } from '../../services/query/spell-query-builder';

function SpellsPage() {

  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    const query = new SpellQueryBuilder()
      .page(90, 0)
      .level(1, 3)
      .traits(
        ['fire', true],
        ['focus', false]
      )
      .sortBy('level')
      .build()
    provider.spellApi.query(query).then(setSpells)
  })

  return (
    <div className='SpellsPage'>
      {/* TODO query component */}
      {/* TODO sort rules from table */}
      <SpellsPreviewTable spells={spells}></SpellsPreviewTable>
      {/* TODO paginator */}
    </div>
  );
}

export default SpellsPage;