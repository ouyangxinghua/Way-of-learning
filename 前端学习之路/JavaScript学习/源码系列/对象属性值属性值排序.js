var arr5 = [{ id: 10, name: 'das' }, { id: 5, name: 'tryt' }, { id: 6, name: 'uk' }, { id: 9, name: 'fbgf' }, { id: 2, name: 'fer' }, { id: 3 , name: 'fd'}];
// arr5.sort(function (a, b) {
//     return a.id - b.id
// })
// console.log(arr5);
		//输出新的排序
		//		{id: 2}
		//		{id: 3}
		//		{id: 5}
		//		{id: 6}
		//		{id: 9}
        //		{id: 10}
        
function compare(arr, property, desc){
    var res = arr.sort((a,b) => {
        return a[property] - b[property] 
    })
    if(desc){
        return res
    }else {
        return res.reverse()
    }
}
// compare(arr5, 'id', false)
// console.log(compare(arr5, 'id', false))

function aa(a,b){
    return a - b
}
console.log(aa(3,1))



// sort源码分析
// function ArraySort(comparefn) {
//   // In-place QuickSort algorithm.
//   // For short (length <= 22) arrays, insertion sort is used for efficiency.
 
//   var custom_compare = IS_FUNCTION(comparefn);
 
//   function Compare(x,y) {
//     // Assume the comparefn, if any, is a consistent comparison function.
//     // If it isn't, we are allowed arbitrary behavior by ECMA 15.4.4.11.
//     if (x === y) return 0;
//     if (custom_compare) {
//       // Don't call directly to avoid exposing the builtin's global object.
//       return comparefn.call(null, x, y);
//     }
//     if (%_IsSmi(x) && %_IsSmi(y)) {
//       return %SmiLexicographicCompare(x, y);
//     }
//     x = ToString(x);
//     y = ToString(y);
//     if (x == y) return 0;
//     else return x < y ? -1 : 1;
//   };
 
//   function InsertionSort(a, from, to) {
//     for (var i = from + 1; i < to; i++) {
//       var element = a[i];
//       // Pre-convert the element to a string for comparison if we know
//       // it will happen on each compare anyway.
//       var key =
//           (custom_compare || %_IsSmi(element)) ? element : ToString(element);
//       // place element in a[from..i[
//       // binary search
//       var min = from;
//       var max = i;
//       // The search interval is a[min..max[
//       while (min < max) {
//         var mid = min + ((max - min) >> 1);
//         var order = Compare(a[mid], key);
//         if (order == 0) {
//           min = max = mid;
//           break;
//         }
//         if (order < 0) {
//           min = mid + 1;
//         } else {
//           max = mid;
//         }
//       }
//       // place element at position min==max.
//       for (var j = i; j > min; j--) {
//         a[j] = a[j - 1];
//       }
//       a[min] = element;
//     }
//   }
 
//   function QuickSort(a, from, to) {
//     // Insertion sort is faster for short arrays.
//     if (to - from <= 22) {
//       InsertionSort(a, from, to);
//       return;
//     }
//     var pivot_index = $floor($random() * (to - from)) + from;
//     var pivot = a[pivot_index];
//     // Pre-convert the element to a string for comparison if we know
//     // it will happen on each compare anyway.
//     var pivot_key =
//       (custom_compare || %_IsSmi(pivot)) ? pivot : ToString(pivot);
//     // Issue 95: Keep the pivot element out of the comparisons to avoid
//     // infinite recursion if comparefn(pivot, pivot) != 0.
//     a[pivot_index] = a[from];
//     a[from] = pivot;
//     var low_end = from;   // Upper bound of the elements lower than pivot.
//     var high_start = to;  // Lower bound of the elements greater than pivot.
//     // From low_end to i are elements equal to pivot.
//     // From i to high_start are elements that haven't been compared yet.
//     for (var i = from + 1; i < high_start; ) {
//       var element = a[i];
//       var order = Compare(element, pivot_key);
//       if (order < 0) {
//         a[i] = a[low_end];
//         a[low_end] = element;
//         i++;
//         low_end++;
//       } else if (order > 0) {
//         high_start--;
//         a[i] = a[high_start];
//         a[high_start] = element;
//       } else {  // order == 0
//         i++;
//       }
//     }
//     QuickSort(a, from, low_end);
//     QuickSort(a, high_start, to);
//   }
 
//   var old_length = ToUint32(this.length);
//   if (old_length < 2) return this;
 
//   %RemoveArrayHoles(this);
 
//   var length = ToUint32(this.length);
 
//   // Move undefined elements to the end of the array.
//   for (var i = 0; i < length; ) {
//     if (IS_UNDEFINED(this[i])) {
//       length--;
//       this[i] = this[length];
//       this[length] = void 0;
//     } else {
//       i++;
//     }
//   }
 
//   QuickSort(this, 0, length);
 
//   // We only changed the length of the this object (in
//   // RemoveArrayHoles) if it was an array.  We are not allowed to set
//   // the length of the this object if it is not an array because this
//   // might introduce a new length property.
//   if (IS_ARRAY(this)) {
//     this.length = old_length;
//   }
 
//   return this;
// }