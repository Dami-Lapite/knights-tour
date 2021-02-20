function isLegalMove(i,j,currentId) {
    const moveOffsets = [{"x":-1,"y":-2},{"x":-1,"y":2},{"x":1,"y":-2},{"x":-2,"y":-1},{"x":-2,"y":1},{"x":2,"y":-1},{"x":1,"y":2},{"x":2,"y":1}]
    let currentCoordinate = currentId.split("");
    let currentI = +currentCoordinate[0];
    let currentJ = +currentCoordinate[1];
    var isLegal = false
    for (var offset  of moveOffsets) {
        if ((i == currentI + offset.x) && (j == currentJ + offset.y)){
            isLegal = true;
            break;
        }
    }
    return (isLegal);
}

export default isLegalMove;
