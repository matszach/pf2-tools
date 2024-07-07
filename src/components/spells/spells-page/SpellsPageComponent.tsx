import './SpellsPageComponent.scss'
import { useEffect, useState } from "react"
import { Page } from "../../app-paginator/page"
import { PAGE_SIZE } from "../../../const/numbers.const"
import { Spell } from "../../../model/spell.model"
import provider from "../../../services/provider"
import AppPaginator from "../../app-paginator/AppPaginator"
import SpellsPreviewTable from "../spells-view-legacy/SpellsPreviewTable"

export function SpellsPageComponent() {

  const [page, setPage] = useState<Page>(new Page(PAGE_SIZE, 1))
  const [spells, setSpells] = useState<Spell[]>([])

  useEffect(() => {
    provider.spellApi.fetchData().then(setSpells)
  }, [])

  useEffect(() => {
    setPage(new Page(PAGE_SIZE, 1))
  }, [])

  const paginator = () => (
    <AppPaginator 
      size={page.size} selected={page.selected} total={spells.length} 
      onChange={n => setPage(new Page(PAGE_SIZE, n))} 
    />
  )

  return (
    <div className='SpellsPageComponent'>
      {/* <SpellsFilterPanel onFilter={setFilterParams}/>  */}
      {paginator()}
      <SpellsPreviewTable onSort={() => console.log("TODO sort")} spells={page.of(spells)}/>
      {paginator()}
    </div>
  );
}