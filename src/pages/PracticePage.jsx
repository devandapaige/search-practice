/**
 * PRACTICE PAGE
 *
 * A study hub for search patterns and the "40 algorithms every programmer should know".
 */
import {
  AutocompleteExample,
  DebounceHookExample,
  RequestCancellationExample,
  ResultCachingExample,
  SearchHighlightExample,
  SearchThresholdExample,
} from '../study-guide';
import './PracticePage.css';

const searchPatternCards = [
  {
    title: 'Debounce keystrokes',
    summary: 'Wait for a short pause before sending a search request.',
    steps: [
      'Capture raw input immediately for UI feedback.',
      'Delay the search until the user pauses typing.',
      'Cancel the pending timer when new input arrives.',
    ],
    why: 'It reduces noisy network calls and keeps results stable.',
    watchFor: 'Too much delay can make the UI feel unresponsive.',
  },
  {
    title: 'Threshold + Enter trigger',
    summary: 'Avoid auto-searching until the query is meaningful.',
    steps: [
      'Measure query length as the user types.',
      'Auto-search when length crosses a minimum threshold.',
      'Always allow Enter to force a search.',
    ],
    why: 'It prevents short, low-signal queries from polluting results.',
    watchFor: 'Always communicate the threshold to the user.',
  },
  {
    title: 'Autocomplete suggestions',
    summary: 'Offer likely matches before the user finishes typing.',
    steps: [
      'Filter a suggestion list as the query changes.',
      'Show a dropdown with keyboard navigation.',
      'Commit a suggestion on click or Enter.',
    ],
    why: 'It shortens the path to a result and reduces typos.',
    watchFor: 'Keyboard focus and selection state must stay predictable.',
  },
  {
    title: 'Highlight matches',
    summary: 'Visually emphasize the query inside results.',
    steps: [
      'Escape the query so it is safe for regex.',
      'Split result text on the query.',
      'Wrap matching segments in a highlight element.',
    ],
    why: 'It makes relevant parts easier to scan at a glance.',
    watchFor: 'Always escape special characters before building regex.',
  },
  {
    title: 'Cache previous results',
    summary: 'Store results for queries you already fetched.',
    steps: [
      'Use an in-memory map keyed by query.',
      'Return cached results immediately when available.',
      'Fallback to the network when there is a cache miss.',
    ],
    why: 'It makes repeat searches instant and saves bandwidth.',
    watchFor: 'Clear or scope caches to avoid stale data.',
  },
  {
    title: 'Cancel stale requests',
    summary: 'Abort in-flight requests when the query changes.',
    steps: [
      'Create an AbortController for each request.',
      'Abort the previous request in the cleanup function.',
      'Ignore abort errors while handling real failures.',
    ],
    why: 'It prevents slow responses from overwriting fresh results.',
    watchFor: 'Always handle AbortError explicitly to avoid flashing errors.',
  },
];

const algorithmCategories = [
  {
    id: 'search-algorithms',
    key: 'Search',
    label: 'Search algorithms',
    description: 'Find items efficiently in collections.',
  },
  {
    id: 'sorting-algorithms',
    key: 'Sorting',
    label: 'Sorting algorithms',
    description: 'Order data to speed up later operations.',
  },
  {
    id: 'graph-algorithms',
    key: 'Graph',
    label: 'Graph algorithms',
    description: 'Reason about networks, routes, and dependencies.',
  },
  {
    id: 'data-structure-algorithms',
    key: 'Data Structures',
    label: 'Data structure algorithms',
    description: 'Core operations that make data structures useful.',
  },
  {
    id: 'dynamic-programming',
    key: 'Dynamic Programming',
    label: 'Dynamic programming',
    description: 'Solve overlapping subproblems once and reuse them.',
  },
  {
    id: 'string-algorithms',
    key: 'String',
    label: 'String algorithms',
    description: 'Search, match, and organize text efficiently.',
  },
  {
    id: 'greedy-algorithms',
    key: 'Greedy',
    label: 'Greedy algorithms',
    description: 'Build solutions with the best local choice each step.',
  },
  {
    id: 'math-algorithms',
    key: 'Math',
    label: 'Math and number theory',
    description: 'Numeric building blocks used everywhere.',
  },
];

const algorithms = [
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'Search',
    summary: 'Scan each element until the target is found.',
    complexity: 'Time O(n), Space O(1)',
    steps: [
      'Start at the first element.',
      'Compare each element with the target.',
      'Return the index when you find a match.',
      'If you reach the end, the target is missing.',
    ],
    why: 'By checking every element, you are guaranteed to find the target if it exists.',
    example: 'Input: [4, 1, 9], target 9 -> checks 4, 1, 9 -> index 2.',
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Search',
    summary: 'Divide a sorted list in half to locate the target.',
    complexity: 'Time O(log n), Space O(1)',
    steps: [
      'Set low and high bounds around the array.',
      'Check the middle element.',
      'Move the bounds based on the comparison.',
      'Repeat until the target is found or bounds cross.',
    ],
    why: 'Sorting lets you discard half of the remaining elements each step.',
    example: 'Input: [1, 3, 5, 7, 9], target 7 -> mid 5, go right -> index 3.',
  },
  {
    id: 'jump-search',
    name: 'Jump Search',
    category: 'Search',
    summary: 'Jump ahead by fixed blocks, then linearly search the block.',
    complexity: 'Time O(sqrt n), Space O(1)',
    steps: [
      'Pick a block size, usually sqrt(n).',
      'Jump forward until the block end is >= target.',
      'Linearly scan inside the final block.',
    ],
    why: 'Bounding the target to one block reduces the linear scan.',
    example: 'Input: [1..16], target 13, block 4 -> jump to 4, 8, 12, 16 -> scan 13.',
  },
  {
    id: 'interpolation-search',
    name: 'Interpolation Search',
    category: 'Search',
    summary: 'Estimate the likely position of the target in sorted data.',
    complexity: 'Average O(log log n), Worst O(n)',
    steps: [
      'Use values to estimate the probe position.',
      'Compare the probe with the target.',
      'Adjust low and high bounds based on the probe.',
    ],
    why: 'If data is uniformly distributed, the estimate lands near the target.',
    example: 'Input: IDs 10..100, target 70 -> probe near index of 70 and converge quickly.',
  },
  {
    id: 'exponential-search',
    name: 'Exponential Search',
    category: 'Search',
    summary: 'Expand the search range exponentially, then binary search.',
    complexity: 'Time O(log n), Space O(1)',
    steps: [
      'Check indices 1, 2, 4, 8, ... until value >= target.',
      'Binary search within the bounded range.',
    ],
    why: 'Exponential probing finds a tight search window quickly.',
    example: 'Input: [2, 3, 5, 7, 11, 13, 17, 19], target 17 -> range 4..8 -> binary search.',
  },
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    summary: 'Swap adjacent out-of-order elements repeatedly.',
    complexity: 'Time O(n^2), Space O(1)',
    steps: [
      'Walk through the array and swap out-of-order pairs.',
      'After each pass, the largest element is at the end.',
      'Repeat passes until no swaps occur.',
    ],
    why: 'Each pass moves the largest remaining element into its final position.',
    example: 'Input: [3, 2, 1] -> pass 1: [2, 1, 3] -> pass 2: [1, 2, 3].',
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    summary: 'Select the smallest item and place it next.',
    complexity: 'Time O(n^2), Space O(1)',
    steps: [
      'Find the minimum element in the unsorted region.',
      'Swap it with the first unsorted position.',
      'Move the boundary forward and repeat.',
    ],
    why: 'Picking the minimum guarantees the sorted prefix is correct.',
    example: 'Input: [4, 1, 3] -> pick 1 -> [1, 4, 3] -> pick 3 -> [1, 3, 4].',
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    summary: 'Insert each element into the correct spot in a sorted prefix.',
    complexity: 'Time O(n^2) avg, O(n) best, Space O(1)',
    steps: [
      'Start from the second element.',
      'Shift larger elements to the right.',
      'Insert the current element into the gap.',
    ],
    why: 'A sorted prefix stays sorted as each new item is inserted.',
    example: 'Input: [4, 2, 3] -> insert 2 -> [2, 4, 3] -> insert 3 -> [2, 3, 4].',
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    summary: 'Divide the array and merge sorted halves.',
    complexity: 'Time O(n log n), Space O(n)',
    steps: [
      'Split the array into halves until size 1.',
      'Merge two sorted halves by comparing heads.',
      'Repeat merges up the recursion tree.',
    ],
    why: 'Merging sorted halves yields a fully sorted array.',
    example: 'Input: [4, 1, 3, 2] -> split [4,1][3,2] -> merge -> [1,2,3,4].',
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    summary: 'Partition around a pivot, then sort partitions.',
    complexity: 'Average O(n log n), Worst O(n^2), Space O(log n)',
    steps: [
      'Choose a pivot element.',
      'Partition elements < pivot and > pivot.',
      'Recursively sort the partitions.',
    ],
    why: 'Partitioning places the pivot in its final position.',
    example: 'Input: [4, 1, 3, 2], pivot 3 -> [1, 2] 3 [4] -> sorted.',
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'Sorting',
    summary: 'Use a heap to repeatedly select the max or min.',
    complexity: 'Time O(n log n), Space O(1)',
    steps: [
      'Build a max heap from the array.',
      'Swap the root with the last element.',
      'Heapify the reduced heap and repeat.',
    ],
    why: 'The heap keeps the largest element at the root each step.',
    example: 'Input: [3, 1, 4, 2] -> heap -> extract -> [1, 2, 3, 4].',
  },
  {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'Sorting',
    summary: 'Count occurrences of each key and rebuild the array.',
    complexity: 'Time O(n + k), Space O(k)',
    steps: [
      'Count how many times each value appears.',
      'Compute prefix sums to get positions.',
      'Place each element into its sorted position.',
    ],
    why: 'When the key range is small, counts directly encode order.',
    example: 'Input: [3, 1, 2, 3], range 1..3 -> output [1, 2, 3, 3].',
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'Sorting',
    summary: 'Sort numbers digit by digit with a stable sort.',
    complexity: 'Time O(d*(n + k)), Space O(n + k)',
    steps: [
      'Sort by the least significant digit.',
      'Repeat for each next digit using a stable sort.',
      'Stop after the most significant digit.',
    ],
    why: 'Stable digit sorting preserves earlier ordering.',
    example: 'Input: [170, 45, 75] -> ones, tens, hundreds -> [45, 75, 170].',
  },
  {
    id: 'bucket-sort',
    name: 'Bucket Sort',
    category: 'Sorting',
    summary: 'Scatter elements into buckets, then sort each bucket.',
    complexity: 'Average O(n + k), Worst O(n^2)',
    steps: [
      'Create buckets for value ranges.',
      'Distribute elements into buckets.',
      'Sort each bucket and concatenate.',
    ],
    why: 'Uniform distribution keeps buckets small and fast to sort.',
    example: 'Input: [0.78, 0.17, 0.39] -> buckets -> [0.17, 0.39, 0.78].',
  },
  {
    id: 'breadth-first-search',
    name: 'Breadth-First Search (BFS)',
    category: 'Graph',
    summary: 'Explore neighbors level by level using a queue.',
    complexity: 'Time O(V + E), Space O(V)',
    steps: [
      'Enqueue the start node and mark it visited.',
      'Dequeue a node and visit its neighbors.',
      'Enqueue unvisited neighbors.',
    ],
    why: 'A queue guarantees the first time you reach a node is the shortest path in unweighted graphs.',
    example: 'Graph A-B, A-C, B-D -> BFS from A: A, B, C, D.',
  },
  {
    id: 'depth-first-search',
    name: 'Depth-First Search (DFS)',
    category: 'Graph',
    summary: 'Explore as deep as possible before backtracking.',
    complexity: 'Time O(V + E), Space O(V)',
    steps: [
      'Start at a node and mark it visited.',
      'Recursively visit one neighbor at a time.',
      'Backtrack when a node has no unvisited neighbors.',
    ],
    why: 'A stack or recursion explores complete paths before exploring alternatives.',
    example: 'Graph A-B, A-C, B-D -> DFS from A: A, B, D, C.',
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'Graph',
    summary: 'Compute shortest paths with non-negative edges.',
    complexity: 'Time O((V + E) log V), Space O(V)',
    steps: [
      'Initialize distances from the start to infinity.',
      'Use a min-priority queue of nodes by distance.',
      'Relax edges and update distances when you find a shorter path.',
    ],
    why: 'The smallest tentative distance is always safe when edge weights are non-negative.',
    example: 'Edges A-B 1, A-C 4, B-C 2 -> shortest A->C is 3 via B.',
  },
  {
    id: 'bellman-ford',
    name: 'Bellman-Ford Algorithm',
    category: 'Graph',
    summary: 'Find shortest paths even with negative weights.',
    complexity: 'Time O(V * E), Space O(V)',
    steps: [
      'Initialize distances from the start.',
      'Relax every edge V - 1 times.',
      'Check for another relaxation to detect negative cycles.',
    ],
    why: 'Repeated relaxation propagates shortest paths across all edges.',
    example: 'Edges A-B 1, B-C -2, A-C 4 -> shortest A->C is -1.',
  },
  {
    id: 'floyd-warshall',
    name: 'Floyd-Warshall Algorithm',
    category: 'Graph',
    summary: 'Compute all-pairs shortest paths with dynamic programming.',
    complexity: 'Time O(V^3), Space O(V^2)',
    steps: [
      'Initialize the distance matrix with direct edge weights.',
      'For each intermediate node k, update dist[i][j].',
      'Pick the minimum of direct and via-k paths.',
    ],
    why: 'Considering intermediates up to k ensures all paths are evaluated.',
    example: '3 nodes -> update the matrix using each node as an intermediate.',
  },
  {
    id: 'a-star',
    name: 'A* Search',
    category: 'Graph',
    summary: 'Use a heuristic to guide shortest-path search.',
    complexity: 'Time depends on heuristic, Space O(V)',
    steps: [
      'Track cost so far (g) and heuristic estimate (h).',
      'Prioritize nodes by f = g + h.',
      'Expand the lowest f node until you reach the goal.',
    ],
    why: 'With an admissible heuristic, A* never misses the optimal path.',
    example: 'Grid pathfinding with Manhattan distance expands nodes closer to the goal first.',
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    category: 'Graph',
    summary: 'Order nodes in a DAG so prerequisites come first.',
    complexity: 'Time O(V + E), Space O(V)',
    steps: [
      'Compute in-degree for each node.',
      'Push nodes with in-degree 0 into a queue.',
      'Remove edges and append nodes to the ordering.',
    ],
    why: 'Nodes with zero in-degree have no remaining dependencies.',
    example: 'Tasks A->C, B->C -> valid order A, B, C.',
  },
  {
    id: 'kruskal',
    name: "Kruskal's Algorithm",
    category: 'Graph',
    summary: 'Build a minimum spanning tree with sorted edges.',
    complexity: 'Time O(E log E), Space O(V)',
    steps: [
      'Sort edges by weight.',
      'Add the smallest edge that does not form a cycle.',
      'Use union-find to track connected components.',
    ],
    why: 'The cut property guarantees the smallest safe edge belongs in the MST.',
    example: 'Edges 1, 2, 3 -> pick 1 and 2, skip 3 if it makes a cycle.',
  },
  {
    id: 'prim',
    name: "Prim's Algorithm",
    category: 'Graph',
    summary: 'Grow a minimum spanning tree from a start node.',
    complexity: 'Time O(E log V), Space O(V)',
    steps: [
      'Start with any node in the tree.',
      'Pick the smallest edge connecting the tree to a new node.',
      'Repeat until all nodes are included.',
    ],
    why: 'Choosing the cheapest crossing edge keeps the MST invariant.',
    example: 'Start at A -> add cheapest edge to B -> continue to all nodes.',
  },
  {
    id: 'union-find',
    name: 'Union-Find (Disjoint Set Union)',
    category: 'Data Structures',
    summary: 'Track which items belong to the same set.',
    complexity: 'Time ~ O(alpha(n)), Space O(n)',
    steps: [
      'Initialize each item as its own parent.',
      'Use path compression in find() for fast lookups.',
      'Union sets by rank to keep trees shallow.',
    ],
    why: 'Path compression and union by rank make operations near-constant time.',
    example: 'Union(1,2), Union(2,3) -> Find(1) == Find(3).',
  },
  {
    id: 'trie-operations',
    name: 'Trie Insert and Search',
    category: 'Data Structures',
    summary: 'Store words by prefix for fast lookup.',
    complexity: 'Time O(L) per word, Space O(total chars)',
    steps: [
      'Traverse nodes for each character.',
      'Create nodes when missing.',
      'Mark the end of each word and search by walking the prefix.',
    ],
    why: 'Shared prefixes reduce work and make prefix queries fast.',
    example: "Insert 'car' and 'cat' -> prefix 'ca' returns both.",
  },
  {
    id: 'fibonacci-memoization',
    name: 'Fibonacci (Memoization)',
    category: 'Dynamic Programming',
    summary: 'Cache Fibonacci values to avoid repeated work.',
    complexity: 'Time O(n), Space O(n)',
    steps: [
      'Define fib(n) with base cases.',
      'Store results in a cache.',
      'Reuse cached values on future calls.',
    ],
    why: 'Overlapping subproblems mean each value only needs to be computed once.',
    example: 'fib(6) computes fib(0..6) once instead of repeatedly.',
  },
  {
    id: 'longest-increasing-subsequence',
    name: 'Longest Increasing Subsequence',
    category: 'Dynamic Programming',
    summary: 'Find the longest subsequence that increases.',
    complexity: 'Time O(n log n), Space O(n)',
    steps: [
      'Track the smallest tail for each subsequence length.',
      'Binary search to place each new number.',
      'The number of tails is the LIS length.',
    ],
    why: 'Keeping minimal tails leaves room for longer subsequences.',
    example: 'Input: [3, 1, 2, 5, 4] -> LIS length 3 (1, 2, 4).',
  },
  {
    id: 'longest-common-subsequence',
    name: 'Longest Common Subsequence',
    category: 'Dynamic Programming',
    summary: 'Find the longest sequence common to two strings.',
    complexity: 'Time O(mn), Space O(mn)',
    steps: [
      'Create a DP table for all prefix pairs.',
      'If chars match, take diagonal + 1.',
      'Else take max of left or top.',
    ],
    why: 'Optimal subsequences of prefixes build the final answer.',
    example: "A='ABC', B='AC' -> LCS length 2 ('AC').",
  },
  {
    id: 'knapsack-01',
    name: '0/1 Knapsack',
    category: 'Dynamic Programming',
    summary: 'Choose items to maximize value without exceeding capacity.',
    complexity: 'Time O(nW), Space O(nW) or O(W)',
    steps: [
      'Build a DP table over items and capacities.',
      'For each item, choose max of take vs skip.',
      'Read the best value at dp[n][W].',
    ],
    why: 'Each decision depends on the best solution of a smaller capacity.',
    example: 'Items (w2,v3) (w3,v4), cap 3 -> best value 4.',
  },
  {
    id: 'coin-change',
    name: 'Coin Change (Minimum Coins)',
    category: 'Dynamic Programming',
    summary: 'Find the minimum coins needed for an amount.',
    complexity: 'Time O(n * amount), Space O(amount)',
    steps: [
      'Initialize dp[0] = 0 and others to infinity.',
      'For each amount, try each coin.',
      'Take the minimum dp[amount - coin] + 1.',
    ],
    why: 'Every amount can be built from smaller optimal amounts.',
    example: 'Coins [1, 3, 4], amount 6 -> minimum 2 (3 + 3).',
  },
  {
    id: 'edit-distance',
    name: 'Edit Distance (Levenshtein)',
    category: 'Dynamic Programming',
    summary: 'Minimum edits to transform one string into another.',
    complexity: 'Time O(mn), Space O(mn)',
    steps: [
      'Create a DP table for all prefix pairs.',
      'If chars match, copy diagonal.',
      'Else 1 + min(insert, delete, replace).',
    ],
    why: 'Each edit choice reduces the problem to smaller prefixes.',
    example: "Transform 'kitten' -> 'sitting' with 3 edits.",
  },
  {
    id: 'matrix-chain-multiplication',
    name: 'Matrix Chain Multiplication',
    category: 'Dynamic Programming',
    summary: 'Pick the cheapest order to multiply matrices.',
    complexity: 'Time O(n^3), Space O(n^2)',
    steps: [
      'Compute costs for chains of length 2..n.',
      'Split each chain at k and pick the minimum.',
      'Reuse subchain costs from the DP table.',
    ],
    why: 'Optimal parenthesization is built from optimal subchains.',
    example: 'Matrices (10x30)(30x5)(5x60) -> best is (A*B)*C.',
  },
  {
    id: 'kadanes',
    name: "Kadane's Algorithm",
    category: 'Dynamic Programming',
    summary: 'Find the maximum subarray sum in linear time.',
    complexity: 'Time O(n), Space O(1)',
    steps: [
      'Track the best sum ending at the current index.',
      'Reset the running sum when it becomes worse than the current value.',
      'Track the global maximum across the scan.',
    ],
    why: 'A negative running sum would only reduce any future subarray.',
    example: 'Input: [-2, 1, -3, 4, -1, 2] -> max sum 5 (4, -1, 2).',
  },
  {
    id: 'kmp',
    name: 'Knuth-Morris-Pratt (KMP)',
    category: 'String',
    summary: 'Search for a pattern without rechecking characters.',
    complexity: 'Time O(n + m), Space O(m)',
    steps: [
      'Build the longest prefix-suffix table for the pattern.',
      'Scan the text and pattern together.',
      'On mismatch, jump the pattern using the table.',
    ],
    why: 'The prefix table reuses previous matches to skip redundant checks.',
    example: "Text 'ababc', pattern 'abc' -> match at index 2.",
  },
  {
    id: 'rabin-karp',
    name: 'Rabin-Karp',
    category: 'String',
    summary: 'Use a rolling hash to locate a pattern.',
    complexity: 'Average O(n + m), Worst O(nm)',
    steps: [
      'Compute hash of the pattern and the first window.',
      'Slide the window, updating the hash in O(1).',
      'Verify characters when hashes match.',
    ],
    why: 'Rolling hashes compare substrings quickly before confirming with a check.',
    example: "Text 'hello', pattern 'ell' -> hash match at index 1, verify characters.",
  },
  {
    id: 'activity-selection',
    name: 'Activity Selection',
    category: 'Greedy',
    summary: 'Select the maximum number of non-overlapping intervals.',
    complexity: 'Time O(n log n), Space O(1)',
    steps: [
      'Sort activities by finish time.',
      'Pick the earliest finishing activity.',
      'Skip any activity that overlaps the last pick.',
    ],
    why: 'The earliest finish leaves the most room for remaining activities.',
    example: 'Activities (1,3), (2,5), (4,7) -> pick (1,3) and (4,7).',
  },
  {
    id: 'huffman-coding',
    name: 'Huffman Coding',
    category: 'Greedy',
    summary: 'Create optimal prefix codes from symbol frequencies.',
    complexity: 'Time O(n log n), Space O(n)',
    steps: [
      'Push all symbol frequencies into a min-heap.',
      'Merge the two smallest nodes repeatedly.',
      'Assign 0/1 bits by traversing the final tree.',
    ],
    why: 'Merging the lowest frequencies minimizes total weighted path length.',
    example: 'Frequencies a:5, b:2, c:1 -> a gets the shortest code.',
  },
  {
    id: 'euclidean-gcd',
    name: 'Euclidean Algorithm (GCD)',
    category: 'Math',
    summary: 'Compute the greatest common divisor quickly.',
    complexity: 'Time O(log n), Space O(1)',
    steps: [
      'While b is not zero, set (a, b) = (b, a mod b).',
      'When b is zero, a is the GCD.',
    ],
    why: 'gcd(a, b) equals gcd(b, a mod b), shrinking the problem fast.',
    example: 'gcd(48, 18) -> 6.',
  },
  {
    id: 'sieve-of-eratosthenes',
    name: 'Sieve of Eratosthenes',
    category: 'Math',
    summary: 'Generate all primes up to N.',
    complexity: 'Time O(n log log n), Space O(n)',
    steps: [
      'Assume all numbers are prime initially.',
      'For each prime p, mark multiples of p as composite.',
      'Remaining unmarked numbers are primes.',
    ],
    why: 'Every composite has a prime factor that marks it.',
    example: 'N = 10 -> primes 2, 3, 5, 7.',
  },
  {
    id: 'binary-exponentiation',
    name: 'Binary Exponentiation',
    category: 'Math',
    summary: 'Compute powers quickly using repeated squaring.',
    complexity: 'Time O(log n), Space O(1)',
    steps: [
      'If the exponent is odd, multiply the result by the base.',
      'Square the base and halve the exponent each step.',
      'Repeat until the exponent is zero.',
    ],
    why: 'Exponentiation breaks into powers of two, reducing multiplications.',
    example: '2^10 -> multiply by squared bases to reach 1024.',
  },
];

export default function PracticePage() {
  const groupedAlgorithms = algorithmCategories.map((category) => ({
    ...category,
    items: algorithms.filter((algorithm) => algorithm.category === category.key),
  }));

  return (
    <div className="practice-page">
      <section className="practice-hero">
        <div>
          <p className="practice-eyebrow">Practice hub</p>
          <h2>Search patterns and 40 core algorithms</h2>
          <p>
            Use this page as a guided study tool. Review search patterns used in
            this app, then work through the algorithm catalog with clear steps,
            examples, and the reasoning behind each approach.
          </p>
        </div>
        <div className="practice-actions">
          <a className="practice-button" href="#search-patterns">
            Jump to search patterns
          </a>
          <a className="practice-button practice-button-secondary" href="#algorithm-catalog">
            Jump to algorithm catalog
          </a>
        </div>
      </section>

      <section className="practice-section" id="search-patterns">
        <header className="practice-section-header">
          <div>
            <h2>Search patterns used in modern products</h2>
            <p>
              These patterns help build fast, trustworthy search experiences.
              Each card explains when to use the pattern, why it works, and what
              to watch for.
            </p>
          </div>
        </header>
        <div className="practice-card-grid">
          {searchPatternCards.map((pattern) => (
            <article className="practice-card" key={pattern.title}>
              <h3>{pattern.title}</h3>
              <p className="practice-card-summary">{pattern.summary}</p>
              <ul className="practice-card-list">
                {pattern.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              <p className="practice-card-meta">
                <strong>Why it works:</strong> {pattern.why}
              </p>
              <p className="practice-card-meta">
                <strong>Watch for:</strong> {pattern.watchFor}
              </p>
            </article>
          ))}
        </div>

        <div className="practice-example-grid">
          <DebounceHookExample />
          <SearchThresholdExample minChars={2} />
          <AutocompleteExample />
          <SearchHighlightExample />
          <ResultCachingExample />
          <RequestCancellationExample />
        </div>
      </section>

      <section className="practice-section" id="algorithm-catalog">
        <header className="practice-section-header">
          <div>
            <h2>40 algorithms every programmer should know</h2>
            <p>
              Each algorithm includes a quick summary, a step-by-step solving
              approach, the intuition for why it works, and a concrete example.
            </p>
          </div>
        </header>

        <nav className="practice-toc" aria-label="Algorithm categories">
          {groupedAlgorithms.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="practice-toc-link">
              <span>{category.label}</span>
              <span className="practice-toc-count">{category.items.length}</span>
            </a>
          ))}
        </nav>

        <div className="practice-algorithm-section">
          {groupedAlgorithms.map((category) => (
            <section key={category.id} id={category.id} className="algorithm-group">
              <header className="algorithm-group-header">
                <div>
                  <h3>{category.label}</h3>
                  <p>{category.description}</p>
                </div>
                <span className="algorithm-group-count">
                  {category.items.length} algorithms
                </span>
              </header>
              <div className="practice-algorithm-grid">
                {category.items.map((algorithm) => (
                  <article key={algorithm.id} className="algorithm-card">
                    <header className="algorithm-card-header">
                      <div>
                        <h4>{algorithm.name}</h4>
                        <p className="algorithm-category">{algorithm.category}</p>
                      </div>
                      <span className="algorithm-complexity">{algorithm.complexity}</span>
                    </header>
                    <p className="algorithm-summary">{algorithm.summary}</p>
                    <div className="algorithm-details">
                      <h5>Solve it by</h5>
                      <ol className="algorithm-steps">
                        {algorithm.steps.map((step) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                      <h5>Why it works</h5>
                      <p>{algorithm.why}</p>
                      <h5>Example</h5>
                      <p className="algorithm-example">{algorithm.example}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
