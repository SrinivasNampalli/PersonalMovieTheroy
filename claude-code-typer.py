import pyautogui
import time
import random

# ============================================
# MASSIVE COLLECTION OF PYTHON CODE SNIPPETS
# ============================================

PYTHON_SNIPPETS = [
    # Functions
    "def calculate_sum(a, b):\n    return a + b\n\n",
    "def greet(name):\n    return f'Hello, {name}!'\n\n",
    "def is_even(num):\n    return num % 2 == 0\n\n",
    "def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)\n\n",
    "def find_max(numbers):\n    return max(numbers)\n\n",

    # List operations
    "numbers = [1, 2, 3, 4, 5]\nprint(sum(numbers))\n\n",
    "fruits = ['apple', 'banana', 'orange']\nfor fruit in fruits:\n    print(fruit)\n\n",
    "squared = [x**2 for x in range(10)]\nprint(squared)\n\n",
    "filtered = [x for x in range(20) if x % 2 == 0]\nprint(filtered)\n\n",

    # Dictionary operations
    "person = {'name': 'Alice', 'age': 30}\nprint(person['name'])\n\n",
    "student = {'id': 101, 'grade': 'A'}\nfor key, value in student.items():\n    print(f'{key}: {value}')\n\n",

    # Classes
    "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return 'Woof!'\n\n",
    "class Car:\n    def __init__(self, brand, model):\n        self.brand = brand\n        self.model = model\n\n",
    "class Calculator:\n    @staticmethod\n    def add(x, y):\n        return x + y\n\n",

    # File operations
    "with open('data.txt', 'r') as f:\n    content = f.read()\n    print(content)\n\n",
    "with open('output.txt', 'w') as f:\n    f.write('Hello World!')\n\n",

    # Error handling
    "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\n\n",
    "try:\n    value = int(input('Enter number: '))\nexcept ValueError:\n    print('Invalid input')\n\n",

    # API/Web requests
    "import requests\nresponse = requests.get('https://api.github.com')\nprint(response.json())\n\n",

    # Data processing
    "data = [1, 2, 3, 4, 5]\naverage = sum(data) / len(data)\nprint(f'Average: {average}')\n\n",

    # Lambda functions
    "square = lambda x: x ** 2\nprint(square(5))\n\n",
    "multiply = lambda x, y: x * y\nresult = multiply(3, 4)\n\n",

    # Decorators
    "def timer(func):\n    def wrapper(*args):\n        import time\n        start = time.time()\n        result = func(*args)\n        print(f'Took {time.time() - start}s')\n        return result\n    return wrapper\n\n",

    # Generators
    "def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\n",

    # JSON handling
    "import json\ndata = {'name': 'John', 'age': 25}\njson_str = json.dumps(data)\nprint(json_str)\n\n",

    # Date/Time
    "from datetime import datetime\nnow = datetime.now()\nprint(now.strftime('%Y-%m-%d %H:%M:%S'))\n\n",

    # Regular expressions
    "import re\npattern = r'\\d+'\nmatches = re.findall(pattern, 'I have 2 cats and 3 dogs')\n\n",

    # String operations
    "text = 'Hello World'\nprint(text.upper())\nprint(text.lower())\nprint(text.split())\n\n",
    "name = 'alice'\nprint(name.capitalize())\nprint(name.center(20, '*'))\n\n",

    # Math operations
    "import math\nprint(math.sqrt(16))\nprint(math.pi)\nprint(math.ceil(4.3))\n\n",

    # Random
    "import random\nprint(random.randint(1, 100))\nprint(random.choice(['red', 'blue', 'green']))\n\n",

    # Set operations
    "set1 = {1, 2, 3}\nset2 = {3, 4, 5}\nprint(set1.union(set2))\nprint(set1.intersection(set2))\n\n",

    # Tuple operations
    "coordinates = (10, 20)\nx, y = coordinates\nprint(f'X: {x}, Y: {y}')\n\n",

    # Comprehensions
    "matrix = [[i*j for j in range(5)] for i in range(5)]\nprint(matrix)\n\n",

    # Sorting
    "numbers = [5, 2, 8, 1, 9]\nsorted_nums = sorted(numbers)\nprint(sorted_nums)\n\n",

    # Enumerate
    "fruits = ['apple', 'banana', 'cherry']\nfor index, fruit in enumerate(fruits):\n    print(f'{index}: {fruit}')\n\n",

    # Zip
    "names = ['Alice', 'Bob', 'Charlie']\nscores = [85, 90, 78]\nfor name, score in zip(names, scores):\n    print(f'{name}: {score}')\n\n",

    # Map/Filter/Reduce
    "numbers = [1, 2, 3, 4, 5]\nsquared = list(map(lambda x: x**2, numbers))\nprint(squared)\n\n",
    "evens = list(filter(lambda x: x % 2 == 0, range(10)))\nprint(evens)\n\n",

    # Context managers
    "class FileManager:\n    def __enter__(self):\n        self.file = open('test.txt', 'w')\n        return self.file\n    def __exit__(self, *args):\n        self.file.close()\n\n",

    # Threading
    "import threading\ndef worker():\n    print('Thread working...')\nthread = threading.Thread(target=worker)\nthread.start()\n\n",

    # Async/Await
    "async def fetch_data():\n    await asyncio.sleep(1)\n    return 'Data loaded'\n\n",

    # Pathlib
    "from pathlib import Path\npath = Path('data.txt')\nif path.exists():\n    print('File exists')\n\n",

    # Collections
    "from collections import Counter\nwords = ['apple', 'banana', 'apple']\ncount = Counter(words)\nprint(count)\n\n",

    # Defaultdict
    "from collections import defaultdict\ndd = defaultdict(int)\ndd['key'] += 1\nprint(dd)\n\n",

    # Named tuple
    "from collections import namedtuple\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(10, 20)\n\n",

    # Itertools
    "from itertools import combinations\nitems = [1, 2, 3]\nfor combo in combinations(items, 2):\n    print(combo)\n\n",

    # OS operations
    "import os\nprint(os.getcwd())\nprint(os.listdir('.'))\n\n",

    # Subprocess
    "import subprocess\nresult = subprocess.run(['echo', 'Hello'], capture_output=True)\nprint(result.stdout)\n\n",

    # Type hints
    "def add(x: int, y: int) -> int:\n    return x + y\n\n",

    # Dataclasses
    "from dataclasses import dataclass\n@dataclass\nclass Person:\n    name: str\n    age: int\n\n",

    # Property decorator
    "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n    @property\n    def area(self):\n        return 3.14 * self._radius ** 2\n\n",

    # Static/Class methods
    "class MyClass:\n    @classmethod\n    def from_string(cls, data):\n        return cls(data)\n\n",

    # Magic methods
    "class Vector:\n    def __init__(self, x, y):\n        self.x, self.y = x, y\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\n",

    # Context variables
    "from contextlib import contextmanager\n@contextmanager\ndef timer():\n    start = time.time()\n    yield\n    print(f'Elapsed: {time.time() - start}')\n\n",

    # Web scraping
    "from bs4 import BeautifulSoup\nhtml = '<html><body><h1>Title</h1></body></html>'\nsoup = BeautifulSoup(html, 'html.parser')\nprint(soup.h1.text)\n\n",

    # Database
    "import sqlite3\nconn = sqlite3.connect('db.sqlite')\ncursor = conn.cursor()\ncursor.execute('SELECT * FROM users')\n\n",

    # Logging
    "import logging\nlogging.basicConfig(level=logging.INFO)\nlogging.info('Application started')\n\n",

    # Config parser
    "import configparser\nconfig = configparser.ConfigParser()\nconfig.read('config.ini')\nprint(config['DEFAULT']['path'])\n\n",

    # Email
    "import smtplib\nfrom email.mime.text import MIMEText\nmsg = MIMEText('Hello!')\nmsg['Subject'] = 'Test'\n\n",

    # CSV handling
    "import csv\nwith open('data.csv', 'r') as f:\n    reader = csv.DictReader(f)\n    for row in reader:\n        print(row)\n\n",

    # pickle
    "import pickle\ndata = {'key': 'value'}\nwith open('data.pkl', 'wb') as f:\n    pickle.dump(data, f)\n\n",

    # hashlib
    "import hashlib\ntext = 'password'\nhashed = hashlib.sha256(text.encode()).hexdigest()\nprint(hashed)\n\n",

    # UUID
    "import uuid\nunique_id = uuid.uuid4()\nprint(unique_id)\n\n",

    # Virtual environments
    "# python -m venv myenv\n# source myenv/bin/activate\n# pip install requests\n\n",

    # pytest
    "def test_addition():\n    assert 1 + 1 == 2\n\n",

    # Flask API
    "from flask import Flask\napp = Flask(__name__)\n@app.route('/')\ndef home():\n    return 'Hello!'\n\n",

    # FastAPI
    "from fastapi import FastAPI\napp = FastAPI()\n@app.get('/')\ndef read_root():\n    return {'message': 'Hello'}\n\n",

    # NumPy
    "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\nprint(arr.mean())\n\n",

    # Pandas
    "import pandas as pd\ndf = pd.DataFrame({'A': [1, 2], 'B': [3, 4]})\nprint(df.head())\n\n",

    # Matplotlib
    "import matplotlib.pyplot as plt\nplt.plot([1, 2, 3], [4, 5, 6])\nplt.show()\n\n",

    # Virtual display
    "print('=' * 50)\nprint('CODING SESSION IN PROGRESS')\nprint('=' * 50)\n\n",

    # Progress indicator
    "for i in range(1, 101):\n    print(f'Progress: {i}%', end='\\r')\n    time.sleep(0.01)\n\n",

    # Multi-line strings
    "message = '''\nMulti-line\nstring example\nwith triple quotes\n'''\nprint(message)\n\n",

    # F-strings
    "name = 'Alice'\nage = 30\nprint(f'{name} is {age} years old')\n\n",

    # Walrus operator
    "if (n := len([1, 2, 3])) > 2:\n    print(f'Length is {n}')\n\n",

    # Pattern matching (Python 3.10+)
    "def http_status(status):\n    match status:\n        case 200:\n            return 'OK'\n        case 404:\n            return 'Not Found'\n        case _:\n            return 'Unknown'\n\n",
]

# AI-style comments
AI_COMMENTS = [
    "# Implementing core functionality...\n",
    "# Analyzing data patterns...\n",
    "# Optimizing algorithm performance...\n",
    "# Building robust error handling...\n",
    "# Creating reusable components...\n",
    "# Establishing best practices...\n",
    "# Refactoring for clean code...\n",
    "# Adding comprehensive tests...\n",
    "# Documenting API endpoints...\n",
    "# Securing user authentication...\n",
]

def type_code_nonstop(typing_speed=0.02, pause_between=1.5):
    """
    Types Python code snippets NON-STOP like Claude coding!

    Args:
        typing_speed: Delay between characters (0.02 = fast like AI)
        pause_between: Seconds between code blocks
    """
    print("=" * 60)
    print("🤖 CLAUDE CODE TYPER - AI CODING SIMULATION")
    print("=" * 60)
    print(f"\n📚 Loaded {len(PYTHON_SNIPPETS)} Python code snippets!")
    print("\n⚠️  IMPORTANT:")
    print("   - Click where you want code typed in 5 seconds!")
    print("   - Move mouse to TOP-LEFT CORNER to STOP")
    print("   - Press Ctrl+C in terminal to emergency stop")
    print("\n🔥 This will type realistic Python code non-stop!")
    print("\nStarting in 5 seconds...")
    time.sleep(5)

    snippet_count = 0

    try:
        while True:
            # Pick random snippet
            code = random.choice(PYTHON_SNIPPETS)
            snippet_count += 1

            print(f"\n🤖 Typing code snippet #{snippet_count}...")
            print(f"   Preview: {code[:40].strip()}...")

            # Sometimes add AI comment first
            if random.random() > 0.7:
                comment = random.choice(AI_COMMENTS)
                for char in comment:
                    pyautogui.write(char, interval=0)
                    delay = typing_speed + random.uniform(-0.005, 0.01)
                    time.sleep(delay)

            # Type the code
            for char in code:
                pyautogui.write(char, interval=0)

                # Vary speed slightly for realism
                if char == '\n':
                    delay = 0.1  # Pause at newlines
                else:
                    delay = typing_speed + random.uniform(-0.005, 0.01)

                time.sleep(delay)

            # Pause between snippets
            print(f"   ⏸️  Pausing {pause_between}s before next code...")
            time.sleep(pause_between)

    except pyautogui.FailSafeException:
        print("\n\n🛑 STOPPED! (Mouse moved to corner)")
        print(f"✅ Typed {snippet_count} code snippets!")
    except KeyboardInterrupt:
        print("\n\n🛑 STOPPED! (Ctrl+C pressed)")
        print(f"✅ Typed {snippet_count} code snippets!")

def main():
    print("\n🚀 Claude-Style Code Typer Configuration:\n")

    # Speed selection
    print("Typing speeds:")
    print("  1 = Slow/Learning (0.04s per char)")
    print("  2 = Normal/Realistic (0.02s per char)")
    print("  3 = Fast/AI Speed (0.01s per char)")

    speed_choice = input("\nSpeed [2]: ").strip()
    speed_map = {"1": 0.04, "2": 0.02, "3": 0.01}
    speed = speed_map.get(speed_choice, 0.02)

    # Pause between snippets
    pause = input("Seconds between code blocks [1.5]: ").strip()
    pause = float(pause) if pause else 1.5

    print("\n✨ Ready to code like Claude AI!")
    type_code_nonstop(speed, pause)

if __name__ == "__main__":
    pyautogui.FAILSAFE = True
    main()
