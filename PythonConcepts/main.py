
import runpy
from pathlib import Path

base_path = Path(__file__).parent

files = [
    "01_object_and_data_structures.py",
    "02_comparison_operators.py",
    "03_python_statements.py",
    "04_methods_and_functions.py",
    "05_object_oriented_programming.py"
]

for file in files:
    print("\n==========", file, "==========")
    runpy.run_path(str(base_path / file))
