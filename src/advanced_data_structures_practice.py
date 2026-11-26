"""Practice a min-heap, trie, and adjacency-list graph."""

import heapq
from collections import deque


class MinHeap:
    def __init__(self) -> None:
        self._items: list[int] = []

    def push(self, value: int) -> None:
        heapq.heappush(self._items, value)

    def pop(self) -> int:
        if not self._items:
            raise IndexError("pop from an empty heap")
        return heapq.heappop(self._items)

    def __len__(self) -> int:
        return len(self._items)


class TrieNode:
    def __init__(self) -> None:
        self.children: dict[str, TrieNode] = {}
        self.is_word = False


class Trie:
    def __init__(self) -> None:
        self._root = TrieNode()

    def insert(self, word: str) -> None:
        node = self._root
        for character in word:
            node = node.children.setdefault(character, TrieNode())
        node.is_word = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_word

    def starts_with(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, text: str) -> TrieNode | None:
        node = self._root
        for character in text:
            if character not in node.children:
                return None
            node = node.children[character]
        return node


class Graph:
    def __init__(self) -> None:
        self._neighbors: dict[str, set[str]] = {}

    def add_edge(self, start: str, end: str, *, bidirectional: bool = True) -> None:
        self._neighbors.setdefault(start, set()).add(end)
        self._neighbors.setdefault(end, set())
        if bidirectional:
            self._neighbors[end].add(start)

    def breadth_first_search(self, start: str) -> list[str]:
        if start not in self._neighbors:
            return []

        visited = {start}
        queue = deque([start])
        order: list[str] = []
        while queue:
            vertex = queue.popleft()
            order.append(vertex)
            for neighbor in sorted(self._neighbors[vertex]):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
        return order


def main() -> None:
    heap = MinHeap()
    for value in (8, 3, 5):
        heap.push(value)
    print("Heap values in priority order:", [heap.pop() for _ in range(len(heap))])

    words = Trie()
    for word in ("apple", "app", "apricot"):
        words.insert(word)
    print("Trie contains 'app':", words.search("app"))
    print("Trie has prefix 'ap':", words.starts_with("ap"))

    graph = Graph()
    graph.add_edge("A", "B")
    graph.add_edge("A", "C")
    graph.add_edge("B", "D")
    print("Graph BFS from A:", graph.breadth_first_search("A"))


if __name__ == "__main__":
    main()
