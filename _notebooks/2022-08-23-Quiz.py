score = 0

# Question 1
answer1 = input("What is our class number? \na. a101 \nb. d101 \nc. a103 \nd. e201 \nAnswer: ")
if answer1 == "a" or answer1 == "a101": 
    score += 1
    print ("correct!")
    print ("score: ", score)
    print ("\n")
else: 
    print("Incorrect! The answer is a101.")
    print("score: ", score)
    print("\n")