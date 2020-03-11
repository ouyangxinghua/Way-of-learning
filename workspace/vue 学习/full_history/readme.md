前端路由实现方式 history.pushState(data,title, url) 改变url的path部分, 跟hashChange实现方案， 不一样的地方是改变的 url 部位不一样(#home),
前端就可以处理路由了,像极了后端路由。支持前后切换, 浏览历史, history
onpopstate
push pop 数组只在尾部操作， 栈

HTML5引入了 history.pushState() 和 history.replaceState() 方法，它们分别可以添加和修改历史记录条目。这些方法通常与window.onpopstate 配合使用。

#pushState() 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个URL. 让我们来解释下这三个参数详细内容：

1. 状态对象 — 状态对象state是一个JavaScript对象，通过pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态，popstate事件就会被触发，且该事件的state属性包含该历史记录条目状态对象的副本。
状态对象可以是能被序列化的任何东西。原因在于Firefox将状态对象保存在用户的磁盘上，以便在用户重启浏览器时使用，我们规定了状态对象在序列化表示后有640k的大小限制。如果你给 pushState() 方法传了一个序列化后大于640k的状态对象，该方法会抛出异常。如果你需要更大的空间，建议使用 sessionStorage 以及 localStorage.

2. 标题 — Firefox 目前忽略这个参数，但未来可能会用到。在此处传一个空字符串应该可以安全的防范未来这个方法的更改。或者，你可以为跳转的state传递一个短标题。

3. URL — 该参数定义了新的历史URL记录。注意，调用 pushState() 后浏览器并不会立即加载这个URL，但可能会在稍后某些情况下加载这个URL，比如在用户重新打开浏览器时。新URL不必须为绝对路径。如果新URL是相对路径，那么它将被作为相对于当前URL处理。新URL必须与当前URL同源，否则 pushState() 会抛出一个异常。该参数是可选的，缺省为当前URL。


#history.replaceState() 的使用与 history.pushState() 非常相似，区别在于  replaceState()  是修改了当前的历史记录项而不是新建一个。 注意这并不会阻止其在全局浏览器历史记录中创建一个新的历史记录项。
1. pushState会改变history.length，而replaceState不改变history.length

1. replaceState() 的使用场景在于为了响应用户操作，你想要更新状态对象state或者当前历史记录的URL。

# addEventListen('popstate', () => {})    popstate 事件  监听历史记录点popstate

1. 每当活动的历史记录项发生变化时， popstate 事件都会被传递给window对象。如果当前活动的历史记录项是被 pushState 创建的，或者是由 replaceState 改变的，那么 popstate 事件的状态属性 state 会包含一个当前历史记录状态对象的拷贝。

2. 就我目前的认识来看，无论是浏览器的前进还是后退都会触发这个popstate事件，所以只能起到一个监听页面变化的作用。

3. 在popstate之前，我们可以利用back、forward、go对history进行后退和前进操作。


##可以理解为监听浏览器  后退  、前进   的操作，只要  后退  或者  前进  就会触发。在上面的demo中，我们预先做了如下操作：打开页面→点击“新闻”→点击“音乐”→再点击“新闻”，产生了4个history记录。  然后监听浏览器后退和前进的状态变化