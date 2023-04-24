// 如果100个请求，你怎么用Promise去控制并发？
// 设计一个函数，可以限制请求的并发，同时请求结束之后，调用callback函数
// sendRequest(requestList:,limits,callback):voidsendRequest([()=>request('1'),()=>request('2'),()=>request('3'),()=>request('4')],3, 
//并发数(res)=>{console.log(res)})
// 其中request 可以是： 
function request (url,time = 1) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('请求结束：'+url);
            if (Math.random() > 0.5) {
                resolve('成功')
            } else {
                reject('错误;')
            }
        },time*1e3)
    })
}


function sendRequest(requestList, limits, callback) {
    // 定义执行队列，表示所有待执行的任务
    const promises = requestList.slice()
    // 定义开始时能执行的并发数
    const concurrentNum = Math.min(limits, requestList.length)
    let concurrentCount = 0 // 当前并发数
    // 启动初次能执行的任务
    const runTaskNeeded = ()=>{
        let i = 0
        while(i < concurrentNum){
            runTask()
        }
    }
    
    // 取出任务并推送到执行器
    const runTask = ()=>{}
    
    // 执行器，这里去执行任务
    const runner = ()=>{}
    
    // 捞起下一个任务
    const picker = ()=>{}

    // 开始执行！
    runTaskNeeded()
}




function sendRequest(requestList, limits, callback) {
    const promises = requestList // 取得请求list
    // 得到开始时，能执行的并发数
    const concurrentNum = Math.min(limits, requestList.length)
    let concurrentCount = 0 // 当前并发数
    // 第一次先跑起可以并发的任务
    const runTaskNeeded = ()=> {
        let i = 0
        // 启动当前能执行的任务   
        while(i < concurrentNum){
            i++
            runTask()
        }
    }

    // 取出任务并且执行任务
    const runTask = ()=>{  
        const task = promises.shift()
        task && runner(task)
    }

    // 执行器   
    // 执行任务，同时更新当前并发数    
    const runner = async (task) => {
        try {
            concurrentCount++
            await task()
        } catch (error) {
        } finally {
            // 并发数--
            concurrentCount--
            // 捞起下一个任务 
            picker()
        }    
    }
    
    // 捞起下一个任务  
    const picker = () => {
        // 任务队列里还有任务并且此时还有剩余并发数的时候 执行
        if(concurrentCount < limits && promises.length > 0) {
            // 继续执行任务
            runTask()
        // 队列为空的时候，并且请求池清空了，就可以执行最后的回调函数了
        } else if(promises.length == 0 && concurrentCount ==0) {
            // 执行结束
            callback && callback()
        }
    }
    // 入口执行
    runTaskNeeded()
}