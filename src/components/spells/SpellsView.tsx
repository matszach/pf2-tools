import React, { useEffect, useState } from 'react';
import './SpellsView.scss';
import SpellsPreviewTable from './SpellsPreviewTable';
import { Spell } from '../../model/spell.model';
import provider from '../../services/provider';
import AppPaginator from '../app-paginator/AppPaginator';
import { Page } from '../app-paginator/page';
import SpellsFilterPanel from './SpellsFilterPanel';
import { SpellQueryFilterParameters, SpellQuerySortParameters } from '../../services/query/data-query.model';
import { spellQuery } from '../../services/query/spell.query';
import { PAGE_SIZE } from '../../const/numbers.const';

function SpellsView() {

  const [filterParams, setFilterParams] = useState<SpellQueryFilterParameters>({})
  const [sortParams, setSortParams] = useState<SpellQuerySortParameters>({})
  const [page, setPage] = useState<Page>(new Page(PAGE_SIZE, 1))
  const [spells, setSpells] = useState<Spell[]>([])

  useEffect(() => {
    provider.spellApi.fetchData().then(spellQuery(filterParams, sortParams)).then(setSpells)
  }, [filterParams, sortParams])

  useEffect(() => {
    setPage(new Page(PAGE_SIZE, 1))
  }, [filterParams])

  const paginator = () => {
    return (
      <AppPaginator 
        size={page.size} selected={page.selected} total={spells.length} 
        onChange={n => setPage(new Page(PAGE_SIZE, n))} 
      />
    )
  }

  return (
    <div className='SpellsView'>
      <SpellsFilterPanel onFilter={setFilterParams}/> 
      {paginator()}
      <SpellsPreviewTable onSort={setSortParams} spells={page.of(spells)}/>
      {paginator()}
    </div>
  );
}

export default SpellsView