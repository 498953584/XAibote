const AndroidBot = require('AndroidBot');//引用AndroidBot模块

//注册主函数，安卓端连接脚本会自动调用androidMain，并传递AndroidBot对象。设置服务端监听端口，手机端默认连接端口16678
AndroidBot.registerMain(androidMain, 16678);

/**用作代码提示，androidMain函数会被多次调用，注意使用全局变量
* @param {AndroidBot} androidBot
*/
async function androidMain(androidBot) {
    await androidBot.setImplicitTimeout(3000);//设置隐式等待时间
    let androidId = await androidBot.getAndroidId();
    console.log(androidId);
    // let words = await androidBot.findWords("今日");
    await androidBot.startApp("com.tencent.mobileqq");
    await androidBot.clickElement("com.tencent.mobileqq/com.tencent.mobileqq:id=conversation_head");
    if (await androidBot.existsElement("com.tencent.mobileqq/android.widget.TextView@containsText=已打卡")) {
        console.log("");
        await androidBot.manyBack(2);
        return;
    }
    await androidBot.clickElement("com.tencent.mobileqq/android.widget.TextView@containsText=打卡");
    await androidBot.clickElement("com.tencent.mobileqq/android.widget.Button@containsText=立即打卡");
    await androidBot.manyBack(5);
    // let txt = await androidBot.getElementText("com.samsung.android.app.sreminder/com.samsung.android.app.sreminder:id=tv_text");
    // console.log(txt);
    // await androidBot.setElementText("com.samsung.android.app.sreminder[1]/com.samsung.android.app.sreminder:id=search_view", "ssss\n");
    // await androidBot.sendVk(66);
    // console.timeEnd('今日');
    // console.log(words);
}