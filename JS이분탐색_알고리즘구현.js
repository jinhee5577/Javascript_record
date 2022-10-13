function binarySearch (target, dataArray){
    let start = 0;
    let end = dataArray.length - 1;

    while(start <= end){
        let midInd = Math.floor((start + end) / 2);  
        let center = dataArray[midInd];

        if(center === target){ return center; }
        if(center > target){ end = midInd - 1; }
        if(center < target){ start = midInd + 1; }        
    }

    return undefined;
}