"""
 * 星抖短剧
 * 注册地址： https://www.xingdouduanju.com/pages/register/index.html?invite_code=160213
 * 定时2或者4小时一次即可
 * 环境变量 XD_TOKEN , 抓取 header 里面的 Authorization 值，去掉前面的 Bearer, 多账户使用&隔开, 青龙环境直接新建变量即可，本地环境直接填入下方ck中
"""

import hashlib
import os
import secrets
import requests
import json
import time

ck = ""  # 本地环境ck

########买猪配置#########
mz = False  # True为自动购买，False为手动购买
########-------#########

class XD:
    def __init__(self, cki):
        self.zt = None
        self.ck = cki
        self.name = None
        self.phone = None
        self.dj = None
        self.jb = None
        self.jk = None
        self.ye = None
        self.id_list = []
        self.hd = {
            'User-Agent': "okhttp/4.9.2",
            'Connection': "Keep-Alive",
            'Accept-Encoding': "gzip",
            'Authorization': "Bearer " + self.ck,'X-Version-Code': "124",
            'X-Platform': "android",
            'X-System': "14",
            'X-Brand': "Redmi",
            'Content-Type': "application/json; charset=utf-8"
        }
    @staticmethod
    def generate_random_hex_string(length):
        random_bytes = secrets.token_bytes(length)
        random_hex_string = random_bytes.hex()
        return random_hex_string

    @staticmethod
    def format_hex_string(hex_string):
        formatted_string = hex_string[:2] + hex_string[2:4] + hex_string[4:8] + hex_string[8:12] + hex_string[12:16] + hex_string[16:20] + hex_string[20:24] + hex_string[24:28] + hex_string[28:32]
        return formatted_string

    def generate_prefixed_hex_string(self):
        remaining_length = 32
        remaining_hex_string = self.generate_random_hex_string(remaining_length)
        random_hex_string = "ce" + remaining_hex_string[2:]
        return random_hex_string

    def random(self):
        random_hex_string = self.generate_prefixed_hex_string()
        formatted_hex_string = self.format_hex_string(random_hex_string)
        return formatted_hex_string

    # 签名
    def sign(self, ids, nonce, timestamp):
        data = f"{timestamp}&{ids}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp&true"
        data1 = f"{timestamp}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp&true"
        data2 = f"{ids}&{timestamp}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp"
        sign = hashlib.md5(data.encode()).hexdigest()
        sign1 = hashlib.md5(data1.encode()).hexdigest()
        sign2 = hashlib.md5(data2.encode()).hexdigest()
        return sign, sign1, sign2

    # 登录
    def login(self):
        url = "https://api.xingdouduanju.com/api/user?include=VipLevel"
        try:
            r = requests.get(url, headers=self.hd).json()
            if r["success"]:
                self.a()
                self.name = r["data"]["nickname"]
                print(f"[{self.name}]登录成功\n{self.zt}会员等级==> {self.dj}\n💰金币余额===> {self.jb}\n🪙金块余额===> {self.jk}\n💸账户余额===> {self.ye}")
                return True
            else:
                print(f"[{self.name}]登录失败，原因==> {r['message']}")
                return None
        except Exception as e:
            print(e)

    def a(self):
        url = "https://api.xingdouduanju.com/api/user/profile"
        try:
            r = requests.get(url, headers=self.hd).json()
            if r["success"]:
                self.dj = r["data"]["teamLevel"]["name"]
                if self.dj == "LV1":
                    self.zt = "\U0001F947"
                elif self.dj == "LV2":
                    self.zt = "\U0001F948"
                elif self.dj == "LV3":
                    self.zt = "\U0001F949"
                else:
                    self.zt = "🥉"
                self.jb = r["data"]["walletGold"]["balance"]
                self.jk = r["data"]["walletBullion"]["balance"]
                self.ye = r["data"]["wallet"]["balance"]
            else:
                print(f"[{self.name}]获取余额失败，原因==> {r['message']}")
        except Exception as e:
            print(e)

    # 查看任务完成情况
    def task_list(self):
        url = "https://api.xingdouduanju.com/api/gold_tasks"
        r = requests.get(url, headers=self.hd).json()
        tasks = r["data"]["tasks"]
        for task in tasks:
            name = task["name"]
            completed_count = task["completedCount"]
            times = task["times"]
            print(f"[{self.name}]{name}的完成情况 ===> ({completed_count}/{times})")
            if name == "分享邀请码" and completed_count < times:
                print("===开始执行分享邀请码===")
                self.fxyqm()
            elif name == "每日观看广告（赚金币）" and completed_count < times:
                print("===开始执行每日广告===")
                self.mrgg()
            elif name == "逛逛短视频（赚金币）" and completed_count < times:
                print("===开始执行看短剧===")
                self.kdj()
            elif name == "赚现金红包（激励金）" and completed_count < times:
                print("===开始执行天降激励金===")
                self.flj()
            elif name == "偷好友金块（赚金币）" and completed_count < times:
                print("===开始执行偷金条===")
                self.tjt()
        print(f"[{self.name}]可执行任务已全部完成，跳过执行")

    # 分享邀请码
    def fxyqm(self):
        url = "https://api.xingdouduanju.com/api/gold_tasks/1/complete"
        ids = "1"
        nonce = self.random()
        timestamp = str(int(time.time() * 1000))
        sign, sign1, sign2 = self.sign(ids, nonce, timestamp)
        payload = json.dumps({
            "timestamp": timestamp,
            "nonce": nonce,
            "id": str(ids),
            "sign": sign2
        })
        try:
            r = requests.post(url, data=payload, headers=self.hd).json()
            if r["success"]:
                print(f"[{self.name}]分享邀请码成功，获得==> {r['data']['reward']}")
            else:
                print(f"[{self.name}]分享邀请码失败==> {r['message']}")
        except Exception as e:
            print(e)
    # 看短剧
    def kdj(self):
        y = "5"
        b = "短剧"
        for v in range(6):
            a = self.post(y, v, b)
            if not a:
                break
            time.sleep(2)

    # 天降激励金
    def flj(self):
        y = "11"
        b = "天降激励金"
        for v in range(21):
            a = self.flj1(y, v, b)
            if not a:
                break
            time.sleep(2)

    # 看广告
    def mrgg(self):
        y = "6"
        b = "每日观看广告"
        for v in range(7):
            a = self.post(y, v, b)
            if not a:
                break
            time.sleep(2)

    # 通用请求
    def post(self, ids, v, b):
        nonce = self.random()
        timestamp = str(int(time.time() * 1000))
        sign, sign1, sign2 = self.sign(ids, nonce, timestamp)
        url = "https://api.xingdouduanju.com/api/gold_tasks/" + ids + "/complete"
        payload = {
            "timestamp": timestamp,
            "nonce": nonce,
            "id": ids,
            "done": True,
            "sign": sign
        }
        try:
            r = requests.post(url, json=payload, headers=self.hd).json()
            if r["success"]:
                print(f"[{self.name}]第{v+1}次看{b}成功，获得==> {r['data']['reward']}")
                return True
            else:
                print(f"[{self.name}]第{v+1}次看{b}失败，原因==> {r['message']}")
                return False
        except Exception as e:
            print(e)
            return False

    # 天降激励金
    def flj1(self, ids, v, b):
        nonce = self.random()
        timestamp = str(int(time.time() * 1000))
        data = f"{ids}&{timestamp}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp&true"
        sign = hashlib.md5(data.encode()).hexdigest()
        url = "https://api.xingdouduanju.com/api/gold_tasks/" + ids + "/complete"
        payload = {
            "timestamp": timestamp,
            "nonce": nonce,
            "id": ids,
            "done": True,
            "sign": sign
        }
        try:
            r = requests.post(url, json=payload, headers=self.hd).json()
            if r["success"]:
                print(f"[{self.name}]第{v+1}次看{b}成功，获得==> {r['data']['reward']}")
                return True
            else:
                print(f"[{self.name}]第{v+1}次看{b}失败，原因==> {r['message']}")
                return False
        except Exception as e:
            print(e)
            return False

    # 收取金条
    def jtlq(self):
        nonce = self.random()
        timestamp = str(int(time.time() * 1000))
        sign, sign1, sign2 = self.sign(None, nonce, timestamp)
        url = "https://api.xingdouduanju.com/api/gold_pigs/collect_all_bullion"
        payload = json.dumps({
            "timestamp": timestamp,
            "nonce": nonce,
            "hasWatchAd": True,
            "sign": sign1
        })

        r = requests.post(url, data=payload, headers=self.hd).json()
        if r["success"]:
            print(f"[{self.name}]收取金条成功，获得==> {r['message']}")
        else:
            print(f"[{self.name}]收取金条失败，原因==> {r['message']}")
            if r["message"] == "今日广告解锁次数已用完。":
                print(f"[{self.name}]启用备用方式收取金条")
                self.jtlq1()
            else:
                print(f"[{self.name}]收取金条失败，原因==> {r['message']}")

    # 收取金条备用
    def jtlq1(self):
        url = "https://api.xingdouduanju.com/api/gold_pigs/info"
        try:
            r = requests.get(url, headers=self.hd).json()
            if r["success"] and r['data']['waitCollectGoldPigs'] is not None:
                id_list = [item['id'] for item in r['data']['waitCollectGoldPigs']]
                for ids in id_list:
                    nonce = self.random()
                    timestamp = str(int(time.time() * 1000))
                    da = f"{timestamp}&{ids}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp"
                    sign = hashlib.md5(da.encode()).hexdigest()
                    collect_url = f"https://api.xingdouduanju.com/api/gold_pigs/{ids}/collect_bullion"
                    payload = json.dumps({
                        "timestamp": timestamp,
                        "nonce": nonce,
                        "id": ids,
                        "sign": sign
                    })
                    try:
                        r1 = requests.post(collect_url, data=payload, headers=self.hd).json()
                        if r1["success"]:
                            print(f"[{self.name}]第{id_list.index(ids) + 1}次收取金条成功，获得==> {r1['data']['expiredAmount']}")
                        else:
                            print(f"[{self.name}]第{id_list.index(ids) + 1}次收取金条失败==> {r1['message']}")
                    except Exception as e:
                        print(e)
                    time.sleep(2)
                if not id_list:
                    print(f"[{self.name}]领取金条失败,id列表为空==> {r['data']['waitCollectGoldPigs']}")
                    return
                self.jtlq()
            else:
                print(f"[{self.name}]获取id失败,可能已经领取完毕")
        except Exception as e:
            print(e)


    # 偷金条
    def tjt(self):
        url = "https://api.xingdouduanju.com/api/user/friends"
        try:
            print("正在获取可偷金条的好友列表，请骚等一会儿")
            total_ids = []
            for level in ["1", "2"]:
                params = {
                    'level': level,
                    'cursor': "",
                    'keyword': ""
                }
                while True:
                    r = requests.get(url, params=params, headers=self.hd).json()
                    if r["success"]:
                        if not r["data"]:
                            print(f"[{self.name}]获取好友列表失败，原因==> {r['data']}")
                            return
                        else:
                            ids = [entry['id'] for entry in r['data'] if entry['canCollectBullion']]
                            total_ids.extend(ids)
                            cursor_info = r.get("cursor")
                            if cursor_info and cursor_info.get("after"):
                                params['cursor'] = cursor_info["after"]
                            else:
                                break
                            time.sleep(1)
                    else:
                        print(f"[{self.name}]获取好友列表失败，原因==> {r}")
                        return
            print(f"[{self.name}]获取列表成功，共获取到{len(total_ids)}个好友可偷金条")
            for ids in total_ids:
                nonce = self.random()
                timestamp = str(int(time.time() * 1000))
                data = f"{timestamp}&{ids}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp"
                sign = hashlib.md5(data.encode()).hexdigest()
                url = "https://api.xingdouduanju.com/api/user_friend_bullions/collect"
                payload = json.dumps({
                    "timestamp": timestamp,
                    "nonce": nonce,
                    "friendId": ids,
                    "sign": sign
                })
                try:
                    r1 = requests.post(url, data=payload, headers=self.hd).json()
                    if r1["success"]:
                        print(f"[{self.name}]偷取金条成功，获得==> {r1['data']['amount']}")
                    else:
                        print(f"[{self.name}]偷取金条失败==> {r1['message']}")
                except Exception as e:
                    print(e)
                time.sleep(2)
        except Exception as e:
            print(e)

    # 买金猪
    def mjz(self):
        url = "https://api.xingdouduanju.com/api/gold_pigs/info"
        try:
            r = requests.get(url, headers=self.hd).json()
            if r["success"]:
                a = int(round(float(r['data']['walletGold']['balance'])))
                b = int(round(float(r['data']['price'])))
                if a > b:
                    for v in range(12):
                        url = "https://api.xingdouduanju.com/api/gold_pigs/gold_exchange"
                        nonce = self.random()
                        timestamp = str(int(time.time() * 1000))
                        data = f"{timestamp}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp"
                        sign = hashlib.md5(data.encode()).hexdigest()
                        payload = json.dumps({
                            "nonce": nonce,
                            "timestamp": timestamp,
                            "sign": sign
                        })
                        try:
                            r1 = requests.post(url, data=payload, headers=self.hd).json()
                            if not r1['success']:
                                print(f"[{self.name}]够买金猪失败===> {r1['message']}")
                                break
                            else:
                                if r1["success"]:
                                    print(f"[{self.name}]购买金猪成功==> {r1['message']}")
                                else:
                                    print(f"[{self.name}]购买金猪失败==> {r1['message']}")
                        except Exception as e:
                            print(e)
                        time.sleep(2)
                else:
                    print(f"[{self.name}]金币不够买金猪，当前金币{a},所需金币{b}")
        except Exception as e:
            print(e)

    # 短剧视频
    def djsp(self):
        for v in range(1, 4):
            nonce = self.random()
            timestamp = str(int(time.time() * 1000))
            sign, sign1, sign2 = self.sign(v, nonce, timestamp)
            url = f"https://api.xingdouduanju.com/api/watch_video_duration_tasks/{v}/complete"
            payload = {
                "timestamp": timestamp,
                "nonce": nonce,
                "id": str(v),
                "sign": sign
            }
            try:
                r = requests.post(url, json=payload, headers=self.hd).json()
                if r["success"]:
                    print(f"[{self.name}]领取短剧视频奖励成功==> {r['message']}")
                else:
                    print(f"[{self.name}]领取短剧视频奖励失败==> {r['message']}")
            except Exception as e:
                print(e)
            time.sleep(2)

    # 团队奖励
    def tdjl(self):
        url = "https://api.xingdouduanju.com/api/user_bonus_bullions/info"
        try:
            r = requests.get(url, headers=self.hd).json()
            a = int(round(float(r['data']['bullionTotal'])))
            if a > 0:
                url = "https://api.xingdouduanju.com/api/user_bonus_bullions/collect"
                nonce = self.random()
                timestamp = str(int(time.time() * 1000))
                data = f"{timestamp}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp"
                sign = hashlib.md5(data.encode()).hexdigest()
                payload = json.dumps({
                    "timestamp": timestamp,
                    "nonce": nonce,
                    "sign": sign
                })
                try:
                    r1 = requests.post(url, data=payload, headers=self.hd).json()
                    if r1["success"]:
                        print(f"[{self.name}]领取团队奖励成功==> {r1['message']}")
                    else:
                        print(f"[{self.name}]领取团队奖励失败==> {r1['message']}")
                except Exception as e:
                    print(e)
            else:
                print(f"[{self.name}]领取团队奖励失败,可领取奖励==> {r['data']['bullionTotal']}")
        except Exception as e:
            print(e)

    # 等级分红奖励
    def djfh(self):
        url = "https://api.xingdouduanju.com/api/user_team_dividends/receive"
        nonce = self.random()
        timestamp = str(int(time.time() * 1000))
        data = f"{timestamp}&{nonce}&kjKjb8WRmfb77U6IMqsVtIuIFQCvab4JBqABNqSp"
        sign = hashlib.md5(data.encode()).hexdigest()
        payload = json.dumps({
            "timestamp": timestamp,
            "nonce": nonce,
            "sign": sign
        })
        try:
            r1 = requests.post(url, data=payload, headers=self.hd).json()
            if r1["success"]:
                print(f"[{self.name}]领取等级奖励成功==> {r1['data']['amount']}")
            else:
                print(f"[{self.name}]领取等级奖励失败==> {r1['message']}")
        except Exception as e:
            print(e)

    def start(self):
        if self.login():
            print("===开始查看任务完成情况===")
            self.jtlq()
            time.sleep(2)
            print("===开始收取金条===")
            self.jtlq()
            time.sleep(2)
            print("===开始领取团队奖励==")
            self.tdjl()
            time.sleep(2)
            print("===开始领等级分红奖励==")
            self.djfh()
            time.sleep(2)
            if mz:
                print("===开始买金猪===")
                self.mjz()
            else:
                print(f"[{self.name}]已设置不自动买猪，跳过执行")

if __name__ == '__main__':
    if 'XD_TOKEN' in os.environ:
        cookie = os.environ.get('XD_TOKEN')
    else:
        print("环境变量中不存在[XD_TOKEN],启用本地变量模式")
        cookie = ck
    if cookie == "":
        print("本地变量为空，请设置其中一个变量后再运行")
        exit(-1)
    cookies = cookie.split("&")
    print("QQ交流群：795406340")
    print(f"星抖短剧共获取到 {len(cookies)} 个账号")
    for i, ck in enumerate(cookies):
        print(f"======开始第{i + 1}个账号======")
        XD(ck).start()
        print("2s后进行下一个账号")
        time.sleep(2)