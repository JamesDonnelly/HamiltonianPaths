HamiltonianPaths
================

This is a small game of sorts which has been set up to replicate the challenge presented by the Clock Puzzles in the video game Final Fantasy XIII-2. These puzzles use a Hamiltonian Path - that is, a "path that visits each vertex exactly once".
A live preview of what this does is available at http://jamesmdonnelly.com/GitHub/HamiltonianPaths.

**Important: This requires jQuery to be included on your page.**

Firstly include the HamiltonianPath script and accompanying stylesheet, then declare any HTML element on your page (for semantics reasons you should probably chose either a divider or figure).

```html
<figure id="myFigure"></figure>
```

From this we can create our puzzle using the `createPuzzle()` method as shown in Test.js:

```javascript
$('#myFigure').createPuzzle(size, number);
```

```
size = the number of boxes
number = double the maximum number a box can contain
```

So if we wanted to create a puzzle with 10 boxes and a maximum box number of 3, we'd call:

```javascript
$('#myFigure').createPuzzle(10, 6);
```
