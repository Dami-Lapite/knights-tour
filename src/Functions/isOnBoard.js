// Function: Checks if coordinate is on 8x8 board (zero-indexed)
// Used by: generateLegalMoves, generateLegalIds
function isOnBoard(n) {
    return ((n >= 0) && (n <=7))
}

export default isOnBoard
