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

minN, maxN = map(int, input().split())
minArrayElement, maxArrayElement = map(int, input().split())

N = random.randint(1, min(maxN, 20)) 
V = ChoiceConstraint(range(minArrayElement, maxArrayElement + 1))

gen_array = ArrayGenerator(N, V)
result = gen_array.standard()

print(N)
print(*result)
