import { useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { CharactersCards } from './CharactersCards';

function Pagination({ currentPage, setCurrentPage, itemsPerPage, initialCharacters, findByNameClick}) {   

    const pageCount = useMemo(() => {
        return Math.ceil(initialCharacters.length / itemsPerPage); 
    }, [initialCharacters, itemsPerPage]); // add data as dependency

    const handlePageChange = ( selected ) => {
        setCurrentPage(selected);
    };

    const paginatedData = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return initialCharacters.slice(startIndex, endIndex);
    }, [currentPage, initialCharacters,  itemsPerPage]); 

    return (
        <div>
            <CharactersCards 
                currentCharacters={paginatedData}
                findByNameClick={findByNameClick}
            />
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => handlePageChange(event.selected)}
                pageRangeDisplayed={(window.innerWidth < 1200 ? 1 : 3)}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className={`pagination`}
                activeClassName={`active-numberPage`}
                forcePage={currentPage}
                // initialPage={0}
                // pageRangeDisplayed={3}
            />
            {/* <ReactPaginate
                // breakLabel="..."
                nextLabel=">"
                onPageChange={(event) => handlePageClick(event.selected)}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                renderOnZeroPageCount={null}
                className={`pagination`}
                // pageClassName={``}
                // pageLinkClassName={``}
                activeClassName={`active-numberPage`}
                // activeLinkClassName={`active-numberPage`}
                // previousClassName={``}
                // nextClassName={``}
                // previousLinkClassName={``}
                // nextLinkClassName={``}
                // disabledClassName={true}
                // disabledLinkClassName={true}
                
                forcePage={currentPage}
                // initialPage={0}
            /> */}
            
      </div>
    );
}

export default Pagination