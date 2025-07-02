from collections import defaultdict
from app.models import SystemInput
from app.llm_generator import generate_failure_summary


def build_graph(dependencies):
    graph = defaultdict(list)
    rev_graph = defaultdict(list)

    for src,targets in dependencies.items():
        for tgt in targets:
            graph[src].append(tgt)
            rev_graph[tgt].append(src)
    return graph, rev_graph

def dfs_backtrace(node, rev_graph,visited,path,all_paths):
    visited.add(node)
    path.append(node)

    if not rev_graph[node]:
        all_paths.append(path[:])
    else:
        for parent in rev_graph[node]:
            if parent not in visited:
                dfs_backtrace(parent, rev_graph, visited, path, all_paths)

    path.pop()
    visited.remove(node)

def analyze_failures(input_data: SystemInput):
    graph, rev_graph = build_graph(input_data.dependencies)
    result = {}
    for failed_node in input_data.failures:
        visited = set()
        all_paths = []
        dfs_backtrace(failed_node, rev_graph, visited, [], all_paths)
        readable_paths = [" → ".join(path[::-1]) for path in all_paths]
        cascading = simulate_cascading_failures([failed_node], graph)
        summary = generate_failure_summary(failed_node,readable_paths,cascading)
        result[failed_node] = {
            "root_causes" : readable_paths or ["No upstream root cause failure detected."],
            "cascading_failures": cascading or ["No dependent failures detected."],
            "summary" : summary
        }
    return {"failure_analysis": result}

def simulate_cascading_failures(start_nodes,graph):
    failed = set(start_nodes)
    queue = list(start_nodes)

    while queue: 
        current = queue.pop(0)
        for neighbor in graph[current]:
            if neighbor not in failed:
                failed.add(neighbor)
                queue.append(neighbor)

    return list(failed - set(start_nodes))


