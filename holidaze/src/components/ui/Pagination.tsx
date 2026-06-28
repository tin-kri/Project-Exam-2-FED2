import type { ApiMeta } from "@/types/types";
import Button from "./button";

type PaginationProps = {
  meta: ApiMeta;
  onNext: () => void;
  onPrevious: () => void;
};

export default function Pagination({ meta, onNext, onPrevious }: PaginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button size="sm" onClick={onPrevious} disabled={meta.isFirstPage}>
        Previous
      </Button>

      <span className="text-sm text-grey-900">
        {meta.currentPage} / {meta.pageCount}
      </span>

      <Button size="sm" onClick={onNext} disabled={meta.isLastPage}>
        Next
      </Button>
    </div>
  );
}