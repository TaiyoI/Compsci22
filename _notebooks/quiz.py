#list of all of my questions and answers that will be inputted into my quiz
QandA = [
    "1. Question?", "Answer",
    "2. Question?", "Answer",
    "3. Question?", "Answer",
    "4. Question?", "Answer",
    "5. Question?", "Answer",
    "6. Question?", "Answer",   
    "7. Question?", "Answer",
    "8. Question?", "Answer",
    "9. Question?", "Answer",
    "10. Question?", "Answer",
    ]

#total points and using new quiz var
points = 0
current = 0
quiz = 1

print ("Welcome to my quiz!")

#Using while lets me loop function
while quiz < 10:
    question = input (QandA[current])
    if question == QandA[current+1]:
        print("That's correct!")
        points = points +1
        current = current +2
    else: 
        print ("Sorry, that is incorrect!")
        points = points -1
        current = current +2
    quiz = quiz +1

    #Final Message
    print ("You got " + str(score) + "/" + str(len(QandA)) + " correct")

run_test(QandA)

