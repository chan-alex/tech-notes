

I'm working with a large, 5 year old Django codebase. My humble opinion: Django itself is actively hindering our ability to deliver new features.
Some pain points:
- Django's fat models approach is bad. By coupling model behaviour to database schema, it all but guarantees that you're gonna have a tough time modifying either.
- Django's class-based views and its admin framework strongly encourages a sort of "one-view, one-model" approach. i
  Just about nobody has requirements that neatly fit that worldview. If you need to interact with two models in a single view, working around it is painful.
- Not Django specific, but Python is a bad choice to use at scale. The lack of a good default immutable data structure means we're stuck using mutable data structures everywhere. 
  In a large codebase, the lack of guarantees around something as basic as the shape of a data structure is a huge problem. 
  A notorious example is Django's HttpRequest, whose attributes may or may not be set by the middlewares.

There are more, but one thing's for sure, I probably won't be using Django for my next project.
- https://news.ycombinator.com/item?id=14690638


> The lack of a good default immutable data structure means we're stuck using mutable data structures everywhere.
Don't completely understand this one. Also, couldn't you create an immutable-in-practice class?
 	
yen223 43 days ago [-]

Python's data structures (with few exceptions) are completely mutable, which means any function can add, modify, or even remove attributes from some object at any time.
Look at Django's request object for example. Django, by convention, adds a bunch of attributes to the request object at runtime, via middlewares. 
This is a problem because a dev can't reason about the shape of request object, without stepping through all the middlewares and figuring out which is doing what.
We could use immutable classes internally, but that doesn't solve the problem that external libraries (like Django!) abuse them all over the place.
- https://news.ycombinator.com/item?id=14690638

