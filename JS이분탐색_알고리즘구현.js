// Binary Search(이진탐색)

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


// 이진 탐색은 순차 탐색에 비해 엄청나게 빠른 속도로 원하는 데이터를 찾을 수 있다.
// 한번에 엄청나게 많은 데이터를 검색 범위에서 줄일수 있기 때문에 
// 1부터 100사이의 숫자중 검색한다면 어떤 숫자를 찾던지 최대 7번 만에 정답을 찾을 수 있다.

// 이진탐색을 사용하면 240,000개의 데이터도 최대 18번 만에 답을 찾을 수 있다.
// 심지어 40억개의 데이터를 검색한다고 해도 최대 32번 만에 답을 찾을 수 있다.


// n개의 원소를 가진 리스트에서 단순 탐색을 사용하면 최대 n번의 탐색이 필요하다.
// 이 것을 BigO 표기법으로 O(n) 이라고 표기하고 선형시간 이라고 부른다.

// 이진 탐색을 사용하면 최대 logn 번만에 답을 찾을 수 있다.
// 이것을 BigO 표기법으로 O(logn) 이라고 표기하고 로그시간 이라고 부른다.
// Big O 표기법에서 사용하는 모든 로그 시간은 2가 생략된 것이다.


// 이진탐색은 매우 빠른 속도로 데이터를 찾을수 있지만
// 반드시 데이터가 정렬되어있어야만 한다.



// 출처: https://im-developer.tistory.com/126 [Code Playground:티스토리]