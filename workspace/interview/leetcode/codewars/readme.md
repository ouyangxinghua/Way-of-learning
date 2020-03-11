git reset --hard b72c257 代码回滚
b72c257 哈希码
git log --oneline 查看提交记录
git reflog 可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）
git cherry-pick ca6f716 
可以理解为”挑拣”提交，它会获取某一个分支的单笔提交，并作为一个新的提交引入到你当前分支上。 当我们需要在本地合入其他分支的提交时，如果我们不想对整个分支进行合并，而是只想将某一次提交合入到本地当前分支上，那么就要使用git cherry-pick了。


[twitter]()
写一个函数 参数为 一句话， 英语的 将
- 如果字符超过140字， 返回false
- 如果是空字符，也返回false
- 以#开始
- 每个单词首字母大写
hello miss dong
#Hello Miss Dong