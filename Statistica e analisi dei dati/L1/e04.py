from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt

cartella_script = Path(__file__).parent
aD = pd.read_csv(cartella_script / "data.csv")

class_frequency = aD['Numero scarpa '].value_counts()
print(class_frequency)
classes = class_frequency.index

frequencies = class_frequency.values

plt.bar(classes, frequencies, color ='maroon', width = 0.6)
plt.xlabel("taglia scarpa")
plt.ylabel("persone")
plt.title("persone per taglia di scarpa")
plt.show()