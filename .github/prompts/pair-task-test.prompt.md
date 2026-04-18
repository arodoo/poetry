---
agent: agent
---
---
agent: agent
---
The way the task will be implemented is as follows:
You'll generate a task with the next structure:
1: Read instructions and implement firts task.
2: implement and run the tests of the first task.
3: read the initial message/todo and ask yourself: Have I achived exactly what the user asked for at a 100%? if The answer is no, go back to point 1.
4: Read instructions and implement second task.
2: Implement and run the tests of the second task.
3: read the initial message/todo and ask yourself: Have I achived exactly what the user asked for at a 100%? if The answer is no, go back to point 4.
... etc.
n(last): Check all the history in the chat and the existing changues, compare with the initial task/todo and ask yourself: Have I achived exactly what the user asked for at a 100%? if The answer is no, clear the task and create a new one (on your criteria)  BUT the last ponit of the new task must be: "Have I achived exactly what the user asked for at a 100%? if The answer is no, clear the task and create a new one (on your criteria)" and again, start make the last point of the new task be the same of the 'n(last)' point.  
