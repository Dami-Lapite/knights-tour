import generateLegalIds from './generateLegalIds';

// Function: Returns count of unvisited neighbours
// Used by: getKnightTour
function getAvailability(id,visited) {
    let neighbours = generateLegalIds(id);
    let availability = 0;
    for (var neighbour of neighbours) {
        let Coordinate = neighbour.id.split("");
        let i = +Coordinate[0];
        let j = +Coordinate[1];
        if (visited[(8*i) + j] === 0){
            availability+=1;
        }
    }
    return (availability);
}

export default getAvailability
