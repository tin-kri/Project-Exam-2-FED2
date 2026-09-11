import { useState } from "react";
import type { ApiMeta } from "@/types/types";

export function useVenuePagination() {
  const [page, setPage] = useState(1);

  function nextPage(meta: ApiMeta) {
    if (!meta.isLastPage) setPage((page) => page + 1);
  }

  function previousPage(meta: ApiMeta) {
    if (!meta.isFirstPage) setPage((page) => page - 1);
  }

  function reset() {
    setPage(1);
  }

  return { page, nextPage, previousPage, reset };
}
