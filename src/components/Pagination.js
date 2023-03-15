import { useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { CharactersCards } from './CharactersCards';

function Pagination({ currentPage, setCurrentPage, itemsPerPage, initialCharacters, findByNameClick}) {   
    // console.log(currentPage)
    // // console.log(initialCharacters)

    // const [itemOffset, setItemOffset] = useState(0);

    // const endOffset = itemOffset + itemsPerPage;
    
    // const currentItems = initialCharacters.slice(itemOffset, endOffset);
    
    // console.log(currentItems)

    // const pageCount = Math.ceil(initialCharacters.length / itemsPerPage);
    
    // const handlePageClick = (event) => {
    //     console.log(event.selected)
    //     setCurrentPage(event.selected)
    //     const newOffset = (event.selected * itemsPerPage) % initialCharacters.length;
    //     // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    //     setItemOffset(newOffset);
    // };

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
                // currentCharacters={currentItems}
                currentCharacters={paginatedData}
                findByNameClick={findByNameClick}
            />
            <ReactPaginate
                nextLabel=">"
                onPageChange={(event) => handlePageChange(event.selected)}
                pageRangeDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                // renderOnZeroPageCount={null}
                className={`pagination`}
                activeClassName={`active-numberPage`}
                forcePage={currentPage}
                // initialPage={0}
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