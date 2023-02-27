# [The Knight's Tour](https://theknightstour.app/)

The aim of the knight's tour is to use the chess knight's L-shaped movements to traverse the chess board, visiting each square exactly once.

The app allows the user attempt to complete the tour themselves in a manual mode with undo functionality.

The user may also generate a complete tour and either step through each movement, or skip to the end of the tour. The complete tour is generated using a depth-first recursive search implementing [Warnsdorff's algorithm](https://www.geeksforgeeks.org/)

### getKnightTour Function

This function is responsible for generating a complete tour based on the selected starting square.

#### Terms

- Neighbour - Legal positions based on current square
- Availability - Number of unvistited neighbours
- visited - An array that keeps track of visited squares using a node id `(x*8)+y` based on a square's `(x,y)` coordinates

#### Explanation

For the starting square, a list of neighbours is generated and sorted in ascending order of availability. Then the first unvisited neighbour (in the sorted) array is visited and the function is called recursively till it returns the `done` value.

If `done` is returned as `false`, the visited neighbour didn't return a complete path (i.e. knight got trapped - path length < 64 and no unvisited neighbours). Thus, the neighbour is removed from the path (backtracking) and the next unvisited neighbour in the array is visited and the function is again called recursively.

This process continues till `done` is returned as `true`, meaning the tour is complete (i.e. path length === 64).

To better understand this, look up [DFS - Depth First Search](https://www.hackerearth.com/practice/algorithms/graphs/depth-first-search/tutorial/)

```
function getKnightTour(currentId,path,visited) {
    let currentCoordinate = currentId.split("");
    let i = +currentCoordinate[0];
    let j = +currentCoordinate[1];
    let nId = (i*8)+j;
    visited[nId] = 1;
    path.push(currentId)
    var done;
    if(path.length < 64){
        let neighbours = generateLegalIds(currentId);
        for (var neighbour of neighbours) {
            neighbour.availability = getAvailability(neighbour.id,visited);
        }
        neighbours.sort(function(a, b){return a.availability - b.availability});
        let iter = 0;
        done = false;
        while((iter < neighbours.length) && !done){
            let id = neighbours[iter].id;
            let xyCoord = id.split("");
            let x = +xyCoord[0];
            let y = +xyCoord[1];
            if (visited[(8*x)+y] === 0){
                done = getKnightTour(id,path,visited).done
            }
            iter += 1;
        }
        if (!done){
            path.pop();
            visited[nId] = 0;
        }
    }else{
        done = true;
    }
    let result = {"done": done, "path": path};
    return (result);
}
```

### Basic Functionality

The ChessBoard component renders the chess board (which is really Square components in a container) and updates the path and square data based on movements mades in the game. It also responds to change in prop values triggered by KnightsTour, to react to user button clicks: Restart, Undo, Skip, Step, and Get Complete Tour.

### Fun Fact

In 2017 , for a university course, I made a Pygame/Python version of this that allows the user set the dimensions of the chessboard and generate a complete tour.

Knight image from: http://clipart-library.com/clip-art/knight-chess-piece-silhouette-3.htm

### To install all dependecies

```
npm install
```
