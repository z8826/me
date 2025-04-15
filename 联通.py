
# 活动说明: 中国联通
# 添加账号说明(青龙/本地)二选一
#   青龙: 青龙变量zglttoken 值{"ck":"xxxxxxxx"} 一行一个(回车分割)
#   本地: 脚本内置ck方法ck_token = [{"ck":"xxxxxxxx"},{"ck":"xxxxxxxx"}]
# 推送消息:
#   青龙变量lingpt_push 值为WxPusher UID
# 脚本声明: 仅供学习交流，如用于违法违规操作与本作者无关,请勿用于非法用途,请在24小时内删除该文件!
# 软件版本
version = "1.0.0"
name = "中国联通"
lingpt_token = "ck_token"
lingpt_tips = '{"ck":"1750XXXX784"}'

import os
import re
import json
import time
import random
import requests
from datetime import datetime,timedelta
from functools import partial
from Crypto.Cipher import AES
from urllib.parse import quote
from multiprocessing import Pool
from base64 import b64encode, b64decode
from Crypto.Util.Padding import pad, unpad
from concurrent.futures import ThreadPoolExecutor
# 变量类型(本地/青龙)
Btype = "青龙"
# 微信推送(WxPusher UID)
Push_key = os.getenv("lingpt_push")
# 域名(无法使用时请更换)
domain = 'https://10010.woread.com.cn/ng_woread_service/rest'
# 保持连接,重复利用
ss = requests.session()
# 全局基础请求头
headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.39 (0x18002733) NetType/WIFI Language/zh_CN',
    'accesstoken': 'ODZERTZCMjA1NTg1MTFFNDNFMThDRDYw',
    'Host': '10010.woread.com.cn',
    'Content-Type':'application/json;charset=UTF-8'
}
# 提前多久执行(秒)
tt_time = 0.9
#设置进程数量
num_workers = 50
# 日期时间格式化
def f_time():
    return time.strftime("%Y%m%d%H%M%S", time.localtime())
    
# 获取下一次执行时间
def get_next_day_timestamp():
    now = datetime.now()
    now_hour = now.hour
    if now_hour == 23:
        # 增加一天，并设置时间为00:00:00
        next_day = now + timedelta(days=1)
        next_day_start = next_day.replace(hour=0, minute=0, second=0, microsecond=0)
        return int(next_day_start.timestamp())  # 返回秒时间
    elif now_hour == 0:
        # 设置时间为今天的00:00:00
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        return int(today_start.timestamp())  # 返回秒时间
    else:
        return "不在规定时间段"

#  请求-加密/解密
def Dsign(code, srcs):
    key = "woreadst^&*12345".encode()  # 定义密钥
    iv = "16-Bytes--String".encode()  # 定义初始化向量
    if code == 0:
        # 加密
        srcs = srcs.encode()
        cipher = AES.new(key, AES.MODE_CBC, iv)
        encrypted_bytes = cipher.encrypt(
            pad(srcs, AES.block_size, style='pkcs7'))
        hex_str = encrypted_bytes.hex()
        sign = b64encode(hex_str.encode()).decode("utf-8")
        return sign  # 返回加密后的 base64 编码字符串
    else:
        # 解密
        srcs = b64decode(srcs).decode('utf-8')
        srcs = bytes.fromhex(srcs)
        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted_bytes = cipher.decrypt(srcs)
        decrypted_text = unpad(decrypted_bytes, AES.block_size, style='pkcs7').decode(
            "utf-8")
        return decrypted_text  # 返回解密后的明文

# 账号登陆
def login(i,ck):
    sign = {"sign": Dsign(0, json.dumps({"phone": Dsign(0,ck['ck']), "timestamp": f_time()}))}
    result = ss.post(domain+'/account/login', json=sign, headers=headers).json()
    if result['code'] == '0000':
        print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 登陆成功!")
        ck['info'] = result['data']
        return result['data']
    else:
        print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 登陆失败!")
        return False

# 获取用户数据信息
def user_info(i,ck):
    if login(i,ck):
        sign = Dsign(0, json.dumps({"timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'],"userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
        result = ss.post(domain+'/phone/vouchers/queryTicketAccount', json={"sign": sign}, headers=headers).json()
        if result['code'] == '0000':
            print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 已赚:{result['data']['totalNum']/100}元 余额: {result['data']['usableNum']/100}元")
        else:
            print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 获取用户数据信息失败!")

# 获取任务-执行任务
def do_read(i,ck):
    if login(i,ck):
        tomorrow = datetime.now() + timedelta(days=1)
        # 如果明天是一号
        if tomorrow.day == 1:
            next_time = get_next_day_timestamp()
            time_stamp = int(time.time())
            wait_time = next_time - time_stamp
            print(f"账号【{i+1}】✴️ [{ck['ck'][-4:]}] 明天是一号({tomorrow}),0点刷新任务,等待:{wait_time}秒!")
            time.sleep(wait_time) 
        sign = Dsign(0, json.dumps({"timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'],"userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
        result = ss.post(domain+'/activity423/queryActiveInfo', json={"sign": sign}, headers=headers).json()
        if result['code'] == '0000':
            ck['info']['activeName'] = result['data'].get('activeName','')
            ck['info']['activeId'] = result['data'].get('activeId','')
            print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 活动信息: {ck['info']['activeName'][-9:]} 活动ID:{ck['info']['activeId']}")
            # 开始抢任务
            sign = Dsign(0, json.dumps({"activeIndex": ck['info']['activeId'], "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
            result = ss.post(domain+'/activity423/queryActiveTaskList', json={"sign": sign}, headers=headers).json()
            if result['code'] == '0000':
                tasks = sorted(result['data'], key=lambda x: x['secondTaskId'], reverse=True)
                # 排除一些不做的任务
                tasks = [task for task in tasks if task["taskDetail"]["taskName"] not in ["阅读15分钟","阅读360分钟","阅读480分钟"]]
                print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 获取任务列表: {len(tasks)} 个 时间:{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
                # 同时执行这些任务
                partial_task = partial(do_task,i=i,ck=ck)
                with ThreadPoolExecutor() as executor:
                    # 使用 map 方法将任务函数应用到每个账号上
                    results = list(executor.map(partial_task, tasks))
                # 检查任务
                task_info(i,ck)
                # 执行抽奖任务
                lot(i,ck)
                draw_lottery(i,ck)
            else:
                print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 获取任务列表失败,{result['message']}!")
        else:
            print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 获取活动数据信息失败,{result['message']}!")

# 执行领取任务
def do_task(task,i,ck):
    next_time = get_next_day_timestamp()
    if next_time == "不在规定时间段":
        print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 任务[{task['taskDetail']['taskName']}] 不在规定时间段!")
        return False
    time_stamp = int(time.time())
    wait_time = next_time - time_stamp - tt_time
    print(f"账号【{i+1}】✴️ [{ck['ck'][-4:]}] 🏳️‍🌈 [{task['taskDetail']['taskName']}] 当前时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} 等待:{wait_time}秒后开抢")
    if time_stamp <= next_time:
        time.sleep(wait_time)
    for cc in range(20):
        sign = Dsign(0, json.dumps({"activeId": ck['info']['activeId'], "taskId": task['secondTaskId'], "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
        result = ss.post(domain+'/activity423/receiveActiveTask', json={"sign": sign}, headers=headers).json()
        if result['code'] == '0000':
            print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 任务[{task['taskDetail']['taskName']}] 结果:{result['data']}!")
            break
        else:
            if "过期" in result['message']:
                if login(i,ck):
                    print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 登陆信息已刷新,重新领取!")
            else:
                print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 任务[{task['taskDetail']['taskName']}] 结果:{result['message']}!")
        time.sleep(random.uniform(1.5,2.0))

# 查询任务进度
def task_info(i,ck,index=None):
    sign = Dsign(0, json.dumps({"activeIndex": ck['info']['activeId'], "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
    result = ss.post(domain+'/activity423/queryCurTaskStatus', json={"sign": sign}, headers=headers).json()
    if result['code'] == '0000':
        if index:
            t_task = result['data'][index]
            print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 任务[{t_task['taskDetail']['materialGroup']['bindActiveName']}] 进度:{int(t_task['taskDetail']['currentValue'])}/{t_task['taskDetail']['taskValue']}")
            if t_task['taskDetail']['currentValue'] >= float(t_task['taskDetail']['taskValue']):
                print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 任务[{t_task['taskDetail']['materialGroup']['bindActiveName']}] 已完成!")
                # 领取奖励
                reward(t_task['taskDetail']['materialGroup']['bindActiveName'],t_task['id'],i,ck)
            else:
                # 执行上传时长任务
                upload_time(i,ck,index)
        else:
            for t_task in result['data']:
                print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 任务[{t_task['taskDetail']['materialGroup']['bindActiveName']}] 进度:{int(t_task['taskDetail']['currentValue'])}/{t_task['taskDetail']['taskValue']}")
                if t_task['taskDetail']['currentValue'] >= float(t_task['taskDetail']['taskValue']):
                    print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 任务[{t_task['taskDetail']['materialGroup']['bindActiveName']}] 已完成!")
                    # 领取奖励
                    reward(t_task['taskDetail']['materialGroup']['bindActiveName'],t_task['id'],i,ck)
                else:
                    # 获取任务索引
                    index = result['data'].index(t_task)
                    # 执行上传时长任务
                    upload_time(i,ck,index)
    else:
        if "过期" in result['message']:
            if login(i,ck):
                print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 登陆信息已刷新,重新查询!")
                task_info(i,ck,index)
        else:
            print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 查询任务进度失败,{result['message']}!")

# 上传时长
def upload_time(i,ck,index):
    sign = Dsign(0, json.dumps({"signtimestamp":str(int(time.time()*1000)),"source":"9","readTime":"2","cntindex":"409672","cntIndex":409672,"cnttype":"1","cntType":1,"cardid":"11891","catid":"118411","pageIndex":"10683","chapterseno":1,"channelid":"","chapterid":"-1","readtype":1,"isend":"0","timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
    result = ss.post(domain+"/history/addReadTime",json={"sign": sign},headers=headers).json()
    if result['code'] == '0000':
        print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 上传时长:{result['message']}!")
        time.sleep(random.randint(121, 128))
        task_info(i,ck,index)
    else:
        if "过期" in result['message']:
            print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 登陆信息已刷新,重新上传!")
            upload_time(i,ck,index)
        print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 上传时长:{result['message']}!")
        time.sleep(random.randint(121, 128))

# 获取阅读完成奖励
def reward(taskname,taskId,i,ck):
    sign = Dsign(0, json.dumps({"taskId":taskId, "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
    result = ss.post(domain+'/activity423/completeActiveTask', json={"sign": sign}, headers=headers).json()
    if result['code'] == '0000':
        print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 任务[{taskname}] 领取:{result['data']['exchangeResult']['materialGroupInfo']['groupName']} 成功🎉🎉!")
        ipinfo = ss.get("https://v4.ip.zxinc.org/info.php?type=json").json()
        ipcity = ipinfo['data']['location']
        ip = ipinfo['data']['myip']
        Wxpusher(name,Push_key,f"完成[{taskname}]任务\n获得: {result['data']['exchangeResult']['materialGroupInfo']['groupName']}🎉🎉!",f"{ipcity} [{ip}]")
    else:
        print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 任务[{taskname}] 领取:{result['message']}!")

# 获取抽奖状态
def lot(i,ck):
    sign = Dsign(0, json.dumps({"activeIndex": ck['info']['activeId'], "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
    result = ss.post(domain+'/activity423/queryReadStatus', json={"sign": sign}, headers=headers).json()
    if result['code'] == '0000':
        if result['data'] == '4':
            sign = Dsign(0, json.dumps({"activeIndex": ck['info']['activeId'], "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
            result = ss.post(domain+'/activity423/drawReadActivePrize', json={"sign": sign}, headers=headers).json()
            if result['code'] == '0000':
                print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 完成阅读任务抽奖 结果:{result['data']['prizedesc']}!")
                draw_lottery(i,ck)
            else:
                lot(i,ck)
        else:
            print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] [{result['data']}]暂无阅读抽奖机会,明天再来试试运气吧")

# 打卡抽奖
def draw_lottery(i,ck):
    sign = Dsign(0, json.dumps({"activetyindex": 6640, "userid": ck['info']['userid'], "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
    result = ss.post(domain+'/basics/addDrawTimes', json={"sign": sign}, headers=headers).json()
    if result['code'] == '0000':
        print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 完成阅读打卡任务,获得打卡抽奖次数:{result['data']}")
        sign = Dsign(0, json.dumps({"activeIndex": 6640, "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
        result = ss.post(domain+'/activity/checkUserTakeActive', json={"sign": sign}, headers=headers).json()
        if result['code'] == '0000':
            if result['data'] > 0:
                time.sleep(random.uniform(1.5,2.0))
                sign = Dsign(0, json.dumps({"activeindex": 6640, "timestamp": f_time(), "token": ck['info']['token'], "userId": ck['info']['userid'], "userIndex": ck['info']['userindex'], "userAccount": ck['info']['phone'], "verifyCode": ck['info']['verifycode']}))
                result = ss.post(domain+'/basics/doDraw', json={"sign": sign}, headers=headers).json()
                if result['code'] == '0000':
                    print(f"账号【{i+1}】✅ [{ck['ck'][-4:]}] 打卡抽奖成功 抽奖结果:{result['data']['prizedesc']}!")
                    draw_lottery(i,ck)
                else:
                    print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 打卡抽奖失败,{result['message']}!")
            else:
                print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 暂无打卡抽奖机会,明天再来试试运气吧!")
        else:
            print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 获取打卡抽奖次数失败,{json.loads(result['message'])['message']}!")
    else:
        print(f"账号【{i+1}】❌ [{ck['ck'][-4:]}] 完成阅读打卡任务失败,{result['message']}!")

# 微信Wxpusher 推送 UID扫码获取: https://wxpusher.zjiecode.com/demo/
def Wxpusher(name,key,message,ipinfo=""):
    # 通知标题,Wxpusher UID,通知消息内容
    code = f'''{name}
<body style="font-family: 'Arial', sans-serif; background-color: #f2f2f2; margin: 0; padding: 20px;">
    <div class="notification" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px; padding: 15px; margin-bottom: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <h2 style="color: #28a745; text-align: center;">任务执行结束</h2>
        <h3 style="color: #666; text-align: center;">{name}</h3>
        <div class="code-block" style="background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 10px; margin-top: 15px; overflow: auto; text-align: center;">
            <div style="color: #333; white-space: pre-wrap; word-wrap: break-word; margin: 0;">
{message}
            </div>
        </div>
        <div class="ip-address" style="margin-top: 15px; text-align: center; font-weight: bold; color: #007bff;">
            推送IP: {ipinfo}
        </div>
    </div>
</body>
    '''
    result = ss.get(f"https://wxpusher.zjiecode.com/demo/send/custom/{key}?content={quote(code)}").json()
    if result['code'] == 1000:
        return True, f"微信Wxpusher 通知: 推送成功!"
    else:
        return False, f"微信Wxpusher 通知: 推送失败!"

# 全局异常处理
def handle_exception(e,i):
    print(f"账号【{i+1}】🆘 程序出现异常: {e}")
    if Push_key == None:
        print(f"账号【{i+1}】✴️ 未配置Wxpusher推送!")
    else:
        ipinfo = ss.get("https://v4.ip.zxinc.org/info.php?type=json").json()
        ipcity = ipinfo['data']['location']
        ip = ipinfo['data']['myip']
        Wxpusher(name,Push_key,f"账号【{i+1}】🆘 程序出现异常: {e}",f"{ipcity} [{ip}]")
        
# 全局异常捕获
def process_wrapper(func, args):
    try:
        func(*args)
    except Exception as e:
        handle_exception(e,args[0])


if __name__ == "__main__":
    print(f"""█
    注意事项:本代码由AI自动生成,仅供参考使用。用户需自行承担所有风险，我们不对代码的准确性、
    适用性或产生的任何后果负责。
""")
    if Btype == "本地":
        if os.getenv(lingpt_token) == None:
            print(f'⛔ 青龙变量异常: 请添加{lingpt_token}变量示例:{lingpt_tips} 确保一行一个')
            exit()
        # 变量CK列表
        #ck_token = [json.loads(line) for line in os.getenv(lingpt_token).splitlines()]
        ck_token = [json.loads(li) if "&" in line else json.loads(line) for line in os.getenv(lingpt_token).splitlines() for li in re.findall(r'{.*?}', line)]
    else:
        # 本地CK列表
        ck_token = [
            # 这里填写本地变量
            {"ck":"185XXXX0727"},{"ck":"132XXX0727"}
        ]
        if ck_token == []:
            print(f'⛔ 本地变量异常: 请添加本地ck_token示例:{lingpt_tips}')
            exit()
    # 创建进程池
    # with Pool() as pool:
    with Pool(processes = num_workers) as pool:

        print("==================👻获取账号信息👻================")
        pool.starmap(process_wrapper, [(user_info, (i, ck)) for i, ck in enumerate(ck_token)])
        print("==================💫开始执行任务💫================")
        pool.starmap(process_wrapper, [(do_read, (i, ck)) for i, ck in enumerate(ck_token)])
        print("==================🐣获取账号信息🐣================")
        pool.starmap(process_wrapper, [(user_info, (i, ck)) for i, ck in enumerate(ck_token)])

        # 关闭进程池
        pool.close()
        # 等待所有子进程执行完毕
        pool.join()

        # 关闭连接
        ss.close
        # 输出结果
        print(f"====================[{name}V{version}]================")