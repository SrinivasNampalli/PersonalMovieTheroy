import pyautogui
import time
import random

# AI responses to cycle through
AI_RESPONSES = [
    "I'll help you with that! Let me start by analyzing your code...\n",
    "Here's an interesting approach to solve this problem:\n",
    "Based on what I see, I recommend the following:\n",
    "Let me break this down step by step for you:\n",
    "That's a great question! Here's my take on it:\n",
    "def calculate_sum(a, b):\n    return a + b\n\n",
    "# This is a comment explaining the code\n",
    "console.log('Hello from AI!');\n",
    "Creating amazing solutions for you...\n",
    "Let me think about this for a moment...\n"
]

def type_like_claude_forever(typing_speed=0.03, pause_between=2):
    """
    Types AI responses NON-STOP until you move mouse to corner!

    Args:
        typing_speed: Delay between characters
        pause_between: Seconds to wait between responses
    """
    print("=" * 60)
    print("🚀 CLAUDE NON-STOP TYPER")
    print("=" * 60)
    print("\n⚠️  IMPORTANT:")
    print("   - Click where you want to type in 5 seconds!")
    print("   - Move mouse to TOP-LEFT CORNER to STOP")
    print("   - Press Ctrl+C in terminal to emergency stop")
    print("\nStarting in 5 seconds...")
    time.sleep(5)

    response_count = 0

    try:
        while True:  # INFINITE LOOP!
            # Pick a random response
            text = random.choice(AI_RESPONSES)
            response_count += 1

            print(f"\n🤖 Typing response #{response_count}...")

            # Type character by character
            for char in text:
                pyautogui.write(char, interval=0)
                delay = typing_speed + random.uniform(-0.01, 0.01)
                time.sleep(delay)

            # Pause between responses
            print(f"   ⏸️  Pausing {pause_between}s before next response...")
            time.sleep(pause_between)

    except pyautogui.FailSafeException:
        print("\n\n🛑 STOPPED! (Mouse moved to corner)")
        print(f"✅ Typed {response_count} responses total!")
    except KeyboardInterrupt:
        print("\n\n🛑 STOPPED! (Ctrl+C pressed)")
        print(f"✅ Typed {response_count} responses total!")

def main():
    print("\n📝 Configuration:")

    # Typing speed
    speed_choice = input("Typing speed (1=slow, 2=normal, 3=fast) [2]: ").strip()
    speed_map = {"1": 0.05, "2": 0.03, "3": 0.01}
    speed = speed_map.get(speed_choice, 0.03)

    # Pause between responses
    pause = input("Seconds between responses [2]: ").strip()
    pause = float(pause) if pause else 2.0

    print("\n✨ Ready to type NON-STOP!")
    type_like_claude_forever(speed, pause)

if __name__ == "__main__":
    # Safety: Move mouse to corner to stop
    pyautogui.FAILSAFE = True
    main()
