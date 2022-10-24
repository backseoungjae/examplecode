interface PaginationProps {
  count: number;
  page: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  // 현재 페이지 전 후의 항상 표시되는 페이지 수
  siblingCount?: number;
  // 시작과 끝에서 항상 표시되는 페이지의 수
  boundaryCount?: number;
}

export default function usePagination({
  count,
  page,
  onPageChange,
  disabled,
  siblingCount = 1,
  boundaryCount = 1,
}: PaginationProps) {
  // 시작과 끝을 지정 했을 때, 그 사이에 해당하는 값들을 배열로 반환 ex) rage(2, 5) = [2, 3, 4, 5]
  const range = (start: number, end: number) => {
    // 총 길이
    const length = end - start + 1;

    return Array.from({ length }).map((_, i: number) => i + start);
  };

  const startPage = 1;
  const endPage = count;

  // boundaryCount에 의해 변함
  const startPages = range(startPage, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingStart = Math.max(
    Math.min(
      page + 1 - siblingCount,
      count - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );

  const siblingEnd = Math.min(
    Math.max(page + 1 + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : endPage - 1
  );

  const itemList = [
    "prev",
    ...startPages,
    ...(siblingStart > boundaryCount + 2
      ? ["start-ellipsis"]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),
    ...range(siblingStart, siblingEnd),
    ...(siblingEnd < count - boundaryCount - 1
      ? ["end-ellipsis"]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),
    ...endPages,
    "next",
  ];

  const items = itemList.map((item, i: number) =>
    typeof item === "number"
      ? {
          key: i,
          onClick: () => onPageChange(item - 1),
          disabled,
          selected: item - 1 === page,
          item,
        }
      : {
          key: i,
          onClick: () => onPageChange(item === "next" ? page + 1 : page - 1),
          disabled:
            disabled ||
            item.indexOf("ellipsis") > -1 ||
            (item === "next" ? page >= count - 1 : page < 1),
          selected: false,
          item,
        }
  );

  return { items };
}
