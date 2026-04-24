"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
};

export const PaginationSection = ({
  totalPages,
  currentPage,
  setPage,
}: Props) => {
  const getPages = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];

    for (let i = 1; i <= totalPages; i++) {
      const isFirst = i === 1;
      const isLast = i === totalPages;
      const isNearCurrent = Math.abs(i - currentPage) <= 1;

      if (isFirst || isLast || isNearCurrent) {
        pages.push(i);
      } else {
        const prev = pages[pages.length - 1];
        if (prev !== "ellipsis") {
          pages.push("ellipsis");
        }
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center">
      <Pagination>
        <PaginationContent className="flex gap-4">
          {/* ── PREVIOUS ── */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.max(currentPage - 1, 1));
              }}
            />
          </PaginationItem>

          {/* ── PAGES ── */}
          {getPages().map((item, idx) => {
            if (item === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(item);
                  }}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* ── NEXT ── */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setPage(Math.min(currentPage + 1, totalPages));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
