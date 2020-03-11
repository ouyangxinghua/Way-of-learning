var nums1 = [1, 3];
var nums2 = [2]
var findMedianSortedArrays = function(nums1, nums2) {
    var arr = [...nums1,...nums2];
    var sort = arr.sort((a, b) => {
      return a - b;
    })
    var len = sort.length;
    if(len % 2 == 0){
      return (sort[len/2] + sort[len/2 - 1]) / 2
    }else{
      return sort[Math.floor(len/2)]
    }
};
console.log(findMedianSortedArrays(nums1, nums2))