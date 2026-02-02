export const diagramById = {
  'linear-search': 'array-scan',
  'binary-search': 'array-halving',
  'jump-search': 'array-halving',
  'interpolation-search': 'array-halving',
  'exponential-search': 'array-halving',
  'bubble-sort': 'sorting-basic',
  'selection-sort': 'sorting-basic',
  'insertion-sort': 'sorting-basic',
  'merge-sort': 'sorting-merge',
  'quick-sort': 'sorting-quick',
  'heap-sort': 'sorting-heap',
  'counting-sort': 'sorting-buckets',
  'radix-sort': 'sorting-buckets',
  'bucket-sort': 'sorting-buckets',
  'breadth-first-search': 'graph-basic',
  'depth-first-search': 'graph-basic',
  dijkstra: 'graph-weighted',
  'bellman-ford': 'graph-weighted',
  'floyd-warshall': 'graph-matrix',
  'a-star': 'graph-weighted',
  'topological-sort': 'graph-dag',
  kruskal: 'graph-mst',
  prim: 'graph-mst',
  'union-find': 'structure-union',
  'trie-operations': 'structure-trie',
  'fibonacci-memoization': 'dp-grid',
  'longest-increasing-subsequence': 'dp-grid',
  'longest-common-subsequence': 'dp-grid',
  'knapsack-01': 'dp-grid',
  'coin-change': 'dp-grid',
  'edit-distance': 'dp-grid',
  'matrix-chain-multiplication': 'dp-grid',
  kadanes: 'subarray',
  kmp: 'string-match',
  'rabin-karp': 'string-match',
  'activity-selection': 'intervals',
  'huffman-coding': 'huffman',
  'euclidean-gcd': 'math-basic',
  'sieve-of-eratosthenes': 'math-sieve',
  'binary-exponentiation': 'math-basic',
};

export const algorithmSolutions = {
  'linear-search': {
    python: `def linear_search(nums, target):
    for index, value in enumerate(nums):
        if value == target:
            return index
    return -1`,
    javascript: `function linearSearch(nums, target) {
  for (let i = 0; i < nums.length; i += 1) {
    if (nums[i] === target) return i;
  }
  return -1;
}`,
  },
  'binary-search': {
    python: `def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    javascript: `function binarySearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
  },
  'jump-search': {
    python: `import math

def jump_search(nums, target):
    n = len(nums)
    step = int(math.sqrt(n))
    prev = 0
    while prev < n and nums[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
    for i in range(prev, min(step, n)):
        if nums[i] == target:
            return i
    return -1`,
    javascript: `function jumpSearch(nums, target) {
  const n = nums.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  let next = step;
  while (prev < n && nums[Math.min(next, n) - 1] < target) {
    prev = next;
    next += step;
  }
  for (let i = prev; i < Math.min(next, n); i += 1) {
    if (nums[i] === target) return i;
  }
  return -1;
}`,
  },
  'interpolation-search': {
    python: `def interpolation_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high and target >= nums[low] and target <= nums[high]:
        if nums[high] == nums[low]:
            return low if nums[low] == target else -1
        pos = low + int((high - low) * (target - nums[low]) / (nums[high] - nums[low]))
        if nums[pos] == target:
            return pos
        if nums[pos] < target:
            low = pos + 1
        else:
            high = pos - 1
    return -1`,
    javascript: `function interpolationSearch(nums, target) {
  let low = 0;
  let high = nums.length - 1;
  while (low <= high && target >= nums[low] && target <= nums[high]) {
    if (nums[high] === nums[low]) {
      return nums[low] === target ? low : -1;
    }
    const pos =
      low +
      Math.floor(((high - low) * (target - nums[low])) / (nums[high] - nums[low]));
    if (nums[pos] === target) return pos;
    if (nums[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`,
  },
  'exponential-search': {
    python: `def exponential_search(nums, target):
    if not nums:
        return -1
    if nums[0] == target:
        return 0
    bound = 1
    while bound < len(nums) and nums[bound] < target:
        bound *= 2
    return binary_search_range(nums, target, bound // 2, min(bound, len(nums) - 1))

def binary_search_range(nums, target, low, high):
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,
    javascript: `function exponentialSearch(nums, target) {
  if (!nums.length) return -1;
  if (nums[0] === target) return 0;
  let bound = 1;
  while (bound < nums.length && nums[bound] < target) {
    bound *= 2;
  }
  return binarySearchRange(nums, target, Math.floor(bound / 2), Math.min(bound, nums.length - 1));
}

function binarySearchRange(nums, target, low, high) {
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
  },
  'bubble-sort': {
    python: `def bubble_sort(nums):
    arr = nums[:]
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
    javascript: `function bubbleSort(nums) {
  const arr = nums.slice();
  for (let i = 0; i < arr.length; i += 1) {
    let swapped = false;
    for (let j = 0; j < arr.length - i - 1; j += 1) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
  },
  'selection-sort': {
    python: `def selection_sort(nums):
    arr = nums[:]
    for i in range(len(arr)):
        min_index = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]
    return arr`,
    javascript: `function selectionSort(nums) {
  const arr = nums.slice();
  for (let i = 0; i < arr.length; i += 1) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j += 1) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}`,
  },
  'insertion-sort': {
    python: `def insertion_sort(nums):
    arr = nums[:]
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    javascript: `function insertionSort(nums) {
  const arr = nums.slice();
  for (let i = 1; i < arr.length; i += 1) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j -= 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
  },
  'merge-sort': {
    python: `def merge_sort(items):
    if len(items) <= 1:
        return items
    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]`,
    javascript: `function mergeSort(items) {
  if (items.length <= 1) return items;
  const mid = Math.floor(items.length / 2);
  const left = mergeSort(items.slice(0, mid));
  const right = mergeSort(items.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i), right.slice(j));
}`,
  },
  'quick-sort': {
    python: `def quick_sort(nums):
    arr = nums[:]

    def partition(low, high):
        pivot = arr[high]
        i = low
        for j in range(low, high):
            if arr[j] <= pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1
        arr[i], arr[high] = arr[high], arr[i]
        return i

    def sort(low, high):
        if low < high:
            pivot = partition(low, high)
            sort(low, pivot - 1)
            sort(pivot + 1, high)

    sort(0, len(arr) - 1)
    return arr`,
    javascript: `function quickSort(nums) {
  const arr = nums.slice();

  function partition(low, high) {
    const pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j += 1) {
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i += 1;
      }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    return i;
  }

  function sort(low, high) {
    if (low < high) {
      const pivot = partition(low, high);
      sort(low, pivot - 1);
      sort(pivot + 1, high);
    }
  }

  sort(0, arr.length - 1);
  return arr;
}`,
  },
  'heap-sort': {
    python: `def heap_sort(nums):
    arr = nums[:]
    n = len(arr)

    def heapify(size, index):
        largest = index
        left = 2 * index + 1
        right = 2 * index + 2
        if left < size and arr[left] > arr[largest]:
            largest = left
        if right < size and arr[right] > arr[largest]:
            largest = right
        if largest != index:
            arr[index], arr[largest] = arr[largest], arr[index]
            heapify(size, largest)

    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)

    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)
    return arr`,
    javascript: `function heapSort(nums) {
  const arr = nums.slice();

  function heapify(size, index) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    if (left < size && arr[left] > arr[largest]) largest = left;
    if (right < size && arr[right] > arr[largest]) largest = right;
    if (largest !== index) {
      [arr[index], arr[largest]] = [arr[largest], arr[index]];
      heapify(size, largest);
    }
  }

  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i -= 1) {
    heapify(arr.length, i);
  }

  for (let i = arr.length - 1; i > 0; i -= 1) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(i, 0);
  }
  return arr;
}`,
  },
  'counting-sort': {
    python: `def counting_sort(nums):
    if not nums:
        return []
    max_value = max(nums)
    counts = [0] * (max_value + 1)
    for num in nums:
        counts[num] += 1
    result = []
    for value, count in enumerate(counts):
        result.extend([value] * count)
    return result`,
    javascript: `function countingSort(nums) {
  if (!nums.length) return [];
  const maxValue = Math.max(...nums);
  const counts = Array(maxValue + 1).fill(0);
  for (const num of nums) counts[num] += 1;
  const result = [];
  counts.forEach((count, value) => {
    for (let i = 0; i < count; i += 1) result.push(value);
  });
  return result;
}`,
  },
  'radix-sort': {
    python: `def radix_sort(nums):
    if not nums:
        return []
    arr = nums[:]
    exp = 1
    max_value = max(arr)
    while max_value // exp > 0:
        arr = counting_by_digit(arr, exp)
        exp *= 10
    return arr

def counting_by_digit(arr, exp):
    output = [0] * len(arr)
    counts = [0] * 10
    for num in arr:
        index = (num // exp) % 10
        counts[index] += 1
    for i in range(1, 10):
        counts[i] += counts[i - 1]
    for i in range(len(arr) - 1, -1, -1):
        index = (arr[i] // exp) % 10
        output[counts[index] - 1] = arr[i]
        counts[index] -= 1
    return output`,
    javascript: `function radixSort(nums) {
  if (!nums.length) return [];
  let arr = nums.slice();
  let exp = 1;
  const maxValue = Math.max(...arr);
  while (Math.floor(maxValue / exp) > 0) {
    arr = countingByDigit(arr, exp);
    exp *= 10;
  }
  return arr;
}

function countingByDigit(arr, exp) {
  const output = Array(arr.length).fill(0);
  const counts = Array(10).fill(0);
  for (const num of arr) counts[Math.floor(num / exp) % 10] += 1;
  for (let i = 1; i < counts.length; i += 1) counts[i] += counts[i - 1];
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    const index = Math.floor(arr[i] / exp) % 10;
    output[counts[index] - 1] = arr[i];
    counts[index] -= 1;
  }
  return output;
}`,
  },
  'bucket-sort': {
    python: `def bucket_sort(nums, bucket_count=5):
    if not nums:
        return []
    buckets = [[] for _ in range(bucket_count)]
    for num in nums:
        index = min(bucket_count - 1, int(num * bucket_count))
        buckets[index].append(num)
    result = []
    for bucket in buckets:
        result.extend(sorted(bucket))
    return result`,
    javascript: `function bucketSort(nums, bucketCount = 5) {
  if (!nums.length) return [];
  const buckets = Array.from({ length: bucketCount }, () => []);
  for (const num of nums) {
    const index = Math.min(bucketCount - 1, Math.floor(num * bucketCount));
    buckets[index].push(num);
  }
  const result = [];
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
    result.push(...bucket);
  }
  return result;
}`,
  },
  'breadth-first-search': {
    python: `from collections import deque

def bfs(graph, start):
    visited = {start}
    order = []
    queue = deque([start])
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
    javascript: `function bfs(graph, start) {
  const visited = new Set([start]);
  const order = [];
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
  },
  'depth-first-search': {
    python: `def dfs(graph, start, visited=None, order=None):
    if visited is None:
        visited = set()
    if order is None:
        order = []
    visited.add(start)
    order.append(start)
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)
    return order`,
    javascript: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);
  for (const neighbor of graph[start] ?? []) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order);
    }
  }
  return order;
}`,
  },
  dijkstra: {
    python: `import heapq

def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    heap = [(0, start)]
    while heap:
        dist, node = heapq.heappop(heap)
        if dist > distances[node]:
            continue
        for neighbor, weight in graph[node]:
            new_dist = dist + weight
            if new_dist < distances[neighbor]:
                distances[neighbor] = new_dist
                heapq.heappush(heap, (new_dist, neighbor))
    return distances`,
    javascript: `function dijkstra(graph, start) {
  const distances = Object.fromEntries(Object.keys(graph).map((key) => [key, Infinity]));
  distances[start] = 0;
  const queue = [[0, start]];
  while (queue.length) {
    queue.sort((a, b) => a[0] - b[0]);
    const [dist, node] = queue.shift();
    if (dist !== distances[node]) continue;
    for (const [neighbor, weight] of graph[node]) {
      const newDist = dist + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        queue.push([newDist, neighbor]);
      }
    }
  }
  return distances;
}`,
  },
  'bellman-ford': {
    python: `def bellman_ford(edges, vertex_count, start):
    dist = [float('inf')] * vertex_count
    dist[start] = 0
    for _ in range(vertex_count - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated:
            break
    has_negative_cycle = False
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            has_negative_cycle = True
            break
    return dist, has_negative_cycle`,
    javascript: `function bellmanFord(edges, vertexCount, start) {
  const dist = Array(vertexCount).fill(Infinity);
  dist[start] = 0;
  for (let i = 0; i < vertexCount - 1; i += 1) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }
    if (!updated) break;
  }
  let hasNegativeCycle = false;
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegativeCycle = true;
      break;
    }
  }
  return { dist, hasNegativeCycle };
}`,
  },
  'floyd-warshall': {
    python: `def floyd_warshall(matrix):
    dist = [row[:] for row in matrix]
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
    javascript: `function floydWarshall(matrix) {
  const dist = matrix.map((row) => row.slice());
  const n = dist.length;
  for (let k = 0; k < n; k += 1) {
    for (let i = 0; i < n; i += 1) {
      for (let j = 0; j < n; j += 1) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }
  return dist;
}`,
  },
  'a-star': {
    python: `import heapq

def a_star(graph, start, goal, heuristic):
    open_set = [(0, start)]
    came_from = {}
    g_score = {start: 0}
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            return reconstruct_path(came_from, current)
        for neighbor, weight in graph[current]:
            tentative = g_score[current] + weight
            if tentative < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative
                priority = tentative + heuristic(neighbor, goal)
                heapq.heappush(open_set, (priority, neighbor))
    return []

def reconstruct_path(came_from, current):
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    return list(reversed(path))`,
    javascript: `function aStar(graph, start, goal, heuristic) {
  const openSet = [[0, start]];
  const cameFrom = {};
  const gScore = { [start]: 0 };
  while (openSet.length) {
    openSet.sort((a, b) => a[0] - b[0]);
    const [, current] = openSet.shift();
    if (current === goal) return reconstructPath(cameFrom, current);
    for (const [neighbor, weight] of graph[current]) {
      const tentative = gScore[current] + weight;
      if (tentative < (gScore[neighbor] ?? Infinity)) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentative;
        const priority = tentative + heuristic(neighbor, goal);
        openSet.push([priority, neighbor]);
      }
    }
  }
  return [];
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom[current]) {
    current = cameFrom[current];
    path.push(current);
  }
  return path.reverse();
}`,
  },
  'topological-sort': {
    python: `def topological_sort(graph):
    in_degree = {node: 0 for node in graph}
    for node in graph:
        for neighbor in graph[node]:
            in_degree[neighbor] += 1
    queue = [node for node in graph if in_degree[node] == 0]
    order = []
    while queue:
        node = queue.pop(0)
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    return order`,
    javascript: `function topologicalSort(graph) {
  const inDegree = Object.fromEntries(Object.keys(graph).map((node) => [node, 0]));
  for (const node of Object.keys(graph)) {
    for (const neighbor of graph[node]) inDegree[neighbor] += 1;
  }
  const queue = Object.keys(inDegree).filter((node) => inDegree[node] === 0);
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      inDegree[neighbor] -= 1;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return order;
}`,
  },
  kruskal: {
    python: `def kruskal(vertices, edges):
    parent = {v: v for v in vertices}
    rank = {v: 0 for v in vertices}

    def find(v):
        while parent[v] != v:
            parent[v] = parent[parent[v]]
            v = parent[v]
        return v

    def union(a, b):
        root_a = find(a)
        root_b = find(b)
        if root_a == root_b:
            return False
        if rank[root_a] < rank[root_b]:
            parent[root_a] = root_b
        elif rank[root_a] > rank[root_b]:
            parent[root_b] = root_a
        else:
            parent[root_b] = root_a
            rank[root_a] += 1
        return True

    mst = []
    for weight, u, v in sorted(edges):
        if union(u, v):
            mst.append((u, v, weight))
    return mst`,
    javascript: `function kruskal(vertices, edges) {
  const parent = Object.fromEntries(vertices.map((v) => [v, v]));
  const rank = Object.fromEntries(vertices.map((v) => [v, 0]));

  function find(v) {
    if (parent[v] !== v) parent[v] = find(parent[v]);
    return parent[v];
  }

  function union(a, b) {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA === rootB) return false;
    if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;
    else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;
    else {
      parent[rootB] = rootA;
      rank[rootA] += 1;
    }
    return true;
  }

  const mst = [];
  edges
    .slice()
    .sort((a, b) => a[0] - b[0])
    .forEach(([weight, u, v]) => {
      if (union(u, v)) mst.push([u, v, weight]);
    });
  return mst;
}`,
  },
  prim: {
    python: `import heapq

def prim(graph, start):
    visited = {start}
    heap = [(weight, start, neighbor) for neighbor, weight in graph[start]]
    heapq.heapify(heap)
    mst = []
    while heap:
        weight, u, v = heapq.heappop(heap)
        if v in visited:
            continue
        visited.add(v)
        mst.append((u, v, weight))
        for neighbor, next_weight in graph[v]:
            if neighbor not in visited:
                heapq.heappush(heap, (next_weight, v, neighbor))
    return mst`,
    javascript: `function prim(graph, start) {
  const visited = new Set([start]);
  const heap = graph[start].map(([neighbor, weight]) => [weight, start, neighbor]);
  const mst = [];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [weight, u, v] = heap.shift();
    if (visited.has(v)) continue;
    visited.add(v);
    mst.push([u, v, weight]);
    for (const [neighbor, nextWeight] of graph[v]) {
      if (!visited.has(neighbor)) heap.push([nextWeight, v, neighbor]);
    }
  }
  return mst;
}`,
  },
  'union-find': {
    python: `class UnionFind:
    def __init__(self, size):
        self.parent = list(range(size))
        self.rank = [0] * size

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a, b):
        root_a = self.find(a)
        root_b = self.find(b)
        if root_a == root_b:
            return False
        if self.rank[root_a] < self.rank[root_b]:
            self.parent[root_a] = root_b
        elif self.rank[root_a] > self.rank[root_b]:
            self.parent[root_b] = root_a
        else:
            self.parent[root_b] = root_a
            self.rank[root_a] += 1
        return True`,
    javascript: `class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(a, b) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA === rootB) return false;
    if (this.rank[rootA] < this.rank[rootB]) this.parent[rootA] = rootB;
    else if (this.rank[rootA] > this.rank[rootB]) this.parent[rootB] = rootA;
    else {
      this.parent[rootB] = rootA;
      this.rank[rootA] += 1;
    }
    return true;
  }
}`,
  },
  'trie-operations': {
    python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.is_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_word`,
    javascript: `class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isWord = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isWord;
  }
}`,
  },
  'fibonacci-memoization': {
    python: `def fib(n, memo=None):
    if memo is None:
        memo = {0: 0, 1: 1}
    if n in memo:
        return memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]`,
    javascript: `function fib(n, memo = { 0: 0, 1: 1 }) {
  if (memo[n] !== undefined) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
  },
  'longest-increasing-subsequence': {
    python: `import bisect

def lis_length(nums):
    tails = []
    for num in nums:
        index = bisect.bisect_left(tails, num)
        if index == len(tails):
            tails.append(num)
        else:
            tails[index] = num
    return len(tails)`,
    javascript: `function lisLength(nums) {
  const tails = [];
  for (const num of nums) {
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) left = mid + 1;
      else right = mid;
    }
    tails[left] = num;
  }
  return tails.length;
}`,
  },
  'longest-common-subsequence': {
    python: `def lcs_length(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
    javascript: `function lcsLength(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[a.length][b.length];
}`,
  },
  'knapsack-01': {
    python: `def knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for cap in range(capacity, weight - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - weight] + value)
    return dp[capacity]`,
    javascript: `function knapsack(weights, values, capacity) {
  const dp = Array(capacity + 1).fill(0);
  for (let i = 0; i < weights.length; i += 1) {
    const weight = weights[i];
    const value = values[i];
    for (let cap = capacity; cap >= weight; cap -= 1) {
      dp[cap] = Math.max(dp[cap], dp[cap - weight] + value);
    }
  }
  return dp[capacity];
}`,
  },
  'coin-change': {
    python: `def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for value in range(coin, amount + 1):
            dp[value] = min(dp[value], dp[value - coin] + 1)
    return dp[amount] if dp[amount] <= amount else -1`,
    javascript: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (const coin of coins) {
    for (let value = coin; value <= amount; value += 1) {
      dp[value] = Math.min(dp[value], dp[value - coin] + 1);
    }
  }
  return dp[amount] <= amount ? dp[amount] : -1;
}`,
  },
  'edit-distance': {
    python: `def edit_distance(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(
                    dp[i - 1][j],
                    dp[i][j - 1],
                    dp[i - 1][j - 1],
                )
    return dp[m][n]`,
    javascript: `function editDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i - 1][j],
            dp[i][j - 1],
            dp[i - 1][j - 1],
          );
      }
    }
  }
  return dp[a.length][b.length];
}`,
  },
  'matrix-chain-multiplication': {
    python: `def matrix_chain(dims):
    n = len(dims) - 1
    dp = [[0] * n for _ in range(n)]
    for length in range(2, n + 1):
        for i in range(0, n - length + 1):
            j = i + length - 1
            dp[i][j] = float('inf')
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1]
                dp[i][j] = min(dp[i][j], cost)
    return dp[0][n - 1]`,
    javascript: `function matrixChain(dims) {
  const n = dims.length - 1;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  for (let length = 2; length <= n; length += 1) {
    for (let i = 0; i <= n - length; i += 1) {
      const j = i + length - 1;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k += 1) {
        const cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1];
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }
  return dp[0][n - 1];
}`,
  },
  kadanes: {
    python: `def max_subarray(nums):
    best = nums[0]
    current = 0
    for value in nums:
        current = max(value, current + value)
        best = max(best, current)
    return best`,
    javascript: `function maxSubarray(nums) {
  let best = nums[0];
  let current = 0;
  for (const value of nums) {
    current = Math.max(value, current + value);
    best = Math.max(best, current);
  }
  return best;
}`,
  },
  kmp: {
    python: `def kmp_search(text, pattern):
    if not pattern:
        return 0
    lps = build_lps(pattern)
    i = j = 0
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1
            j += 1
            if j == len(pattern):
                return i - j
        elif j > 0:
            j = lps[j - 1]
        else:
            i += 1
    return -1

def build_lps(pattern):
    lps = [0] * len(pattern)
    length = 0
    i = 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length > 0:
            length = lps[length - 1]
        else:
            i += 1
    return lps`,
    javascript: `function kmpSearch(text, pattern) {
  if (!pattern) return 0;
  const lps = buildLps(pattern);
  let i = 0;
  let j = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i += 1;
      j += 1;
      if (j === pattern.length) return i - j;
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i += 1;
    }
  }
  return -1;
}

function buildLps(pattern) {
  const lps = Array(pattern.length).fill(0);
  let length = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[length]) {
      length += 1;
      lps[i] = length;
      i += 1;
    } else if (length > 0) {
      length = lps[length - 1];
    } else {
      i += 1;
    }
  }
  return lps;
}`,
  },
  'rabin-karp': {
    python: `def rabin_karp(text, pattern, base=256, mod=101):
    if not pattern:
        return 0
    n, m = len(text), len(pattern)
    if m > n:
        return -1
    high = pow(base, m - 1, mod)
    pattern_hash = 0
    window_hash = 0
    for i in range(m):
        pattern_hash = (base * pattern_hash + ord(pattern[i])) % mod
        window_hash = (base * window_hash + ord(text[i])) % mod
    for i in range(n - m + 1):
        if pattern_hash == window_hash and text[i : i + m] == pattern:
            return i
        if i < n - m:
            window_hash = (
                base * (window_hash - ord(text[i]) * high) + ord(text[i + m])
            ) % mod
            window_hash = (window_hash + mod) % mod
    return -1`,
    javascript: `function rabinKarp(text, pattern, base = 256, mod = 101) {
  if (!pattern) return 0;
  const n = text.length;
  const m = pattern.length;
  if (m > n) return -1;
  let high = 1;
  for (let i = 0; i < m - 1; i += 1) high = (high * base) % mod;
  let patternHash = 0;
  let windowHash = 0;
  for (let i = 0; i < m; i += 1) {
    patternHash = (base * patternHash + pattern.charCodeAt(i)) % mod;
    windowHash = (base * windowHash + text.charCodeAt(i)) % mod;
  }
  for (let i = 0; i <= n - m; i += 1) {
    if (patternHash === windowHash && text.slice(i, i + m) === pattern) return i;
    if (i < n - m) {
      windowHash =
        (base * (windowHash - text.charCodeAt(i) * high) + text.charCodeAt(i + m)) %
        mod;
      windowHash = (windowHash + mod) % mod;
    }
  }
  return -1;
}`,
  },
  'activity-selection': {
    python: `def activity_selection(activities):
    activities = sorted(activities, key=lambda x: x[1])
    selected = []
    current_end = float('-inf')
    for start, finish in activities:
        if start >= current_end:
            selected.append((start, finish))
            current_end = finish
    return selected`,
    javascript: `function activitySelection(activities) {
  const sorted = activities.slice().sort((a, b) => a[1] - b[1]);
  const selected = [];
  let currentEnd = -Infinity;
  for (const [start, finish] of sorted) {
    if (start >= currentEnd) {
      selected.push([start, finish]);
      currentEnd = finish;
    }
  }
  return selected;
}`,
  },
  'huffman-coding': {
    python: `import heapq

def huffman_codes(frequencies):
    heap = [[weight, [symbol, '']] for symbol, weight in frequencies.items()]
    heapq.heapify(heap)
    while len(heap) > 1:
        low = heapq.heappop(heap)
        high = heapq.heappop(heap)
        for pair in low[1:]:
            pair[1] = '0' + pair[1]
        for pair in high[1:]:
            pair[1] = '1' + pair[1]
        heapq.heappush(heap, [low[0] + high[0]] + low[1:] + high[1:])
    return {symbol: code for symbol, code in heap[0][1:]}`,
    javascript: `function huffmanCodes(frequencies) {
  let heap = Object.entries(frequencies).map(([symbol, weight]) => [weight, [symbol, ""]]);
  while (heap.length > 1) {
    heap.sort((a, b) => a[0] - b[0]);
    const low = heap.shift();
    const high = heap.shift();
    for (const pair of low.slice(1)) pair[1] = "0" + pair[1];
    for (const pair of high.slice(1)) pair[1] = "1" + pair[1];
    heap.push([low[0] + high[0], ...low.slice(1), ...high.slice(1)]);
  }
  return Object.fromEntries(heap[0].slice(1));
}`,
  },
  'euclidean-gcd': {
    python: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a`,
    javascript: `function gcd(a, b) {
  let x = a;
  let y = b;
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return x;
}`,
  },
  'sieve-of-eratosthenes': {
    python: `def sieve(limit):
    is_prime = [True] * (limit + 1)
    is_prime[0] = is_prime[1] = False
    p = 2
    while p * p <= limit:
        if is_prime[p]:
            for multiple in range(p * p, limit + 1, p):
                is_prime[multiple] = False
        p += 1
    return [i for i, prime in enumerate(is_prime) if prime]`,
    javascript: `function sieve(limit) {
  const isPrime = Array(limit + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (let p = 2; p * p <= limit; p += 1) {
    if (isPrime[p]) {
      for (let multiple = p * p; multiple <= limit; multiple += p) {
        isPrime[multiple] = false;
      }
    }
  }
  return isPrime.map((prime, value) => (prime ? value : null)).filter((value) => value !== null);
}`,
  },
  'binary-exponentiation': {
    python: `def fast_pow(base, exponent):
    result = 1
    while exponent > 0:
        if exponent % 2 == 1:
            result *= base
        base *= base
        exponent //= 2
    return result`,
    javascript: `function fastPow(base, exponent) {
  let result = 1;
  let exp = exponent;
  let current = base;
  while (exp > 0) {
    if (exp % 2 === 1) result *= current;
    current *= current;
    exp = Math.floor(exp / 2);
  }
  return result;
}`,
  },
};
