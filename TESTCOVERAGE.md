Why and where we tested the behaviors of lab-3 using E2E:
In client/e2e/todo-list.e2e-spec.ts and user-list.e2e-spec.ts, you will find the tests (and required methods/functions for those tests)

The list of major tested features:
Multifilter: The filtering of 2+ elements. For example, you can give the page an owner string and a boolean and it will 
give you all of todos within the JSON that follow those rules. Tested because it was a complex system that couldn't be 
quickly verified without the use of the computer.

Filter: Like multifilter... but with only 1 element. You give the page an element and it will give you all of the todos
within the JSON that follows that rule.

Page Select and navigation menu:
User operation and navigation of the available pages through an overlay on the left of the screen. 

Why and where we tested the behaviors of lab-3 using not-E2E:
spec files littered around src:
TodoGet: Getting the todos in the first place. Was to establish the ability to initialize the JSON arrays. Actually 
played an important role for us when we had to refactor.

TodoInSome: Checking if the files within the todoarrays were actually there. (Or not there, in the case of Santa).


Client-side: Why we chose to do the things the way we did:
We took the already existing user Angular files, which were connected to the HTML, copied them to a folder named
todo, and then renamed all of the existing files and connections within those files accordingly so that we could 
view "users" within the "todos" navigation menu. This method may have been
more difficult than building the todo implementation from scratch, but i'm not entirely convinced. After accomplishing that,
we had an already well-formed basis for our Angular implementation to be put into.



