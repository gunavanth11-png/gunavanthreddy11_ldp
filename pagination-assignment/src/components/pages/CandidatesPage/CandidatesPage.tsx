import { useState } from "react";
import { CANDIDATES } from "../../../data/mockData";
import CandidatesTemplate from "../../templates/CandidatesTemplate/CandidatesTemplate";

export default function CandidatesPage() {
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeNav, setActiveNav] = useState("Candidates");

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
  const visibleRows = filteredCandidates.slice(
    startIndex,
    startIndex + perPage
  );

  function handleSearchChange(newValue: string) {
    setSearch(newValue);
    setCurrentPage(1);
  }

  function handlePerPageChange(newValue: number) {
    setPerPage(newValue);
    setCurrentPage(1);
  }

  function handlePageChange(newPage: number) {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  }

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
}
