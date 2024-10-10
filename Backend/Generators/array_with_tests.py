import random

def generate_array(N, min_array_element, max_array_element):
    return [random.randint(min_array_element, max_array_element) for _ in range(N)]

minT = 1
minN, maxN, minArrayElement, maxArrayElement = map(int, input().split())

T = minT
print(T)
for _ in range(T):
    N = random.randint(1, min(maxN, 20))
    result = generate_array(N, minArrayElement, maxArrayElement)
    
    print(N)
    print(*result)
