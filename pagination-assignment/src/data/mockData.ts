import type { Candidate, Status } from "../types/candidate";

const NAMES = [
  "John Smith", "Serene", "Walsh", "Maurizia", "Kendre", "Erastus",
  "Jereme", "John Smith", "Cari", "Kimble", "Osric", "Marisol",
];

const LOCATIONS = [
  "Barroualie", "Vanersborg", "Sukamanah", "Beutong Ateuh", "Hoviyn Am",
  "Sharingol", "Lianyun", "Taboao da Serra", "Veseli nad Moravou",
];

const STATUSES: Status[] = ["CLEAR", "CLEAR", "CLEAR", "CONSIDER"];

export function generateCandidates(count: number): Candidate[] {
  const list: Candidate[] = [];

  for (let i = 0; i < count; i++) {
    const month = (i % 12) + 1;
    const day = (i % 28) + 1;
    const year = i % 2 === 0 ? 2022 : 2021;

    list.push({
      id: i + 1,
      name: NAMES[i % NAMES.length],
      adjudication: "-",
      status: STATUSES[i % STATUSES.length],
      location: LOCATIONS[i % LOCATIONS.length],
      date: `${month}/${day}/${year}`,
    });
  }

  return list;
}

export const CANDIDATES: Candidate[] = generateCandidates(84);