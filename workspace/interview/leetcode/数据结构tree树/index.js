function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

var a1 = new TreeNode(3);
var a2 = new TreeNode(9);
var a3 = new TreeNode(20);
var a4 = new TreeNode(15);
var a5 = new TreeNode(7);
a1.left = a2;
a1.right = a3;
a3.left = a4;
a3.right = a5;

// 102 层序遍历
// 从根开始, 一层一层来分层遍历, 7 结束
// [[3],[9,20], [15,7]]
//   3
// 9   20
//   15  7
// 按层来  每个节点把子节点告诉 算法就OK
// items [] 子节点也可能  有子节点
// 队列 Queue

function levelOrderTravesal(root) {
  if(!root) return [];
  let items = [];
  let queue = [root, null]; 
  // 队列, 等待被了解情况的结点 出队, shift push ()
  let levelNodes = []; //每一层的节点
  while(queue.length > 0){
    let t = queue.shift();
    // root
    if(t){
      levelNodes.push(t.val);
      if(t.left) {
        queue.push(t.left);
      }
      if(t.right) {
        queue.push(t.right);
      }
    }else {
      // null 层次分隔符
      items.push(levelNodes);
      levelNodes = [];
      // null 上一层 在队列里的结点是？
      // 下一层的所有结点， 绝对没有下下层的结点
      // 按层来遍历
      if (queue.length > 0){
        queue.push(null);
      }
    }
  }
  // tree node left right 
  return items;
}
console.log(levelOrderTravesal(a1));
// queue [root, null] [null]
// levelNodes []
// items []