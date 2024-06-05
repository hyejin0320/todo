const colorSet = [
    '#F78D84', '#8DC2D6', '#D6DF8D', '#00AD7E', '#57373E', '#058FFF', '#94AFC5'
];

function getRandomColor(expectColor){
    if(expectColor){
        const targetColoSet = colorSet.filter((item) => item !== expectColor.toUpperCase());
        return targetColoSet[Math.floor(Math.random() * targetColoSet.length)];
    }else{
        return colorSet[Math.floor(Math.random() * colorSet.length)];
    }
}

export { getRandomColor };