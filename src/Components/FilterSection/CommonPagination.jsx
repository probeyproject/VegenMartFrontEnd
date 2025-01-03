import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
const CommonPagination = ({  a=4 , currentPage }) => {
  // Create an array with a length of `totalPages`
  const pages = Array.from({ length: a }, (_, index) => index + 1);

  return (
    <div className='d-flex justify-content-center'>
      <nav className="custom-pagination text-center">
      <Pagination className="justify-content-center">
        <PaginationItem disabled={currentPage === 1}>
          <PaginationLink href="javascript:void(0)" tabindex="-1">
            <i className="fa-solid fa-angles-left"></i>
          </PaginationLink>
        </PaginationItem>

        {pages.map(page => (
          <PaginationItem key={page} active={page === currentPage}>
            <PaginationLink href="javascript:void(0)">
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem disabled={currentPage === a}>
          <PaginationLink href="javascript:void(0)">
            <i className="fa-solid fa-angles-right"></i>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
    </div>
  );
};

export default CommonPagination;
