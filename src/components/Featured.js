import React from "react";

const codes = [
  {
   id: 1,
title: "Minimum Spanning Tree",
code: "#include<bits/stdc++.h>\nusing namespace std;\n\nconst int N = 1e5 + 5;\nvector<pair<int, int>> adj[N];\nbool vis[N];\nint par[N], dist[N];\n\nint prims(int n, int src) {\n    for(int i=1; i<=n; i++) {\n        dist[i] = 1e9;\n    }\n    dist[src] = 0;\n    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;\n    pq.push({0, src});\n    int mst = 0;\n    while(!pq.empty()) {\n        pair<int, int> curr = pq.top(); pq.pop();\n        int u = curr.second, wt = curr.first;\n        if(vis[u]) {\n            continue;\n        }\n        vis[u] = true;\n        mst += wt;\n        for(auto v: adj[u]) {\n            int to = v.first, w = v.second;\n            if(!vis[to] && w < dist[to]) {\n                dist[to] = w;\n                par[to] = u;\n                pq.push({w, to});\n            }\n        }\n    }\n    return mst;\n}\n\nint main() {\n    // Your code here\n    int n, m; cin>>n>>m;\n    for(int i=0; i<m; i++) {\n        int u, v, w; cin>>u>>v>>w;\n        adj[u].push_back({v, w});\n        adj[v].push_back({u, w});\n    }\n    int mst = prims(n, 1);\n    cout<<mst<<endl;\n    return 0;\n}"

  },
  {
    id: 2,
    title: "Memoization Template",
    code: "#include <bits/stdc++.h>\nusing namespace std;\n\nint memo[100];\n\nint fib(int n) {\n  if (memo[n] != -1) {\n    return memo[n];\n  }\n  if (n <= 1) {\n    return n;\n  }\n  int res = fib(n - 1) + fib(n - 2);\n  memo[n] = res;\n  return res;\n}\n\nint main() {\n  memset(memo, -1, sizeof(memo));\n  // Your code here\n  return 0;\n}"
  },
  {
    id: 3,
    title: "Binary Search",
    code: "#include <bits/stdc++.h>\nusing namespace std;\n\nint binarySearch(vector<int>& arr, int target) {\n  int left = 0, right = arr.size() - 1;\n  while (left <= right) {\n    int mid = left + (right - left) / 2;\n    if (arr[mid] == target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n  return -1;\n}\n\nint main() {\n  vector<int> arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};\n  int target = 7;\n  int index = binarySearch(arr, target);\n  // Your code here\n  return 0;\n}"
  }
];

const FeaturedCodes = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Featured Codes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {codes.map((code) => (
          <div key={code.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {code.title}
              </h2>
              <div className="h-40 overflow-y-auto">
                <pre className="bg-gray-100 p-2 rounded-md text-sm text-gray-800">
                  {code.code}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-800 mt-8">
        <p className="font-bold mb-2">Note:</p>
        <p>
         Hi, Ashish here, This page is a work in progress, I will make this page realtime using mongodb server , and will provide rating option for featured posts and anyone would be able to post thier particular code or post. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default FeaturedCodes;

