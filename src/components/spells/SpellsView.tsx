import React, { useEffect, useState } from 'react';
import './SpellsView.scss';
import SpellsPreviewTable from './SpellsPreviewTable';
import { Spell } from '../../model/spell.model';
import provider from '../../services/provider';
import AppPaginator from '../app-paginator/AppPaginator';
import { Page } from '../app-paginator/page';
import { SpellQueryBuilder } from '../../services/query/spell-query-builder';
import SpellsFilterPanel from './SpellsFilterPanel';
import { SpellQueryFilterParameters, SpellQuerySortParameters } from '../../services/query/data-query.model';

function SpellsView() {

  const [filterParams, setFilterParams] = useState<SpellQueryFilterParameters>({});
  const [sortParams, setSortParams] = useState<SpellQuerySortParameters>({});
  const [pageSize, _setPageSize] = useState<number>(15);
  const [page, setPage] = useState<Page>(new Page(pageSize, 1))
  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    const builder = new SpellQueryBuilder()
    const query = builder.fromParams({ filterParams, sortParams }).build()
    provider.spellApi.query(query).then(setSpells)
  }, [filterParams])

  useEffect(() => {
    setPage(new Page(pageSize, 1)) // works as a temp fix (need to still fix visual)
  }, [filterParams])

  // TODO fix the weird paginator behaviour
  return (
    <div className='SpellsView'>
      <SpellsFilterPanel onChange={setFilterParams}/>
      <AppPaginator size={pageSize} total={spells.length} onPageChange={setPage} />
      <SpellsPreviewTable spells={page.of(spells)}/>
    </div>
  );
}

export default SpellsView;