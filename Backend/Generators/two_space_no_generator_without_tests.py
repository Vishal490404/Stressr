import random

minN, maxN, minM, maxM = map(int,input().split())

N = random.randint(minN, maxN)
M = random.randint(minM, maxM)

# gen output
print(N,M)