import random

minN, maxN = map(int,input().split())
minM, maxM = map(int,input().split())

N = random.randint(minN, maxN)
M = random.randint(minM, maxM)

# gen output
print(N,M)