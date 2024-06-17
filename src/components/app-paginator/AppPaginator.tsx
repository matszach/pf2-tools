import { useEffect, useState } from "react"
import "./AppPaginator.scss"
import { Pagination } from "react-bootstrap"
import { PAGINATOR_ELIPSIS, getPaginatorMiddleButtons } from "../../utils/calculation.util"
import { Page } from "./page"

function AppPaginator(
  { size, total, onPageChange }: 
  { size: number, total: number, onPageChange: (page: Page) => void }
) {

  const [totalRecords] = useState(total)
  const [seletedPage, setSelectedPage] = useState(1)

  const setPage = (page: number) => {
    setSelectedPage(page)
    onPageChange(new Page(size, page))
  }

  useEffect(() => {
    setSelectedPage(1)
  }, [totalRecords])

  const prevPage = seletedPage > 1 ? seletedPage - 1 : 1
  const maxPage = Math.ceil(total / size)
  const nextPage = seletedPage < maxPage ? seletedPage + 1 : maxPage

  let middleItems = getPaginatorMiddleButtons(seletedPage, maxPage, 10)

  return (
    <div className="AppPaginator">
      <Pagination>
        <Pagination.First onClick={() => setPage(1)} disabled={seletedPage === 1}/>
        <Pagination.Prev onClick={() => setPage(prevPage)} disabled={seletedPage === 1}/>
        {middleItems.map((page, index) => (
          page === PAGINATOR_ELIPSIS ? (
            <Pagination.Ellipsis key={`elipsis-${index}`} disabled/>
          ) : (
            <Pagination.Item 
              key={page} 
              active={page === seletedPage} 
              onClick={() => setPage(page as number)}
          >
              {page}
            </Pagination.Item>
          )
        ))}
        <Pagination.Next onClick={() => setPage(nextPage)} disabled={seletedPage === maxPage}/>
        <Pagination.Last onClick={() => setPage(maxPage)} disabled={seletedPage === maxPage}/>
      </Pagination>
    </div>
  )
}

export default AppPaginator