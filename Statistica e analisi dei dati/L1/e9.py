from pathlib import Path
from os import strerror
import matplotlib.pyplot as plt

percorso_file = Path(__file__).resolve().parent / "pinocchio.txt"

try:
    srcFile = open(percorso_file, "r", encoding="utf-8")
except OSError as e:
    print("I/O Error occurred:", strerror(e.errno))
    raise SystemExit

histogramDic = {}

for line in srcFile:
    for ch in line:
        if ch.isalpha():
            ch = ch.lower()
            histogramDic[ch] = histogramDic.get(ch, 0) + 1

srcFile.close()

sorted_dict = dict(sorted(histogramDic.items()))

print(sorted_dict)

plt.bar(sorted_dict.keys(), sorted_dict.values(), color="g")
plt.show()