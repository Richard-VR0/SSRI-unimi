from pathlib import Path
import pandas as pd

cartella_script = Path(__file__).parent
aD = pd.read_csv(cartella_script / "data.csv")

print(aD)