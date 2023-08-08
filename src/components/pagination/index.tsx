interface IPagination {
  pageNumbers: number[];
  paginate: (pageNumber: number) => void;
}
export const Pagination: React.FC<IPagination> = (
  pageNumbers,
  { paginate }
) => {
  return (
    <div>
      <ul>
        {pageNumbers.pageNumbers.map((num: number) => (
          <li onClick={() => paginate(num)} key={num}>
            {num}
          </li>
        ))}
      </ul>
    </div>
  );
};
