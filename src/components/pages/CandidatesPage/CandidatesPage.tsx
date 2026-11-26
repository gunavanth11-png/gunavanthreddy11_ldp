import { useState } from "react";
import { CANDIDATES } from "../../../data/mockData";
import CandidatesTemplate from "../../templates/CandidatesTemplate/CandidatesTemplate";
import {
  DEFAULT_PER_PAGE,
  DEFAULT_PAGE,
  DEFAULT_ACTIVE_NAV,
} from "../../../utils/constants";

const CandidatesPage = () => {
  const [search, setSearch] = useState<string>("");
  const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
  const [currentPage, setCurrentPage] = useState<number>(DEFAULT_PAGE);
  const [activeNav, setActiveNav] = useState<string>(DEFAULT_ACTIVE_NAV);

  let filteredCandidates = CANDIDATES;

  if (search.trim() !== "") {
    const searchLower = search.toLowerCase();
    filteredCandidates = CANDIDATES.filter((c) => {
      return (
        c.name.toLowerCase().includes(searchLower) ||
        c.location.toLowerCase().includes(searchLower)
      );
    });
  }

  const totalPages = Math.max(1, Math.ceil(filteredCandidates.length / perPage));
  let pageToShow = currentPage;

  if (pageToShow > totalPages) pageToShow = totalPages;
  if (pageToShow < 1) pageToShow = 1;

  const startIndex = (pageToShow - 1) * perPage;
  const visibleRows = filteredCandidates.slice(startIndex, startIndex + perPage);

  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
    setCurrentPage(1);
  };

  const handlePerPageChange = (newValue: number) => {
    setPerPage(newValue);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  return (
    <CandidatesTemplate
      search={search}
      onSearchChange={handleSearchChange}
      rows={visibleRows}
      total={filteredCandidates.length}
      perPage={perPage}
      currentPage={pageToShow}
      totalPages={totalPages}
      onPerPageChange={handlePerPageChange}
      onPageChange={handlePageChange}
      activeNav={activeNav}
      onSelectNav={setActiveNav}
    />
  );
};

export default CandidatesPage;
