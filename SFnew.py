
# cron: 11 6,9,12,15,18 * * *
# const $ = new Env("顺丰速运");
#2025/1/6 遍历生活特权所有分组的券进行领券，券没啥用但完成可领取30点丰蜜目前一天拉满155点
#变量名：sfsyUrl
#格式：多账号用&分割或创建多个变量sfsyUrl
#关于参数获取如下两种方式：
#❶顺丰APP绑定微信后，前往该站点sm.linzixuan.work用微信扫码登录后，选择复制编码Token，不要复制错
#或者
#❷打开小程序或APP-我的-积分, 手动抓包以下几种URL之一
#https://mcs-mimp-web.sf-express.com/mcs-mimp/share/weChat/shareGiftReceiveRedirect
#https://mcs-mimp-web.sf-express.com/mcs-mimp/share/app/shareRedirect
#抓好URL后访问https://www.toolhelper.cn/EncodeDecode/Url进行编码，请务必按提示操作
import hashlib
import json
import os
import random
import time
from datetime import datetime, timedelta
from sys import exit
import requests
from requests.packages.urllib3.exceptions import InsecureRequestWarning
from urllib.parse import unquote

# 禁用安全请求警告
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# 代理相关配置
PROXY_API_URL = os.getenv('SF_PROXY_API_URL', '')  # 从环境变量获取代理API地址

def get_proxy():
    """
    从代理API获取代理
    返回格式：{'http': 'http://ip:port', 'https': 'http://ip:port'}
    """
    try:
        if not PROXY_API_URL:
            print('⚠️ 未配置代理API地址，将不使用代理')
            return None
            
        response = requests.get(PROXY_API_URL, timeout=10)
        if response.status_code == 200:
            proxy_text = response.text.strip()
            if ':' in proxy_text:
                proxy = f'http://{proxy_text}'
                return {
                    'http': proxy,
                    'https': proxy
                }
        print(f'❌ 获取代理失败: {response.text}')
        return None
    except Exception as e:
        print(f'❌ 获取代理异常: {str(e)}')
        return None

IS_DEV = False
if os.path.isfile('DEV_ENV.py'):
    import DEV_ENV
    IS_DEV = True


#from notify import send

send_msg = ''
one_msg = ''


def Log(cont=''):
    global send_msg, one_msg
    print(cont)
    if cont:
        one_msg += f'{cont}\n'
        send_msg += f'{cont}\n'


inviteId = ['']


class RUN:
    def __init__(self, info, index):
        global one_msg
        one_msg = ''
        split_info = info.split('@')
        url = split_info[0]
        len_split_info = len(split_info)
        last_info = split_info[len_split_info - 1]
        self.send_UID = None
        if len_split_info > 0 and "UID_" in last_info:
            self.send_UID = last_info
        self.index = index + 1
        print(f"{'='*5} 🔄 开始执行第{self.index}个账号 🔄 {'='*5}")
        
        # 获取代理
        self.proxy = get_proxy()
        if self.proxy:
            print(f"✅ 成功获取代理: {self.proxy['http']}")
        
        self.s = requests.session()
        self.s.verify = False
        if self.proxy:
            self.s.proxies = self.proxy
            
        self.headers = {
            'Host': 'mcs-mimp-web.sf-express.com',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63090551) XWEB/6945 Flue',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'sec-fetch-site': 'none',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-user': '?1',
            'sec-fetch-dest': 'document',
            'accept-language': 'zh-CN,zh',
            'platform': 'MINI_PROGRAM',

        }
        self.anniversary_black = False
        self.member_day_black = False
        self.member_day_red_packet_drew_today = False
        self.member_day_red_packet_map = {}
        self.login_res = self.login(url)
        self.all_logs = []  # 初始化all_logs属性
        self.today = datetime.now().strftime('%Y-%m-%d')
        # self.answer = APP_INFO.get('ANSWER', []).get(self.today, False)
        self.max_level = 8
        self.packet_threshold = 1 << (self.max_level - 1)

    def get_deviceId(self, characters='abcdef0123456789'):
        result = ''
        for char in 'xxxxxxxx-xxxx-xxxx':
            if char == 'x':
                result += random.choice(characters)
            elif char == 'X':
                result += random.choice(characters).upper()
            else:
                result += char
        return result

    def login(self, sfurl):
        try:
            decoded_url = unquote(sfurl)
            ress = self.s.get(decoded_url, headers=self.headers)
            self.user_id = self.s.cookies.get_dict().get('_login_user_id_', '')
            self.phone = self.s.cookies.get_dict().get('_login_mobile_', '')
            self.mobile = self.phone[:3] + "*" * 4 + self.phone[7:] if self.phone else ''
            
            if self.phone:
                Log(f'👤 用户:【{self.mobile}】登陆成功')
                return True
            else:
                Log(f'❌ 获取用户信息失败')
                return False
        except Exception as e:
            Log(f'❌ 登录异常: {str(e)}')
            return False

    def getSign(self):
        timestamp = str(int(round(time.time() * 1000)))
        token = 'wwesldfs29aniversaryvdld29'
        sysCode = 'MCS-MIMP-CORE'
        data = f'token={token}&timestamp={timestamp}&sysCode={sysCode}'
        signature = hashlib.md5(data.encode()).hexdigest()
        data = {
            'sysCode': sysCode,
            'timestamp': timestamp,
            'signature': signature
        }
        self.headers.update(data)
        return data

    def do_request(self, url, data={}, req_type='post', max_retries=3):
        self.getSign()
        retry_count = 0
        
        while retry_count < max_retries:
            try:
                if req_type.lower() == 'get':
                    response = self.s.get(url, headers=self.headers, timeout=30)  # 添加超时
                elif req_type.lower() == 'post':
                    response = self.s.post(url, headers=self.headers, json=data, timeout=30)  # 添加超时
                else:
                    raise ValueError('Invalid req_type: %s' % req_type)
                    
                # 检查响应状态码
                response.raise_for_status()
                
                try:
                    res = response.json()
                    return res
                except json.JSONDecodeError as e:
                    print(f'JSON解析失败: {str(e)}, 响应内容: {response.text[:200]}')  # 只打印前200个字符
                    retry_count += 1
                    if retry_count < max_retries:
                        print(f'正在进行第{retry_count + 1}次重试...')
                        time.sleep(2)  # 添加延迟
                        continue
                    return None
                    
            except requests.exceptions.RequestException as e:
                retry_count += 1
                if retry_count < max_retries:
                    print(f'请求失败，正在切换代理重试 ({retry_count}/{max_retries}): {str(e)}')
                    # 重新获取代理
                    self.proxy = get_proxy()
                    if self.proxy:
                        print(f"✅ 成功获取新代理: {self.proxy['http']}")
                        self.s.proxies = self.proxy
                    time.sleep(2)  # 等待2秒后重试
                else:
                    print('请求最终失败:', e)
                    return None
                
        return None  # 所有重试都失败后返回None

    def sign(self):
        print(f'🎯 开始执行签到')
        json_data = {"comeFrom": "vioin", "channelFrom": "WEIXIN"}
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskSignPlusService~automaticSignFetchPackage'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            count_day = response.get('obj', {}).get('countDay', 0)
            if response.get('obj') and response['obj'].get('integralTaskSignPackageVOList'):
                packet_name = response["obj"]["integralTaskSignPackageVOList"][0]["packetName"]
                Log(f'✨ 签到成功，获得【{packet_name}】，本周累计签到【{count_day + 1}】天')
            else:
                Log(f'📝 今日已签到，本周累计签到【{count_day + 1}】天')
        else:
            print(f'❌ 签到失败！原因：{response.get("errorMessage")}')

    def sign(self):
        print(f'>>>>>>开始执行签到')
        json_data = {"comeFrom": "vioin", "channelFrom": "WEIXIN"}
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskSignPlusService~automaticSignFetchPackage'
        url2 ='https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskSignPlusService~queryPointSignAwardList'
        url3 ='https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskSignPlusService~getUnFetchPointAndDiscount'
        result = self.do_request(url2, data={"channelType": "1"})
        result2=self.do_request(url3, data={})
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            count_day = response.get('obj', {}).get('countDay', 0)
            if response.get('obj') and response['obj'].get('integralTaskSignPackageVOList'):
                packet_name = response["obj"]["integralTaskSignPackageVOList"][0]["packetName"]
                Log(f'>>>签到成功，获得【{packet_name}】，本周累计签到【{count_day + 1}】天')
            else:
                Log(f'今日已签到，本周累计签到【{count_day + 1}】天')
        else:
            print(f'签到失败！原因：{response.get("errorMessage")}')

    def superWelfare_receiveRedPacket(self):
        print(f'>>>>>>超值福利签到')
        json_data = {
            'channel': 'czflqdlhbxcx'
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberActLengthy~redPacketActivityService~superWelfare~receiveRedPacket'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            gift_list = response.get('obj', {}).get('giftList', [])
            if response.get('obj', {}).get('extraGiftList', []):
                gift_list.extend(response['obj']['extraGiftList'])
            gift_names = ', '.join([gift['giftName'] for gift in gift_list])
            receive_status = response.get('obj', {}).get('receiveStatus')
            status_message = '领取成功' if receive_status == 1 else '已领取过'
            Log(f'超值福利签到[{status_message}]: {gift_names}')
        else:
            error_message = response.get('errorMessage') or json.dumps(response) or '无返回'
            print(f'超值福利签到失败: {error_message}')



    def get_SignTaskList(self, END=False):
        if not END: print(f'>>>开始获取签到任务列表')
        json_data = {
            'channelType': '3',
            'deviceId': self.get_deviceId(),
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskStrategyService~queryPointTaskAndSignFromES'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True and response.get('obj') != []:
            totalPoint = response["obj"]["totalPoint"]
            if END:
                Log(f'当前积分：【{totalPoint}】')
                return
            Log(f'执行前积分：【{totalPoint}】')
            for task in response["obj"]["taskTitleLevels"]:
                self.taskId = task["taskId"]
                self.taskCode = task["taskCode"]
                self.strategyId = task["strategyId"]
                self.title = task["title"]
                status = task["status"]
                skip_title = ['用行业模板寄件下单', '去新增一个收件偏好', '参与积分活动']
                if status == 3:
                    print(f'>{self.title}-已完成')
                    continue
                if self.title in skip_title:
                    print(f'>{self.title}-跳过')
                    continue
                if self.title =='领任意生活特权福利':
                    json_data = {
                        "memGrade": 2,
                        "categoryCode": "SHTQ",
                        "showCode": "SHTQWNTJ"
                    }
                    url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberGoods~mallGoodsLifeService~list'
                    response = self.do_request(url, data=json_data)
                    if response.get('success') == True:
                        goodsList = response["obj"][0]["goodsList"]
                        for goods in goodsList:
                            exchangeTimesLimit = goods['exchangeTimesLimit']
                            if exchangeTimesLimit >= 1:
                                self.goodsNo = goods['goodsNo']
                                print(f'领取生活权益：当前选择券号：{self.goodsNo}')
                                self.get_coupom()
                                break
                    else:
                        print(f'>领券失败！原因：{response.get("errorMessage")}')
                else:
                    self.doTask()
                    time.sleep(3)
                self.receiveTask()

    def doTask(self):
        print(f'>>>开始去完成【{self.title}】任务')
        json_data = {
            'taskCode': self.taskCode,
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonRoutePost/memberEs/taskRecord/finishTask'

        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print(f'>【{self.title}】任务-已完成')
        else:

            print(f'>【{self.title}】任务-{response.get("errorMessage")} 1{response}')

    def receiveTask(self):
        print(f'>>>开始领取【{self.title}】任务奖励')
        json_data = {
            "strategyId": self.strategyId,
            "taskId": self.taskId,
            "taskCode": self.taskCode,
            "deviceId": self.get_deviceId()
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskStrategyService~fetchIntegral'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print(f'>【{self.title}】任务奖励领取成功！')
        else:
            print(f'>【{self.title}】任务-{response.get("errorMessage")}')

    def do_honeyTask(self):
        json_data = {"taskCode": self.taskCode}
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print(f'>【{self.taskType}】任务-已完成')
        else:
            print(f'>【{self.taskType}】任务-{response.get("errorMessage")}')

    def receive_honeyTask(self):
        print('>>>执行收取丰蜜任务')
        self.headers['syscode'] = 'MCS-MIMP-CORE'
        self.headers['channel'] = 'wxwdsj'
        self.headers['accept'] = 'application/json, text/plain, */*'
        self.headers['content-type'] = 'application/json;charset=UTF-8'
        self.headers['platform'] = 'MINI_PROGRAM'
        json_data = {"taskType": self.taskType}
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeIndexService~receiveHoney'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print(f'收取任务【{self.taskType}】成功！')
        else:
            print(f'收取任务【{self.taskType}】失败！原因：{response.get("errorMessage")}')

    def get_coupom(self):
        print('>>>执行领取生活权益领券任务')

        json_data = {
            "from": "Point_Mall",
            "orderSource": "POINT_MALL_EXCHANGE",
            "goodsNo": self.goodsNo,
            "quantity": 1,
            "taskCode": self.taskCode
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberGoods~pointMallService~createOrder'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print(f'>领券成功！')
        else:
            print(f'>领券失败！原因：{response.get("errorMessage")}')

    def get_coupom_list(self):
        print('>>>获取生活权益券列表')

        json_data = {
            "memGrade": 1,
            "categoryCode": "SHTQ",
            "showCode": "SHTQWNTJ"
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberGoods~mallGoodsLifeService~list'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            goodsList = response["obj"][0]["goodsList"]
            for goods in goodsList:
                exchangeTimesLimit = goods['exchangeTimesLimit']
                if exchangeTimesLimit >= 1:
                    self.goodsNo = goods['goodsNo']
                    print(f'当前选择券号：{self.goodsNo}')
                    self.get_coupom()
                    break
        else:
            print(f'>领券失败！原因：{response.get("errorMessage")}')

    def get_honeyTaskListStart(self):
        print('>>>开始获取采蜜换大礼任务列表')
        json_data = {}
        self.headers['channel'] = 'wxwdsj'
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeIndexService~taskDetail'

        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            for item in response["obj"]["list"]:
                self.taskType = item["taskType"]
                status = item["status"]
                if status == 3:
                    print(f'>【{self.taskType}】-已完成')
                    if self.taskType == 'BEES_GAME_TASK_TYPE':
                        self.bee_need_help = False
                    continue
                if "taskCode" in item:
                    self.taskCode = item["taskCode"]
                    if self.taskType == 'DAILY_VIP_TASK_TYPE':
                        self.get_coupom_list()
                    else:
                        self.do_honeyTask()
                if self.taskType == 'BEES_GAME_TASK_TYPE':
                    self.honey_damaoxian()
                time.sleep(2)

    def honey_damaoxian(self):
        print('>>>执行大冒险任务')
        gameNum = 5
        for i in range(1, gameNum):
            json_data = {
                'gatherHoney': 20,
            }
            if gameNum < 0: break
            print(f'>>开始第{i}次大冒险')
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeGameService~gameReport'
            response = self.do_request(url, data=json_data)
            stu = response.get('success')
            if stu:
                gameNum = response.get('obj')['gameNum']
                print(f'>大冒险成功！剩余次数【{gameNum}】')
                time.sleep(2)
                gameNum -= 1
            elif response.get("errorMessage") == '容量不足':
                print(f'> 需要扩容')
                self.honey_expand()
            else:
                print(f'>大冒险失败！【{response.get("errorMessage")}】')
                break

    def honey_expand(self):
        print('>>>容器扩容')
        gameNum = 5

        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeIndexService~expand'
        response = self.do_request(url, data={})
        stu = response.get('success', False)
        if stu:
            obj = response.get('obj')
            print(f'>成功扩容【{obj}】容量')
        else:
            print(f'>扩容失败！【{response.get("errorMessage")}】')

    def honey_indexData(self, END=False):
        if not END: print('\n>>>>>>>开始执行采蜜换大礼任务')
        random_invite = random.choice([invite for invite in inviteId if invite != self.user_id])
        self.headers['channel'] = 'wxwdsj'
        json_data = {"inviteUserId": random_invite}
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeIndexService~indexData'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            usableHoney = response.get('obj').get('usableHoney')
            if END:
                Log(f'当前丰蜜：【{usableHoney}】')
                return
            Log(f'执行前丰蜜：【{usableHoney}】')
            taskDetail = response.get('obj').get('taskDetail')
            activityEndTime = response.get('obj').get('activityEndTime', '')
            activity_end_time = datetime.strptime(activityEndTime, "%Y-%m-%d %H:%M:%S")
            current_time = datetime.now()

            if current_time.date() == activity_end_time.date():
                Log("本期活动今日结束，请及时兑换")
            else:
                print(f'本期活动结束时间【{activityEndTime}】')

            if taskDetail != []:
                for task in taskDetail:
                    self.taskType = task['type']
                    self.receive_honeyTask()
                    time.sleep(2)

    def EAR_END_2023_TaskList(self):
        print('\n>>>>>>开始年终集卡任务')
        json_data = {
            "activityCode": "YEAR_END_2023",
            "channelType": "MINI_PROGRAM"
        }
        self.headers['channel'] = 'xcx23nz'
        self.headers['platform'] = 'MINI_PROGRAM'
        self.headers['syscode'] = 'MCS-MIMP-CORE'

        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList'

        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            for item in response["obj"]:
                self.title = item["taskName"]
                self.taskType = item["taskType"]
                status = item["status"]
                if status == 3:
                    print(f'>【{self.taskType}】-已完成')
                    continue
                if self.taskType == 'INTEGRAL_EXCHANGE':
                    self.EAR_END_2023_ExchangeCard()
                elif self.taskType == 'CLICK_MY_SETTING':
                    self.taskCode = item["taskCode"]
                    self.addDeliverPrefer()
                if "taskCode" in item:
                    self.taskCode = item["taskCode"]
                    self.doTask()
                    time.sleep(3)
                    self.EAR_END_2023_receiveTask()
                else:
                    print(f'暂时不支持【{self.title}】任务')
        self.EAR_END_2023_getAward()
        self.EAR_END_2023_GuessIdiom()

    def addDeliverPrefer(self):
        print(f'>>>开始【{self.title}】任务')
        json_data = {
            "country": "中国",
            "countryCode": "A000086000",
            "province": "北京市",
            "provinceCode": "A110000000",
            "city": "北京市",
            "cityCode": "A111000000",
            "county": "东城区",
            "countyCode": "A110101000",
            "address": "1号楼1单元101",
            "latitude": "",
            "longitude": "",
            "memberId": "",
            "locationCode": "010",
            "zoneCode": "CN",
            "postCode": "",
            "takeWay": "7",
            "callBeforeDelivery": 'false',
            "deliverTag": "2,3,4,1",
            "deliverTagContent": "",
            "startDeliverTime": "",
            "selectCollection": 'false',
            "serviceName": "",
            "serviceCode": "",
            "serviceType": "",
            "serviceAddress": "",
            "serviceDistance": "",
            "serviceTime": "",
            "serviceTelephone": "",
            "channelCode": "RW11111",
            "taskId": self.taskId,
            "extJson": "{\"noDeliverDetail\":[]}"
        }
        url = 'https://ucmp.sf-express.com/cx-wechat-member/member/deliveryPreference/addDeliverPrefer'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print('新增一个收件偏好，成功')
        else:
            print(f'>【{self.title}】任务-{response.get("errorMessage")}')

    def Exchangee_2025(self):
        json_data = {
            "exchangeNum": 1,
            "activityCode": "DISNEY2"
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2025TaskService~integralExchange'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print(f'> 获得一次抽奖次数')
        else:
            print(f'>【积分兑换次数】任务-{response.get("errorMessage")}')

    def EAR_END_2023_getAward(self):
        print(f'>>>开始抽卡')
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~yearEnd2023GardenPartyService~getAward'
        for l in range(10):
            for i in range(0, 3):
                json_data = {
                    "cardType": i
                }
                response = self.do_request(url, data=json_data)
                if response.get('success') == True:
                    receivedAccountList = response['obj']['receivedAccountList']
                    for card in receivedAccountList:
                        print(f'>获得：【{card["currency"]}】卡【{card["amount"]}】张！')
                elif response.get('errorMessage') == '达到限流阈值，请稍后重试':
                    break
                elif response.get('errorMessage') == '用户信息失效，请退出重新进入':
                    break
                else:
                    print(f'>抽卡失败：{response.get("errorMessage")}')
                time.sleep(3)
    def ifLogin(self):
        response = self.do_request('https://mcs-mimp-web.sf-express.com/mcs-mimp/ifLogin')
        # print(response)
    def game202505(self):
        self.headers['channel']='25dwappty'
        response = self.do_request("https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoatGame2025Service~init")
        if response.get("obj",{}).get("alreadyDayPass",True):
            print(f'今日粽子游戏已完成')
        else:
            print(f'>>>开始连粽子')
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoatGame2025Service~win'
            for i in range(1, 5):
                json_data = {
                    "levelIndex": i
                }
                response = self.do_request(url, data=json_data)
                if response.get('success') == True:
                    print(f'第{i}关成功！')
                else:
                    print(f'第{i}关失败！')

    def EAR_END_2023_receiveTask(self):
        print(f'>>>开始领取【{self.title}】任务奖励')
        json_data = {
            "taskType": self.taskType,
            "activityCode": "YEAR_END_2023",
            "channelType": "MINI_PROGRAM"
        }
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonNoLoginPost/~memberNonactivity~yearEnd2023TaskService~fetchMixTaskReward'
        response = self.do_request(url, data=json_data)
        if response.get('success') == True:
            print(f'>【{self.title}】任务奖励领取成功！')
        else:
            print(f'>【{self.title}】任务-{response.get("errorMessage")}')

    def anniversary2024_weekly_gift_status(self):
        print(f'\n>>>>>>>开始周年庆任务')
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024IndexService~weeklyGiftStatus'
        response = self.do_request(url)
        if response.get('success') == True:
            weekly_gift_list = response.get('obj', {}).get('weeklyGiftList', [])
            for weekly_gift in weekly_gift_list:
                if not weekly_gift.get('received'):
                    receive_start_time = datetime.strptime(weekly_gift['receiveStartTime'], '%Y-%m-%d %H:%M:%S')
                    receive_end_time = datetime.strptime(weekly_gift['receiveEndTime'], '%Y-%m-%d %H:%M:%S')
                    current_time = datetime.now()
                    if receive_start_time <= current_time <= receive_end_time:
                        self.anniversary2024_receive_weekly_gift()
        else:
            error_message = response.get('errorMessage') or json.dumps(response) or '无返回'
            print(f'查询每周领券失败: {error_message}')
            if '系统繁忙' in error_message or '用户手机号校验未通过' in error_message:
                self.anniversary_black = True

    def anniversary2024_receive_weekly_gift(self):
        print(f'>>>开始领取每周领券')
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024IndexService~receiveWeeklyGift'
        response = self.do_request(url)
        if response.get('success'):
            product_names = [product['productName'] for product in response.get('obj', [])]
            print(f'每周领券: {product_names}')
        else:
            error_message = response.get('errorMessage') or json.dumps(response) or '无返回'
            print(f'每周领券失败: {error_message}')
            if '系统繁忙' in error_message or '用户手机号校验未通过' in error_message:
                self.anniversary_black = True

    def anniversary2024_taskList(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList'
        data = {
            'activityCode': 'ANNIVERSARY_2024',
            'channelType': 'MINI_PROGRAM'
        }
        response = self.do_request(url, data)
        if response and response.get('success'):
            tasks = response.get('obj', [])
            for task in filter(lambda x: x['status'] == 1, tasks):
                if self.anniversary_black:
                    return
                for _ in range(task['canReceiveTokenNum']):
                    self.anniversary2024_fetchMixTaskReward(task)
            for task in filter(lambda x: x['status'] == 2, tasks):
                if self.anniversary_black:
                    return
                if task['taskType'] in ['PLAY_ACTIVITY_GAME', 'PLAY_HAPPY_ELIMINATION', 'PARTAKE_SUBJECT_GAME']:
                    pass
                elif task['taskType'] == 'FOLLOW_SFZHUNONG_VEDIO_ID':
                    pass
                elif task['taskType'] in ['BROWSE_VIP_CENTER', 'GUESS_GAME_TIP', 'CREATE_SFID', 'CLICK_MY_SETTING',
                                          'CLICK_TEMPLATE', 'REAL_NAME', 'SEND_SUCCESS_RECALL', 'OPEN_SVIP',
                                          'OPEN_FAST_CARD', 'FIRST_CHARGE_NEW_EXPRESS_CARD', 'CHARGE_NEW_EXPRESS_CARD',
                                          'INTEGRAL_EXCHANGE']:
                    pass
                else:
                    for _ in range(task['restFinishTime']):
                        if self.anniversary_black:
                            break
                        self.anniversary2024_finishTask(task)

    def anniversary2024_finishTask(self, task):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonRoutePost/memberEs/taskRecord/finishTask'
        data = {'taskCode': task['taskCode']}
        response = self.do_request(url, data)
        if response and response.get('success'):
            print('完成任务[%s]成功' % task['taskName'])
            self.anniversary2024_fetchMixTaskReward(task)
        else:
            print('完成任务[%s]失败: %s' % (
                task['taskName'], response.get('errorMessage') or (json.dumps(response) if response else '无返回')))

    def anniversary2024_fetchMixTaskReward(self, task):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024TaskService~fetchMixTaskReward'
        data = {
            'taskType': task['taskType'],
            'activityCode': 'ANNIVERSARY_2024',
            'channelType': 'MINI_PROGRAM'
        }
        response = self.do_request(url, data)
        if response and response.get('success'):
            reward_info = response.get('obj', {}).get('account', {})
            received_list = [f"[{item['currency']}]X{item['amount']}" for item in
                             reward_info.get('receivedAccountList', [])]
            turned_award = reward_info.get('turnedAward', {})
            if turned_award.get('productName'):
                received_list.append(f"[优惠券]{turned_award['productName']}")
            print('领取任务[%s]奖励: %s' % (task['taskName'], ', '.join(received_list)))
        else:
            error_message = response.get('errorMessage') or json.dumps(response) or '无返回'
            print('领取任务[%s]奖励失败: %s' % (task['taskName'], error_message))
            if '用户手机号校验未通过' in error_message:
                self.anniversary_black = True

    def anniversary2024_unbox(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~unbox'
        response = self.do_request(url, {})
        if response and response.get('success'):
            account_info = response.get('obj', {}).get('account', {})
            unbox_list = [f"[{item['currency']}]X{item['amount']}" for item in
                          account_info.get('receivedAccountList', [])]
            print('拆盒子: %s' % ', '.join(unbox_list) or '空气')
        else:
            error_message = response.get('errorMessage') or json.dumps(response) or '无返回'
            print('拆盒子失败: %s' % error_message)
            if '用户手机号校验未通过' in error_message:
                self.anniversary_black = True

    def anniversary2024_game_list(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GameParkService~list'
        response = self.do_request(url, {})
        try:
            if response['success']:
                topic_pk_info = response['obj'].get('topicPKInfo', {})
                search_word_info = response['obj'].get('searchWordInfo', {})
                happy_elimination_info = response['obj'].get('happyEliminationInfo', {})

                if not topic_pk_info.get('isPassFlag'):
                    print('开始话题PK赛')
                    self.anniversary2024_TopicPk_topicList()

                if not search_word_info.get('isPassFlag') or not search_word_info.get('isFinishDailyFlag'):
                    print('开始找字游戏')
                    for i in range(1, 11):
                        wait_time = random.randint(1000, 3000) / 1000.0
                        time.sleep(wait_time)
                        if not self.anniversary2024_SearchWord_win(i):
                            break

                if not happy_elimination_info.get('isPassFlag') or not happy_elimination_info.get('isFinishDailyFlag'):
                    print('开始消消乐')
                    for i in range(1, 31):
                        wait_time = random.randint(2000, 4000) / 1000.0
                        time.sleep(wait_time)
                        if not self.anniversary2024_HappyElimination_win(i):
                            break
            else:
                error_message = response['errorMessage'] or json.dumps(response) or '无返回'
                print('查询游戏状态失败: ' + error_message)
                if '用户手机号校验未通过' in error_message:
                    self.anniversary_black = True
        except Exception as e:
            print(str(e))

    def anniversary2024_SearchWord_win(self, index):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024SearchWordService~win'
        success = True
        try:
            data = {'index': index}
            response = self.do_request(url, data)
            if response and response.get('success'):
                currency_list = response.get('obj', {}).get('currencyDTOList', [])
                rewards = ', '.join([f"[{c.get('currency')}]X{c.get('amount')}" for c in currency_list])
                print(f'找字游戏第{index}关通关成功: {rewards if rewards else "未获得奖励"}')
            else:
                error_message = response.get('errorMessage') or json.dumps(response) or '无返回'
                print(f'找字游戏第{index}关失败: {error_message}')
                if '系统繁忙' in error_message:
                    success = False
        except Exception as e:
            print(e)
        finally:
            return success

    def anniversary2024_HappyElimination_win(self, index):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024HappyEliminationService~win'
        success = True
        data = {'index': index}
        response = self.do_request(url, data)
        try:
            if response and response.get('success'):
                is_award = response['obj'].get('isAward')
                currency_dto_list = response['obj'].get('currencyDTOList', [])
                rewards = ', '.join([f"[{c.get('currency')}]X{c.get('amount')}" for c in currency_dto_list])
                print(f'第{index}关通关: {rewards if rewards else "未获得奖励"}')
            else:
                error_message = response.get('errorMessage') or json.dumps(response) or '无返回'
                print(f'第{index}关失败: {error_message}')
                if '系统繁忙' in error_message:
                    success = False
        except Exception as e:
            print(e)
            success = False
        finally:
            return success

    def anniversary2024_TopicPk_chooseSide(self, index):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024TopicPkService~chooseSide'
        success = True
        data = {'index': index, 'choose': 0}
        response = self.do_request(url, data)
        try:
            if response and response.get('success'):
                currency_dto_list = response['obj'].get('currencyDTOList', [])
                rewards = ', '.join([f"[{c.get('currency')}]X{c.get('amount')}" for c in currency_dto_list])
                print(f'话题PK赛选择话题{index}成功： {rewards if rewards else "未获得奖励"}')
            else:
                error_message = response['errorMessage'] or json.dumps(response) or '无返回'
                print(f'话题PK赛选择话题{index}失败： {error_message}')
                if '系统繁忙' in error_message:
                    success = False
        except Exception as e:
            print(e)
            success = False
        finally:
            return success

    def anniversary2024_TopicPk_topicList(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024TopicPkService~topicList'
        response = self.do_request(url, {})
        try:
            if response and response.get('success'):
                topics = response['obj'].get('topics', [])
                for topic in topics:
                    if not topic.get('choose'):
                        index = topic.get('index', 1)
                        wait_time = random.randint(2000, 4000) / 1000.0
                        time.sleep(wait_time)
                        if not self.anniversary2024_TopicPk_chooseSide(index):
                            break
            else:
                error_message = response['errorMessage'] or json.dumps(response) or '无返回'
                print(f'查询话题PK赛记录失败： {error_message}')
        except Exception as e:
            print(e)

    def anniversary2024_queryAccountStatus_refresh(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~queryAccountStatus'
        response = self.do_request(url, {})
        try:
            if not response or not response.get('success'):
                error_message = response['errorMessage'] or json.dumps(response) or '无返回'
                print(f'查询账户状态失败： {error_message}')
        except Exception as e:
            print(e)

    def anniversary2024_TopicPk_chooseSide(self, index):
        success = True
        data = {
            'index': index,
            'choose': 0
        }
        self.headers['channel'] = '31annizyw'
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024TopicPkService~chooseSide'
        result = self.do_request(url, data, 'post')

        if result and result.get('success'):
            currency_dto_list = result.get('obj', {}).get('currencyDTOList', [])
            if currency_dto_list:
                rewards = [f"[{currency['currency']}]{currency['amount']}次" for currency in currency_dto_list]
                print(f'话题PK赛第{index}个话题选择成功: {", ".join(rewards)}')
            else:
                print(f'话题PK赛第{index}个话题选择成功')
        else:
            error_message = result.get('errorMessage') if result else '无返回'
            print(f'话题PK赛第{index}个话题失败: {error_message}')
            if error_message and '系统繁忙' in error_message:
                success = False

        return success

    def anniversary2024_titleList(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GuessService~titleList'
        response = self.do_request(url)

        if response and response.get('success'):

            guess_title_info_list = response.get('obj', {}).get('guessTitleInfoList', [])
            today_titles = [title for title in guess_title_info_list if title['gameDate'] == self.today]
            for title_info in today_titles:
                if title_info['answerStatus']:
                    print('今日已回答过竞猜')
                else:
                    answer = self.answer
                    if answer:
                        self.anniversary2024_answer(title_info, answer)
                        print(f'进行了答题: {answer}')
        else:
            error_message = response.get('errorMessage') if response else '无返回'
            print(f'查询每日口令竞猜失败: {error_message}')

    def anniversary2024_titleList_award(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GuessService~titleList'
        response = self.do_request(url)

        if response and response.get('success'):

            guess_title_info_list = response.get('obj', {}).get('guessTitleInfoList', [])
            today_awards = [title for title in guess_title_info_list if title['gameDate'] == self.today]

            for award_info in today_awards:
                if award_info['answerStatus']:
                    awards = award_info.get('awardList', []) + award_info.get('puzzleList', [])
                    awards_description = ', '.join([f"{award['productName']}" for award in awards])
                    print(f'口令竞猜奖励: {awards_description}' if awards_description else '今日无奖励')
                else:
                    print('今日还没回答竞猜')
        else:
            error_message = response.get('errorMessage') if response else '无返回'
            print(f'查询每日口令竞猜奖励失败: {error_message}')

    def anniversary2024_answer(self, answer_info):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GuessService~answer'
        data = {'period': answer_info['period'], 'answerInfo': answer_info}
        response = self.do_request(url, data)
        if response and response.get('success'):
            print('口令竞猜回答成功')
            self.anniversary2024_titleList_award()
        else:
            error_message = response.get('errorMessage') if response else '无返回'
            print(f'口令竞猜回答失败: {error_message}')

    def anniversary2024_queryAccountStatus(self):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~queryAccountStatus'
        result = self.do_request(url)
        if result.get('success'):
            account_currency_list = result.get('obj', {}).get('accountCurrencyList', [])
            unbox_chance_currency = [currency for currency in account_currency_list if
                                     currency.get('currency') == 'UNBOX_CHANCE']
            unbox_chance_balance = unbox_chance_currency[0].get('balance') if unbox_chance_currency else 0

        else:
            error_message = result.get('errorMessage') or json.dumps(result) or '无返回'
            print('查询已收集拼图失败: ' + error_message)

        result = self.do_request(url)
        if result.get('success'):
            account_currency_list = result.get('obj', {}).get('accountCurrencyList', [])
            account_currency_list = [currency for currency in account_currency_list if
                                     currency.get('currency') != 'UNBOX_CHANCE']
            if account_currency_list:
                cards_li = account_currency_list
                card_info = []
                self.cards = {
                    'CARD_1': 0,
                    'CARD_2': 0,
                    'CARD_3': 0,
                    'CARD_4': 0,
                    'CARD_5': 0,
                    'CARD_6': 0,
                    'CARD_7': 0,
                    'CARD_8': 0,
                    'CARD_9': 0,
                    'COMMON_CARD': 0
                }
                for card in cards_li:
                    currency_key = card.get('currency')
                    if currency_key in self.cards:
                        self.cards[currency_key] = int(card.get('balance'))
                    card_info.append('[' + card.get('currency') + ']X' + str(card.get('balance')))

                Log(f'已收集拼图: {card_info}')
                cards_li.sort(key=lambda x: x.get('balance'), reverse=True)

            else:
                print('还没有收集到拼图')
        else:
            error_message = result.get('errorMessage') or json.dumps(result) or '无返回'
            print('查询已收集拼图失败: ' + error_message)

    def do_draw(self, cards):
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~collectDrawAward'
        data = {"accountList": cards}
        response = self.do_request(url, data)
        if response and response.get('success'):
            data = response.get('obj', {})
            productName = data.get('productName', '')
            Log(f'抽奖成功,获得{productName}')
            return True
        else:
            error_message = response.get('errorMessage') if response else '无返回'
            print(f'抽奖失败: {error_message}')
            return False

    def convert_common_card(self, cards, target_card):
        if cards['COMMON_CARD'] > 0:
            cards['COMMON_CARD'] -= 1
            cards[target_card] += 1
            return True
        return False

    def can_draw(self, cards, n):
        distinct_cards = sum(1 for card, amount in cards.items() if card != 'COMMON_CARD' and amount > 0)
        return distinct_cards >= n

    def draw(self, cards, n):
        drawn_cards = []
        for card, amount in sorted(cards.items(), key=lambda item: item[1]):
            if card != 'COMMON_CARD' and amount > 0:
                cards[card] -= 1
                drawn_cards.append(card)
                if len(drawn_cards) == n:
                    break
        if len(drawn_cards) == n:
            "没有足够的卡进行抽奖"
        if self.do_draw(drawn_cards):
            return drawn_cards
        else:
            return None

    def simulate_lottery(self, cards):
        while self.can_draw(cards, 9):
            used_cards = self.draw(cards, 9)
            print("进行了一次9卡抽奖，消耗卡片: ", used_cards)
        while self.can_draw(cards, 7) or self.convert_common_card(cards, 'CARD_1'):
            if not self.can_draw(cards, 7):
                continue
            used_cards = self.draw(cards, 7)
            print("进行了一次7卡抽奖，消耗卡片: ", used_cards)
        while self.can_draw(cards, 5) or self.convert_common_card(cards, 'CARD_1'):
            if not self.can_draw(cards, 5):
                continue
            used_cards = self.draw(cards, 5)
            print("进行了一次5卡抽奖，消耗卡片: ", used_cards)
        while self.can_draw(cards, 3) or self.convert_common_card(cards, 'CARD_1'):
            if not self.can_draw(cards, 3):
                continue
            used_cards = self.draw(cards, 3)
            print("进行了一次3卡抽奖，消耗卡片: ", used_cards)

    def anniversary2024_task(self):
        self.anniversary2024_weekly_gift_status()
        if self.anniversary_black:
            return
        self.anniversary2024_queryAccountStatus()
        target_time = datetime(2024, 4, 3, 14, 0)
        if datetime.now() > target_time:
            print('周年庆活动即将结束，开始自动抽奖')
            self.simulate_lottery(self.cards)
        else:
            print('未到自动抽奖时间')

    def member_day_index(self):
        print('====== 会员日活动 ======')
        try:
            invite_user_id = random.choice([invite for invite in inviteId if invite != self.user_id])
            payload = {'inviteUserId': invite_user_id}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayIndexService~index'

            response = self.do_request(url, data=payload)
            if response.get('success'):
                lottery_num = response.get('obj', {}).get('lotteryNum', 0)
                can_receive_invite_award = response.get('obj', {}).get('canReceiveInviteAward', False)
                if can_receive_invite_award:
                    self.member_day_receive_invite_award(invite_user_id)
                self.member_day_red_packet_status()
                Log(f'会员日可以抽奖{lottery_num}次')
                for _ in range(lottery_num):
                    self.member_day_lottery()
                if self.member_day_black:
                    return
                self.member_day_task_list()
                if self.member_day_black:
                    return
                self.member_day_red_packet_status()
            else:
                error_message = response.get('errorMessage', '无返回')
                Log(f'查询会员日失败: {error_message}')
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_receive_invite_award(self, invite_user_id):
        try:
            payload = {'inviteUserId': invite_user_id}

            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayIndexService~receiveInviteAward'

            response = self.do_request(url, payload)
            if response.get('success'):
                product_name = response.get('obj', {}).get('productName', '空气')
                Log(f'会员日奖励: {product_name}')
            else:
                error_message = response.get('errorMessage', '无返回')
                Log(f'领取会员日奖励失败: {error_message}')
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_lottery(self):
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayLotteryService~lottery'

            response = self.do_request(url, payload)
            if response.get('success'):
                product_name = response.get('obj', {}).get('productName', '空气')
                Log(f'会员日抽奖: {product_name}')
            else:
                error_message = response.get('errorMessage', '无返回')
                Log(f'会员日抽奖失败: {error_message}')
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_task_list(self):
        try:
            payload = {'activityCode': 'MEMBER_DAY', 'channelType': 'MINI_PROGRAM'}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList'

            response = self.do_request(url, payload)
            if response.get('success'):
                task_list = response.get('obj', [])
                for task in task_list:
                    if task['status'] == 1:
                        if self.member_day_black:
                            return
                        self.member_day_fetch_mix_task_reward(task)
                for task in task_list:
                    if task['status'] == 2:
                        if self.member_day_black:
                            return
                        if task['taskType'] in ['SEND_SUCCESS', 'INVITEFRIENDS_PARTAKE_ACTIVITY', 'OPEN_SVIP',
                                                'OPEN_NEW_EXPRESS_CARD', 'OPEN_FAMILY_CARD', 'CHARGE_NEW_EXPRESS_CARD',
                                                'INTEGRAL_EXCHANGE']:
                            pass
                        else:
                            for _ in range(task['restFinishTime']):
                                if self.member_day_black:
                                    return
                                self.member_day_finish_task(task)
            else:
                error_message = response.get('errorMessage', '无返回')
                Log('查询会员日任务失败: ' + error_message)
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_finish_task(self, task):
        try:
            payload = {'taskCode': task['taskCode']}

            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask'

            response = self.do_request(url, payload)
            if response.get('success'):
                Log('完成会员日任务[' + task['taskName'] + ']成功')
                self.member_day_fetch_mix_task_reward(task)
            else:
                error_message = response.get('errorMessage', '无返回')
                Log('完成会员日任务[' + task['taskName'] + ']失败: ' + error_message)
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_fetch_mix_task_reward(self, task):
        try:
            payload = {'taskType': task['taskType'], 'activityCode': 'MEMBER_DAY', 'channelType': 'MINI_PROGRAM'}

            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~fetchMixTaskReward'

            response = self.do_request(url, payload)
            if response.get('success'):
                Log('领取会员日任务[' + task['taskName'] + ']奖励成功')
            else:
                error_message = response.get('errorMessage', '无返回')
                Log('领取会员日任务[' + task['taskName'] + ']奖励失败: ' + error_message)
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_receive_red_packet(self, hour):
        try:
            payload = {'receiveHour': hour}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayTaskService~receiveRedPacket'

            response = self.do_request(url, payload)
            if response.get('success'):
                print(f'会员日领取{hour}点红包成功')
            else:
                error_message = response.get('errorMessage', '无返回')
                print(f'会员日领取{hour}点红包失败: {error_message}')
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_red_packet_status(self):
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayPacketService~redPacketStatus'
            response = self.do_request(url, payload)
            if response.get('success'):
                packet_list = response.get('obj', {}).get('packetList', [])
                for packet in packet_list:
                    self.member_day_red_packet_map[packet['level']] = packet['count']

                for level in range(1, self.max_level):
                    count = self.member_day_red_packet_map.get(level, 0)
                    while count >= 2:
                        self.member_day_red_packet_merge(level)
                        count -= 2
                packet_summary = []
                remaining_needed = 0

                for level, count in self.member_day_red_packet_map.items():
                    if count == 0:
                        continue
                    packet_summary.append(f"[{level}级]X{count}")
                    int_level = int(level)
                    if int_level < self.max_level:
                        remaining_needed += 1 << (int_level - 1)

                Log("会员日合成列表: " + ", ".join(packet_summary))

                if self.member_day_red_packet_map.get(self.max_level):
                    Log(f"会员日已拥有[{self.max_level}级]红包X{self.member_day_red_packet_map[self.max_level]}")
                    self.member_day_red_packet_draw(self.max_level)
                else:
                    remaining = self.packet_threshold - remaining_needed
                    Log(f"会员日距离[{self.max_level}级]红包还差: [1级]红包X{remaining}")

            else:
                error_message = response.get('errorMessage', '无返回')
                Log(f'查询会员日合成失败: {error_message}')
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_red_packet_merge(self, level):
        try:
            payload = {'level': level, 'num': 2}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayPacketService~redPacketMerge'

            response = self.do_request(url, payload)
            if response.get('success'):
                Log(f'会员日合成: [{level}级]红包X2 -> [{level + 1}级]红包')
                self.member_day_red_packet_map[level] -= 2
                if not self.member_day_red_packet_map.get(level + 1):
                    self.member_day_red_packet_map[level + 1] = 0
                self.member_day_red_packet_map[level + 1] += 1
            else:
                error_message = response.get('errorMessage', '无返回')
                Log(f'会员日合成两个[{level}级]红包失败: {error_message}')
                if '没有资格参与活动' in error_message:
                    self.member_day_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def member_day_red_packet_draw(self, level):
        try:
            payload = {'level': str(level)}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayPacketService~redPacketDraw'
            response = self.do_request(url, payload)
            if response and response.get('success'):
                coupon_names = [item['couponName'] for item in response.get('obj', [])] or []

                Log(f"会员日提取[{level}级]红包: {', '.join(coupon_names) or '空气'}")
            else:
                error_message = response.get('errorMessage') if response else "无返回"
                Log(f"会员日提取[{level}级]红包失败: {error_message}")
                if "没有资格参与活动" in error_message:
                    self.memberDay_black = True
                    print("会员日任务风控")
        except Exception as e:
            print(e)

    def DRAGONBOAT_2024_index(self):
        print('====== 查询龙舟活动状态 ======')
        invite_user_id = random.choice([invite for invite in inviteId if invite != self.user_id])
        try:
            self.headers['channel'] = 'newExpressWX'
            self.headers[
                'referer'] = f'https://mcs-mimp-web.sf-express.com/origin/a/mimp-activity/dragonBoat2024?mobile={self.mobile}&userId={self.user_id}&path=/origin/a/mimp-activity/dragonBoat2024&supportShare=&inviteUserId={invite_user_id}&from=newExpressWX'
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonNoLoginPost/~memberNonactivity~dragonBoat2024IndexService~index'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                acEndTime = obj.get('acEndTime', '')
                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                comparison_time = datetime.strptime(acEndTime, "%Y-%m-%d %H:%M:%S")
                is_less_than = datetime.now() < comparison_time
                if is_less_than:
                    print('龙舟游动进行中....')
                    return True
                else:
                    print('龙舟活动已结束')
                    return False
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
                return False
        except Exception as e:
            print(e)
            return False

    def DRAGONBOAT_2024_Game_indexInfo(self):
        Log('====== 开始划龙舟游戏 ======')
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024GameService~indexInfo'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                maxPassLevel = obj.get('maxPassLevel', '')
                ifPassAllLevel = obj.get('ifPassAllLevel', '')
                if maxPassLevel != 30:
                    self.DRAGONBOAT_2024_win(maxPassLevel)
                else:
                    self.DRAGONBOAT_2024_win(0)

            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
                return False
        except Exception as e:
            print(e)
            return False

    def DRAGONBOAT_2024_Game_init(self):
        Log('====== 开始划龙舟游戏 ======')
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024GameService~init'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                currentIndex = obj.get('currentIndex', '')
                ifPassAllLevel = obj.get('ifPassAllLevel', '')
                if currentIndex != 30:
                    self.DRAGONBOAT_2024_win(currentIndex)
                else:
                    self.DRAGONBOAT_2024_win(0)

            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
                return False
        except Exception as e:
            print(e)
            return False

    def DRAGONBOAT_2024_weeklyGiftStatus(self):
        print('====== 查询每周礼包领取状态 ======')
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024IndexService~weeklyGiftStatus'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                for gift in obj:
                    received = gift['received']
                    receiveStartTime = gift['receiveStartTime']
                    receiveEndTime = gift['receiveEndTime']
                    print(f'>>> 领取时间：【{receiveStartTime} 至 {receiveEndTime}】')
                    if received:
                        print('> 该礼包已领取')
                        continue
                    receive_start_time = datetime.strptime(receiveStartTime, "%Y-%m-%d %H:%M:%S")
                    receive_end_time = datetime.strptime(receiveEndTime, "%Y-%m-%d %H:%M:%S")
                    is_within_range = receive_start_time <= datetime.now() <= receive_end_time
                    if is_within_range:
                        print(f'>> 开始领取礼包：')
                        self.DRAGONBOAT_2024_receiveWeeklyGift()
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def DRAGONBOAT_2024_receiveWeeklyGift(self):
        invite_user_id = random.choice([invite for invite in inviteId if invite != self.user_id])
        try:
            payload = {"inviteUserId": invite_user_id}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024IndexService~receiveWeeklyGift'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                if obj == [{}]:
                    print('> 领取失败')
                    return False
                for gifts in obj:
                    productName = gifts['productName']
                    amount = gifts['amount']
                    print(f'> 领取【{productName} x {amount}】成功')
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def DRAGONBOAT_2024_taskList(self):
        print('====== 查询推币任务列表 ======')
        try:
            payload = {
                "activityCode": "DRAGONBOAT_2024",
                "channelType": "MINI_PROGRAM"
            }
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                for task in obj:
                    taskType = task['taskType']
                    self.taskName = task['taskName']
                    status = task['status']
                    if status == 3:
                        Log(f'> 任务【{self.taskName}】已完成')
                        continue
                    self.taskCode = task.get('taskCode', None)
                    if self.taskCode:
                        self.DRAGONBOAT_2024_finishTask()
                    if taskType == 'PLAY_ACTIVITY_GAME':
                        self.DRAGONBOAT_2024_Game_init()
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def DRAGONBOAT_2024_coinStatus(self, END=False):
        Log('====== 查询金币信息 ======')
        # try:
        payload = {}
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024CoinService~coinStatus'

        response = self.do_request(url, payload)
        if response.get('success'):
            obj = response.get('obj', None)
            if obj == None: return False
            accountCurrencyList = obj.get('accountCurrencyList', [])
            pushedTimesToday = obj.get('pushedTimesToday', '')
            pushedTimesTotal = obj.get('pushedTimesTotal', '')
            PUSH_TIMES_balance = 0
            self.COIN_balance = 0
            WELFARE_CARD_balance = 0
            for li in accountCurrencyList:
                if li['currency'] == 'PUSH_TIMES':
                    PUSH_TIMES_balance = li['balance']
                if li['currency'] == 'COIN':
                    self.COIN_balance = li['balance']
                if li['currency'] == 'WELFARE_CARD':
                    WELFARE_CARD_balance = li['balance']

            PUSH_TIMES = PUSH_TIMES_balance
            if END:
                if PUSH_TIMES_balance > 0:
                    for i in range(PUSH_TIMES_balance):
                        print(f'>> 开始第【{PUSH_TIMES_balance + 1}】次推币')
                        self.DRAGONBOAT_2024_pushCoin()
                        PUSH_TIMES -= 1
                        pushedTimesToday += 1
                        pushedTimesTotal += 1
                Log(f'> 剩余推币次数：【{PUSH_TIMES}】')
                Log(f'> 当前金币：【{self.COIN_balance}】')
                Log(f'> 今日推币：【{pushedTimesToday}】次')
                Log(f'> 总推币：【{pushedTimesTotal}】次')
            else:
                print(f'> 剩余推币次数：【{PUSH_TIMES_balance}】')
                print(f'> 当前金币：【{self.COIN_balance}】')
                print(f'> 今日推币：【{pushedTimesToday}】次')
                print(f'> 总推币：【{pushedTimesTotal}】次')

            self.DRAGONBOAT_2024_givePushTimes()
        else:
            error_message = response.get('errorMessage', '无返回')
            if '没有资格参与活动' in error_message:
                self.DRAGONBOAT_2024_black = True
                Log('会员日任务风控')

    def DRAGONBOAT_2024_pushCoin(self):
        try:
            payload = {"plateToken": None}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024CoinService~pushCoin'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                drawAward = obj.get('drawAward', '')
                self.COIN_balance += drawAward
                print(f'> 获得：【{drawAward}】金币')

            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def DRAGONBOAT_2024_givePushTimes(self):
        Log('====== 领取赠送推币次数 ======')
        try:
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024CoinService~givePushTimes'

            response = self.do_request(url)
            if response.get('success'):
                obj = response.get('obj', 0)
                print(f'> 获得：【{obj}】次推币机会')
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('> 会员日任务风控')
                print(error_message)
        except Exception as e:
            print(e)

    def DRAGONBOAT_2024_finishTask(self):
        try:
            payload = {
                "taskCode": self.taskCode
            }
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', False)
                Log(f'> 完成任务【{self.taskName}】成功')
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.DRAGONBOAT_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def DRAGONBOAT_2024_win(self, level):
        try:
            for i in range(level, 31):
                print(f'开始第【{i}】关')
                payload = {"levelIndex": i}
                url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024GameService~win'

                response = self.do_request(url, payload)
                if response.get('success'):
                    obj = response.get('obj', [{}])
                    currentAwardList = obj.get('currentAwardList', [])
                    if currentAwardList != []:
                        for award in currentAwardList:
                            currency = award.get('currency', '')
                            amount = award.get('amount', '')
                            print(f'> 获得：【{currency}】x{amount}')
                    else:
                        print(f'> 本关无奖励')
                else:
                    error_message = response.get('errorMessage', '无返回')
                    print(error_message)
                    if '没有资格参与活动' in error_message:
                        self.DRAGONBOAT_2024_black = True
                        Log('会员日任务风控')
        except Exception as e:
            print(e)


    def MIDAUTUMN_2024_index(self):
        print('====== 查询中秋活动状态 ======')
        invite_user_id = random.choice([invite for invite in inviteId if invite != self.user_id])
        try:
            self.headers['channel'] = '24zqxcx'
            self.headers[
                'referer'] = f'https://mcs-mimp-web.sf-express.com/origin/a/mimp-activity/midAutumn2024?mobile={self.mobile}&userId={self.user_id}&path=/origin/a/mimp-activity/midAutumn2024&supportShare=&inviteUserId={invite_user_id}&from=24zqxcx'
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonNoLoginPost/~memberNonactivity~midAutumn2024IndexService~index'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                acEndTime = obj.get('acEndTime', '')
                current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                comparison_time = datetime.strptime(acEndTime, "%Y-%m-%d %H:%M:%S")
                is_less_than = datetime.now() < comparison_time
                if is_less_than:
                    print('中秋游动进行中....')
                    return True
                else:
                    print('中秋活动已结束')
                    return False
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
                return False
        except Exception as e:
            print(e)
            return False

    def MIDAUTUMN_2024_Game_indexInfo(self):
        Log('====== 开始划龙舟游戏 ======')
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024GameService~indexInfo'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                maxPassLevel = obj.get('maxPassLevel', '')
                ifPassAllLevel = obj.get('ifPassAllLevel', '')
                if maxPassLevel != 30:
                    self.MIDAUTUMN_2024_win(maxPassLevel)
                else:
                    self.MIDAUTUMN_2024_win(0)

            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
                return False
        except Exception as e:
            print(e)
            return False

    def MIDAUTUMN_2024_Game_init(self):
        Log('====== 开始划龙舟游戏 ======')
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024GameService~init'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                currentIndex = obj.get('currentIndex', '')
                ifPassAllLevel = obj.get('ifPassAllLevel', '')
                if currentIndex != 30:
                    self.MIDAUTUMN_2024_win(currentIndex)
                else:
                    self.MIDAUTUMN_2024_win(0)

            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
                return False
        except Exception as e:
            print(e)
            return False

    def MIDAUTUMN_2024_weeklyGiftStatus(self):
        print('====== 查询每周礼包领取状态 ======')
        try:
            payload = {}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024IndexService~weeklyGiftStatus'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                for gift in obj:
                    received = gift['received']
                    receiveStartTime = gift['receiveStartTime']
                    receiveEndTime = gift['receiveEndTime']
                    print(f'>>> 领取时间：【{receiveStartTime} 至 {receiveEndTime}】')
                    if received:
                        print('> 该礼包已领取')
                        continue
                    receive_start_time = datetime.strptime(receiveStartTime, "%Y-%m-%d %H:%M:%S")
                    receive_end_time = datetime.strptime(receiveEndTime, "%Y-%m-%d %H:%M:%S")
                    is_within_range = receive_start_time <= datetime.now() <= receive_end_time
                    if is_within_range:
                        print(f'>> 开始领取礼包：')
                        self.MIDAUTUMN_2024_receiveWeeklyGift()
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def MIDAUTUMN_2024_receiveWeeklyGift(self):
        invite_user_id = random.choice([invite for invite in inviteId if invite != self.user_id])
        try:
            payload = {"inviteUserId": invite_user_id}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024IndexService~receiveWeeklyGift'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                if obj == [{}]:
                    print('> 领取失败')
                    return False
                for gifts in obj:
                    productName = gifts['productName']
                    amount = gifts['amount']
                    print(f'> 领取【{productName} x {amount}】成功')
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def MIDAUTUMN_2024_taskList(self):
        print('====== 查询推币任务列表 ======')
        try:
            payload = {
                "activityCode": "MIDAUTUMN_2024",
                "channelType": "MINI_PROGRAM"
            }
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                for task in obj:
                    taskType = task['taskType']
                    self.taskName = task['taskName']
                    status = task['status']
                    if status == 3:
                        Log(f'> 任务【{self.taskName}】已完成')
                        continue
                    self.taskCode = task.get('taskCode', None)
                    if self.taskCode:
                        self.MIDAUTUMN_2024_finishTask()
                    if taskType == 'PLAY_ACTIVITY_GAME':
                        self.MIDAUTUMN_2024_Game_init()
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def MIDAUTUMN_2024_coinStatus(self, END=False):
        Log('====== 查询金币信息 ======')
        # try:
        payload = {}
        url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024CoinService~coinStatus'

        response = self.do_request(url,payload)
        if response.get('success'):
            obj = response.get('obj', None)
            if obj == None: return False
            accountCurrencyList = obj.get('accountCurrencyList', [])
            pushedTimesToday = obj.get('pushedTimesToday', '')
            pushedTimesTotal = obj.get('pushedTimesTotal', '')
            PUSH_TIMES_balance = 0
            self.COIN_balance = 0
            WELFARE_CARD_balance = 0
            for li in accountCurrencyList:
                if li['currency'] == 'PUSH_TIMES':
                    PUSH_TIMES_balance = li['balance']
                if li['currency'] == 'COIN':
                    self.COIN_balance = li['balance']
                if li['currency'] == 'WELFARE_CARD':
                    WELFARE_CARD_balance = li['balance']

            PUSH_TIMES = PUSH_TIMES_balance
            if END:
                if PUSH_TIMES_balance > 0:
                    for i in range(PUSH_TIMES_balance):
                        print(f'>> 开始第【{PUSH_TIMES_balance + 1}】次推币')
                        self.MIDAUTUMN_2024_pushCoin()
                        PUSH_TIMES -= 1
                        pushedTimesToday += 1
                        pushedTimesTotal += 1
                Log(f'> 剩余推币次数：【{PUSH_TIMES}】')
                Log(f'> 当前金币：【{self.COIN_balance}】')
                Log(f'> 今日推币：【{pushedTimesToday}】次')
                Log(f'> 总推币：【{pushedTimesTotal}】次')
            else:
                print(f'> 剩余推币次数：【{PUSH_TIMES_balance}】')
                print(f'> 当前金币：【{self.COIN_balance}】')
                print(f'> 今日推币：【{pushedTimesToday}】次')
                print(f'> 总推币：【{pushedTimesTotal}】次')

            self.MIDAUTUMN_2024_givePushTimes()
        else:
            error_message = response.get('errorMessage', '无返回')
            if '没有资格参与活动' in error_message:
                self.MIDAUTUMN_2024_black = True
                Log('会员日任务风控')

    def MIDAUTUMN_2024_pushCoin(self):
        try:
            payload = {"plateToken": None}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024CoinService~pushCoin'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', [{}])
                drawAward = obj.get('drawAward', '')
                self.COIN_balance += drawAward
                print(f'> 获得：【{drawAward}】金币')

            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def MIDAUTUMN_2024_givePushTimes(self):
        Log('====== 领取赠送推币次数 ======')
        try:
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024CoinService~givePushTimes'

            response = self.do_request(url)
            if response.get('success'):
                obj = response.get('obj', 0)
                print(f'> 获得：【{obj}】次推币机会')
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('> 会员日任务风控')
                print(error_message)
        except Exception as e:
            print(e)

    def MIDAUTUMN_2024_finishTask(self):
        try:
            payload = {
                "taskCode": self.taskCode
            }
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask'

            response = self.do_request(url, payload)
            if response.get('success'):
                obj = response.get('obj', False)
                Log(f'> 完成任务【{self.taskName}】成功')
            else:
                error_message = response.get('errorMessage', '无返回')
                if '没有资格参与活动' in error_message:
                    self.MIDAUTUMN_2024_black = True
                    Log('会员日任务风控')
        except Exception as e:
            print(e)

    def MIDAUTUMN_2024_win(self, level):
        try:
            for i in range(level, 31):
                print(f'开始第【{i}】关')
                payload = {"levelIndex": i}
                url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~midAutumn2024GameService~win'

                response = self.do_request(url, payload)
                if response.get('success'):
                    obj = response.get('obj', [{}])
                    currentAwardList = obj.get('currentAwardList', [])
                    if currentAwardList != []:
                        for award in currentAwardList:
                            currency = award.get('currency', '')
                            amount = award.get('amount', '')
                            print(f'> 获得：【{currency}】x{amount}')
                    else:
                        print(f'> 本关无奖励')
                else:
                    error_message = response.get('errorMessage', '无返回')
                    print(error_message)
                    if '没有资格参与活动' in error_message:
                        self.MIDAUTUMN_2024_black = True
                        Log('会员日任务风控')
        except Exception as e:
            print(e)
    def csy2025(self):
        """
        查询财神爷任务列表，并处理任务逻辑。
        """
        Log('>>>>>>开始迪士尼活动')
        try:
            _id=random.choice([invite for invite in inviteId if invite != self.user_id])
            self.do_request("https://mcs-mimp-web.sf-express.com/mcs-mimp/commonNoLoginPost/~memberNonactivity~disneyService~index")
            payload = {"activityCode": "DISNEY", "channelType": "MINI_PROGRAM"}
            url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList"

            response = self.do_request(url, payload)
            if isinstance(response, dict) and response.get('success'):
                tasks = response.get('obj', [])
                for task in tasks:
                    taskType = task.get('taskType', None)
                    taskName = task.get('taskName', '未知任务')
                    taskCode = task.get('taskCode', None)
                    taskStatus = task.get('status', 0)

                    #下方按照'BROWSE_VIP_CENTER'加入taskType的ID
                    if taskType not in ['BROWSE_LIFE_SERVICE','INTEGRAL_EXCHANGE','BROWSE_VIP_CENTER','BROWSE_STUDENT_BENEFIT','LOOK_BRAND_VIDEO']:
                        continue
                    Log(f"> 正在处理任务【{taskName}】")

                    if taskStatus == 3:
                        Log(f"> 任务【{taskName}】已完成，跳过")
                        continue

                    if taskCode:
                        self.DISNEY2_finishTask(taskCode, taskName)
                        self.fetchTasksReward()
        except Exception as e:
            import traceback
            Log(f"任务查询时出现异常：{e}\n{traceback.format_exc()}")


    def DISNEY2_finishTask(self, taskCode, taskName):
        try:
            payload = {"taskCode": taskCode}
            url = 'https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask'

            response = self.do_request(url, payload)

            if isinstance(response, dict) and response.get('success'):
                obj = response.get('obj', None)
                if obj is True:
                    Log(f"> {taskName}-已完成")
                    return True
                elif obj is False:
                    # Log(f"> {taskName}-未完成，失败原因：返回的 obj 为 False，任务可能无效或已完成")
                    self.fetchTasksReward()
                    return False
                elif isinstance(obj, dict):
                    data = obj.get('data', [])
                    Log(f"> {taskName}-已完成，返回数据：{data}")
                    return True
                else:
                    Log(f"> {taskName}-未完成，失败原因：返回的 obj 类型未知，实际为: {obj}")
                    return False
            else:
                error_message = response.get('errorMessage', '无返回') if isinstance(response, dict) else '未知错误'
                Log(f"> {taskName}-未完成，失败原因：{error_message}")
                return False
        except Exception as e:
            import traceback
            Log(f"{taskName}-未完成，任务代码：【{taskCode}】，异常信息：{e}\n{traceback.format_exc()}")
            return False
    def sendMsg(self, help=False):
        if self.send_UID:
            push_res = CHERWIN_TOOLS.wxpusher(self.send_UID, one_msg, APP_NAME, help)
            print(push_res)

    def duanwuChoujiang(self):
        Log('====== 开始迪士尼抽奖 ======')
        try:
            # 查询抽奖状态
            query_url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~disneyService~getStatus"
            query_payload = {}
            query_response = self.do_request(query_url, query_payload)
    
            if query_response.get('success') and query_response.get('obj'):
                obj = query_response['obj']
                remain_times = obj.get('remainTimes', 0)
                Log(f'⚠️剩余抽奖次数为 = {remain_times}')
                if remain_times <= 0:
                    Log('⚠️已无可用抽奖次数')
                    return
    
                # 直接根据 remain_times 循环抽奖，不区分币种
                total_drawn = 0
                for i in range(remain_times):
                    Log(f'>>> 第 {i + 1} 次抽奖')
                    draw_url = "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~disneyService~openPackage"
                    draw_payload = {}  # 不传币种参数
                    draw_response = self.do_request(draw_url, draw_payload)
    
                    if draw_response.get('success') and draw_response.get('obj'):
                        obj = draw_response['obj']
                        # 先尝试取 award
                        award = obj.get('award')
                        if award:
                            product_name = award.get('productName', '未知奖品')
                            price_desc = award.get('denomination', '')
                        else:
                            # 再尝试取 paidProductPacket
                            paid_product = obj.get('paidProductPacket', {})
                            product_name = paid_product.get('productName', '未知奖品')
                            price_desc = paid_product.get('priceDesc', '')
                        Log(f'🎉 抽奖成功：{product_name} - {price_desc}')
                    else:
                        error_message = draw_response.get('errorMessage') or draw_response.get('msg') or '无返回'
                        Log(f'❌ 抽奖失败: {error_message}')
                    total_drawn += 1
                    time.sleep(1)  # 防止请求过快
    
                Log(f'共抽奖 {total_drawn} 次，结束')
    
            else:
                error_message = query_response.get('msg') or str(query_response)
                Log(f'获取抽奖状态失败: {error_message}')
    
        except Exception as e:
            import traceback
            Log(f'迪士尼活动抽奖时出现异常: {e}\n{traceback.format_exc()}')


        Log('====== 迪士尼活动抽奖结束 ======')

    def fetchTasksReward(self):
        response = self.do_request(
            "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2025TaskService~fetchTasksReward",
            {"channelType":"MINI_PROGRAM"}
        )
        if response.get('success'):
            if len(response.get('obj',{}).get('receivedAccountList',[])):
                Log(f">领取已完成任务奖励 {len(response.get('obj',{}).get('receivedAccountList',[]))} 次")
    def qiandao(self):
        self.superWelfare_receiveRedPacket()
        self.get_SignTaskList()
        self.get_SignTaskList(True)
    def fengmi(self):
        self.honey_indexData()
        self.get_honeyTaskListStart()
        self.honey_indexData(True)
        activity_end_date = get_quarter_end_date()
        days_left = (activity_end_date - datetime.now()).days
        if days_left == 0:
            message = "今天采蜜活动截止兑换就剩最后0天了，请及时进行兑换"
            Log(message)
        else:
            message = f"今天采蜜活动截止兑换还有{days_left}天，请及时进行兑换"
            Log(message)
        target_time = datetime(2024, 4, 8, 19, 0)
        if datetime.now() < target_time:
            self.anniversary2024_task()
        else:
            print('#######################################')
    def huiyuanri(self):
        current_date = datetime.now().day
        if 26 <= current_date <= 28:
            self.member_day_index()

        else:
            print('未到指定时间不执行会员日任务')

            self.sendMsg()
            return True
    def duanwu(self):
        target_time = datetime(2025, 6, 26, 19, 0)
        if datetime.now() < target_time:#端午活动是否结束
            self.csy2025()
            # self.Exchangee_2025()#积分兑换次数
            self.game202505()
            self.fetchTasksReward()
            # self.cxcs()
            # self.index2025()
            self.duanwuChoujiang()# 执行端午抽奖
        else:
            print('端午活动已结束')

    def main(self):
        global one_msg
        wait_time = random.randint(1000, 3000) / 1000.0
        time.sleep(wait_time)  # 等待
        one_msg = ''
        if not self.login_res: return False

        self.duanwu()#端午活动
        self.qiandao()#日常签到积分
        self.fengmi()#蜂蜜任务
        self.huiyuanri()#会员日

        


def get_quarter_end_date():
    current_year = datetime.now().year
    current_month = datetime.now().month

    if current_month in [1, 2, 3]:
        next_quarter_first_day = datetime(current_year, 4, 1)
    elif current_month in [4, 5, 6]:
        next_quarter_first_day = datetime(current_year, 7, 1)
    elif current_month in [7, 8, 9]:
        next_quarter_first_day = datetime(current_year, 10, 1)
    else:
        next_quarter_first_day = datetime(current_year + 1, 1, 1)
    return next_quarter_first_day

def is_activity_end_date(end_date):
    if isinstance(end_date, datetime):
        end_date = end_date.date()
    elif isinstance(end_date, str):
        end_date = datetime.strptime(end_date, "%Y-%m-%d").date()
    else:
        raise TypeError("end_date must be a string or datetime object")

    return end_date




if __name__ == '__main__':
    APP_NAME = '顺丰速运'
    ENV_NAME = 'sfsyUrl'
    CK_NAME = 'url'
    local_script_name = os.path.basename(__file__)
    local_version = '2025.01.06'
    token = os.getenv(ENV_NAME)
    # 将分隔符从\n改为&
    tokens = token.split('&')
    # print(tokens)
    if len(tokens) > 0:
        print(f" =====🚚 共获取到{len(tokens)}个账号 🚚    =====")
        for index, infos in enumerate(tokens):
            run_result = RUN(infos, index).main()
            if not run_result: continue
            
def wxpusher_notify(content):
    WXPUSHER_APP_TOKEN = 'AT_z8eXjZWGb5MxGwEKVOAgCNmKNZoOFdAg'
    WXPUSHER_UIDS = 'UID_PVnOsLnqoQuaYadzJa98hHMH1utK'  # 多个UID用英文逗号分隔
    WXPUSHER_TOPIC_IDS = '28788'

    if not WXPUSHER_APP_TOKEN:
        print("未配置WXPUSHER_APP_TOKEN，不推送")
        return

    url = "https://wxpusher.zjiecode.com/api/send/message"
    headers = {"Content-Type": "application/json"}
    payload = {
        "appToken": WXPUSHER_APP_TOKEN,
        "content": content,
        "summary": "顺丰速运迪士尼任务通知",
        "contentType": 1,  # 1=文本
        "topicIds": [int(i) for i in WXPUSHER_TOPIC_IDS.split(',') if i.strip()],
    }

    if WXPUSHER_UIDS:
        payload["uids"] = [i for i in WXPUSHER_UIDS.split(',') if i.strip()]

    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        if response.status_code == 200:
            print("Wxpusher 推送成功！")
        else:
            print(f"Wxpusher 推送失败: {response.text}")
    except Exception as e:
        print(f"Wxpusher 推送异常: {str(e)}")


if __name__ == "__main__":
    # 最后统一推送
    if send_msg:
        wxpusher_notify(send_msg)
