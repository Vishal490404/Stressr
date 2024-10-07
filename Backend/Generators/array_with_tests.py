import random

class ChoiceConstraint:
    def __init__(self, choices):
        self.choices = list(choices)

    def next(self):
        return random.choice(self.choices)

class ArrayGenerator:
    def __init__(self, N, V):
        self.N = N
        self.V = V

    def standard(self):
        return [self.V.next() for _ in range(self.N)]

minT = 1
minN, maxN = map(int, input().split())
minArrayElement, maxArrayElement = map(int, input().split())

V = ChoiceConstraint(range(minArrayElement, maxArrayElement + 1))

T = minT
print(T)
for _ in range(T):
    N = random.randint(1, min(maxN, 20))
    gen_array = ArrayGenerator(N, V)
    result = gen_array.standard()
    
    print(N)
    print(*result)
