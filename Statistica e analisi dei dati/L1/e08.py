from pathlib import Path
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

cartella_script = Path(__file__).parent
aD = pd.read_csv(cartella_script / "data.csv")

class_frequency = aD['Numero scarpa '].value_counts()
print(class_frequency)
classes = class_frequency.index

frequencies = class_frequency.values

norm_frqs = frequencies/np.sum(frequencies)

scores_a = list(map(float,aD['Altezza (cm)']))

print(scores_a)
plt.hist(scores_a, bins=10,range=(130, 210))
plt.title("persone per altezza in cm")
plt.show()