import time 
from time import sleep  # Allows us to call the sleep function to slow down 

import RPi.GPIO as GPIO # Allows us to call our GPIO pins and names it just GPIO

GPIO.setmode(GPIO.BCM)  # Set's GPIO pins to BCM GPIO numbering
INPUT_PIN = 15        # Write GPIO pin number.
GPIO.setup(INPUT_PIN, GPIO.IN)  # Set our input pin to be an input

# Start a loop that never ends
while True:
        if (GPIO.input(INPUT_PIN) == True):
            # GPIO Pin 15 is ON.
           print (time.strftime ("%Y/%m/%d , %H:%M:%S"),"1 / TRUE / High")
        else:
            # GPIO Pin 15 is OFF.
            print(time.strftime ("%Y/%m/%d , %H:%M:%S"),"0 / FALSE / Low")
        sleep(5);       # Sleep for 5 seconds.