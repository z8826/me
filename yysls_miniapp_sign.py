# -*- coding: utf-8 -*-  

"""  
@file       : yysls_miniapp_sign.py  
@Project    : pythonToolsProject  
@AuThor     : Aura Service  
@CreateTime : 2025/1/9 11:11  
@Description:  
@UpdateTime : 2025/1/9 11:11  
ql部署版  
"""  
import os  
import requests  

# push plus的token
push_plus_token = "xxxxxxxxxxx"  

# 从环境变量读取 access_token
access_tokens = os.getenv('yysls_miniapp', '').splitlines()  

def send_pushplus_message(token, title, content, topic=''):  
    url = 'http://www.pushplus.plus/send'  
    if topic == '':  
        data = {  
            'token': token,  
            'title': title,  
            'content': content  
        }  
    else:  
        data = {  
            'token': token,  
            'title': title,  
            'content': content,  
            'topic': topic  
        }  
    response = requests.post(url, json=data)  
    if response.status_code == 200:  
        print("消息发送成功")  
    else:  
        print("消息发送失败")  

def sign_in(access_token):  
    url = "https://s3.game.163.com/7540694694f2dddc/user/sign"  
    params = {  
        'access_token': access_token  
    }  
    headers = {  
        'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2540020) XWEB/11503",  
        'xweb_xhr': "1",  
        'content-type': "application/json",  
        'sec-fetch-site': "cross-site",  
        'sec-fetch-mode': "cors",  
        'sec-fetch-dest': "empty",   
        'accept-language': "zh-CN,zh;q=0.9"  
    }  
    response = requests.get(url, params=params, headers=headers)  
    return response.text  

# 存储所有签到结果  
results = []  

# 遍历每个 token 进行签到  
for data in access_tokens:  
    token = data.split("#")[0]  
    user_name = data.split("#")[1]  
    if token:  # 确保 token 不为空  
        sign_in_result = sign_in(token)  
        print(f"{user_name} - 签到结果: {sign_in_result}")  
        results.append(f"——————————————\nuser:{user_name}\nToken: {token}\n结果: {sign_in_result}")  

# 汇总所有结果  
summary = "\n\n".join(results)  

# 发送汇总结果  
if results:  
    send_pushplus_message(push_plus_token, "燕云十六声小程序签到结果汇总", summary)
