import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const PaginationTaskList = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}: {
  handleNext: () => void;
  handlePrev: () => void;
  handlePageChange: (newPage: number) => void;
  page: number;
  totalPages: number;
}) => {
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 2) {
        pages.push(1, 2, 3, -1, totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, -2, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, -3, page, -4, totalPages);
      }
    }

    return pages;
  };

  const pagesToShow = generatePages();

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* Prev */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                page === 1 && "cursor-none opacity-50",
              )}
            />
          </PaginationItem>
          {/* Number */}
          {}

          {pagesToShow.map((p) => (
            <PaginationItem key={p}>
              {p < 0 ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => {
                    if (p !== page) handlePageChange(p);
                  }}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext}
              className={cn(
                "cursor-pointer",
                page === totalPages && "cursor-none opacity-50",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationTaskList;
