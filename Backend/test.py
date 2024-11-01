# import aiohttp
# import asyncio
# import json

# async def test_handle_multiple_code_executions():
#     url = 'http://localhost:9563/find'
#     test_payload = {
#         "test_generation_option": {
#             "generator_id": 7,
#             "params": "1 200000 1 200000"
#         },
#         "code1_payload": {
#             "language": "python",
#             "code": "def solve():\n    a,b = map(int,input().split())\n    res = [i for i in range(a,b+1)]\n    ans = 0\n    while res[0] > 0:\n        res[0] //= 3\n        ans += 1\n    res[1] *= 3\n    for i in range(1,len(res)):\n        while res[i] > 0:\n            res[i] //= 3\n            ans += 1\n    print(ans)\n    pass\nfor i in range(int(input())):\n    solve()"
#         },
#         "code2_payload": {
#             "language": "python",
#             "code": "import math as mt\n# import collections as cll\n# import bisect\n\n\nMOD = 10**9 + 7\nINF = float('inf')\nNINF = float('-inf')\n\n\n# def lb(nums,x):\n#     nums = sorted(nums)\n#     return nums[bisect.bisect_left(nums,x)]\n# def ub(nums,x):\n#     nums = sorted(nums)\n#     return nums[bisect.bisect_right(nums,x)]\ndef inp():\n    return int(input())\ndef sinp():\n    return input().strip()\ndef linp():\n    return list(map(int,input().split()))\ndef lsinp():\n    return list(map(str,input().strip().split()))\ndef minp():\n    return map(int,input().split())\ndef msinp():\n    return map(str,input().strip().split())\n\n\n# Always remember to check 'ub' and 'lb' if used.\np = [0] * (200005)\na = [0] * (200005)\ndef pre():\n    for i in range(1,200005):\n        x = i\n        cnt = 0\n        while x:\n            x//= 3\n            cnt += 1\n        a[i] = cnt\n    p[1] = a[1]\n    for i in range(2,200005):\n        p[i] = (p[i-1] + a[i])\n\ndef solve():\n    l,r = minp()\n    print(p[r] - p[l-1] + a[l])\n\n    pass\n\npre()\nfor i in range(int(input())):\n    solve()"
#         }
#     }

#     async with aiohttp.ClientSession() as session:
#         async with session.post(url, json=test_payload) as response:
#             if response.status == 200:
#                 response_data = await response.json()
#                 print(response_data)
#                 print("Differences:", response_data.get("differences", "No differences"))
#             else:
#                 print(f"Error: {response.status}, {await response.text()}")

# if __name__ == "__main__":
#     asyncio.run(test_handle_multiple_code_executions())

## Groq testing
# import os

# from groq import Groq

# client = Groq(
#     api_key="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",
# )

# chat_completion = client.chat.completions.create(
#     messages=[
#         {
#             "role": "user",
#             "content": "test-case generator for a coding question which has n as array size and n array elements code in python",
#         }
#     ],
#     model="llama3-8b-8192",
# )

# print(chat_completion.choices[0].message.content)



## Groq  