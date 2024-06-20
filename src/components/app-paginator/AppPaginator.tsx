import "./AppPaginator.scss"
import { Pagination } from "react-bootstrap"
import { PAGINATOR_ELIPSIS, getPaginatorMiddleButtons } from "../../utils/calculation.util"
import { useWindowSize } from "usehooks-ts"

function AppPaginator(
  { size, total, selected, onChange }:
  { size: number, total: number, selected: number, onChange: (page: number) => void }
) {

  const window = useWindowSize()

  const prevPage = selected > 1 ? selected - 1 : 1
  const maxPage = Math.ceil(total / size)
  const nextPage = selected < maxPage ? selected + 1 : maxPage

  const middleItems = getPaginatorMiddleButtons(selected, maxPage, 10)

  const desktopPagination = () => (
    <Pagination>
      <Pagination.Prev onClick={() => onChange(prevPage)} disabled={selected === 1}/>
      {middleItems.map((page, index) => (
        page === PAGINATOR_ELIPSIS ? (
          <Pagination.Ellipsis key={`elipsis-${index}`} disabled/>
        ) : (
          <Pagination.Item 
            key={page} 
            active={page === selected} 
            onClick={() => onChange(page as number)}
          >
            {page}
          </Pagination.Item>
        )
      ))}
      <Pagination.Next onClick={() => onChange(nextPage)} disabled={selected === maxPage}/>
    </Pagination>
  )

  const mobilePagination = () => (
    <Pagination>
      <Pagination.First onClick={() => onChange(1)} disabled={selected === 1}/>
      <Pagination.Prev onClick={() => onChange(prevPage)} disabled={selected === 1}/>
      <Pagination.Item className='wide'>{`${selected}/${maxPage}`}</Pagination.Item>
      <Pagination.Next onClick={() => onChange(nextPage)} disabled={selected === maxPage}/>
      <Pagination.Last onClick={() => onChange(maxPage)} disabled={selected === maxPage}/>
    </Pagination>
  )

  return (
    <div className="AppPaginator">
      {window.width > 600 ? desktopPagination() : mobilePagination()}
    </div>
  )
}

export default AppPaginator