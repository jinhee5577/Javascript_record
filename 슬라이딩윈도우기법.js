// 슬라이딩 윈도우(Sliding Window)기법은 배열이나 문자열에서 연속된 범위(부분 배열, 부분 문자열)를 효율적으로 탐색할때 사용하는 알고리즘 기법이다.
// 고정된 크기 또는 조건을 만족하는 연속된 구간(subarray)을 O(n) 시간에 효율적으로 탐색하는 방법이다.

 /* ★ 쓰는 이유
    - 모든 구간을 일일이 반복하며 탐색하면 O(n²) 시간이 걸릴 수 있음. 
    - 하지만 슬라이딩 윈도우는 포인터 2개(left, right)를 사용해서 한번씩만 배열을 스캔(O(n))한다.
    - 슬라이딩 윈도우는 앞의 원소 하나 빼고, 뒤에 하나 더하는 방식으로 이동하며 빠르게 계산한다.
    - O(n)시간으로 모든 구간을 계산 가능하다.

   ▶ 기본 예시 1: 고정 길이 윈도우
      배열에서 길이 k인 연속 부분 배열의 최대 합을 구하라.
 */
   function maxSum(arr, k) {
        let maxSum = 0;
        let windowSum = 0;

        for (let i = 0; i < k; i++) {
            windowSum += arr[i]; // 처음 k개 합
        }

        maxSum = windowSum;

        for (let i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k]; // 윈도우 슬라이드
            // arr[i - k] : 앞의값,  arr[i] : 뒤의 값
            maxSum = Math.max(maxSum, windowSum);
        }

        return maxSum;
   };
  // 핵심: 한칸씩 이동하면서 앞의 값 빼고, 뒤의 값 더한다.



  // ▶ 기본 예시 2: 가변 길이 윈도우 (투 포인터)
  //    배열에서 합이 target 이하인 가장 긴 부분 배열 길이를 구하라.

     function longestSubarrayUnderSum(arr, target) {
        let left = 0, sum = 0, maxLen = 0;

        for (let right = 0; right < arr.length; right++) {
            sum += arr[right];

            while (sum > target) {
                sum -= arr[left];
                left++; // 윈도우 줄이기
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
     };
     // 핵심: 조건을 만족하지 않으면 왼쪽을 이동해서 윈도우를 줄여나감.
    

     // 위 코드를 TypeScript 버전으로 작성.
     /* function longestSubarrayUnderSum(arr: number[], target: number): number {
        let left: number = 0;
        let sum: number = 0;
        let maxLen: number = 0;

        for (let right: number = 0; right < arr.length; right++) {
            sum += arr[right];

            while (sum > target) {
                sum -= arr[left];
                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
     } */

    