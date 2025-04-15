/*

APP：福田e家 
变量：ftej '账号#密码'  多账号使用@号隔开

更新时间：2025-04-14
更新内容：更新4月份抽奖活动

*/
let axios = require("axios");
const dayjs = require("dayjs");
axios.defaults.timeout = 180000;
let request = require("request");
const $ = new Env("福田E家");
let ftej = ($.isNode() ? process.env.ftej : $.getdata("ftej")) || ``;
let ftejArr = [];
var timestamp = Math.round(new Date().getTime() / 1000).toString();

request = request.defaults({
    jar: true,
});

let msg = "";

let maxWait = 0; //等待最大时间
let minWait = 0; //等待最小时间
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const activityNum = 250401
const isLuckyDraw = 1; //0为关闭抽奖，1为打开抽奖,默认为1

const { log } = console;
const debug = 0; //0为关闭调试，1为打开调试,默认为0

!(async() => {
    if (typeof $request !== "undefined") {
        await GetRewrite();
    } else {
        if (!(await Envs())) return;
        else {
            log(
                `\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
          new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000 +
            8 * 60 * 60 * 1000
        ).toLocaleString()} \n=============================================\n`
            );

            log(
                `\n=================== 共找到 ${ftejArr.length} 个账号 ===================`
            );
            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${ftejArr}`);
            }

            // 执行代码
            for (let index = 0; index < ftejArr.length; index++) {
                let num = index + 1;
                log(`\n==== 开始【第 ${num} 个账号】====\n`);
                ftej = ftejArr[index].split("#");
                console.log(`开始运行福田E家`);
                await login();
                // console.log(`\n开始运行皮卡生活`);
                // await pkLogin();
                const waitTime = randomInt(20000, 30000);
                console.log(`静默等待${waitTime / 1000}秒后运行下一个账号`);
                await $.wait(waitTime);
            }
            await SendMsg(msg);
        }
    }
})()
.catch((e) => log(e))
    .finally(() => $.done());

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//  登录
async function login() {
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/homeManager/getLoginMember",
            headers: {
                Host: "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
            },
            data: {
                password: `${ftej[1]}`,
                version_name: "",
                version_auth: "",
                device_id: "",
                device_model: "",
                ip: "",
                name: `${ftej[0]}`,
                version_code: "180",
                deviceSystemVersion: "",
                device_type: "0",
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        userMsg = data.data;
                        console.log(`手机号码: ${userMsg.tel}`);
                        await myInfo("1");
                        if (userMsg.signIn != "已签到") {
                            await signIn();
                        } else {
                            console.log("今日已经签到");
                        }
                        await getTaskList();
                        if (isLuckyDraw == 1) {
                            await luckySign();
                            await myAwards()
                        }
                        await myInfo("2");
                    } else console.log(`账号${ftej[0]}：`, data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

// 皮卡抽奖
async function luckyDraw() {
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: `https://czyl.foton.com.cn/shareCars/c${activityNum}/luckyDraw.action`,
            data: `encryptMemberId=${userMsg.memberComplexCode}&activityNum=${activityNum}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        console.log(`抽奖：${data.msg}`);
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

async function luckySign() {
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: `https://czyl.foton.com.cn/shareCars/c${activityNum}/getDrawNum.action`,
            headers:{
                "Host": "czyl.foton.com.cn",
                "User-Agent": "Mozilla/5.0 (Linux; Android 15; 24031PN0DC Build/AQ3A.240627.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/132.0.6834.163 Mobile Safari/537.36;Umeng4Aplus/1.0.0ftejAndroid",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Encoding": "gzip, deflate, br, zstd",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "X-Requested-With": "XMLHttpRequest",
                "Origin": "https://czyl.foton.com.cn",
                "Referer": "https://czyl.foton.com.cn/shareCars/activity/interactCenter250401/draw.html",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
            },
            data: `encryptMemberId=${userMsg.memberComplexCode}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if(data.code=='0'){
                        if(data.data.remainNum>0){
                            for (let i = 0; i < data.data.remainNum; i++) {
                                console.log(`第${i+1}次抽奖`)
                                await luckyDraw();
                                await $.wait(3000)
                            }
                        }
                    } else {
                        console.log(JSON.stringify(data))
                    }
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}


async function myAwards() {
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: `https://czyl.foton.com.cn/shareCars/c${activityNum}/myAwards.action`,
            data: `encryptMemberId=${userMsg.memberComplexCode}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    let data = response.data;
                    if (data.code == 0) {
                        data.data = JSON.parse(data.data);
                        data.data.forEach((item, index) => {
                            console.log(`抽奖${index+1}：${item.award_name}`)
                        })
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  个人中心
async function myInfo(item) {
    let time1 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/homeManager/api/Member/findMemberPointsInfo",
            headers: {
                Host: "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
                token: ``,
            },
            data: {
                memberId: userMsg.memberID,
                userId: userMsg.uid,
                userType: userMsg.userType,
                uid: userMsg.uid,
                mobile: userMsg.tel,
                tel: userMsg.tel,
                brandName: "",
                seriesName: "",
                token: "",
                safeEnc: time1 - 20220000,
                businessId: 1,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        console.log(`当前积分：${data.data.pointValue}`);
                        if (item == "2") {
                            const phone = userMsg.tel.replace(
                                /(\d{3})\d{4}(\d{4})/,
                                "$1****$2"
                            );
                            msg += `\n【${phone}】 当前积分:   ${data.data.pointValue}\n`;
                        }
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  签到
async function signIn() {
    let time1 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/homeManager/api/bonus/signActivity2nd",
            headers: {
                Host: "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
                token: ``,
            },
            data: {
                memberId: userMsg.memberComplexCode,
                userId: userMsg.uid,
                userType: userMsg.userType,
                uid: userMsg.uid,
                mobile: userMsg.tel,
                tel: userMsg.tel,
                brandName: "",
                seriesName: "",
                token: "",
                safeEnc: time1 - 20220000,
                businessId: 1,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200)
                        console.log("签到成功，获得：" + data.data.integral + "积分");
                    else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  任务列表
async function getTaskList() {
    const time1 = new Date().getTime();
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/homeManager/api/Member/getTaskList",
            headers: {
                Host: "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
                token: ``,
            },
            data: {
                memberId: userMsg.memberID,
                userId: userMsg.uid,
                userType: userMsg.userType,
                uid: userMsg.uid,
                mobile: userMsg.tel,
                tel: userMsg.tel,
                phone: userMsg.tel,
                brandName: "",
                seriesName: "",
                token: "",
                safeEnc: time1,
                businessId: 1,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        await postList();
                        for (const i of data.data) {
                            if (i.ruleName === "保客分享") {
                                if (i.completeNum == 0) await share();
                                else console.log("保客分享任务已完成");
                            } else if (i.ruleName === "发帖") {
                                if (i.completeNum == 0) {
                                    const randomIndex = Math.floor(
                                        Math.random() * postListArray.length
                                    );
                                    await addPost(postListArray[randomIndex]);
                                } else console.log("发帖任务已完成");
                            } else if (i.ruleName === "关注") {
                                if (i.completeNum == 0) {
                                    const randomIndex = Math.floor(
                                        Math.random() * postListArray.length
                                    );
                                    await follow(postListArray[randomIndex]);
                                } else console.log("关注任务已完成");
                            }
                            await $.wait(randomInt(4000, 5200));
                        }
                        await myPost();
                    }
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  分享
async function share() {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/homeManager/api/bonus/addIntegralForShare",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset=utf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: `{"safeEnc":${time8 - 20220000},"activity":"","tel":"${
        userMsg.tel
      }","id":"33","source":"APP","memberId":"${userMsg.memberComplexCode}"}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200)
                        console.log(`分享成功，获得${data.data.integral}积分`);
                    else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  帖子列表
async function postList() {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/nowPostList",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset=utf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: ` {"memberId":"${userMsg.memberID}","userId":"${
        userMsg.uid
      }","userType":"61","uid":"${userMsg.uid}","mobile":"${
        userMsg.tel
      }","tel":"${
        userMsg.tel
      }","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${
        time8 - 20220000
      },"businessId":1,"pageNumber":1,"pageSize":30,"follow":"1"}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        postListArray = data.data;
                        console.log("获取帖子成功");
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  发帖
async function addPost(item) {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/addJson2nd",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: `{"memberId":"${userMsg.memberComplexCode}","userId":"${
        userMsg.uid
      }","userType":"61","uid":"${userMsg.uid}","mobile":"${
        userMsg.tel
      }","tel":"${
        userMsg.tel
      }","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${
        time8 - 20220000
      },"businessId":1,"content":"${
        item.content
      }","postType":1,"topicIdList":[${
        item.topicInfos[0].topic_id
      }],"uploadFlag":3,"title":"","urlList":[]}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) console.log(`发帖成功`);
                    else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  关注
async function follow(item) {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/follow2nd",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: `{"memberId":"${userMsg.memberComplexCode}","userId":"${
        userMsg.uid
      }","userType":"61","uid":"${userMsg.uid}","mobile":"${
        userMsg.tel
      }","tel":"${
        userMsg.tel
      }","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${
        time8 - 20220000
      },"businessId":1,"behavior":"1","memberIdeds":"${
        item.memberId
      }","navyId":"null"}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        console.log(`关注成功`);
                        await $.wait(randomInt(4000, 5200));
                        await cancelFollow(item);
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  取消关注
async function cancelFollow(item) {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/post/follow2nd",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: `{"memberId":"${userMsg.memberComplexCode}","userId":"${
        userMsg.uid
      }","userType":"61","uid":"${userMsg.uid}","mobile":"${
        userMsg.tel
      }","tel":"${
        userMsg.tel
      }","brandName":"","seriesName":"","token":"ebf76685e48d4e14a9de6fccc76483e3","safeEnc":${
        time8 - 20220000
      },"businessId":1,"behavior":"2","memberIdeds":"${
        item.memberId
      }","navyId":"null"}`,
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) console.log(`取消关注成功`);
                    else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  我的发帖
async function myPost() {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/mine/myPost",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: {
                memberId: userMsg.memberID,
                userId: userMsg.uid,
                userType: userMsg.userType,
                uid: userMsg.uid,
                mobile: userMsg.tel,
                tel: userMsg.tel,
                brandName: "",
                seriesName: "",
                token: "",
                safeEnc: time8 - 20220000,
                businessId: 1,
                pageNumber: 1,
                pageSize: 10,
                type: 1,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        for (const i of data.data) {
                            await delMyPost(i);
                            const waitTime = randomInt(4000, 5200);
                            console.log(`等待${waitTime / 1000}秒后继续删除`);
                            await $.wait(waitTime);
                        }
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  删帖
async function delMyPost(item) {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/ehomesCommunity/api/mine/delete",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: {
                memberId: userMsg.memberID,
                userId: userMsg.uid,
                userType: userMsg.userType,
                uid: userMsg.uid,
                mobile: userMsg.tel,
                tel: userMsg.tel,
                brandName: "",
                seriesName: "",
                token: "",
                safeEnc: time8 - 20220000,
                postId: item.postId,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) console.log(`删除${item.postId}帖子成功`);
                    else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  皮卡生活登录
async function pkLogin() {
    let time1 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/pkHome/api/user/getLoginMember2nd",
            headers: {
                host: "czyl.foton.com.cn",
                "Content-Type": "application/json; charset=utf-8",
            },
            data: {
                memberId: "",
                memberID: "",
                mobile: "",
                token: "7fe186bb15ff4426ae84f300f05d9c8d",
                vin: "",
                safeEnc: time1 - 10110000,
                name: ftej[0],
                password: ftej[1],
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        pkUserMsg = data.data;
                        console.log(`手机号码：${pkUserMsg.user.mobile}`);
                        await pkTaskList();
                    } else console.log(`账号${ftej[0]}：`, data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(async function(error) {
                console.error("异常错误,重新登录");
                await pkLogin();
            })
            .then((res) => {
                resolve();
            });
    });
}

//  皮卡生活任务列表
async function pkTaskList() {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/pkHome/api/bonus/getTaskList",
            headers: {
                Host: "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
                token: pkUserMsg.token,
            },
            data: {
                memberId: pkUserMsg.user.memberNo,
                memberID: pkUserMsg.user.memberNo,
                mobile: pkUserMsg.user.mobile,
                token: "",
                vin: "",
                safeEnc: time8 - 20220000,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        await pkPostList();
                        for (const i of data.data) {
                            if (i.ruleName === "签到") {
                                await pkSignIn();
                            } else if (i.ruleName === "关注") {
                                const randomIndex = Math.floor(
                                    Math.random() * pkPostListArray.length
                                );
                                await pkFollow(pkPostListArray[randomIndex]);
                            }
                        }
                    } else console.log(`账号${ftej[0]}：`, data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  皮卡生活签到
async function pkSignIn() {
    let time1 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/pkHome/api/bonus/signActivity2nd",
            headers: {
                Host: "czyl.foton.com.cn",
                "Content-Type": "application/json;charset\u003dutf-8",
                token: pkUserMsg.token,
            },
            data: {
                memberId: pkUserMsg.memberComplexCode,
                mobile: pkUserMsg.user.mobile,
                token: "",
                vin: "",
                safeEnc: time1 - 10110000,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    console.log(data);
                    if (data.code === 200)
                        console.log("签到成功，获得：" + data.data.integral + "积分");
                    else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e.msg} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  皮卡生活帖子列表
async function pkPostList() {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/pkHomeForum/api/post/currentPostList",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset=utf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: {
                memberId: pkUserMsg.memberComplexCode,
                mobile: pkUserMsg.user.mobile,
                token: "",
                vin: "",
                safeEnc: time8 - 10110000,
                pageNum: 1,
                pageSize: 30,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        pkPostListArray = data.data;
                        console.log("获取帖子成功");
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  皮卡生活关注
async function pkFollow(item) {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/pkHomeForum/api/post/follow2nd",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset=utf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: {
                memberId: pkUserMsg.memberComplexCode,
                mobile: pkUserMsg.user.mobile,
                token: "",
                vin: "",
                safeEnc: time8 - 10110000,
                memberIded: item.memberId,
                navyId: null,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) {
                        console.log(`关注成功`);
                        await $.wait(randomInt(4000, 5200));
                        await pkCancelFollow(data.data.followId);
                    } else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

//  皮卡生活取消关注
async function pkCancelFollow(item) {
    let time8 = Math.round(Date.now());
    return new Promise((resolve) => {
        var options = {
            method: "post",
            url: "https://czyl.foton.com.cn/ehomes-new/pkHomeForum/api/post/notFollow",
            headers: {
                "user-agent": "web",
                "Content-Type": "application/json; charset\u003dutf-8",
                token: "",
                host: "czyl.foton.com.cn",
            },
            data: {
                memberId: pkUserMsg.memberComplexCode,
                memberID: pkUserMsg.memberComplexCode,
                mobile: pkUserMsg.user.mobile,
                token: "",
                vin: "",
                safeEnc: time8 - 10110000,
                followId: item,
            },
        };
        if (debug) {
            log(`\n【debug】=============== 这是  请求 url =============== `);
            log(JSON.stringify(options));
        }
        axios
            .request(options)
            .then(async function(response) {
                try {
                    if (debug) {
                        log(`\n\n【debug】=============== 这是 返回data ============== `);
                        log(JSON.stringify(response.data));
                    }
                    const data = response.data;
                    if (data.code === 200) console.log(`取消关注成功`);
                    else console.log(data.msg);
                } catch (e) {
                    log(`异常：${e}，原因：${e} `);
                }
            })
            .catch(function(error) {
                console.error(error);
            })
            .then((res) => {
                resolve();
            });
    });
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// 检测变量
async function Envs() {
    if (ftej) {
        if (ftej.indexOf("@") != -1) {
            ftej.split("@").forEach((item) => {
                ftejArr.push(item);
            });
        } else if (ftej.indexOf("\n") != -1) {
            ftej.split("\n").forEach((item) => {
                ftejArr.push(item);
            });
        } else {
            ftejArr.push(ftej);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 ftej`);
        return;
    }

    return true;
}

function addNotifyStr(str, is_log = true) {
    if (is_log) {
        log(`${str}\n`);
    }
    msg += `${str}\n`;
}

async function SendMsg(message) {
    if (!message) return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require("./sendNotify");
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}

function Env(t, e) {
    "undefined" != typeof process &&
        JSON.stringify(process.env).indexOf("GITHUB") > -1 &&
        process.exit(0);

    class s {
        constructor(t) {
            this.env = t;
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? { url: t } : t;
            let s = this.get;
            return (
                "POST" === e && (s = this.post),
                new Promise((e, i) => {
                    s.call(this, t, (t, s, r) => {
                        t ? i(t) : e(s);
                    });
                })
            );
        }

        get(t) {
            return this.send.call(this.env, t);
        }

        post(t) {
            return this.send.call(this.env, t, "POST");
        }
    }

    return new(class {
        constructor(t, e) {
            (this.name = t),
            (this.http = new s(this)),
            (this.data = null),
            (this.dataFile = "box.dat"),
            (this.logs = []),
            (this.isMute = !1),
            (this.isNeedRewrite = !1),
            (this.logSeparator = "\n"),
            (this.startTime = new Date().getTime()),
            Object.assign(this, e),
                this.log("", `🔔${this.name}, 开始!`);
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports;
        }

        isQuanX() {
            return "undefined" != typeof $task;
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
        }

        isLoon() {
            return "undefined" != typeof $loon;
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t);
            } catch {
                return e;
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t);
            } catch {
                return e;
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t));
                } catch {}
            return s;
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e);
            } catch {
                return !1;
            }
        }

        getScript(t) {
            return new Promise((e) => {
                this.get({ url: t }, (t, s, i) => e(i));
            });
        }

        runScript(t, e) {
            return new Promise((s) => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                (r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
                const [o, h] = i.split("@"),
                    n = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: { script_text: t, mock_type: "cron", timeout: r },
                        headers: { "X-Key": o, Accept: "*/*" },
                    };
                this.post(n, (t, e, i) => s(i));
            }).catch((t) => this.logErr(t));
        }

        loaddata() {
            if (!this.isNode()) return {}; {
                (this.fs = this.fs ? this.fs : require("fs")),
                (this.path = this.path ? this.path : require("path"));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i));
                    } catch (t) {
                        return {};
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                (this.fs = this.fs ? this.fs : require("fs")),
                (this.path = this.path ? this.path : require("path"));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s
                    ?
                    this.fs.writeFileSync(t, r) :
                    i ?
                    this.fs.writeFileSync(e, r) :
                    this.fs.writeFileSync(t, r);
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (((r = Object(r)[t]), void 0 === r)) return s;
            return r;
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ?
                t :
                (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
                    (e
                        .slice(0, -1)
                        .reduce(
                            (t, s, i) =>
                            Object(t[s]) === t[s] ?
                            t[s] :
                            (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}),
                            t
                        )[e[e.length - 1]] = s),
                    t);
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e;
                    } catch (t) {
                        e = "";
                    }
            }
            return e;
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? ("null" === o ? null : o || "{}") : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i));
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i));
                }
            } else s = this.setval(t, e);
            return s;
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ?
                $persistentStore.read(t) :
                this.isQuanX() ?
                $prefs.valueForKey(t) :
                this.isNode() ?
                ((this.data = this.loaddata()), this.data[t]) :
                (this.data && this.data[t]) || null;
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ?
                $persistentStore.write(t, e) :
                this.isQuanX() ?
                $prefs.setValueForKey(t, e) :
                this.isNode() ?
                ((this.data = this.loaddata()),
                    (this.data[e] = t),
                    this.writedata(), !0) :
                (this.data && this.data[e]) || null;
        }

        initGotEnv(t) {
            (this.got = this.got ? this.got : require("got")),
            (this.cktough = this.cktough ? this.cktough : require("tough-cookie")),
            (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
            t &&
                ((t.headers = t.headers ? t.headers : {}),
                    void 0 === t.headers.Cookie &&
                    void 0 === t.cookieJar &&
                    (t.cookieJar = this.ckjar));
        }

        get(t, e = () => {}) {
            t.headers &&
                (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
                this.isSurge() || this.isLoon() ?
                (this.isSurge() &&
                    this.isNeedRewrite &&
                    ((t.headers = t.headers || {}),
                        Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
                    $httpClient.get(t, (t, s, i) => {
                        !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                    })) :
                this.isQuanX() ?
                (this.isNeedRewrite &&
                    ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                    $task.fetch(t).then(
                        (t) => {
                            const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                            e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                        },
                        (t) => e(t)
                    )) :
                this.isNode() &&
                (this.initGotEnv(t),
                    this.got(t)
                    .on("redirect", (t, e) => {
                        try {
                            if (t.headers["set-cookie"]) {
                                const s = t.headers["set-cookie"]
                                    .map(this.cktough.Cookie.parse)
                                    .toString();
                                s && this.ckjar.setCookieSync(s, null),
                                    (e.cookieJar = this.ckjar);
                            }
                        } catch (t) {
                            this.logErr(t);
                        }
                    })
                    .then(
                        (t) => {
                            const {
                                statusCode: s,
                                statusCode: i,
                                headers: r,
                                body: o,
                            } = t;
                            e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                        },
                        (t) => {
                            const { message: s, response: i } = t;
                            e(s, i, i && i.body);
                        }
                    ));
        }

        post(t, e = () => {}) {
            if (
                (t.body &&
                    t.headers &&
                    !t.headers["Content-Type"] &&
                    (t.headers["Content-Type"] = "application/x-www-form-urlencoded"),
                    t.headers && delete t.headers["Content-Length"],
                    this.isSurge() || this.isLoon())
            )
                this.isSurge() &&
                this.isNeedRewrite &&
                ((t.headers = t.headers || {}),
                    Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
                $httpClient.post(t, (t, s, i) => {
                    !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                });
            else if (this.isQuanX())
                (t.method = "POST"),
                this.isNeedRewrite &&
                ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                $task.fetch(t).then(
                    (t) => {
                        const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                        e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                    },
                    (t) => e(t)
                );
            else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(
                    (t) => {
                        const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                        e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                    },
                    (t) => {
                        const { message: s, response: i } = t;
                        e(s, i, i && i.body);
                    }
                );
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date();
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds(),
            };
            /(y+)/.test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    (s.getFullYear() + "").substr(4 - RegExp.$1.length)
                ));
            for (let e in i)
                new RegExp("(" + e + ")").test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    1 == RegExp.$1.length ?
                    i[e] :
                    ("00" + i[e]).substr(("" + i[e]).length)
                ));
            return t;
        }

        msg(e = t, s = "", i = "", r) {
            const o = (t) => {
                if (!t) return t;
                if ("string" == typeof t)
                    return this.isLoon() ?
                        t :
                        this.isQuanX() ? { "open-url": t } :
                        this.isSurge() ? { url: t } :
                        void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return { openUrl: e, mediaUrl: s };
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return { "open-url": e, "media-url": s };
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return { url: e };
                    }
                }
            };
            if (
                (this.isMute ||
                    (this.isSurge() || this.isLoon() ?
                        $notification.post(e, s, i, o(r)) :
                        this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog)
            ) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e),
                    s && t.push(s),
                    i && t.push(i),
                    console.log(t.join("\n")),
                    (this.logs = this.logs.concat(t));
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator));
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s
                ?
                this.log("", `❗️${this.name}, 错误!`, t.stack) :
                this.log("", `❗️${this.name}, 错误!`, t);
        }

        wait(t) {
            return new Promise((e) => setTimeout(e, t));
        }

        done(t = {}) {
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`),
                this.log(),
                (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
        }
    })(t, e);
}