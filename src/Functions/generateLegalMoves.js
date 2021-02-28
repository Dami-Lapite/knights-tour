import isOnBoard from "./isOnBoard";

// Function:Genereate array of coordinadte objects of squares that are legal moves from current square
// Used by: App.js
function generateLegalMoves(currentId) {
    const moveOffsets = [{"x":-1,"y":-2},{"x":-1,"y":2},{"x":1,"y":-2},{"x":-2,"y":-1},{"x":-2,"y":1},{"x":2,"y":-1},{"x":1,"y":2},{"x":2,"y":1}]
    let currentCoordinate = currentId.split("");
    let currentI = +currentCoordinate[0];
    let currentJ = +currentCoordinate[1];
    var newX;
    var newY;
    var results = [];
    for (var offset  of moveOffsets) {
        newX = currentI + offset.x;
        newY = currentJ + offset.y;
        if (isOnBoard(newX) && isOnBoard(newY)){
            results.push({"x":newX, "y":newY})
        }
    }
    return (results);
}

export default generateLegalMoves;
