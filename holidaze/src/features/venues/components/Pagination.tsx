import type { ApiMeta } from "@/types/types";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  meta: ApiMeta;
  onNext: () => void;
  onPrevious: () => void;
};

export default function Pagination({
  meta,
  onNext,
  onPrevious,
}: PaginationProps) {
  return (
    <nav aria-label="Venue result pages" className="mt-8 flex items-center justify-center gap-3">
      <Button size="sm" variant="outline" onClick={onPrevious} disabled={meta.isFirstPage}>
        Previous
      </Button>

      <span className="text-sm  text-grey-900" aria-live="polite" aria-atomic="true">
       Page {meta.currentPage} / {meta.pageCount}
      </span>

      <Button size="sm" variant="outline" onClick={onNext} disabled={meta.isLastPage}>
        Next
      </Button>
    </nav>
  );
}
