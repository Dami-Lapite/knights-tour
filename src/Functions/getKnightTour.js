import generateLegalIds from './generateLegalIds';
import getAvailability from './getAvailability'

// Function: Uses depth-first search recursively to find complete path
// Used by: App.js Computer Mode
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
            if (visited[(8*x)+y] == 0){
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

export default getKnightTour
