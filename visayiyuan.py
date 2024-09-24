import json
import os
import requests
import random
import time
import re

# cron: 11 6,9,12,15,18 * * *
# const $ = new Env("VISA一元购");

if os.path.isfile('notify.py'):
    from notify import send

    print("加载通知服务成功！")
else:
    print("加载通知服务失败!")
send_msg = ''
one_msg = ''

targetItems = ["宜家25元卡券", "星巴克43元星礼包", "盒马20元礼品卡", "霸王茶姬20元代金券", "高铁出行服务礼包"]
def Log(cont=''):
    global send_msg, one_msg
    print(cont)
    if cont:
        one_msg += f'{cont}\n'
        send_msg += f'{cont}\n'

def sendMsg(self, help=False):
    send(APP_NAME, send_msg)
class RUN:
    def __init__(self):
        global one_msg
        one_msg = ''
        self.s = requests.session()
        self.headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.50(0x1800323d) NetType/4G Language/zh_CN',
        }

    def do_request(self, url, data={}, req_type='post'):
        try:
            if req_type.lower() == 'get':
                response = self.s.get(url, headers=self.headers)
            elif req_type.lower() == 'post':
                response = self.s.post(url, headers=self.headers, json=data)
            else:
                raise ValueError('Invalid req_type: %s' % req_type)
            res = response.json()
            return res
        except requests.exceptions.RequestException as e:
            print('Request failed:', e)
            return None
        except json.JSONDecodeError as e:
            print('JSON decoding failed:', e)
            return None

    def query(self):
        print(f'>>>>>>开始执行抽奖')
        json_data = {"pageTag": "szcr",
                     "zxId": "",
                     "hxId": ""}
        url = "https://vtravel.link2shops.com/vfuliApi/api/client/localife/goods/recommendNewList"
        response = self.do_request(url, data=json_data)
        if response.get("msg") == "success":
            hot_items = response.get('data')[0].get('list')
            for item in hot_items:
                if (item.get('name') in targetItems and
                        item.get('stock') > 0):
                    Log(f'商品:【{item.get("name")}】有货 库存为【{item.get("stock")}】')
                    send('VISA一元购', f'商品:【{item.get("name")}】有货 库存为【{item.get("stock")}】')





    def main(self):
        global one_msg
        wait_time = random.randint(1000, 3000) / 1000.0  # 转换为秒
        time.sleep(wait_time)  # 等待
        one_msg = ''

        self.query()


if __name__ == '__main__':
    APP_NAME = 'VISA一元购'
    ENV_NAME = "visaItems"


    if ENV_NAME in os.environ:
        targetItems = re.split(", ", os.environ.get(ENV_NAME))
    else:
        targetItems = ["宜家25元卡券", "星巴克43元星礼包", "盒马20元礼品卡", "霸王茶姬20元代金券", "高铁出行服务礼包"]
        # exit()
    local_version = '2024.09.24'
    RUN().main()
