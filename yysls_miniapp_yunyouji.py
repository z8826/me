# -*- coding: utf-8 -*-  

"""  
@File       : yysls_miniapp_yunyouji.py  
@Project    : pythonToolsProject  
@Author     : Aura Service  
@CreateTime : 2025/1/14 10:08  
@Description:  
外出脚本  
收取奖励脚本 也是用户信息查询脚本  

以下是规则：  
每次外出成功以后 3分钟后  收取奖励才可再次外出  为了避免延迟，应该30s检测一次看card总数是否发生变化  
每次外出需要花费10点体力。所以应该一直外出直到体力不足10点。  

所以请根据以上规则重编脚本  
结果汇总  请用html格式，合并，我后面会发送给pushplus  

这次执行脚本总共成功外出了多少次   ，卡片最终情况，各个任务的情况 ，角色信息。  
各个用户的信息应该都展示，但是有清晰分隔。  

支持多账号  

@UpdateTime : 2025/1/14 10:08  
"""  

import json  
import os  

import requests  
import time  

# 配置：多账号支持  

configs = os.getenv('yysls_yunyouji')  
configs = json.loads(configs) if configs else []  

push_plus_token = "push_plus_token"  

# 配置：多账号支持  
configs = [  
    {  
        'token': '抓的token',  
        'place': '清河填1，开封填2',  
        'roleName': '（角色名称）',  
        'nickname': '备注名称（应该与角色名一致）'  
    }  
]  

# 请求头  
headers = {  
    'User-Agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090a13) UnifiedPCWindowsWechat(0xf2540020) XWEB/11503",  
    'sec-fetch-site': "cross-site",  
    'sec-fetch-mode': "no-cors",  
    'sec-fetch-dest': "script",  
    'referer': "https://www.yysls.cn/",  
    'accept-language': "zh-CN,zh;q=0.9"  
}  

# 抽奖  
def play(config):  
    url = "https://s3.game.163.com/a38a8ca2c0f1daec/user/play"  

    params = {  
        'callback': "jQuery111307470426374169341_1736912742658",  
        'token': config["token"],  
        '_': str(int(time.time() * 1000))  
    }  

    try:  
        response = requests.get(url, params=params, headers=headers)  
        result = response.text.replace(params.get('callback'), '').lstrip('(').rstrip(')')  
        result = json.loads(result)  
        if result.get('code') == 200:  
            print(f"抽奖成功：{config['nickname']}")  
            return {"result": True, "msg": {result.get('data', {}).get('itemName', '')}}  
        else:  
            print(f"抽奖调用成功，错误信息：{result.get('msg', '未知错误')}")  
            return {"result": False, "msg": result.get('msg', '未知错误')}  

    except Exception as e:  
        print(f"抽奖请求发生错误: {e}")  
        return False  

# 外出函数  
def go_out(config):  
    try:  
        print(f"尝试外出：{config['nickname']}")  
        url = "https://s3.game.163.com/a38a8ca2c0f1daec/user/goOut"  
        params = {  
            'callback': "jQuery111307711364923515174_1736818337241",  
            'token': config['token'],  
            'place': config['place'],  
            '_': str(int(time.time() * 1000))  
        }  

        response = requests.get(url, params=params, headers=headers)  
        result = response.text.replace(params.get('callback'), '').lstrip('(').rstrip(')')  
        result = json.loads(result)  

        if result.get('code') == 200:  
            print(f"外出成功：{config['nickname']}")  
            return {"result": True, "msg": "外出成功"}  
        else:  
            print(f"外出失败，错误信息：{result.get('msg')}")  
            return {"result": False, "msg": result.get('msg')}  
    except Exception as e:  
        print(f"外出操作发生错误: {e}")  
        return False  

# 查询用户信息并确认角色名称  
def get_user_info(config):  
    try:  
        print(f"查询用户信息：{config['nickname']}")  
        url = "https://s3.game.163.com/a38a8ca2c0f1daec/user/userInfo"  
        params = {  
            'callback': "jQuery111307711364923515174_1736818337241",  
            'token': config['token'],  
            '_': str(int(time.time() * 1000))  
        }  

        response = requests.get(url, params=params, headers=headers)  
        result = response.text.replace(params.get('callback'), '').lstrip('(').rstrip(')')  
        result = json.loads(result)  

        if result.get('code') == 200:  
            user_info = result.get('data')  
            if user_info['roleName'] == config['roleName']:  
                print(f"角色验证成功：{config['nickname']}")  
                return user_info  
            else:  
                print(f"角色名不匹配: 配置为 {config['roleName']}, 获取到 {user_info['roleName']}")  
                return None  
        else:  
            print(f"查询用户信息失败，错误信息：{result.get('msg')}")  
            return None  
    except Exception as e:  
        print(f"查询用户信息发生错误: {e}")  
        return None  

# 收取奖励函数  
def collect_reward(config):  
    try:  
        print(f"收取奖励：{config['nickname']}")  
        url = "https://s3.game.163.com/a38a8ca2c0f1daec/user/userInfo"  
        params = {  
            'callback': "jQuery111307711364923515174_1736818337241",  
            'token': config['token'],  
            '_': str(int(time.time() * 1000))  
        }  
        response = requests.get(url, params=params, headers=headers)  
        result = response.text.replace(params.get('callback'), '').lstrip('(').rstrip(')')  
        result = json.loads(result)  

        if result.get('code') == 200:  
            print(f"奖励收取成功：{config['nickname']}")  
            return True  
        else:  
            print(f"收取奖励失败，错误信息：{result.get('msg')}")  
            return False  
    except Exception as e:  
        print(f"收取奖励操作发生错误: {e}")  
        return False  

# 监控卡片变化，直到卡片数发生变化  
def monitor_cards(config, old_card_count):  
    try:  
        print(f"监控卡片变化：{config['nickname']}")  
        url = "https://s3.game.163.com/a38a8ca2c0f1daec/user/userInfo"  
        params = {  
            'callback': "jQuery111307711364923515174_1736818337241",  
            'token': config['token'],  
            '_': str(int(time.time() * 1000))  
        }  

        while True:  
            response = requests.get(url, params=params, headers=headers)  
            result = response.text.replace(params.get('callback'), '').lstrip('(').rstrip(')')  
            result = json.loads(result)  

            if result.get('code') == 200:  
                new_card_count = sum(result['data'].get(f'card{i}', 0) for i in range(1, 75))  
                if new_card_count != old_card_count:  
                    print(f"卡片总数变化，继续操作：{config['nickname']}")  
                    return True  
                else:  
                    print(f"卡片总数未变化，继续监控：{config['nickname']}")  
                    time.sleep(30)  
            else:  
                print(f"监控卡片发生错误: {result.get('msg')}")  
                time.sleep(30)  
    except Exception as e:  
        print(f"卡片监控发生错误: {e}")  
        time.sleep(30)  

def share(config):  
    try:  
        print(f"分享：{config['nickname']}")  
        url = f"https://s3.game.163.com/a38a8ca2c0f1daec/user/share"  
        params = {  
            'callback': "jQuery111307711364923515174_1736818337241",  
            'token': config['token'],  
            '_': str(int(time.time() * 1000))  
        }  
        response = requests.get(url, params=params, headers=headers)  
        result = response.text.replace(params.get('callback'), '').lstrip('(').rstrip(')')  
        result = json.loads(result)  
        if result.get('code') == 200:  
            print(f"分享成功：{config['nickname']}")  
            return {"result": True, "msg": "分享成功"}  
        else:  
            print(f"分享失败，错误信息：{result.get('msg')}")  
            return {"result": False, "msg": result.get('msg')}  
    except Exception as e:  
        print(f"分享操作发生错误: {e}")  
        return {"result": False, "msg": str}  

# 主操作函数  
def main():  
    results = []  

    for config in configs:  
        print(f"开始处理账号：{config['nickname']}")  
        user_info = get_user_info(config)  

        if user_info:  
            user_result = {  
                "nickname": config['nickname'],  
                "go_out_count": 0,  
                "final_card_count": 0,  
                "tasks": {  
                    "dayLogin": user_info['dayLogin'],  
                    "dayShare": user_info['dayShare'],  
                    "questionnaire": user_info['questionnaire'],  
                    "reward1": user_info['reward1'],  
                    "reward2": user_info['reward2'],  
                    "reward3": user_info['reward3'],  
                    "reward4": user_info['reward4']  
                },  
                "role_info": {  
                    "roleName": user_info['roleName'],  
                    "pet": user_info['pet'],  
                    "petName": user_info['petName'],  
                    "num": user_info['num'],  
                    "total": user_info['total'],  
                    "weekGiftNum": user_info['weekGiftNum'],  
                    "weekHelpNum": user_info['weekHelpNum'],  
                    "weekPlayNum": user_info['weekPlayNum']  
                }  
            }  

            # 每日分享 任务  
            r = share(config)  
            if r.get('result', False):  
                user_result["share_result"] = r.get('msg', '')  
            else:  
                user_result["share_result"] = r.get('msg', '')  

            # 外出任务  
            old_card_count = sum(user_info.get(f'card{i}', 0) for i in range(1, 75))  
            # 自动外出直到体力不足  
            while user_info['num'] >= 10:  
                print(f"账号 {config['nickname']} 当前体力: {user_info['num']}")  
                # 尝试领取奖励 获取信息  
                u = get_user_info(config)  
                user_info = u if u else user_info  

                re = go_out(config)  
                if re.get('result', False):  
                    user_result["go_out_count"] += 1  
                    time.sleep(180)  # 等待3分钟后才能收取奖励  
                    monitor_cards(config, old_card_count)  
                    collect_reward(config)  
                    user_info['num'] -= 10  # 扣除体力  
                else:  
                    if (re.get('msg', '') == '正在外出'):  
                        print(f"账号 {config['nickname']} 正在外出，等待15秒后继续操作")  
                        time.sleep(15)  

            user_result["final_card_count"] = sum(user_info.get(f'card{i}', 0) for i in range(1, 75))  
            user_result["user_info"] = user_info  

            # 抽奖  
            play_result = []  
            play_num = user_info.get('playNum', 0)  
            if play_num > 5:  
                play_times = 5  
            else:  
                play_times = play_num  

            temp_times = 0  
            while play_times > 0:  
                temp_times += 1  
                r = play(config)  
                if r.get('result', False):  
                    print(  
                        f"账号 {config['nickname']} 抽奖了 {temp_times} 次 结果：{r.get('msg', '')}")  
                    play_result.append(r.get('msg', ''))  
                    play_times = play_times - 1  

                if r.get('msg', '') == '超出当日最大抽奖次数':  
                    break  
                if temp_times > 10:  
                    print(f"账号 {config['nickname']} 尝试抽奖次数超过10次，停止抽奖")  
                    break  

            user_result["play_result"] = play_result  

            results.append(user_result)  
        else:  
            print(f"角色名不匹配或获取信息失败: {config['nickname']}")  

    rrrr = generate_html_report(results)  
    send_pushplus_message(push_plus_token, "燕云十六声小程序云游记活动", rrrr)  

# 生成HTML报告  
def generate_html_report(results):  
    print("正在生成HTML报告...")  
    html_content = f"""  
    <html>    <head>        <title>外出与奖励操作结果</title>  
        <style>            body {{font-family: Arial, sans-serif;}}  
            table {{ width: 100%; border-collapse: collapse; }}  
            th, td {{ padding: 8px; text-align: left; border: 1px solid #ddd; }}  
            th {{ background-color: #f2f2f2; }}  
            .tasks, .role-info {{ margin-left: 20px; }}  
        </style>    </head>    <body>        <h1>操作结果</h1>  
        <h2>总计外出次数：{sum([result.get('go_out_count', 0) for result in results])}</h2>  
        <table>            <tr>                <th>昵称</th>  
                <th>外出总次数</th>  
                <th>最终卡片总数</th>  
                <th>角色名</th>  
                <th>当前体力</th>  
                <th>任务状态</th>  
                <th>宠物</th>  
                <th>备注信息</th>  
            </tr>    """  
    for result in results:  
        user_info = result.get('user_info', {})  
        html_content += """  
        <tr>            <td>{}</td>            <td>{}</td>            <td>{}</td>            <td>{}</td>            <td>{}</td>            <td>                今日登录: {}<br>  
                今日分享: {}<br>  
                问卷: {}<br>  
                企业微信关注: {}<br>  
                本周赠送礼物数量: {}/10<br>  
                本周互助被点数: {}/10<br>  
                今日分享结果：{}/1<br>  
                今日抽奖结果：{}<br>  
                奖励1: {}<br>  
                奖励2: {}<br>  
                奖励3: {}<br>  
                奖励4: {}  
            </td>            <td>{} ({})</td>            <td>                最后登录时间:{}  
            </td>        </tr>        """.format(  
            result.get('nickname', ''),  
            user_info.get('goOutNum', 0),  
            result.get('final_card_count', 0),  
            result.get('role_info', {}).get('roleName', ''),  
            result.get('role_info', {}).get('num', 0),  

            '完成' if result.get('tasks', {}).get('dayLogin', False) else '未完成',  
            '完成' if result.get('tasks', {}).get('dayShare', False) else '未完成',  
            '完成' if result.get('tasks', {}).get('questionnaire', False) else '未完成',  
            '完成' if user_info.get('follow', False) else '未完成',  

            result.get('role_info', {}).get('weekGiftNum', 0),  
            result.get('role_info', {}).get('weekHelpNum', 0),  
            result.get('share_result'),  
            result.get('play_result', []),  

            '已解锁' if result.get('tasks', {}).get('reward1', False) else '未解锁',  
            '已解锁' if result.get('tasks', {}).get('reward2', False) else '未解锁',  
            '已解锁' if result.get('tasks', {}).get('reward3', False) else '未解锁',  
            '已解锁' if result.get('tasks', {}).get('reward4', False) else '未解锁',  

            result.get('role_info', {}).get('petName', ''),  
            result.get('role_info', {}).get('pet', ''),  

            user_info.get('loginDate', ''),  
        )  

    html_content += """  
        </table>    </body>    </html>    """    # with open("report.html", "w", encoding="utf-8") as f:  
    #     f.write(html_content)    print("HTML报告已生成！")  
    return html_content  

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

# 执行主函数  
if __name__ == "__main__":  
    main()
