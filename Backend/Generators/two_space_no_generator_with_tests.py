import random


minT = 1
minN, maxN = map(int,input().split())
minM, maxM = map(int,input().split())
T = minT

# gen output
print(T)
for _ in range(T):
    N = random.randint(minN, maxN)
    M = random.randint(minM, maxM)
    print(N,M)