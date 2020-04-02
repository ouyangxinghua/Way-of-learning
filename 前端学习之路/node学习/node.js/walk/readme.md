- readdir
  读目录里内容  I/O 操作是异步的
  readdirSync  Async 异步  sync  同步

  js 是单线程的语言，用回调或Promise, 释放主线程的控制权，主要因为js是前端DOM的编程，用户交互比较多，
  等到执行完后，再通过event-loop机制，拿回控制权(callback,resolve)
  来到了node，js获取了服务器端的能力，
  readdirSync()

  
