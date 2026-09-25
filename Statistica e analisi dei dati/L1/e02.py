from pathlib import Path
import pandas as pd

cartella_script = Path(__file__).parent
aD = pd.read_csv(cartella_script / "data.csv")

scores = aD['Numero scarpa ']

print('type:', type(scores))
num_elem = scores.size
max_elem = scores.max()
min_elem = scores.min()
range_elem = max_elem- min_elem

print (f'Il numero di campioni è {num_elem}')
print (f'Il massimo è {max_elem}')
print (f'Il minimo è {min_elem}')

print (f'il range è {range_elem}')