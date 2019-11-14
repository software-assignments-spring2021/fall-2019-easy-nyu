subjectLength = '3,2,53,5,33,5,2,4,9,57,38,2,2,2,41,42,2,3,3,3,25,32,7,2,66,51,19,13,22,30,15,21,12,2,'
subjectLengthArr = subjectLength.split(',')
subjectLengthArr.pop()
subjectLengthArr = subjectLengthArr.map(element => {
    return parseInt(element)
});
subjectLengthArr = [3, 2, 53, 5, 33, 5, 2, 4, 9, 57, 38, 2, 2, 2, 41, 42, 2, 3, 3, 3, 25, 32, 7, 2, 66, 51, 19, 13, 22, 30, 15, 21, 12, 2]
console.log(subjectLengthArr.length)