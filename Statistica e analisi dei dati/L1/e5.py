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

plt.bar(classes, norm_frqs*100, color ='maroon', width = 0.6)
plt.xlabel("taglia scarpa")
plt.ylabel("percentuale di persone")
plt.title("persone per taglia di scarpa")
plt.show()