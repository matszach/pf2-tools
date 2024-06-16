import React, { useEffect, useState } from 'react';
import './SpellsView.scss';
import SpellsPreviewTable from './SpellsPreviewTable';
import { Spell } from '../../model/spell.model';
import provider from '../../services/provider';
import AppPaginator from '../app-paginator/AppPaginator';
import SpellsQueryPanel from './SpellsQueryPanel';
import { Page } from '../app-paginator/page';
import { ApiQueryParameters } from '../../services/query/data-query.model';

function SpellsView() {

  const [query, setQuery] = useState<ApiQueryParameters<Spell>>({});
  const [pageSize, _setPageSize] = useState<number>(15);
  const [page, setPage] = useState<Page>(new Page(pageSize, 1))
  const [spells, setSpells] = useState<Spell[]>([]);

  useEffect(() => {
    provider.spellApi.query(query).then(setSpells)
  }, [query])

  // TODO fix the weird paginator behaviour
  return (
    <div className='SpellsView'>
      <SpellsQueryPanel onQuery={setQuery}/>
      <AppPaginator size={pageSize} total={spells.length} onPageChange={setPage} />
      <SpellsPreviewTable spells={page.of(spells)}/>
    </div>
  );
}

export default SpellsView;