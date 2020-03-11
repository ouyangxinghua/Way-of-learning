##置换元素
置换元素是指：浏览器根据元素的标签和属性，来决定元素的具体显示内容。例如：浏览器根据<img>标签的src属性显示图片。根据标签的type属性决定显示输入框还是按钮。置换元素在其显示中生成了框，这也就是有的内联元素能够设置宽高的原因。html中的<img><input><textarea><select><object>都是置换元素，这些置换元素往往没有实际内容，即是一个空元素。

##非置换元素浏览器中的大多数元素都是不可置换元素，即其内容直接展示给浏览器。例如<label>标签，<p>标签里的内容会被浏览器直接显示给用户。

#如何设置固定的背景图像:background-attachment: fixed;

var aa = new Array()

aa.push(1,2,3) => aa = [1,2,3]
##JS 4种类型判断
1. 
Object.prototype.toString.call(aa)
"[object Array]"
2. 
aa.constructor => f Array()
3. 
aa instanceof Array => true   instanceof只能判断复杂数据类型  typeof只能判断基础数据类型
4. 
typeof aa => object
对于基本类型，除 null 以外，均可以返回正确的结果。
对于引用类型，除 function 以外，一律返回 object 类型。
对于 null ，返回 object 类型。
对于 function 返回  function 类型。
var aa = function(){}
Object.prototype.toString.call(aa)
"[object Function]"

display的切换会触发reflow，而visibility不会。
##display: none；不为被隐藏的对象保留其物理空间；
##visibility:hidden;所占据的空间位置仍然存在,仅为视觉上的完全透明；

标准盒子模型 ＝ margin + border + padding + content (content =  width | height)
IE盒子模型 ＝ margin + content (content = border + padding + width | height)

#进程是资源分配的基本单位,线程是资源调度的基本单位

#调度算法面试很有可能问, 多注意

#http || https 计算机网络 各种网络协议 操作系统  HTTP状态码  面试必问  10大排序算法


##回文解码
1. “回文串”是一个正读和反读都一样的字符串，比如“level”或者“noon”等等就是回文串。