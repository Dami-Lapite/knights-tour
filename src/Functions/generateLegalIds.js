import isOnBoard from './isOnBoard';

function generateLegalIds(currentId) {
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
            results.push({"id": String(newX)+String(newY)})
        }
    }
    return (results);
}

export default generateLegalIds
