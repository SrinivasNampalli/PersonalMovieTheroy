import pyautogui
import time
import random

# Sample AI responses - customize these!
AI_RESPONSES = [
    "I'll help you with that! Let me start by analyzing your code...",
    "Here's an interesting approach to solve this problem:",
    "Based on what I see, I recommend the following:",
    "Let me break this down step by step for you:",
    "That's a great question! Here's my take on it:",
    "def calculate_sum(a, b):\n    return a + b",
    "# This is a comment explaining the code\n# It helps developers understand the logic"
]

def type_like_claude(text, typing_speed=0.03):
    """
    Types text character-by-character with Claude-style delays

    Args:
        text: The text to type
        typing_speed: Base delay between characters (seconds)
    """
    print("🤖 AI is typing... (Click where you want to type in 3 seconds!)")
    time.sleep(3)  # Give you time to click where you want the text

    for char in text:
        pyautogui.write(char, interval=0)  # Write character instantly

        # Add realistic delay with randomness
        delay = typing_speed + random.uniform(-0.01, 0.01)
        time.sleep(delay)

    print("✅ Done typing!")

def main():
    print("=" * 50)
    print("🚀 Claude-Style AI Typer")
    print("=" * 50)
    print("\nThis will type text with AI-like animation anywhere!")
    print("\nOptions:")
    print("1. Random AI response")
    print("2. Custom text")

    choice = input("\nChoice (1 or 2): ").strip()

    if choice == "1":
        text = random.choice(AI_RESPONSES)
        print(f"\nSelected: {text[:50]}...")
    else:
        text = input("\nEnter text to type: ")

    # Ask for typing speed
    speed_choice = input("\nTyping speed (1=slow, 2=normal, 3=fast) [2]: ").strip()
    speed_map = {"1": 0.05, "2": 0.03, "3": 0.01}
    speed = speed_map.get(speed_choice, 0.03)

    type_like_claude(text, speed)

if __name__ == "__main__":
    # Safety: Allow emergency stop
    pyautogui.FAILSAFE = True  # Move mouse to corner to stop
    main()
