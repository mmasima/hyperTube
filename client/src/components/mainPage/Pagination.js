import React from 'react';

const Pagination = (props) => {
    const pageLinks = []

    for(let i = 1; i <= props.pages + 1; i++) {
        let active = props.currentPage === i ?'active' : '';

        pageLinks.push(<li className={`page-link ${active}`}  onClick={() => props.nextPage(i)}><button className="btn btn-amber">{i}</button></li>)
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <ul className="pagination">
                { props.currentPage > 1 ? <li className="page-link" onClick={() => props.nextPage(props.currentPage - 1)}><a href="#!">Prev</a></li> : ''}
                    {pageLinks}
                { props.currentPage < props.pages + 1 ? <li className="page-link" onClick={() => props.nextPage(props.currentPage + 1)}><a href="#!">Next</a></li> : ''}
                </ul>
            </div>
        </div>
    )
}

export default Pagination;