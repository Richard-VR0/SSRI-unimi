from pathlib import Path
import pandas as pd
import numpy as np

cartella_script = Path(__file__).parent
aD = pd.read_csv(cartella_script / "data.csv")

class_frequency = aD['Numero scarpa '].value_counts()
classes = class_frequency.index

frequencies = class_frequency.values

print(classes)
print(np.mean(classes))
print(np.average(classes, weights=frequencies))