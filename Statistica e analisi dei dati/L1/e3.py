from pathlib import Path
import pandas as pd

cartella_script = Path(__file__).parent
aD = pd.read_csv(cartella_script / "data.csv")

class_frequency = aD['Numero scarpa '].value_counts()
print(class_frequency)
classes = class_frequency.index

frequencies = class_frequency.values