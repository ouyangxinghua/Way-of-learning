https://juejin.im/post/5a2cdfe26fb9a0452936b07f   git常用操作总结
1. 正常提交
git add . -> git commit -m "备注信息" -> git push 
多人协作提交
在本地修改与远程代码无冲突的情况下，优先使用：pull->commit->push
在本地修改与远程代码有冲突的情况下，优先使用：commit->pull->push
git pull 是 git fetch和git merge的结合体
在实际使用中，git fetch更安全一些
因为在merge前，我们可以查看更新情况，然后再决定是否合并。

2. 查看本地工作区、暂存区文件的修改状态
git status

3. 查看提交日志
git log xx  查看xx文件的commit记录（同时提交时间也可以看到）
git log --graph   查看当前分支commit生成的树状图
git log --oneline --graph  相比前者更简洁
git reflog 可以查看所有分支的所有操作记录（包括已经被删除的 commit 记录和 reset 的操作）

4. 查看不同版本之间的差异
git diff HEAD HEAD^1 .........→ 查看xx文件不同版本之间的差异 ^代表版本
git diff HEAD -- <filename> 查看某文件的具体修改内容

5. git reset 回滚相关操作
git reset --hard HEAD 回滚到指定版本，同时清空工作目录的所有改动  git reset --hard  版本号
git reset --soft HEAD 回滚到指定版本，同时保留工作目录和暂存区的内容，并把重置的位置所导致的新的文件差异放进暂存区
(也就是说上次提交时的代码改动还在，但是--hard是直接回到上次提交修改代码前的状态)
git reset --mixed HEAD 回滚到指定版本，同时保留工作目录的内容，并清空暂存区
git push origin master -f   -f 参数是强制提交，因为reset之后本地库落后于远程库一个版本，因此需要强制提交。  如果少量得回滚，可以手动修改好后提交，大量的回滚就用强制提交达到远程回滚的目的。

6. 关联远程仓库
git remote add origin 远程仓库git地址

7. 查看最后一次的修改
git show --stat
git show HEAD 查看指定版本的修改（可省略HEAD，默认当前版本）

8. 把当前的已修改的工作隐藏起来 等以后恢复现场后继续工作
git stash
git stash pop 恢复工作现场（恢复隐藏的文件，同时删除stash列表中对应的内容）

9. 使用Git 克隆指定分支命令为：
git clone -b <分支名> <仓库地址>

10. 分支操作
git branch -a  查看远程所有分支
git remote update origin --prune  更新远程最新分支
git branch <branchname> # → 创建branchname分支
git  checkout <分支名>  切换分支
git push --set-upstream origin <branchname>   将新创建的分支同步到远程仓库
合并分支操作（想将dev分支合并到master分支）
先切换分支  git  checkout master -> git pull origin master拉取代码(如果为多人开发的话) -> git merge dev(合并分支)

git branch -d <branchname> → 删除本地branchname分支
git push origin --delete <branchName>  删除远程分支操作


11. git 里的标签tag   用法(https://blog.csdn.net/u013399093/article/details/50511462)
https://blog.csdn.net/cbuy888/article/details/89491142      Git的tag作用和使用场景以及branch的区别
https://www.cnblogs.com/walls/p/9077958.html        Git打标签与版本控制规范

git push origin --delete tag <tagname>  删除远程tag   或者 git push origin :<branchName>  推送一个空tag到远程tag也可起到删除的效果
git tag -d <tagname>    删除本地tag
用法：
git tag -a v-1.0.1 -m "个性化需求迭代开发" 
git push origin v-1.0.1 提交v-1.0.1标签内容

标签其实就相当于当前版本的一个打包，标记，其实现实开发中用的并不多。相当于当前版本的一个映射，日后好管理和回溯


12. git rebase 和 git merge两个合并分支方法的区别       https://www.jianshu.com/p/86de428f4135

(1) 采用merge和rebase后，git log的区别，merge命令不会保留merge的分支的commit
(2) 处理冲突的方式
    (一股脑) 使用merge命令合并分支，解决完冲突，自动执行git add .和git commit -m'fix conflict'。这个时候会产生一个commit。
    (交互式) 使用rebase命令合并分支，解决完冲突，自动执行git add .和git rebase --continue，不会产生额外的commit。这样的好
    处是，‘干净’，分支上不会有无意义的解决分支的commit；坏处，如果合并的分支中存在多个commit，需要重复处理多次冲突。

    如果项目庞大，需要一个简洁的线性历史树便于leader管理，推荐使用 git rebase 。    如果是小型项目，需要审查历史纪录来便于编写过程报告，则推荐使用 git merge 。

git rebase --about 变基过程中有问题，撤回，回到变基前的状态，重新进行变基操作

注意： 如果两个分支在合并的时候，一个分支用的merge，另一个分支即使用了rebase也起不到git log --graph 平滑的效果，相反如此。