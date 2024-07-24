import { useLocation, useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function PaginationTable(props: Props) {
  const { currentPage, totalPages } = props;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (pageNumber: string) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };
  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <PaginationLink
        isActive={activeClass}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber.toString())}
        size={undefined}
      >
        {pageNumber}
      </PaginationLink>
    );
  };
  const renderPageButtons = () => {
    const pageButtons = [];
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    if (currentPage > 3) {
      pageButtons.push(<PaginationEllipsis />);
    }
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }
    if (currentPage !== 1 && currentPage !== totalPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    if (currentPage !== totalPages && currentPage !== totalPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }
    if (currentPage < totalPages - 2) {
      pageButtons.push(<PaginationEllipsis />);
    }

    if (totalPages > 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: totalPages,
          activeClass: currentPage === totalPages,
        })
      );
    }

    return pageButtons;
  };
  return (
    <Pagination className="pt-4">
      <PaginationContent>
        <PaginationPrevious
          size={"default"}
          onClick={() => {
            let prevPage = currentPage - 1;
            if (prevPage < 1) prevPage = totalPages;
            handlePageChange(prevPage.toString());
          }}
        />
        {renderPageButtons()}
        <PaginationNext
          size={"default"}
          onClick={() => {
            let nextPage = currentPage + 1;
            if (nextPage > totalPages) nextPage = 1;
            handlePageChange(nextPage.toString());
          }}
        />
      </PaginationContent>
    </Pagination>
  );
}
