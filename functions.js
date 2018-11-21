function oddOrEven(number){
    if(number %2 === 0){
        return 'Is Even';
    }else{
        return 'Is Odd';
    }
}

function randomNumber(){
    const max = 100;
    const min = 1;
    const number = Math.round(Math.random() * (max - min) + min);
    return `The generated number is: ${number} and it ${this.oddOrEven(number)}`;
}

module.exports = {
    oddOrEven,
    randomNumber
}