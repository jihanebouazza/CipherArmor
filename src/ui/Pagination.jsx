import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../utils/constants";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import Button from "./Button";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p>
        Showing{" "}
        <span className="font-medium">{(currentPage - 1) * PAGE_SIZE + 1}</span>{" "}
        to{" "}
        <span className="font-medium">
          {currentPage == pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-medium">{count}</span> results
      </p>
      <div className="flex items-center gap-4">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          type="rawmd"
          extraStyles="gap-0.5"
        >
          <HiOutlineChevronLeft />
          <span>Previous</span>
        </Button>
        <Button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          type="rawmd"
          extraStyles="gap-0.5"
        >
          <span>Next</span>
          <HiOutlineChevronRight />
        </Button>
      </div>
    </div>
  );
}
export default Pagination;
