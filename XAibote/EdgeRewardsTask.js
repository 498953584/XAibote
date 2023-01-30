const WebBot = require('WebBot');//引用WebBot模块

//注册主函数，指定浏览器相关参数
WebBot.registerMain(webMain, "127.0.0.1", 36678, {
    browserName: "edge",
    // debugPort: 19222
});

/**用作代码提示，webMain函数会被多次调用，注意使用全局变量
* @param {WebBot} webBot
*/
async function webMain(webBot) {
    //设置隐式等待
    await webBot.setImplicitTimeout(5000);

    //Microsoft Rewards Edge任务功能
    while (true) {
        console.log("打开https://rewards.bing.com/pointsbreakdown，开始检查今日搜索任务完成情况...");
        await webBot.goto("https://rewards.bing.com/pointsbreakdown");
        let txtBreak = await webBot.getElementInnerHTML('//*[@id="userPointsBreakdown"]/div/div[2]/div/div[1]/div/div[2]/mee-rewards-user-points-details/div/div/div/div/p[3]');
        let txtNum = await webBot.getElementInnerHTML('//*[@id="userPointsBreakdown"]/div/div[2]/div/div[1]/div/div[2]/mee-rewards-user-points-details/div/div/div/div/p[2]/b');
        if (!txtBreak || !txtNum) {
            console.error("未找到对应的控件信息");
            return;
        }
        let txt = txtBreak.replace(new RegExp(/.*最多可获得 (\d+) 分.*搜索可得 (\d+) 分/, "g"), "$1|$2");
        console.log("今日已获得:" + txtNum, txt);
        let nums = txt.split("|");
        let num = (parseInt(nums[0]) - parseInt(txtNum)) / parseInt(nums[1]);
        console.log("搜索剩余次数：" + num);
        if (num == 0) {
            console.log("已全部完成！");
            break;
        }
        for (var i = 0; i < num; i++) {
            await webBot.goto("https://cn.bing.com/search?q=天气" + i + Math.random());
            // await webBot.sendKeys('//*[@id="sb_form_q"]', '今天的天气' + i);
            // await webBot.sendVk(13);
            await webBot.isDisplayed('//*[@id="rh_meter"]');
            await webBot.sleep(1000);
        }
    }
    // //注入js代码并返回值
    // let ret = await webBot.executeScript('(function () {return "aibote rpa"})();');
    // console.log(ret);//输出aibote rpa
    // let ret = await webBot.executeScript('alert("5")');
    // console.log(ret);
}