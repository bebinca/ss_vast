from datasketch import WeightedMinHashGenerator

x = [1, 2]
y = [1, 0]
length = max(len(x), len(y))
if len(x) < length:
    x = x + [0 for temp in range(length-len(x))]
else:
    y = y + [0 for temp in range(length-len(y))]
print(x)
print(y)
# WeightedMinHashGenerator requires dimension as the first argument
wmg = WeightedMinHashGenerator(length)
wm1 = wmg.minhash(x) # wm1 is of the type WeightedMinHash
wm2 = wmg.minhash(y)
print("Estimated Jaccard is", wm1.jaccard(wm2))
