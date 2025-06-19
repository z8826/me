const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
 
// 日志函数，取消时间显示
function log(message) {
    console.log(message);
}
 
// 检查环境变量
function checkEnvVars() {
    const requiredVars = ['COOKIES_LB'];
    for (const varName of requiredVars) {
        if (!process.env[varName]) {
            log(`请设置环境变量 ${varName}`);
            return false;
        }
    }
    return true;
}
 
// PUSH_KEY相关配置
const PUSH_KEY = process.env.PUSH_KEY || '';
 
function post_msg(url, data) {
    return axios.post(url, data)
      .then(response => response.status === 200)
      .catch(error => {
            log(`消息推送失败: ${error.message}`);
            return false;
        });
}
 
function ServerChan_send(sendkey, title, desp = '') {
    const url = `https://api.day.app/wJ2yvzV2w3J5LW97wFXMMn`;
    const data = {
        title,
        desp
    };
    return post_msg(url, data);
}
 
function xxts(title, content) {
    const msg = `${title}\n\n${content}`;
    if (PUSH_KEY) {
        ServerChan_send(PUSH_KEY, title, msg)
          .then(success => {
                if (success) {
                    log("PUSH_KEY推送成功");
                } else {
                    log("PUSH_KEY推送失败");
                }
            });
    }
}
 
// ===================== 配置 =====================
const CONFIG = {
    COOKIE_NAME: "COOKIES_LB", // 增加环境变量存放网站cookies，多账号用#分隔
    SIGN_URL: "https://bbs.0lb.com/plugin.php?id=k_misign:sign",// 需要签到的网站
    USER_AGENT: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    TIMEOUT: 15000,
    RETRY: 3,
    DELAY: 2000,
    DEBUG_MODE: false // 生产环境建议关闭
};
// ===================== 配置结束 =====================
 
// 带重试的请求函数
async function fetchWithRetry(url, config) {
    let attempts = 0;
    while (attempts < CONFIG.RETRY) {
        try {
            const response = await axios({
                url,
                timeout: CONFIG.TIMEOUT,
                responseType: 'arraybuffer',
                ...config,
                headers: {
                    'User-Agent': CONFIG.USER_AGENT,
                    ...config.headers
                }
            });
 
            if (CONFIG.DEBUG_MODE) {
                log(`请求成功：${url}`);
                log(`响应头：${JSON.stringify(response.headers)}`);
            }
            return response;
        } catch (error) {
            if (++attempts === CONFIG.RETRY) {
                log(`请求失败，已达到最大重试次数: ${error.message}`);
                throw error;
            }
            log(`请求失败，正在重试 (${attempts + 1}/${CONFIG.RETRY}): ${error.message}`);
            await new Promise(r => setTimeout(r, CONFIG.DELAY));
        }
    }
}
 
// 签到核心逻辑
async function cnnvnSign(cookie) {
    try {
        // 阶段1：获取formhash
        const pageRes = await fetchWithRetry(CONFIG.SIGN_URL, {
            headers: { 'Cookie': cookie }
        });
        const decodedPage = iconv.decode(pageRes.data, 'gbk');
        const $page = cheerio.load(decodedPage);
 
        // 增强登录状态检测
        if (!decodedPage.includes('每日签到')) {
            throw new Error('Cookie失效或页面结构变更');
        }
 
        // 更稳健的formhash提取
        const formhash = $page('input[name="formhash"]').val() || decodedPage.match(/formhash=([a-z0-9]+)/)?.[1];
        if (!formhash) throw new Error('formhash提取失败');
 
        // 阶段2：提交签到
        const postData = new URLSearchParams({
            formhash: formhash,
            submit: '1',
            qdxq: 'kx',
            todaysay: ''
        });
 
        const signRes = await fetchWithRetry(`${CONFIG.SIGN_URL}&operation=qiandao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': cookie,
                'Referer': CONFIG.SIGN_URL
            },
            data: postData.toString()
        });
 
        // 增强结果解析
        const decodedSign = iconv.decode(signRes.data, 'gbk');
        const $sign = cheerio.load(decodedSign);
        const resultText = $sign('#ct').text().trim().replace(/\s+/g, ' ');
 
        // 关键修复：优化成功判断逻辑
        const isSuccess = /签到成功|您今日已经签到|已签到|今日已签/.test(resultText);
 
        if (CONFIG.DEBUG_MODE) {
            log(`签到结果文本: ${resultText}`);
        }
 
        return {
            success: isSuccess,
            message: resultText
        };
 
    } catch (error) {
        return {
            success: false,
            message: error.message,
            debug: CONFIG.DEBUG_MODE ? error.stack : undefined
        };
    }
}
 
// 多账户处理器
async function processAccounts() {
    if (!checkEnvVars()) {
        return;
    }
    const cookies = process.env[CONFIG.COOKIE_NAME]?.split('#').filter(c => c.trim()) || [];
    if (cookies.length === 0) {
        log(`请设置环境变量 ${CONFIG.COOKIE_NAME}`);
        return;
    }
 
    for (const [index, cookie] of cookies.entries()) {
        log(`处理账号 ${index + 1}/${cookies.length}`);
        const result = await cnnvnSign(cookie);
 
        if (result.success) {
            const logMsg = `状态: ${result.message.includes('已经') ? '重复签到' : '成功'} | 详情: ${result.message.substring(0, 20)}`;
            log(logMsg);
            xxts('自动签到(成功)', logMsg);
        } else {
            const logMsg = `失败详情: ${result.message}`;
            log(logMsg);
            xxts('自动签到(失败)', logMsg);
        }
        await new Promise(r => setTimeout(r, CONFIG.DELAY));
    }
}
 
// 执行入口
if (require.main === module) {
    processAccounts().catch(err => {
        log(`全局错误: ${err.message}`);
        xxts('自动签到(全局错误)', err.message);
    });
}
