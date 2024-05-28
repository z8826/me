/*
顺丰速运 v2.19

包含积分任务, 采蜜游戏, 顺丰会员日

采蜜游戏入口: 我的-积分抽奖-拉到最下面收件兑奖
积分可以换快递优惠券,爱奇艺周卡,肯德基代金券和各种实物
采蜜的蜂蜜可以换快递券和实物
默认不运行采蜜游戏, 需要运行的设置变量 sfsyBee 为true (字符串true)
export sfsyBee="true"

打开小程序或APP-我的-积分, 捉以下几种url之一,把整个url放到变量 sfsyUrl 里,多账号换行分割
https://mcs-mimp-web.sf-express.com/mcs-mimp/share/weChat/shareGiftReceiveRedirect
https://mcs-mimp-web.sf-express.com/mcs-mimp/share/app/shareRedirect
每天跑一到两次就行

cron: 11 12,18 * * *
const $ = new Env("顺丰速运");
*/
const _0xd20dff = _0x1a99ad("顺丰速运"),
  _0x7fc9d3 = require("got"),
  _0x54aebf = require("path"),
  {
    exec: _0x3716ee
  } = require("child_process"),
  _0x4b23ad = require("crypto-js"),
  {
    CookieJar: _0x3cdcae
  } = require("tough-cookie"),
  _0x12d720 = "sfsy",
  _0x4c894a = /[\n]/,
  _0xa054da = [_0x12d720 + "Url"],
  _0x2ee95e = process.env[_0x12d720 + "Bee"] || "false",
  _0x3f82eb = 8000,
  _0x12175d = 3;
const _0x191810 = 3.01,
  _0x3296f9 = "sfsy",
  _0xca96e0 = "https://leafxcy.coding.net/api/user/leafxcy/project/validcode/shared-depot/validCode/git/blob/master/code.json",
  _0x40a629 = "https://leafxcy.coding.net/api/user/leafxcy/project/validcode/shared-depot/validCode/git/blob/master/" + _0x3296f9 + ".json",
  _0xb929f2 = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  _0x334941 = "wwesldfs29aniversaryvdld29",
  _0x2f0c75 = "MCS-MIMP-CORE",
  _0xa6fb6f = "czflqdlhbxcx",
  _0x40cb22 = "wxwd26mem1",
  _0x565c04 = {
    BAOZHU_CARD: "[爆竹卡]",
    CHUNLIAN_CARD: "[春联卡]",
    DENGLONG_CARD: "[灯笼卡]",
    HONGBAO_CARD: "[红包卡]",
    YUANXIAO_CARD: "[元宵卡]",
    CHUANGHUA_CARD: "[窗花卡]",
    COMMON_CARD: "[万能卡]"
  };
const _0x44af22 = {
  PUSH_TIMES: "推金币次数",
  COIN: "金币",
  WELFARE_CARD: "财富卡",
  RICH_CARD_GAME: "发财卡"
};
const _0x4732bb = "YEAR_END_2023",
  _0x5ccb1f = "ANNIVERSARY_2024",
  _0x2ecaa0 = "MEMBER_DAY",
  _0x3277c2 = "DRAGONBOAT_2024",
  _0x358eb8 = 8,
  _0x1a3cf1 = 1 << _0x358eb8 - 1,
  _0x4b8e42 = ["完成连签7天", "参与积分活动", "每月累计寄件", "完成每月任务", "与好友微信分享会员福利", "DAILY_VIP_TASK_TYPE", "去新增一个收件偏好", "用行业模板寄件下单"];
let _0x1dd0c5 = [],
  _0x191614 = {},
  _0x3ccdd8 = 0,
  _0x13ad21 = 0;
function _0x190fa1() {
  _0x13ad21 = 1;
  const _0x152f6a = _0x54aebf.basename(process.argv[1]),
    _0xe663c7 = ["bash", "timeout", "grep"];
  let _0x554823 = ["ps afx"];
  _0x554823.push("grep " + _0x152f6a);
  _0x554823 = _0x554823.concat(_0xe663c7.map(_0x5df142 => "grep -v \"" + _0x5df142 + " \""));
  _0x554823.push("wc -l");
  const _0x3256ae = _0x554823.join("|"),
    _0x5aea79 = () => {
      _0x3716ee(_0x3256ae, (_0x5687a0, _0x504a6e, _0x172710) => {
        if (_0x5687a0 || _0x172710) {
          return;
        }
        _0x3ccdd8 = parseInt(_0x504a6e.trim(), 10);
      });
      setTimeout(_0x5aea79, 1000);
    };
  _0x5aea79();
}
class _0x22cfad {
  constructor() {
    this.index = _0xd20dff.userIdx++;
    this.name = "";
    this.valid = false;
    const _0x232543 = {
      limit: 0
    };
    const _0xf8bb76 = {
      Connection: "keep-alive"
    };
    const _0x28379b = {
      retry: _0x232543,
      timeout: _0x3f82eb,
      followRedirect: false,
      ignoreInvalidCookies: true,
      headers: _0xf8bb76
    };
    this.got = _0x7fc9d3.extend(_0x28379b);
    if (!_0x13ad21) {
      _0x190fa1();
    }
  }
  log(_0x2c45d8, _0x4e70c8 = {}) {
    var _0x42c607 = "",
      _0x38af62 = _0xd20dff.userCount.toString().length;
    if (this.index) {
      _0x42c607 += "账号[" + _0xd20dff.padStr(this.index, _0x38af62) + "]";
    }
    if (this.name) {
      _0x42c607 += "[" + this.name + "]";
    }
    _0xd20dff.log(_0x42c607 + _0x2c45d8, _0x4e70c8);
  }
  set_cookie(_0x579846, _0x12006a, _0x2ca71a, _0x45c56d, _0x3c7901 = {}) {
    this.cookieJar.setCookieSync(_0x579846 + "=" + _0x12006a + "; Domain=" + _0x2ca71a + ";", "" + _0x45c56d);
  }
  async request(_0x2d54f0) {
    const _0x30b6b0 = ["ECONNRESET", "EADDRINUSE", "ENOTFOUND", "EAI_AGAIN"],
      _0x4131b1 = ["TimeoutError"],
      _0x1122ff = ["EPROTO"],
      _0x21cde0 = [];
    var _0x1baa68 = null,
      _0x29e06d = 0,
      _0x3b9b1f = _0x2d54f0.fn || _0x2d54f0.url;
    let _0x340989 = _0xd20dff.get(_0x2d54f0, "valid_code", _0x21cde0);
    _0x2d54f0.method = _0x2d54f0?.["method"]?.["toUpperCase"]() || "GET";
    let _0x361aec, _0x38be75;
    while (_0x29e06d < _0x12175d) {
      try {
        _0x29e06d++;
        _0x361aec = "";
        _0x38be75 = "";
        let _0x5bf223 = null,
          _0x323d25 = _0x2d54f0?.["timeout"] || this.got?.["defaults"]?.["options"]?.["timeout"]?.["request"] || _0x3f82eb,
          _0x401ecf = false,
          _0xaf4013 = Math.max(this.index - 2, 0),
          _0x2fa03d = Math.max(this.index - 3, 1),
          _0xbefc28 = _0xaf4013 * 500,
          _0x5f4a0d = _0xaf4013 * _0x2fa03d * 1000,
          _0x36c8d6 = (_0x3ccdd8 - 1) * (_0x3ccdd8 - 1) * 1000,
          _0xff66ec = Math.max(_0xd20dff.userCount - 2, 0) * 200,
          _0x4d33a9 = _0xbefc28 + Math.floor(Math.random() * _0x5f4a0d) + _0x36c8d6 + _0xff66ec;
        await _0xd20dff.wait(_0x4d33a9);
        await new Promise(async _0x1ad895 => {
          setTimeout(() => {
            _0x401ecf = true;
            _0x1ad895();
          }, _0x323d25);
          await this.got(_0x2d54f0).then(_0x59e99b => {
            _0x1baa68 = _0x59e99b;
          }, _0x433013 => {
            _0x5bf223 = _0x433013;
            _0x1baa68 = _0x433013.response;
            _0x361aec = _0x5bf223?.["code"] || "";
            _0x38be75 = _0x5bf223?.["name"] || "";
          });
          _0x1ad895();
        });
        if (_0x401ecf) {
          this.log("[" + _0x3b9b1f + "]请求超时(" + _0x323d25 / 1000 + "秒)，重试第" + _0x29e06d + "次");
        } else {
          if (_0x1122ff.includes(_0x361aec)) {
            this.log("[" + _0x3b9b1f + "]请求错误[" + _0x361aec + "][" + _0x38be75 + "]");
            if (_0x5bf223?.["message"]) {
              console.log(_0x5bf223.message);
            }
            break;
          } else {
            if (_0x4131b1.includes(_0x38be75)) {
              this.log("[" + _0x3b9b1f + "]请求错误[" + _0x361aec + "][" + _0x38be75 + "]，重试第" + _0x29e06d + "次");
            } else {
              if (_0x30b6b0.includes(_0x361aec)) {
                this.log("[" + _0x3b9b1f + "]请求错误[" + _0x361aec + "][" + _0x38be75 + "]，重试第" + _0x29e06d + "次");
              } else {
                let _0x32f105 = _0x1baa68?.["statusCode"] || "",
                  _0x40c29d = _0x32f105 / 100 | 0;
                if (_0x32f105) {
                  _0x40c29d > 3 && !_0x340989.includes(_0x32f105) && (_0x32f105 ? this.log("请求[" + _0x3b9b1f + "]返回[" + _0x32f105 + "]") : this.log("请求[" + _0x3b9b1f + "]错误[" + _0x361aec + "][" + _0x38be75 + "]"));
                  if (_0x40c29d <= 4) {
                    break;
                  }
                } else {
                  this.log("请求[" + _0x3b9b1f + "]错误[" + _0x361aec + "][" + _0x38be75 + "]");
                }
              }
            }
          }
        }
      } catch (_0x2514fe) {
        _0x2514fe.name == "TimeoutError" ? this.log("[" + _0x3b9b1f + "]请求超时，重试第" + _0x29e06d + "次") : this.log("[" + _0x3b9b1f + "]请求错误(" + _0x2514fe.message + ")，重试第" + _0x29e06d + "次");
      }
    }
    if (_0x1baa68 == null) {
      return Promise.resolve({
        statusCode: _0x361aec || -1,
        headers: null,
        result: null
      });
    }
    let {
      statusCode: _0x392403,
      headers: _0x58e894,
      body: _0x2a8c50
    } = _0x1baa68;
    if (_0x2a8c50) {
      try {
        _0x2a8c50 = JSON.parse(_0x2a8c50);
      } catch {}
    }
    const _0x3fda79 = {
      statusCode: _0x392403,
      headers: _0x58e894,
      result: _0x2a8c50
    };
    return Promise.resolve(_0x3fda79);
  }
}
let _0x1f366e = _0x22cfad;
try {
  let _0x2152f6 = require("./LocalBasic");
  _0x1f366e = _0x2152f6;
} catch {}
let _0x6edf86 = new _0x1f366e(_0xd20dff);
class _0x1b7c86 extends _0x1f366e {
  constructor(_0x2b37be) {
    super(_0xd20dff);
    this.refreshUrl = _0x2b37be;
    this.cookieJar = new _0x3cdcae();
    this.deviceId = _0xd20dff.randomPattern("xxxxxxxx-xxxx-xxxx");
    this.jika_black = false;
    this.anniversary_black = false;
    this.dragonBoat_black = false;
    this.memberDay_black = false;
    this.memberDay_redPacket_drewToday = false;
    this.memberDay_redPacket_map = {};
    const _0x39bcbd = {
      "User-Agent": _0xb929f2
    };
    this.got = this.got.extend({
      cookieJar: this.cookieJar,
      headers: _0x39bcbd
    });
  }
  getSign(_0x3ca9d1 = {}) {
    let _0x7f086a = Date.now(),
      _0x317284 = "token=" + _0x334941 + "&timestamp=" + _0x7f086a + "&sysCode=" + _0x2f0c75,
      _0xa39e23 = _0x4b23ad.MD5(_0x317284).toString();
    const _0x30e690 = {
      platform: "MINI_PROGRAM",
      channel: _0x40cb22,
      sysCode: _0x2f0c75,
      timestamp: _0x7f086a,
      signature: _0xa39e23
    };
    return _0x30e690;
  }
  async refresh_cookie(_0x5b8288 = {}) {
    let _0x468150 = false;
    try {
      const _0xe6d127 = {
        fn: "refresh_cookie",
        method: "get",
        url: this.refreshUrl
      };
      let {
        statusCode: _0x1a2215,
        headers: _0x4ef9c2
      } = await this.request(_0xe6d127);
      if (_0x1a2215 == 302) {
        for (let _0x5cc2b2 of _0x4ef9c2["set-cookie"]) {
          if (_0x5cc2b2.includes("_login_mobile_")) {
            let _0x49922a = _0x5cc2b2.match(/_login_mobile_=(\d+);/);
            _0x49922a && (this.name = _0x49922a[1]);
            break;
          }
        }
        _0x468150 = true;
        this.log("登录成功");
      } else {
        this.log("登录失败[" + _0x1a2215 + "]");
      }
    } catch (_0x150538) {
      console.log(_0x150538);
    } finally {
      return _0x468150;
    }
  }
  async personalInfo(_0x5e9f56 = {}) {
    try {
      let _0x74961e = {
          fn: "personalInfo",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/member/personalInfo",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x159107
        } = await this.request(_0x74961e);
      if (_0x159107?.["success"]) {
        const _0x48b3f1 = {
          notify: true
        };
        this.log("积分: " + _0x159107.obj.availablePoints, _0x48b3f1);
      } else {
        this.log("查询账号信息失败: " + (_0x159107?.["errorMessage"] || (_0x159107 ? JSON.stringify(_0x159107) : "无返回")));
      }
    } catch (_0x38e2e6) {
      console.log(_0x38e2e6);
    }
  }
  async queryUserInfo(_0x3cca6f = {}) {
    try {
      let _0x38ec34 = {
          fn: "queryUserInfo",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberIntegral~userInfoService~queryUserInfo",
          headers: {
            ...this.getSign()
          },
          json: {
            sysCode: "ESG-CEMP-CORE",
            optionalColumns: ["usablePoint", "cycleSub", "leavePoint"],
            token: "zeTLTYeG0bLetfRk"
          }
        },
        {
          result: _0x3a9c5a
        } = await this.request(_0x38ec34);
      if (_0x3a9c5a?.["success"]) {
        let {
            usablePoint: _0x4238e2,
            cycleAdd: _0x55ecc4,
            cycleSub: _0x33d6ba,
            leavePoint: _0x1f741b,
            pointClearCycle: _0x430872
          } = _0x3a9c5a.obj,
          _0x3db5a2 = "积分: " + _0x4238e2,
          _0x109df1 = _0x1f741b - _0x33d6ba,
          _0x1b7b1b = new Date(_0x430872 + " 00:00:00");
        _0x1b7b1b.setFullYear(_0x1b7b1b.getFullYear() + 1);
        let _0x32b0b2 = _0x1b7b1b.getTime();
        if (_0x109df1 > 0 && _0x32b0b2 > Date.now()) {
          let _0x3d3c1e = _0xd20dff.time("yyyy-MM-dd", _0x32b0b2);
          _0x3db5a2 += ", 有" + _0x109df1 + "积分将在" + _0x3d3c1e + "过期";
        }
        const _0x530001 = {
          notify: true
        };
        this.log(_0x3db5a2, _0x530001);
      } else {
        this.log("查询账号信息失败: " + (_0x3a9c5a?.["errorMessage"] || (_0x3a9c5a ? JSON.stringify(_0x3a9c5a) : "无返回")));
      }
    } catch (_0x80d42f) {
      console.log(_0x80d42f);
    }
  }
  async automaticSignFetchPackage(_0x3afdbd = {}) {
    try {
      let _0x387106 = {
          fn: "automaticSignFetchPackage",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskSignPlusService~automaticSignFetchPackage",
          headers: {
            ...this.getSign()
          },
          json: {
            comeFrom: _0xd20dff.get(_0x3afdbd, "comeFrom", "vioin"),
            channelFrom: _0xd20dff.get(_0x3afdbd, "channelFrom", "SFAPP")
          }
        },
        {
          result: _0x2a560b
        } = await this.request(_0x387106);
      if (_0x2a560b?.["success"]) {
        _0x2a560b?.["obj"]?.["hasFinishSign"] ? this.log("今天已签到") : _0x2a560b?.["obj"]?.["integralTaskSignPackageVOList"]?.["length"] && this.log("签到获得: " + _0x2a560b?.["obj"]?.["integralTaskSignPackageVOList"]?.["map"](_0x5cc2be => _0x5cc2be.packetName)?.["join"](", "));
        await this.queryPointTaskAndSignFromES();
        const _0x4f3f38 = {
          channelType: 3
        };
        await this.queryPointTaskAndSignFromES(_0x4f3f38);
        await this.queryUserInfo();
      } else {
        this.log("查询签到失败: " + (_0x2a560b?.["errorMessage"] || (_0x2a560b ? JSON.stringify(_0x2a560b) : "无返回")));
      }
    } catch (_0x2555a6) {
      console.log(_0x2555a6);
    }
  }
  async queryPointTaskAndSignFromES(_0x245a05 = {}) {
    try {
      let _0x2988b0 = {
          fn: "queryPointTaskAndSignFromES",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskStrategyService~queryPointTaskAndSignFromES",
          headers: {
            ...this.getSign()
          },
          json: {
            deviceId: this.deviceId,
            channelType: String(_0xd20dff.get(_0x245a05, "channelType", 1))
          }
        },
        {
          result: _0x24f9a5
        } = await this.request(_0x2988b0);
      if (_0x24f9a5?.["success"]) {
        for (let _0xf66bef of _0x24f9a5.obj.taskTitleLevels) {
          switch (_0xf66bef.status) {
            case 2:
              if (_0x4b8e42.includes(_0xf66bef.title)) {
                break;
              }
              await this.finishTask(_0xf66bef);
            case 1:
              await this.fetchIntegral(_0xf66bef);
              break;
            case 3:
              break;
            default:
              this.log("任务[" + _0xf66bef.title + "] -- 未知状态[" + _0xf66bef.status + "]");
              break;
          }
        }
      } else {
        this.log("查询任务失败: " + (_0x24f9a5?.["errorMessage"] || (_0x24f9a5 ? JSON.stringify(_0x24f9a5) : "无返回")));
      }
    } catch (_0x4a7eed) {
      console.log(_0x4a7eed);
    }
  }
  async finishTask(_0x3cdc90, _0x54b45d = {}) {
    try {
      const _0x13317f = {
        taskCode: _0x3cdc90.taskCode
      };
      let _0x44a8fb = {
          fn: "finishTask",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonRoutePost/memberEs/taskRecord/finishTask",
          headers: {
            ...this.getSign()
          },
          json: _0x13317f
        },
        {
          result: _0x2838a6
        } = await this.request(_0x44a8fb);
      _0x2838a6?.["success"] ? this.log("完成任务[" + _0x3cdc90.title + "]成功") : this.log("完成任务[" + _0x3cdc90.title + "]失败: " + (_0x2838a6?.["errorMessage"] || (_0x2838a6 ? JSON.stringify(_0x2838a6) : "无返回")));
    } catch (_0x3832c0) {
      console.log(_0x3832c0);
    }
  }
  async fetchIntegral(_0x5a6907, _0x30fa94 = {}) {
    try {
      let _0x40196d = {
          fn: "fetchIntegral",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~integralTaskStrategyService~fetchIntegral",
          headers: {
            ...this.getSign()
          },
          json: {
            strategyId: _0x5a6907.strategyId,
            taskId: _0x5a6907.taskId,
            taskCode: _0x5a6907.taskCode,
            deviceId: this.deviceId
          }
        },
        {
          result: _0x26712a
        } = await this.request(_0x40196d);
      _0x26712a?.["success"] ? this.log("领取任务[" + _0x5a6907.title + "]奖励: " + _0x26712a.obj.point + "积分") : this.log("领取任务[" + _0x5a6907.title + "]奖励失败: " + (_0x26712a?.["errorMessage"] || (_0x26712a ? JSON.stringify(_0x26712a) : "无返回")));
    } catch (_0x78d48a) {
      console.log(_0x78d48a);
    }
  }
  async queryPointTaskAndSign(_0x38707a = {}) {
    try {
      let _0x5c1457 = {
          fn: "queryPointTaskAndSign",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/appTask/queryPointTaskAndSign",
          headers: {
            ...this.getSign()
          },
          json: {
            channel: _0xd20dff.get(_0x38707a, "channel", "SFAPP"),
            pageType: _0xd20dff.get(_0x38707a, "pageType", "APP_MINE_TASK")
          }
        },
        {
          result: _0x56245d
        } = await this.request(_0x5c1457);
      if (_0x56245d?.["success"]) {
        for (let _0x3d4978 of _0x56245d?.["obj"]?.["taskTitleLevels"] || []) {
          if (_0x4b8e42.includes(_0x3d4978.title)) {
            continue;
          }
          await this.scanPageToRecord(_0x3d4978);
          await this.fetchPoint(_0x3d4978);
        }
      } else {
        this.log("查询旧版任务失败: " + (_0x56245d?.["errorMessage"] || (_0x56245d ? JSON.stringify(_0x56245d) : "无返回")));
      }
    } catch (_0x37b141) {
      console.log(_0x37b141);
    }
  }
  async scanPageToRecord(_0x10e7f2, _0x320adf = {}) {
    try {
      let _0xcde0d6 = {
          fn: "scanPageToRecord",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/appTask/scanPageToRecord",
          headers: {
            ...this.getSign()
          },
          json: {
            channel: _0xd20dff.get(_0x320adf, "channel", "SFAPP"),
            pageType: _0x10e7f2.pageType
          }
        },
        {
          result: _0x15c587
        } = await this.request(_0xcde0d6);
      _0x15c587?.["success"] ? this.log("完成任务[" + _0x10e7f2.title + "]成功") : this.log("完成任务[" + _0x10e7f2.title + "]失败: " + (_0x15c587?.["errorMessage"] || (_0x15c587 ? JSON.stringify(_0x15c587) : "无返回")));
    } catch (_0x5cbe58) {
      console.log(_0x5cbe58);
    }
  }
  async fetchPoint(_0x218956, _0x246357 = {}) {
    try {
      let _0x1697e2 = {
          fn: "fetchPoint",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/appTask/fetchPoint",
          headers: {
            ...this.getSign()
          },
          json: {
            channel: _0xd20dff.get(_0x246357, "channel", "SFAPP"),
            pageType: _0x218956.pageType,
            deviceId: this.deviceId
          }
        },
        {
          result: _0x72086f
        } = await this.request(_0x1697e2);
      _0x72086f?.["success"] ? this.log("领取任务[" + _0x218956.title + "]奖励成功") : this.log("领取任务[" + _0x218956.title + "]奖励失败: " + (_0x72086f?.["errorMessage"] || (_0x72086f ? JSON.stringify(_0x72086f) : "无返回")));
    } catch (_0x5d5430) {
      console.log(_0x5d5430);
    }
  }
  async coupon_list(_0x548ef2 = 1, _0x42f274 = 100, _0x55bebe = {}) {
    try {
      const _0x55f116 = {
        couponType: "",
        pageNo: _0x548ef2,
        pageSize: _0x42f274
      };
      let _0x333cd6 = {
          fn: "coupon_list",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/coupon/available/list",
          headers: {
            ...this.getSign()
          },
          json: _0x55f116
        },
        {
          result: _0x510b4c
        } = await this.request(_0x333cd6);
      if (_0x510b4c?.["success"]) {
        let _0x19a0c0 = [],
          _0x34364a = _0x510b4c?.["obj"] || [];
        for (let _0x14a2bd of _0x34364a) {
          let {
            couponType: _0x4b91a7,
            invalidTm: _0x26d322,
            pledgeAmt: _0x30bb3a,
            couponName: _0x4d41de
          } = _0x14a2bd;
          _0x4b91a7 === "1" && _0x30bb3a >= 12 && _0x19a0c0.push(_0x4d41de + ", 过期时间: " + _0x26d322);
        }
        if (_0x19a0c0.length) {
          const _0x5b35e1 = {
            notify: true
          };
          this.log("大额优惠券:", _0x5b35e1);
          const _0x16e65 = {
            notify: true
          };
          _0xd20dff.log(_0x19a0c0.join("\n"), _0x16e65);
        }
      } else {
        this.log("查询账号券失败: " + (_0x510b4c?.["errorMessage"] || (_0x510b4c ? JSON.stringify(_0x510b4c) : "无返回")));
      }
    } catch (_0x47f1b9) {
      console.log(_0x47f1b9);
    }
  }
  async personalInfoNew(_0x5e2f2f = {}) {
    try {
      let _0x57933e = {
          fn: "personalInfoNew",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberIntegral~userInfoService~personalInfoNew",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x39c88b
        } = await this.request(_0x57933e);
      if (_0x39c88b?.["success"]) {
        this.userId = _0x39c88b.obj.userId;
        const _0x5f4336 = {
          notify: true
        };
        this.log("积分: " + _0x39c88b.obj.availablePoints, _0x5f4336);
      } else {
        this.log("查询账号积分失败: " + (_0x39c88b?.["errorMessage"] || (_0x39c88b ? JSON.stringify(_0x39c88b) : "无返回")));
      }
    } catch (_0x5ee584) {
      console.log(_0x5ee584);
    }
  }
  async bee_indexData(_0xc5b874 = {}) {
    try {
      let _0x188527 = _0xd20dff.randomList(_0x1dd0c5.filter(_0x15868b => _0x15868b != this.userId));
      const _0x43f79f = {
        inviteUserId: _0x188527
      };
      let _0x14933a = {
        fn: "bee_indexData",
        method: "post",
        url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeIndexService~indexData",
        headers: {
          ...this.getSign()
        },
        json: _0x43f79f
      };
      {
        let {
          result: _0x120b3a
        } = await this.request(_0xd20dff.copy(_0x14933a));
        if (_0x120b3a?.["success"]) {
          _0x120b3a?.["obj"]?.["friendAwards"]?.["length"] && this.log("获得奖励: " + _0x120b3a.obj.friendAwards.map(_0x25a948 => _0x25a948.name).join(","));
          let _0x2a0ad6 = _0x120b3a?.["obj"]?.["gameNum"] || 0;
          this.log("可以采蜜冒险" + _0x2a0ad6 + "次");
          while (_0x2a0ad6-- > 0) {
            await this.bee_gameReport();
          }
          await this.bee_taskDetail();
        } else {
          const _0x57da64 = {
            notify: true
          };
          this.log("进入采蜜游戏主页失败: " + (_0x120b3a?.["errorMessage"] || (_0x120b3a ? JSON.stringify(_0x120b3a) : "无返回")), _0x57da64);
          return;
        }
      }
      {
        let {
          result: _0x20f829
        } = await this.request(_0xd20dff.copy(_0x14933a));
        if (_0x20f829?.["success"]) {
          for (let _0x1dc9a8 of _0x20f829?.["obj"]?.["taskDetail"] || []) {
            await this.bee_receiveHoney(_0x1dc9a8);
          }
        } else {
          const _0x369c5c = {
            notify: true
          };
          this.log("进入采蜜游戏主页失败: " + (_0x20f829?.["errorMessage"] || (_0x20f829 ? JSON.stringify(_0x20f829) : "无返回")), _0x369c5c);
          return;
        }
      }
      {
        let {
          result: _0x1e0e46
        } = await this.request(_0xd20dff.copy(_0x14933a));
        if (_0x1e0e46?.["success"]) {
          const _0x9c3419 = {
            notify: true
          };
          this.log("采蜜游戏丰蜜: " + (_0x1e0e46?.["obj"]?.["usableHoney"] || 0), _0x9c3419);
        } else {
          const _0x2e1fc0 = {
            notify: true
          };
          this.log("进入采蜜游戏主页失败: " + (_0x1e0e46?.["errorMessage"] || (_0x1e0e46 ? JSON.stringify(_0x1e0e46) : "无返回")), _0x2e1fc0);
          return;
        }
      }
    } catch (_0x4bd23b) {
      console.log(_0x4bd23b);
    }
  }
  async bee_receiveHoney(_0xbe7c7, _0x4cd67b = {}) {
    try {
      const _0x4fd1ee = {
        taskType: _0xbe7c7.type
      };
      let _0x3db6a1 = {
          fn: "bee_receiveHoney",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeIndexService~receiveHoney",
          headers: {
            ...this.getSign()
          },
          json: _0x4fd1ee
        },
        {
          result: _0x4dad2c
        } = await this.request(_0x3db6a1);
      _0x4dad2c?.["success"] ? this.log("领取[" + _0xbe7c7.type + "]奖励获得: " + _0xbe7c7.value + "丰蜜") : this.log("领取[" + _0xbe7c7.type + "]奖励失败: " + (_0x4dad2c?.["errorMessage"] || (_0x4dad2c ? JSON.stringify(_0x4dad2c) : "无返回")));
    } catch (_0x18648f) {
      console.log(_0x18648f);
    }
  }
  async bee_gameReport(_0xb3d87c = {}) {
    try {
      let _0x1daa50 = 20;
      const _0x422a4f = {
        gatherHoney: _0x1daa50
      };
      let _0x2f54ab = {
          fn: "bee_gameReport",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeGameService~gameReport",
          headers: {
            ...this.getSign()
          },
          json: _0x422a4f
        },
        {
          result: _0x1a221d
        } = await this.request(_0x2f54ab);
      _0x1a221d?.["success"] ? this.log("采蜜冒险获得" + _0x1daa50 + "丰蜜") : this.log("采蜜冒险失败: " + (_0x1a221d?.["errorMessage"] || (_0x1a221d ? JSON.stringify(_0x1a221d) : "无返回")));
    } catch (_0x4675d2) {
      console.log(_0x4675d2);
    }
  }
  async bee_taskDetail(_0x40c61b = {}) {
    try {
      let _0x43b464 = {
          fn: "bee_taskDetail",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~receiveExchangeIndexService~taskDetail",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x28e7af
        } = await this.request(_0x43b464);
      if (_0x28e7af?.["success"]) {
        for (let _0x35cbcc of _0x28e7af.obj.list) {
          if (!_0x35cbcc.taskCode) {
            continue;
          }
          switch (_0x35cbcc.status) {
            case 2:
              if (_0x4b8e42.includes(_0x35cbcc.taskType)) {
                break;
              }
              await this.bee_finishTask(_0x35cbcc);
            case 1:
            case 3:
              break;
            default:
              this.log("任务[" + _0x35cbcc.title + "] -- 未知状态[" + _0x35cbcc.status + "]");
              break;
          }
        }
      } else {
        this.log("查询任务失败: " + (_0x28e7af?.["errorMessage"] || (_0x28e7af ? JSON.stringify(_0x28e7af) : "无返回")));
      }
    } catch (_0x5d5cc8) {
      console.log(_0x5d5cc8);
    }
  }
  async bee_finishTask(_0x381ed3, _0x4b5e4c = {}) {
    try {
      const _0x4096d5 = {
        taskCode: _0x381ed3.taskCode
      };
      let _0x45d176 = {
          fn: "bee_finishTask",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask",
          headers: {
            ...this.getSign()
          },
          json: _0x4096d5
        },
        {
          result: _0x4aee54
        } = await this.request(_0x45d176);
      _0x4aee54?.["success"] ? this.log("完成采蜜任务[" + _0x381ed3.taskType + "]成功") : this.log("完成采蜜任务[" + _0x381ed3.taskType + "]失败: " + (_0x4aee54?.["errorMessage"] || (_0x4aee54 ? JSON.stringify(_0x4aee54) : "无返回")));
    } catch (_0x3e1c1a) {
      console.log(_0x3e1c1a);
    }
  }
  async superWelfare_receiveRedPacket(_0x1d5032 = {}) {
    try {
      const _0x1f2bf0 = {
        channel: _0xa6fb6f
      };
      let _0x10ac11 = {
          fn: "superWelfare_receiveRedPacket",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberActLengthy~redPacketActivityService~superWelfare~receiveRedPacket",
          headers: {
            ...this.getSign()
          },
          json: _0x1f2bf0
        },
        {
          result: _0x57e5ef
        } = await this.request(_0x10ac11);
      if (_0x57e5ef?.["success"]) {
        let _0x50e708 = _0x57e5ef?.["obj"]?.["giftList"];
        if (_0x57e5ef?.["obj"]?.["extraGiftList"]?.["length"]) {
          _0x50e708 = _0x50e708.concat(_0x57e5ef.obj.extraGiftList);
        }
        let _0x34c42b = _0x50e708?.["map"](_0x3bb6ea => _0x3bb6ea.giftName)?.["join"](", ") || "",
          _0x3818a8 = _0x57e5ef?.["obj"]?.["receiveStatus"] == 1 ? "领取成功" : "已领取过";
        const _0x2e66a0 = {
          notify: true
        };
        this.log("超值福利签到[" + _0x3818a8 + "]: " + _0x34c42b, _0x2e66a0);
      } else {
        this.log("超值福利签到失败: " + (_0x57e5ef?.["errorMessage"] || (_0x57e5ef ? JSON.stringify(_0x57e5ef) : "无返回")));
      }
    } catch (_0x5b932f) {
      console.log(_0x5b932f);
    }
  }
  async memberDay_invite(_0x32bfe6 = {}) {
    try {
      let _0x3bc0ad = _0xd20dff.randomList(_0x1dd0c5.filter(_0x491afc => _0x491afc != this.userId));
      const _0x1faf68 = {
        inviteUserId: _0x3bc0ad
      };
      let _0x2afc75 = {
        fn: "memberDay_invite",
        method: "post",
        url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayIndexService~index",
        headers: {
          ...this.getSign()
        },
        json: _0x1faf68
      };
      await this.request(_0x2afc75);
      let {
        result: _0x15e15d
      } = await this.request(_0x2afc75);
      if (_0x15e15d?.["success"]) {
        let {
          canReceiveInviteAward: _0x1057c1,
          risk: _0x3a0f08
        } = _0x15e15d?.["obj"];
        _0x1057c1 && (await this.memberDay_receiveInviteAward(_0x3bc0ad));
        if (this.memberDay_black) {
          return;
        }
        await this.memberDay_index();
      } else {
        let _0x4897e4 = _0x15e15d?.["errorMessage"] || (_0x15e15d ? JSON.stringify(_0x15e15d) : "无返回");
        this.log("查询会员日失败: " + _0x4897e4);
        if (_0x4897e4?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x418176 = {
            notify: true
          };
          this.log("会员日任务风控", _0x418176);
        }
      }
    } catch (_0x3cc4f5) {
      console.log(_0x3cc4f5);
    }
  }
  async memberDay_index(_0x35afaf = {}) {
    try {
      let _0x195a9d = {
          fn: "memberDay_index",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayIndexService~index",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0xd34234
        } = await this.request(_0x195a9d);
      if (_0xd34234?.["success"]) {
        let {
          lotteryNum: _0xc89bf,
          risk: _0x1e4237
        } = _0xd34234?.["obj"];
        await this.memberDay_redPacketReceivedStatus();
        _0xc89bf = _0xc89bf || 0;
        this.log("会员日可以抽奖" + _0xc89bf + "次");
        while (_0xc89bf-- > 0) {
          await this.memberDay_lottery();
        }
        if (this.memberDay_black) {
          return;
        }
        await this.memberDay_taskList();
        if (this.memberDay_black) {
          return;
        }
        await this.memberDay_redPacketStatus();
      } else {
        let _0x57642f = _0xd34234?.["errorMessage"] || (_0xd34234 ? JSON.stringify(_0xd34234) : "无返回");
        this.log("查询会员日失败: " + _0x57642f);
        if (_0x57642f?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x11dbcc = {
            notify: true
          };
          this.log("会员日任务风控", _0x11dbcc);
        }
      }
    } catch (_0x537543) {
      console.log(_0x537543);
    }
  }
  async memberDay_receiveInviteAward(_0x1a883d, _0x5e48d2 = {}) {
    try {
      const _0x7b3582 = {
        inviteUserId: _0x1a883d
      };
      let _0x27b718 = {
          fn: "memberDay_receiveInviteAward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayIndexService~receiveInviteAward",
          headers: {
            ...this.getSign()
          },
          json: _0x7b3582
        },
        {
          result: _0x5489c2
        } = await this.request(_0x27b718);
      if (_0x5489c2?.["success"]) {
        let {
          productName = "空气"
        } = _0x5489c2?.["obj"] || {};
        const _0x242c43 = {
          notify: true
        };
        this.log("会员日奖励: " + productName, _0x242c43);
      } else {
        let _0x154d5d = _0x5489c2?.["errorMessage"] || (_0x5489c2 ? JSON.stringify(_0x5489c2) : "无返回");
        this.log("领取会员日奖励失败: " + _0x154d5d);
        if (_0x154d5d?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x4cb22e = {
            notify: true
          };
          this.log("会员日任务风控", _0x4cb22e);
        }
      }
    } catch (_0x374109) {
      console.log(_0x374109);
    }
  }
  async memberDay_lottery(_0x53580b = {}) {
    try {
      let _0x4f4ec2 = {
          fn: "memberDay_lottery",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayLotteryService~lottery",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x2e15b8
        } = await this.request(_0x4f4ec2);
      if (_0x2e15b8?.["success"]) {
        let {
          productName = "空气"
        } = _0x2e15b8?.["obj"] || {};
        const _0x2a21e1 = {
          notify: true
        };
        this.log("会员日抽奖: " + productName, _0x2a21e1);
      } else {
        let _0x2acd7f = _0x2e15b8?.["errorMessage"] || (_0x2e15b8 ? JSON.stringify(_0x2e15b8) : "无返回");
        this.log("会员日抽奖失败: " + _0x2acd7f);
        if (_0x2acd7f?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x3f7dbf = {
            notify: true
          };
          this.log("会员日任务风控", _0x3f7dbf);
        }
      }
    } catch (_0x5ae726) {
      console.log(_0x5ae726);
    }
  }
  async memberDay_taskList(_0x27aae6 = {}) {
    try {
      let _0x343d56 = {
          fn: "memberDay_taskList",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList",
          headers: {
            ...this.getSign()
          },
          json: {
            activityCode: _0x2ecaa0,
            channelType: "MINI_PROGRAM"
          }
        },
        {
          result: _0x2fb12b
        } = await this.request(_0x343d56);
      if (_0x2fb12b?.["success"]) {
        let _0x572f28 = _0x2fb12b?.["obj"] || [];
        for (let _0x4161af of _0x572f28.filter(_0x315e30 => _0x315e30.status == 1)) {
          if (this.memberDay_black) {
            return;
          }
          await this.memberDay_fetchMixTaskReward(_0x4161af);
        }
        for (let _0x296340 of _0x572f28.filter(_0x571a8f => _0x571a8f.status == 2)) {
          if (this.memberDay_black) {
            return;
          }
          switch (_0x296340.taskType) {
            case "SEND_SUCCESS":
            case "INVITEFRIENDS_PARTAKE_ACTIVITY":
            case "OPEN_SVIP":
            case "OPEN_NEW_EXPRESS_CARD":
            case "OPEN_FAMILY_CARD":
            case "CHARGE_NEW_EXPRESS_CARD":
            case "INTEGRAL_EXCHANGE":
              {
                break;
              }
            default:
              {
                for (let _0x33b938 = 0; _0x33b938 < _0x296340.restFinishTime && !this.memberDay_black; _0x33b938++) {
                  await this.memberDay_finishTask(_0x296340);
                }
                break;
              }
          }
        }
      } else {
        let _0x5b2d4c = _0x2fb12b?.["errorMessage"] || (_0x2fb12b ? JSON.stringify(_0x2fb12b) : "无返回");
        this.log("查询会员日任务失败: " + _0x5b2d4c);
        if (_0x5b2d4c?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x2970bc = {
            notify: true
          };
          this.log("会员日任务风控", _0x2970bc);
        }
      }
    } catch (_0x12cc33) {
      console.log(_0x12cc33);
    }
  }
  async memberDay_finishTask(_0xf3186a, _0x357bca = {}) {
    try {
      const _0x4b28ed = {
        taskCode: _0xf3186a.taskCode
      };
      let _0x250260 = {
          fn: "memberDay_finishTask",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask",
          headers: {
            ...this.getSign()
          },
          json: _0x4b28ed
        },
        {
          result: _0x437254
        } = await this.request(_0x250260);
      if (_0x437254?.["success"]) {
        this.log("完成会员日任务[" + _0xf3186a.taskName + "]成功");
        await this.memberDay_fetchMixTaskReward(_0xf3186a);
      } else {
        let _0x1919dc = _0x437254?.["errorMessage"] || (_0x437254 ? JSON.stringify(_0x437254) : "无返回");
        this.log("完成会员日任务[" + _0xf3186a.taskName + "]失败: " + _0x1919dc);
        if (_0x1919dc?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x2b4600 = {
            notify: true
          };
          this.log("会员日任务风控", _0x2b4600);
        }
      }
    } catch (_0x4913cc) {
      console.log(_0x4913cc);
    }
  }
  async memberDay_fetchMixTaskReward(_0x24ccb4, _0x423a18 = {}) {
    try {
      const _0x164a6e = {
        taskType: _0x24ccb4.taskType,
        activityCode: _0x2ecaa0,
        channelType: "MINI_PROGRAM"
      };
      let _0x3feeb7 = {
          fn: "memberDay_fetchMixTaskReward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~fetchMixTaskReward",
          headers: {
            ...this.getSign()
          },
          json: _0x164a6e
        },
        {
          result: _0x20908b
        } = await this.request(_0x3feeb7);
      if (_0x20908b?.["success"]) {
        this.log("领取会员日任务[" + _0x24ccb4.taskName + "]奖励成功");
      } else {
        let _0x52049d = _0x20908b?.["errorMessage"] || (_0x20908b ? JSON.stringify(_0x20908b) : "无返回");
        this.log("领取会员日任务[" + _0x24ccb4.taskName + "]奖励失败: " + _0x52049d);
        if (_0x52049d?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x12aac4 = {
            notify: true
          };
          this.log("会员日任务风控", _0x12aac4);
        }
      }
    } catch (_0x497ac3) {
      console.log(_0x497ac3);
    }
  }
  async memberDay_redPacketReceivedStatus(_0x1dca20 = {}) {
    try {
      let _0x2bc551 = {
          fn: "memberDay_redPacketReceivedStatus",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayTaskService~redPacketReceivedStatus",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x9f0a3d
        } = await this.request(_0x2bc551);
      if (_0x9f0a3d?.["success"]) {
        for (let _0x2c353f of _0x9f0a3d?.["obj"] || []) {
          if (_0x2c353f.received) {
            continue;
          }
          let _0xed759e = new Date().getHours();
          _0x2c353f.receiveHour == _0xed759e && (await this.memberDay_receiveRedPacket(_0x2c353f.receiveHour));
        }
      } else {
        let _0xcdfdea = _0x9f0a3d?.["errorMessage"] || (_0x9f0a3d ? JSON.stringify(_0x9f0a3d) : "无返回");
        this.log("会员日查询整点领红包失败: " + _0xcdfdea);
        if (_0xcdfdea?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x11871c = {
            notify: true
          };
          this.log("会员日任务风控", _0x11871c);
        }
      }
    } catch (_0xf06332) {
      console.log(_0xf06332);
    }
  }
  async memberDay_receiveRedPacket(_0x5a80e2, _0x204f4d = {}) {
    try {
      const _0x2af585 = {
        receiveHour: _0x5a80e2
      };
      let _0x53d163 = {
          fn: "memberDay_receiveRedPacket",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayTaskService~receiveRedPacket",
          headers: {
            ...this.getSign()
          },
          json: _0x2af585
        },
        {
          result: _0x2c4587
        } = await this.request(_0x53d163);
      if (_0x2c4587?.["success"]) {
        this.log("会员日领取" + _0x5a80e2 + "点红包成功");
      } else {
        let _0x521aab = _0x2c4587?.["errorMessage"] || (_0x2c4587 ? JSON.stringify(_0x2c4587) : "无返回");
        this.log("会员日领取" + _0x5a80e2 + "点红包失败: " + _0x521aab);
        if (_0x521aab?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x2c676a = {
            notify: true
          };
          this.log("会员日任务风控", _0x2c676a);
        }
      }
    } catch (_0x527293) {
      console.log(_0x527293);
    }
  }
  async memberDay_redPacketStatus(_0x5e9b77 = {}) {
    try {
      let _0x57475c = {
          fn: "memberDay_redPacketStatus",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayPacketService~redPacketStatus",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x20777e
        } = await this.request(_0x57475c);
      if (_0x20777e?.["success"]) {
        let {
          drewToday: _0x8d06ae,
          packetList: _0x5b8783
        } = _0x20777e?.["obj"];
        this.memberDay_redPacket_drewToday = _0x8d06ae;
        for (let _0x32d324 of _0x5b8783) {
          this.memberDay_redPacket_map[_0x32d324.level] = _0x32d324.count;
        }
        let _0x5e2492 = _0x358eb8;
        for (let _0x17414e = 1; _0x17414e < _0x5e2492; _0x17414e++) {
          let _0x29a628 = this.memberDay_redPacket_map[_0x17414e];
          while (_0x29a628 >= 2) {
            await this.memberDay_redPacketMerge(_0x17414e);
            _0x29a628 -= 2;
          }
        }
        let _0x554fe2 = [],
          _0x5a7462 = 0;
        for (let _0x9b80fd in this.memberDay_redPacket_map) {
          if (!this.memberDay_redPacket_map[_0x9b80fd]) {
            continue;
          }
          _0x554fe2.push("[" + _0x9b80fd + "级]X" + this.memberDay_redPacket_map[_0x9b80fd]);
          let _0x5cb179 = parseInt(_0x9b80fd);
          _0x5cb179 < _0x5e2492 && (_0x5a7462 += 1 << _0x5cb179 - 1);
        }
        const _0x57d247 = {
          notify: true
        };
        this.log("会员日合成列表: " + _0x554fe2.join(", "), _0x57d247);
        if (this.memberDay_redPacket_map[_0x5e2492]) {
          const _0x478ac7 = {
            notify: true
          };
          this.log("会员日已拥有[" + _0x5e2492 + "级]红包X" + this.memberDay_redPacket_map[_0x5e2492], _0x478ac7);
          await this.memberDay_redPacketDraw(_0x5e2492);
        } else {
          let _0x3534d6 = _0x1a3cf1 - _0x5a7462;
          const _0x46ae66 = {
            notify: true
          };
          this.log("会员日距离[" + _0x5e2492 + "级]红包还差: [1级]红包X" + _0x3534d6, _0x46ae66);
        }
      } else {
        let _0x2168b7 = _0x20777e?.["errorMessage"] || (_0x20777e ? JSON.stringify(_0x20777e) : "无返回");
        this.log("查询会员日合成失败: " + _0x2168b7);
        if (_0x2168b7?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x20a65f = {
            notify: true
          };
          this.log("会员日任务风控", _0x20a65f);
        }
      }
    } catch (_0x5658fc) {
      console.log(_0x5658fc);
    }
  }
  async memberDay_redPacketMerge(_0x31a5b3, _0x1ada24 = {}) {
    try {
      const _0x5c563f = {
        level: _0x31a5b3,
        num: 2
      };
      let _0x2bba40 = {
          fn: "memberDay_redPacketMerge",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayPacketService~redPacketMerge",
          headers: {
            ...this.getSign()
          },
          json: _0x5c563f
        },
        {
          result: _0x5a885b
        } = await this.request(_0x2bba40);
      if (_0x5a885b?.["success"]) {
        this.log("会员日合成: [" + _0x31a5b3 + "级]红包X2 -> [" + (_0x31a5b3 + 1) + "级]红包");
        this.memberDay_redPacket_map[_0x31a5b3] -= 2;
        if (!this.memberDay_redPacket_map[_0x31a5b3 + 1]) {
          this.memberDay_redPacket_map[_0x31a5b3 + 1] = 0;
        }
        this.memberDay_redPacket_map[_0x31a5b3 + 1]++;
      } else {
        let _0x42f3ad = _0x5a885b?.["errorMessage"] || (_0x5a885b ? JSON.stringify(_0x5a885b) : "无返回");
        this.log("会员日合成两个[" + _0x31a5b3 + "级]红包失败: " + _0x42f3ad);
        if (_0x42f3ad?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x2ccfcb = {
            notify: true
          };
          this.log("会员日任务风控", _0x2ccfcb);
        }
      }
    } catch (_0x4e614a) {
      console.log(_0x4e614a);
    }
  }
  async memberDay_redPacketDraw(_0x5b35f8, _0x3fa555 = {}) {
    try {
      let _0x419287 = {
          fn: "memberDay_redPacketDraw",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~memberDayPacketService~redPacketDraw",
          headers: {
            ...this.getSign()
          },
          json: {
            level: _0x5b35f8.toString()
          }
        },
        {
          result: _0xf15a2a
        } = await this.request(_0x419287);
      if (_0xf15a2a?.["success"]) {
        let _0x2d3616 = _0xf15a2a?.["obj"]?.["map"](_0x2af2f5 => _0x2af2f5.couponName) || [];
        const _0x5c8a23 = {
          notify: true
        };
        this.log("会员日提取[" + _0x5b35f8 + "级]红包: " + (_0x2d3616.join(", ") || "空气"), _0x5c8a23);
      } else {
        let _0x198829 = _0xf15a2a?.["errorMessage"] || (_0xf15a2a ? JSON.stringify(_0xf15a2a) : "无返回");
        this.log("会员日提取[" + _0x5b35f8 + "级]红包失败: " + _0x198829);
        if (_0x198829?.["includes"]("没有资格参与活动")) {
          this.memberDay_black = true;
          const _0x28b5fc = {
            notify: true
          };
          this.log("会员日任务风控", _0x28b5fc);
        }
      }
    } catch (_0xf1cf70) {
      console.log(_0xf1cf70);
    }
  }
  async jika2024_taskList(_0x272187 = {}) {
    try {
      let _0x49fe43 = {
          fn: "jika2024_taskList",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList",
          headers: {
            ...this.getSign()
          },
          json: {
            activityCode: _0x4732bb,
            channelType: "MINI_PROGRAM"
          }
        },
        {
          result: _0xed58c9
        } = await this.request(_0x49fe43);
      if (_0xed58c9?.["success"]) {
        let _0x4ac899 = _0xed58c9?.["obj"] || [];
        for (let _0x3cca5a of _0x4ac899.filter(_0x4d1a40 => _0x4d1a40.status == 1)) {
          if (this.jika_black) {
            return;
          }
          for (let _0x23119f = 0; _0x23119f < _0x3cca5a.canReceiveTokenNum; _0x23119f++) {
            await this.jika2024_fetchMixTaskReward(_0x3cca5a);
          }
        }
        for (let _0x5858c6 of _0x4ac899.filter(_0x4b9840 => _0x4b9840.status == 2)) {
          if (this.jika_black) {
            return;
          }
          switch (_0x5858c6.taskType) {
            case "PLAY_ACTIVITY_GAME":
              {
                this.log("开始玩新年集卡猜成语");
                for (let _0x5f2f8f = 1; _0x5f2f8f <= 10; _0x5f2f8f++) {
                  let _0x4cace7 = Math.floor(Math.random() * 3000) + 1000;
                  await _0xd20dff.wait(_0x4cace7);
                  await this.jika2024_chengyu_win(_0x5f2f8f);
                }
                break;
              }
            case "FOLLOW_SFZHUNONG_VEDIO_ID":
              {
                break;
              }
            case "CLICK_MY_SETTING":
            case "CLICK_TEMPLATE":
            case "REAL_NAME":
            case "SEND_SUCCESS_RECALL":
            case "OPEN_SVIP":
            case "OPEN_FAST_CARD":
            case "FIRST_CHARGE_NEW_EXPRESS_CARD":
            case "CHARGE_NEW_EXPRESS_CARD":
            case "INTEGRAL_EXCHANGE":
              {
                break;
              }
            default:
              {
                for (let _0x7e7ee9 = 0; _0x7e7ee9 < _0x5858c6.restFinishTime && !this.jika_black; _0x7e7ee9++) {
                  await this.jika2024_finishTask(_0x5858c6);
                }
                break;
              }
          }
        }
      } else {
        this.log("查询新年集卡任务失败: " + (_0xed58c9?.["errorMessage"] || (_0xed58c9 ? JSON.stringify(_0xed58c9) : "无返回")));
      }
    } catch (_0x290219) {
      console.log(_0x290219);
    }
  }
  async jika2024_finishTask(_0x553ea8, _0x2a97a6 = {}) {
    try {
      const _0x1cfc73 = {
        taskCode: _0x553ea8.taskCode
      };
      let _0x50b108 = {
          fn: "jika2024_finishTask",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonRoutePost/memberEs/taskRecord/finishTask",
          headers: {
            ...this.getSign()
          },
          json: _0x1cfc73
        },
        {
          result: _0x2258f8
        } = await this.request(_0x50b108);
      _0x2258f8?.["success"] ? (this.log("完成新年集卡任务[" + _0x553ea8.taskName + "]成功"), await this.jika2024_fetchMixTaskReward(_0x553ea8)) : this.log("完成新年集卡任务[" + _0x553ea8.taskName + "]失败: " + (_0x2258f8?.["errorMessage"] || (_0x2258f8 ? JSON.stringify(_0x2258f8) : "无返回")));
    } catch (_0x43eeba) {
      console.log(_0x43eeba);
    }
  }
  async jika2024_fetchMixTaskReward(_0x59adb2, _0x342895 = {}) {
    try {
      let _0x1775c7 = {
          fn: "jika2024_fetchMixTaskReward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonNoLoginPost/~memberNonactivity~yearEnd2023TaskService~fetchMixTaskReward",
          headers: {
            ...this.getSign()
          },
          json: {
            taskType: _0x59adb2.taskType,
            activityCode: _0x4732bb,
            channelType: "MINI_PROGRAM"
          }
        },
        {
          result: _0x3b9b6e
        } = await this.request(_0x1775c7);
      if (_0x3b9b6e?.["success"]) {
        let _0x588072 = [],
          {
            receivedAccountList = [],
            turnedAward = {}
          } = _0x3b9b6e.obj;
        for (let _0x5f021e of receivedAccountList) {
          _0x588072.push("" + (_0x565c04[_0x5f021e.currency] || "[" + _0x5f021e.currency + "]"));
        }
        turnedAward?.["couponName"] && _0x588072.push("[优惠券]" + turnedAward?.["couponName"]);
        this.log("领取任务[" + _0x59adb2.taskName + "]奖励: " + _0x588072.join(", "));
      } else {
        let _0x1ca6c2 = _0x3b9b6e?.["errorMessage"] || (_0x3b9b6e ? JSON.stringify(_0x3b9b6e) : "无返回");
        this.log("领取任务[" + _0x59adb2.taskName + "]奖励失败: " + _0x1ca6c2);
        _0x1ca6c2?.["includes"]("用户手机号校验未通过") && (this.jika_black = true);
      }
    } catch (_0x368014) {
      console.log(_0x368014);
    }
  }
  async jika2024_getAward(_0x49a8db, _0x36d0ec = {}) {
    try {
      const _0x28935e = {
        cardType: _0x49a8db
      };
      let _0x376687 = {
          fn: "jika2024_getAward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~yearEnd2023GardenPartyService~getAward",
          headers: {
            ...this.getSign()
          },
          json: _0x28935e
        },
        {
          result: _0x7b67a8
        } = await this.request(_0x376687);
      if (_0x7b67a8?.["success"]) {
        let _0x1a6826 = [],
          {
            receivedAccountList = [],
            turnedAward = {}
          } = _0x7b67a8.obj;
        for (let _0x10373e of receivedAccountList) {
          _0x1a6826.push("" + (_0x565c04[_0x10373e.currency] || "[" + _0x10373e.currency + "]"));
        }
        turnedAward?.["couponName"] && _0x1a6826.push("[优惠券]" + turnedAward?.["couponName"]);
        this.log("逛集市领卡奖励: " + _0x1a6826.join(", "));
      } else {
        let _0x1f4210 = _0x7b67a8?.["errorMessage"] || (_0x7b67a8 ? JSON.stringify(_0x7b67a8) : "无返回");
        this.log("逛集市领卡失败: " + _0x1f4210);
        _0x1f4210?.["includes"]("用户手机号校验未通过") && (this.jika_black = true);
      }
    } catch (_0x1699d4) {
      console.log(_0x1699d4);
    }
  }
  async jika2024_chengyu_index(_0x39834e = {}) {
    try {
      let _0x144833 = {
          fn: "jika2024_chengyu_index",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~yearEnd2023GuessIdiomService~index",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x35aad6
        } = await this.request(_0x144833);
      if (_0x35aad6?.["success"]) {
        if (_0x35aad6?.["obj"]?.["bigCardFlag"]) {
          this.log("今天已完成新年集卡猜成语");
        } else {
          this.log("开始玩新年集卡猜成语");
          for (let _0x214abd = 1; _0x214abd <= 10; _0x214abd++) {
            let _0x4734ff = Math.floor(Math.random() * 3000) + 1000;
            await _0xd20dff.wait(_0x4734ff);
            await this.jika2024_chengyu_win(_0x214abd);
          }
        }
      } else {
        this.log("查询新年集卡猜成语任务失败: " + (_0x35aad6?.["errorMessage"] || (_0x35aad6 ? JSON.stringify(_0x35aad6) : "无返回")));
      }
    } catch (_0x59bdc9) {
      console.log(_0x59bdc9);
    }
  }
  async jika2024_chengyu_win(_0x4f3f5b, _0x1f371d = {}) {
    try {
      const _0x1a3573 = {
        index: _0x4f3f5b
      };
      let _0x1c17de = {
          fn: "jika2024_chengyu_win",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~yearEnd2023GuessIdiomService~win",
          headers: {
            ...this.getSign()
          },
          json: _0x1a3573
        },
        {
          result: _0x3407b2
        } = await this.request(_0x1c17de);
      if (_0x3407b2?.["success"]) {
        let {
          isAward: _0x401097,
          currencyDTOList: _0x3d0bd4
        } = _0x3407b2?.["obj"];
        if (_0x401097) {
          let _0x1ac231 = [];
          for (let _0x1b7ea1 of _0x3d0bd4) {
            _0x1ac231.push("" + (_0x565c04[_0x1b7ea1.currency] || "[" + _0x1b7ea1.currency + "]"));
          }
          this.log("猜成语第" + _0x4f3f5b + "关通关成功: " + _0x1ac231.join(", "));
        } else {
          this.log("猜成语第" + _0x4f3f5b + "关通关成功");
        }
      } else {
        let _0x409572 = _0x3407b2?.["errorMessage"] || (_0x3407b2 ? JSON.stringify(_0x3407b2) : "无返回");
        this.log("猜成语第" + _0x4f3f5b + "关失败: " + _0x409572);
        _0x409572?.["includes"]("系统繁忙") && (this.jika_black = true);
      }
    } catch (_0x2124d9) {
      console.log(_0x2124d9);
    }
  }
  async jika2024_cardStatus(_0x4e825b = {}) {
    try {
      let _0x329c4b = {
          fn: "jika2024_cardStatus",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~yearEnd2023CardService~cardStatus",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x345dde
        } = await this.request(_0x329c4b);
      if (_0x345dde?.["success"]) {
        let _0x48064f = _0x345dde?.["obj"]?.["accountList"] || [];
        if (_0x48064f?.["length"]) {
          this.cards = _0x48064f.filter(_0x38ca6b => _0x38ca6b.balance > 0);
          this.cards.sort((_0x32911d, _0x1f08f5) => {
            return _0x1f08f5.balance - _0x32911d.balance;
          });
          let _0x1bc03b = [];
          for (let _0x397018 of this.cards) {
            let _0x8b433b = _0x565c04[_0x397018.currency] || "[" + _0x397018.currency + "]";
            _0x1bc03b.push(_0x8b433b + "X" + _0x397018.balance);
          }
          const _0x1a5a85 = {
            notify: true
          };
          this.log("年卡: " + _0x1bc03b.join(", "), _0x1a5a85);
          if (this.cards.filter(_0x10118b => _0x10118b.balance > 0).filter(_0x4f1b5a => _0x4f1b5a.currency == "COMMON_CARD").length > 0) {
            const _0xd71c80 = {
              notify: true
            };
            this.log("拥有万能卡, 请自行合成, 不自动抽奖", _0xd71c80);
            return;
          }
          while (this.cards.filter(_0x3fa8d8 => _0x3fa8d8.balance > 0).length >= 3 && !this.jika_black) {
            await this.jika2024_collectDrawAward();
          }
        } else {
          const _0x18a91b = {
            notify: true
          };
          this.log("还没有收集到年卡", _0x18a91b);
        }
      } else {
        this.log("查询已收集年卡失败: " + (_0x345dde?.["errorMessage"] || (_0x345dde ? JSON.stringify(_0x345dde) : "无返回")));
      }
    } catch (_0x100df0) {
      console.log(_0x100df0);
    }
  }
  async jika2024_collectDrawAward(_0xb2225f = {}) {
    try {
      let _0x171858 = this.cards.filter(_0x5e6d64 => _0x5e6d64.balance > 0).map(_0x59e463 => _0x59e463.currency);
      if (_0x171858.length > 6) {
        _0x171858 = _0x171858.slice(0, 6);
      }
      const _0x1953c7 = {
        accountList: _0x171858
      };
      let _0x27ae7c = {
          fn: "jika2024_collectDrawAward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~yearEnd2023CardService~collectDrawAward",
          headers: {
            ...this.getSign()
          },
          json: _0x1953c7
        },
        {
          result: _0x4fa60e
        } = await this.request(_0x27ae7c);
      if (_0x4fa60e?.["success"]) {
        let {
          productName: _0x289592
        } = _0x4fa60e?.["obj"];
        const _0x188335 = {
          notify: true
        };
        this.log("使用" + _0x171858.length + "种年卡合成: " + _0x289592, _0x188335);
        for (let _0xdca95e of this.cards) {
          _0x171858.includes(_0xdca95e.currency) && (_0xdca95e.balance -= 1);
        }
      } else {
        let _0x45659d = _0x4fa60e?.["errorMessage"] || (_0x4fa60e ? JSON.stringify(_0x4fa60e) : "无返回");
        this.log("使用" + _0x171858.length + "种年卡合成失败: " + _0x45659d);
        _0x45659d?.["includes"]("系统繁忙") && (this.jika_black = true);
      }
    } catch (_0x20b92d) {
      console.log(_0x20b92d);
    }
  }
  async jika2024_task(_0x55578f = {}) {
    await this.jika2024_cardStatus();
  }
  async anniversary2024_weeklyGiftStatus(_0x41c300 = {}) {
    try {
      let _0x382182 = {
          fn: "anniversary2024_weeklyGiftStatus",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024IndexService~weeklyGiftStatus",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x188284
        } = await this.request(_0x382182);
      if (_0x188284?.["success"]) {
        let _0x3d6ce0 = _0x188284?.["obj"]?.["weeklyGiftList"] || [];
        for (let _0xc64ed1 of _0x3d6ce0) {
          if (!_0xc64ed1.received) {
            let _0x1e983 = new Date(_0xc64ed1.receiveStartTime),
              _0x9a0d2 = new Date(_0xc64ed1.receiveEndTime),
              _0x711f7e = Date.now();
            _0x711f7e >= _0x1e983.getTime() && _0x711f7e <= _0x9a0d2.getTime() && (await this.anniversary2024_receiveWeeklyGift());
          }
        }
      } else {
        let _0x3d1b7f = _0x188284?.["errorMessage"] || (_0x188284 ? JSON.stringify(_0x188284) : "无返回");
        this.log("查询周年庆每周领券失败: " + _0x3d1b7f);
        (_0x3d1b7f?.["includes"]("系统繁忙") || _0x3d1b7f?.["includes"]("用户手机号校验未通过")) && (this.anniversary_black = true);
      }
    } catch (_0x256b3b) {
      console.log(_0x256b3b);
    }
  }
  async anniversary2024_receiveWeeklyGift(_0x2d0aba = {}) {
    try {
      let _0x47f876 = {
          fn: "anniversary2024_receiveWeeklyGift",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024IndexService~receiveWeeklyGift",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x2eea5c
        } = await this.request(_0x47f876);
      if (_0x2eea5c?.["success"]) {
        let _0x142628 = _0x2eea5c?.["obj"]?.["map"](_0x590726 => _0x590726.productName);
        this.log("周年庆每周领券: " + _0x142628.join(", "));
      } else {
        let _0x4047bd = _0x2eea5c?.["errorMessage"] || (_0x2eea5c ? JSON.stringify(_0x2eea5c) : "无返回");
        this.log("周年庆每周领券失败: " + _0x4047bd);
        (_0x4047bd?.["includes"]("系统繁忙") || _0x4047bd?.["includes"]("用户手机号校验未通过")) && (this.anniversary_black = true);
      }
    } catch (_0x3ed19e) {
      console.log(_0x3ed19e);
    }
  }
  async anniversary2024_taskList(_0x5baa27 = {}) {
    try {
      const _0x520407 = {
        activityCode: _0x5ccb1f,
        channelType: "MINI_PROGRAM"
      };
      let _0xa6998d = {
          fn: "anniversary2024_taskList",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList",
          headers: {
            ...this.getSign()
          },
          json: _0x520407
        },
        {
          result: _0x3841fc
        } = await this.request(_0xa6998d);
      if (_0x3841fc?.["success"]) {
        let _0x30abe6 = _0x3841fc?.["obj"] || [];
        for (let _0x1bc1c1 of _0x30abe6.filter(_0x1734e8 => _0x1734e8.status == 1)) {
          if (this.anniversary_black) {
            return;
          }
          for (let _0x3465d6 = 0; _0x3465d6 < _0x1bc1c1.canReceiveTokenNum; _0x3465d6++) {
            await this.anniversary2024_fetchMixTaskReward(_0x1bc1c1);
          }
        }
        for (let _0x501f37 of _0x30abe6.filter(_0x40141a => _0x40141a.status == 2)) {
          if (this.anniversary_black) {
            return;
          }
          switch (_0x501f37.taskType) {
            case "PLAY_ACTIVITY_GAME":
            case "PLAY_HAPPY_ELIMINATION":
            case "PARTAKE_SUBJECT_GAME":
              {
                break;
              }
            case "FOLLOW_SFZHUNONG_VEDIO_ID":
              {
                break;
              }
            case "BROWSE_VIP_CENTER":
            case "GUESS_GAME_TIP":
            case "CREATE_SFID":
            case "CLICK_MY_SETTING":
            case "CLICK_TEMPLATE":
            case "REAL_NAME":
            case "SEND_SUCCESS_RECALL":
            case "OPEN_SVIP":
            case "OPEN_FAST_CARD":
            case "FIRST_CHARGE_NEW_EXPRESS_CARD":
            case "CHARGE_NEW_EXPRESS_CARD":
            case "INTEGRAL_EXCHANGE":
              {
                break;
              }
            default:
              {
                for (let _0x1640fe = 0; _0x1640fe < _0x501f37.restFinishTime && !this.anniversary_black; _0x1640fe++) {
                  await this.anniversary2024_finishTask(_0x501f37);
                }
                break;
              }
          }
        }
      } else {
        this.log("查询任务失败: " + (_0x3841fc?.["errorMessage"] || (_0x3841fc ? JSON.stringify(_0x3841fc) : "无返回")));
      }
    } catch (_0x5ed42b) {
      console.log(_0x5ed42b);
    }
  }
  async anniversary2024_finishTask(_0x23f5e6, _0xa7fa64 = {}) {
    try {
      const _0x273d37 = {
        taskCode: _0x23f5e6.taskCode
      };
      let _0xe2d0ba = {
          fn: "anniversary2024_finishTask",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonRoutePost/memberEs/taskRecord/finishTask",
          headers: {
            ...this.getSign()
          },
          json: _0x273d37
        },
        {
          result: _0x4cf5e6
        } = await this.request(_0xe2d0ba);
      _0x4cf5e6?.["success"] ? (this.log("完成任务[" + _0x23f5e6.taskName + "]成功"), await this.anniversary2024_fetchMixTaskReward(_0x23f5e6)) : this.log("完成任务[" + _0x23f5e6.taskName + "]失败: " + (_0x4cf5e6?.["errorMessage"] || (_0x4cf5e6 ? JSON.stringify(_0x4cf5e6) : "无返回")));
    } catch (_0x37f33d) {
      console.log(_0x37f33d);
    }
  }
  async anniversary2024_fetchMixTaskReward(_0x597042, _0x2ec079 = {}) {
    try {
      let _0x132417 = {
          fn: "anniversary2024_fetchMixTaskReward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024TaskService~fetchMixTaskReward",
          headers: {
            ...this.getSign()
          },
          json: {
            taskType: _0x597042.taskType,
            activityCode: _0x5ccb1f,
            channelType: "MINI_PROGRAM"
          }
        },
        {
          result: _0xca6f49
        } = await this.request(_0x132417);
      if (_0xca6f49?.["success"]) {
        let _0xc01fe6 = [],
          {
            receivedAccountList = [],
            turnedAward = {}
          } = _0xca6f49?.["obj"]?.["account"];
        for (let _0x36a91b of receivedAccountList) {
          _0xc01fe6.push("[" + _0x36a91b.currency + "]X" + _0x36a91b.amount);
        }
        turnedAward?.["productName"] && _0xc01fe6.push("[优惠券]" + turnedAward?.["productName"]);
        this.log("领取任务[" + _0x597042.taskName + "]奖励: " + _0xc01fe6.join(", "));
      } else {
        let _0x4b5251 = _0xca6f49?.["errorMessage"] || (_0xca6f49 ? JSON.stringify(_0xca6f49) : "无返回");
        this.log("领取任务[" + _0x597042.taskName + "]奖励失败: " + _0x4b5251);
        _0x4b5251?.["includes"]("用户手机号校验未通过") && (this.anniversary_black = true);
      }
    } catch (_0x45063c) {
      console.log(_0x45063c);
    }
  }
  async anniversary2024_unbox(_0x4082b8 = {}) {
    try {
      let _0x36b281 = {
          fn: "anniversary2024_unbox",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~unbox",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x17f829
        } = await this.request(_0x36b281);
      if (_0x17f829?.["success"]) {
        let _0x37693e = [],
          _0x4634e1 = _0x17f829?.["obj"]?.["account"]?.["receivedAccountList"] || [];
        for (let _0x5f0a1e of _0x4634e1) {
          _0x37693e.push("[" + _0x5f0a1e.currency + "]X" + _0x5f0a1e.amount);
        }
        this.log("拆盒子: " + (_0x37693e.join(", ") || "空气"));
      } else {
        let _0x1090e8 = _0x17f829?.["errorMessage"] || (_0x17f829 ? JSON.stringify(_0x17f829) : "无返回");
        this.log("拆盒子失败: " + _0x1090e8);
        _0x1090e8?.["includes"]("用户手机号校验未通过") && (this.anniversary_black = true);
      }
    } catch (_0x5988da) {
      console.log(_0x5988da);
    }
  }
  async anniversary2024_game_list(_0x35d047 = {}) {
    try {
      let _0x3960c7 = {
          fn: "anniversary2024_game_list",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GameParkService~list",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x3ce51f
        } = await this.request(_0x3960c7);
      if (_0x3ce51f?.["success"]) {
        let {
          topicPKInfo: _0x310d7d,
          searchWordInfo: _0x491f39,
          happyEliminationInfo: _0x1e6c0f
        } = _0x3ce51f?.["obj"];
        !_0x310d7d?.["isPassFlag"] && (this.log("开始话题PK赛"), await this.anniversary2024_TopicPk_topicList());
        if (!_0x491f39?.["isPassFlag"] || !_0x491f39?.["isFinishDailyFlag"]) {
          this.log("开始找字游戏");
          for (let _0x4f5c4d = 1; _0x4f5c4d <= 10; _0x4f5c4d++) {
            let _0x64608d = Math.floor(Math.random() * 2000) + 1000;
            await _0xd20dff.wait(_0x64608d);
            if (!(await this.anniversary2024_SearchWord_win(_0x4f5c4d))) {
              break;
            }
          }
        }
        if (!_0x1e6c0f?.["isPassFlag"] || !_0x1e6c0f?.["isFinishDailyFlag"]) {
          this.log("开始消消乐");
          for (let _0x56a53b = 1; _0x56a53b <= 30; _0x56a53b++) {
            let _0x3ed7a2 = Math.floor(Math.random() * 2000) + 1000;
            await _0xd20dff.wait(_0x3ed7a2);
            if (!(await this.anniversary2024_HappyElimination_win(_0x56a53b))) {
              break;
            }
          }
        }
      } else {
        let _0x45d40b = _0x3ce51f?.["errorMessage"] || (_0x3ce51f ? JSON.stringify(_0x3ce51f) : "无返回");
        this.log("查询游戏状态失败: " + _0x45d40b);
        _0x45d40b?.["includes"]("用户手机号校验未通过") && (this.anniversary_black = true);
      }
    } catch (_0x575a85) {
      console.log(_0x575a85);
    }
  }
  async anniversary2024_SearchWord_win(_0x7b45e3, _0x5b2478 = {}) {
    let _0x4c4294 = true;
    try {
      const _0x4160c7 = {
        index: _0x7b45e3
      };
      let _0x18e50c = {
          fn: "anniversary2024_SearchWord_win",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024SearchWordService~win",
          headers: {
            ...this.getSign()
          },
          json: _0x4160c7
        },
        {
          result: _0x42f8a5
        } = await this.request(_0x18e50c);
      if (_0x42f8a5?.["success"]) {
        let {
          currencyDTOList = []
        } = _0x42f8a5?.["obj"];
        if (currencyDTOList?.["length"]) {
          let _0x121d73 = [];
          for (let _0x3de74a of currencyDTOList) {
            _0x121d73.push("[" + _0x3de74a.currency + "]X" + _0x3de74a.amount);
          }
          this.log("找字游戏第" + _0x7b45e3 + "关通关成功: " + _0x121d73.join(", "));
        } else {
          this.log("找字游戏第" + _0x7b45e3 + "关通关成功");
        }
      } else {
        let _0x345c1b = _0x42f8a5?.["errorMessage"] || (_0x42f8a5 ? JSON.stringify(_0x42f8a5) : "无返回");
        this.log("找字游戏第" + _0x7b45e3 + "关失败: " + _0x345c1b);
        _0x345c1b?.["includes"]("系统繁忙") && (_0x4c4294 = false);
      }
    } catch (_0x1badab) {
      console.log(_0x1badab);
    } finally {
      return _0x4c4294;
    }
  }
  async anniversary2024_HappyElimination_win(_0x10ed9f, _0x3de3ff = {}) {
    let _0x52902f = true;
    try {
      const _0x5cb362 = {
        index: _0x10ed9f
      };
      let _0x6cb5d4 = {
          fn: "anniversary2024_HappyElimination_win",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024HappyEliminationService~win",
          headers: {
            ...this.getSign()
          },
          json: _0x5cb362
        },
        {
          result: _0x4f3836
        } = await this.request(_0x6cb5d4);
      if (_0x4f3836?.["success"]) {
        let {
          isAward: _0x29b829,
          currencyDTOList: _0x1bf905
        } = _0x4f3836?.["obj"];
        if (_0x29b829) {
          let _0x54cc47 = [];
          for (let _0x339eca of _0x1bf905) {
            _0x54cc47.push("[" + _0x339eca.currency + "]X" + _0x339eca.amount);
          }
          this.log("消消乐第" + _0x10ed9f + "关通关成功: " + _0x54cc47.join(", "));
        } else {
          this.log("消消乐第" + _0x10ed9f + "关通关成功");
        }
      } else {
        let _0x11f7f3 = _0x4f3836?.["errorMessage"] || (_0x4f3836 ? JSON.stringify(_0x4f3836) : "无返回");
        this.log("消消乐第" + _0x10ed9f + "关失败: " + _0x11f7f3);
        _0x11f7f3?.["includes"]("系统繁忙") && (_0x52902f = false);
      }
    } catch (_0x37ca8b) {
      console.log(_0x37ca8b);
    } finally {
      return _0x52902f;
    }
  }
  async anniversary2024_TopicPk_topicList(_0x4955e5 = {}) {
    try {
      let _0x2feb21 = {
          fn: "anniversary2024_TopicPk_topicList",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024TopicPkService~topicList",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x599f93
        } = await this.request(_0x2feb21);
      if (_0x599f93?.["success"]) {
        let _0x3db193 = _0x599f93?.["obj"]?.["topics"] || [],
          _0x45c4b3 = _0x3db193?.["filter"](_0x25a5e8 => !_0x25a5e8?.["choose"])?.[0]?.["index"] || 1;
        for (let _0x36fb44 = parseInt(_0x45c4b3); _0x36fb44 <= 12; _0x36fb44++) {
          let _0x3ec508 = Math.floor(Math.random() * 2000) + 2000;
          await _0xd20dff.wait(_0x3ec508);
          if (!(await this.anniversary2024_TopicPk_chooseSide(_0x36fb44))) {
            break;
          }
        }
      } else {
        let _0x5ca9fa = _0x599f93?.["errorMessage"] || (_0x599f93 ? JSON.stringify(_0x599f93) : "无返回");
        this.log("查询话题PK赛记录失败: " + _0x5ca9fa);
        _0x5ca9fa?.["includes"]("系统繁忙") && (this.anniversary_black = true);
      }
    } catch (_0x3f246e) {
      console.log(_0x3f246e);
    }
  }
  async anniversary2024_queryAccountStatus_refresh(_0x134b8e = {}) {
    try {
      let _0x2d7c60 = {
        fn: "anniversary2024_queryAccountStatus_refresh",
        method: "post",
        url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~queryAccountStatus",
        headers: {
          ...this.getSign()
        },
        json: {}
      };
      await this.request(_0x2d7c60);
    } catch (_0x45c0a4) {
      console.log(_0x45c0a4);
    }
  }
  async anniversary2024_TopicPk_chooseSide(_0x2f6937, _0x15f516 = {}) {
    let _0x459b1c = true;
    try {
      const _0xd871be = {
        index: _0x2f6937,
        choose: 0
      };
      let _0x6e105d = {
          fn: "anniversary2024_TopicPk_chooseSide",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024TopicPkService~chooseSide",
          headers: {
            ...this.getSign()
          },
          json: _0xd871be
        },
        {
          result: _0x31c667
        } = await this.request(_0x6e105d);
      if (_0x31c667?.["success"]) {
        let {
          currencyDTOList = []
        } = _0x31c667?.["obj"];
        if (currencyDTOList.length) {
          let _0x315510 = [];
          for (let _0x2a4aa3 of currencyDTOList) {
            _0x315510.push("[" + _0x2a4aa3.currency + "]X" + _0x2a4aa3.amount);
          }
          this.log("话题PK赛第" + _0x2f6937 + "个话题选择成功: " + _0x315510.join(", "));
        } else {
          this.log("话题PK赛第" + _0x2f6937 + "个话题选择成功");
        }
      } else {
        let _0x5ccd48 = _0x31c667?.["errorMessage"] || (_0x31c667 ? JSON.stringify(_0x31c667) : "无返回");
        this.log("话题PK赛第" + _0x2f6937 + "个话题失败: " + _0x5ccd48);
        _0x5ccd48?.["includes"]("系统繁忙") && (_0x459b1c = false);
      }
    } catch (_0x5bef25) {
      console.log(_0x5bef25);
    } finally {
      return _0x459b1c;
    }
  }
  async anniversary2024_titleList(_0x1dc978 = {}) {
    try {
      let _0x3b92a5 = {
          fn: "anniversary2024_titleList",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GuessService~titleList",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x11f142
        } = await this.request(_0x3b92a5);
      if (_0x11f142?.["success"]) {
        let {
            guessTitleInfoList = []
          } = _0x11f142?.["obj"],
          _0x94c57d = _0xd20dff.time("yyyy-MM-dd"),
          _0x3bcacf = guessTitleInfoList.filter(_0x3fd49e => _0x3fd49e.gameDate == _0x94c57d);
        if (_0x3bcacf.length > 0) {
          let _0xd15f27 = _0x3bcacf[0];
          if (_0xd15f27.answerStatus) {
            this.log("今日已回答过竞猜");
          } else {
            let _0x4e64b9 = _0x191614?.["answer"]?.[_0x94c57d];
            _0x191614?.["answer"]?.[_0x94c57d] && (await this.anniversary2024_answer(_0xd15f27, _0x4e64b9));
          }
        } else {
          this.log("没有查询到今日竞猜题目");
        }
      } else {
        let _0x180c16 = _0x11f142?.["errorMessage"] || (_0x11f142 ? JSON.stringify(_0x11f142) : "无返回");
        this.log("查询每日口令竞猜失败: " + _0x180c16);
      }
    } catch (_0x58029f) {
      console.log(_0x58029f);
    }
  }
  async anniversary2024_titleList_award(_0x3d8a6f = {}) {
    try {
      let _0xe17283 = {
          fn: "anniversary2024_titleList_award",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GuessService~titleList",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x1ce094
        } = await this.request(_0xe17283);
      if (_0x1ce094?.["success"]) {
        let {
            guessTitleInfoList = []
          } = _0x1ce094?.["obj"],
          _0x341a7e = _0xd20dff.time("yyyy-MM-dd"),
          _0x583512 = guessTitleInfoList.filter(_0x44a11f => _0x44a11f.gameDate == _0x341a7e);
        if (_0x583512.length > 0) {
          let _0x269054 = _0x583512[0];
          if (_0x269054.answerStatus) {
            let _0x58b9e1 = [],
              {
                awardList = [],
                puzzleList = []
              } = _0x269054;
            _0x58b9e1 = _0x58b9e1.concat(awardList.map(_0x3bc476 => _0x3bc476.productName));
            _0x58b9e1 = _0x58b9e1.concat(puzzleList.map(_0x4c7435 => "[" + _0x4c7435.currency + "]X" + _0x4c7435.amount));
            const _0x29027c = {
              notify: true
            };
            this.log("口令竞猜奖励: " + (_0x58b9e1.join(", ") || "空气"), _0x29027c);
          } else {
            this.log("今日还没回答竞猜");
          }
        } else {
          this.log("没有查询到今日竞猜奖励");
        }
      } else {
        let _0x22345a = _0x1ce094?.["errorMessage"] || (_0x1ce094 ? JSON.stringify(_0x1ce094) : "无返回");
        this.log("查询每日口令竞猜奖励失败: " + _0x22345a);
      }
    } catch (_0x38de83) {
      console.log(_0x38de83);
    }
  }
  async anniversary2024_answer(_0x5c8e41, _0x2df3c2, _0x3e7cfc = {}) {
    try {
      const _0xfba958 = {
        period: _0x5c8e41.period,
        answerInfo: _0x2df3c2
      };
      let _0x1d0817 = {
          fn: "anniversary2024_answer",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024GuessService~answer",
          headers: {
            ...this.getSign()
          },
          json: _0xfba958
        },
        {
          result: _0x1c826e
        } = await this.request(_0x1d0817);
      if (_0x1c826e?.["success"]) {
        this.log("口令竞猜回答成功");
        await this.anniversary2024_titleList_award();
      } else {
        let _0x38bb37 = _0x1c826e?.["errorMessage"] || (_0x1c826e ? JSON.stringify(_0x1c826e) : "无返回");
        this.log("口令竞猜回答失败: " + _0x38bb37);
      }
    } catch (_0x5e3e8e) {
      console.log(_0x5e3e8e);
    }
  }
  async anniversary2024_queryAccountStatus(_0x5dd7f0 = {}) {
    try {
      let _0x535479 = {
        fn: "anniversary2024_queryAccountStatus",
        method: "post",
        url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~queryAccountStatus",
        headers: {
          ...this.getSign()
        },
        json: {}
      };
      {
        let {
          result: _0x2069f2
        } = await this.request(_0x535479);
        if (_0x2069f2?.["success"]) {
          let _0x14d709 = _0x2069f2?.["obj"]?.["accountCurrencyList"] || [],
            _0x4eab60 = _0x14d709.filter(_0xcd310c => _0xcd310c.currency == "UNBOX_CHANCE"),
            _0x345f8a = _0x4eab60?.[0]?.["balance"] || 0;
          this.log("可以拆" + _0x345f8a + "次盒子");
          while (_0x345f8a-- > 0) {
            await this.anniversary2024_unbox();
          }
        } else {
          this.log("查询已收集拼图失败: " + (_0x2069f2?.["errorMessage"] || (_0x2069f2 ? JSON.stringify(_0x2069f2) : "无返回")));
        }
      }
      {
        let {
          result: _0x5f1cd7
        } = await this.request(_0x535479);
        if (_0x5f1cd7?.["success"]) {
          let _0x26c78c = _0x5f1cd7?.["obj"]?.["accountCurrencyList"] || [];
          _0x26c78c = _0x26c78c.filter(_0x3888b5 => _0x3888b5.currency != "UNBOX_CHANCE");
          if (_0x26c78c?.["length"]) {
            this.cards = _0x26c78c;
            let _0x501d5c = [];
            for (let _0x361bf7 of this.cards) {
              _0x501d5c.push("[" + _0x361bf7.currency + "]X" + _0x361bf7.balance);
            }
            const _0x278a15 = {
              notify: true
            };
            this.log("拼图: " + _0x501d5c.join(", "), _0x278a15);
            this.cards.sort((_0xc794e6, _0x45356d) => {
              return _0x45356d.balance - _0xc794e6.balance;
            });
          } else {
            const _0x5034e = {
              notify: true
            };
            this.log("还没有收集到拼图", _0x5034e);
          }
        } else {
          this.log("查询已收集拼图失败: " + (_0x5f1cd7?.["errorMessage"] || (_0x5f1cd7 ? JSON.stringify(_0x5f1cd7) : "无返回")));
        }
      }
    } catch (_0xf8c0eb) {
      console.log(_0xf8c0eb);
    }
  }
  async anniversary2024_queryAccountStatus_card(_0x400b5f = {}) {
    try {
      let _0x268ceb = {
          fn: "anniversary2024_queryAccountStatus_card",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~queryAccountStatus",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x39588a
        } = await this.request(_0x268ceb);
      if (_0x39588a?.["success"]) {
        let _0x2c2798 = _0x39588a?.["obj"]?.["accountCurrencyList"] || [];
        _0x2c2798 = _0x2c2798.filter(_0x15c904 => _0x15c904.currency != "UNBOX_CHANCE");
        if (_0x2c2798?.["length"]) {
          this.cards = _0x2c2798.sort((_0x3f4ab4, _0x299a7e) => {
            return _0x299a7e.balance - _0x3f4ab4.balance;
          });
          let _0x508bb8 = [];
          for (let _0x1d6496 of this.cards) {
            _0x508bb8.push("[" + _0x1d6496.currency + "]X" + _0x1d6496.balance);
          }
          const _0x4a48d4 = {
            notify: true
          };
          this.log("拼图: " + _0x508bb8.join(", "), _0x4a48d4);
          while (this.cards.filter(_0x3443bc => _0x3443bc.balance > 0).length >= 3 && !this.anniversary_black) {
            await this.anniversary2024_collectDrawAward();
          }
        } else {
          const _0x143ff4 = {
            notify: true
          };
          this.log("还没有收集到拼图", _0x143ff4);
        }
      } else {
        this.log("查询已收集拼图失败: " + (_0x39588a?.["errorMessage"] || (_0x39588a ? JSON.stringify(_0x39588a) : "无返回")));
      }
    } catch (_0x5a6b0b) {
      console.log(_0x5a6b0b);
    }
  }
  async anniversary2024_collectDrawAward(_0x2b95b9 = {}) {
    try {
      this.cards = this.cards.sort((_0x439e53, _0x43745b) => {
        return _0x43745b.balance - _0x439e53.balance;
      });
      let _0x26491b = this.cards.filter(_0x27052b => _0x27052b.balance > 0).map(_0x3fa59d => _0x3fa59d.currency);
      if (_0x26491b.length == 9) {
        _0x26491b = _0x26491b.slice(0, 9);
      } else {
        if (_0x26491b.length >= 7) {
          _0x26491b = _0x26491b.slice(0, 7);
        } else {
          if (_0x26491b.length >= 5) {
            _0x26491b = _0x26491b.slice(0, 5);
          } else {
            _0x26491b.length >= 3 && (_0x26491b = _0x26491b.slice(0, 3));
          }
        }
      }
      const _0x145f5f = {
        accountList: _0x26491b
      };
      let _0x33fbd0 = {
          fn: "anniversary2024_collectDrawAward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~anniversary2024CardService~collectDrawAward",
          headers: {
            ...this.getSign()
          },
          json: _0x145f5f
        },
        {
          result: _0x2c5b25
        } = await this.request(_0x33fbd0);
      if (_0x2c5b25?.["success"]) {
        let {
          productName: _0x33a029
        } = _0x2c5b25?.["obj"];
        const _0x5c92b9 = {
          notify: true
        };
        this.log("使用" + _0x26491b.length + "种卡合成: " + _0x33a029, _0x5c92b9);
        for (let _0x4884d7 of this.cards) {
          _0x26491b.includes(_0x4884d7.currency) && (_0x4884d7.balance -= 1);
        }
      } else {
        let _0x1ed9b7 = _0x2c5b25?.["errorMessage"] || (_0x2c5b25 ? JSON.stringify(_0x2c5b25) : "无返回");
        this.log("使用" + _0x26491b.length + "种年卡合成失败: " + _0x1ed9b7);
        _0x1ed9b7?.["includes"]("系统繁忙") && (this.anniversary_black = true);
      }
    } catch (_0x73befd) {
      console.log(_0x73befd);
    }
  }
  async dragonBoat2024_weeklyGiftStatus(_0x18f22f = {}) {
    try {
      let _0xb363f7 = {
          fn: "dragonBoat2024_weeklyGiftStatus",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024IndexService~weeklyGiftStatus",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x3db477
        } = await this.request(_0xb363f7);
      if (_0x3db477?.["success"]) {
        let _0x13cd21 = _0x3db477?.["obj"] || [];
        for (let _0x4b1063 of _0x13cd21) {
          if (!_0x4b1063.received) {
            let _0x43651e = new Date(_0x4b1063.receiveStartTime),
              _0x4b5537 = new Date(_0x4b1063.receiveEndTime),
              _0x21d4d7 = Date.now();
            _0x21d4d7 >= _0x43651e.getTime() && _0x21d4d7 <= _0x4b5537.getTime() && (await this.dragonBoat2024_receiveWeeklyGift());
          }
        }
      } else {
        let _0x20d9e6 = _0x3db477?.["errorMessage"] || (_0x3db477 ? JSON.stringify(_0x3db477) : "无返回");
        this.log("端午查询每周领券失败: " + _0x20d9e6);
        (_0x20d9e6?.["includes"]("系统繁忙") || _0x20d9e6?.["includes"]("用户手机号校验未通过")) && (this.dragonBoat_black = true);
      }
    } catch (_0x2473ea) {
      console.log(_0x2473ea);
    }
  }
  async dragonBoat2024_receiveWeeklyGift(_0x5bc16d = {}) {
    try {
      let _0x587ff1 = _0xd20dff.randomList(_0x1dd0c5.filter(_0x4f4149 => _0x4f4149 != this.userId));
      const _0x515edf = {
        inviteUserId: _0x587ff1,
        moduleType: "welfare_card"
      };
      let _0x3ac7f4 = {
          fn: "dragonBoat2024_receiveWeeklyGift",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024IndexService~receiveWeeklyGift",
          headers: {
            ...this.getSign()
          },
          json: _0x515edf
        },
        {
          result: _0x50ef06
        } = await this.request(_0x3ac7f4);
      if (_0x50ef06?.["success"]) {
        let _0x785ddc = _0x50ef06?.["obj"]?.["map"](_0x564cb2 => _0x564cb2.productName);
        this.log("端午每周领券: " + _0x785ddc.join(", "));
      } else {
        let _0x144c1b = _0x50ef06?.["errorMessage"] || (_0x50ef06 ? JSON.stringify(_0x50ef06) : "无返回");
        this.log("端午每周领券失败: " + _0x144c1b);
        (_0x144c1b?.["includes"]("系统繁忙") || _0x144c1b?.["includes"]("用户手机号校验未通过")) && (this.dragonBoat_black = true);
      }
    } catch (_0xca3099) {
      console.log(_0xca3099);
    }
  }
  async dragonBoat2024_taskList(_0x1446ba = {}) {
    try {
      let _0x2bb5e3 = {
          fn: "dragonBoat2024_taskList",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~activityTaskService~taskList",
          headers: {
            ...this.getSign()
          },
          json: {
            activityCode: _0x3277c2,
            channelType: "MINI_PROGRAM"
          }
        },
        {
          result: _0x2dcdcc
        } = await this.request(_0x2bb5e3);
      if (_0x2dcdcc?.["success"]) {
        let _0x1dcbee = _0x2dcdcc?.["obj"] || [];
        for (let _0x98f09c of _0x1dcbee.filter(_0x4b88e9 => _0x4b88e9.status == 1)) {
          if (this.dragonBoat_black) {
            return;
          }
          for (let _0xd8035c = 0; _0xd8035c < _0x98f09c.canReceiveTokenNum; _0xd8035c++) {
            await this.dragonBoat2024_fetchMixTaskReward(_0x98f09c);
          }
        }
        for (let _0x2eb386 of _0x1dcbee.filter(_0x1a1f66 => _0x1a1f66.status == 2)) {
          if (this.dragonBoat_black) {
            return;
          }
          switch (_0x2eb386.taskType) {
            case "PLAY_ACTIVITY_GAME":
            case "FIRST_CHARGE_NEW_EXPRESS_CARD":
            case "SEND_SUCCESS_RECALL":
            case "OPEN_SVIP":
            case "CHARGE_NEW_EXPRESS_CARD":
            case "INTEGRAL_EXCHANGE":
              {
                break;
              }
            default:
              {
                for (let _0x9ff522 = 0; _0x9ff522 < _0x2eb386.restFinishTime && !this.dragonBoat_black; _0x9ff522++) {
                  await this.dragonBoat2024_finishTask(_0x2eb386);
                }
                break;
              }
          }
        }
      } else {
        this.log("端午查询任务失败: " + (_0x2dcdcc?.["errorMessage"] || (_0x2dcdcc ? JSON.stringify(_0x2dcdcc) : "无返回")));
      }
    } catch (_0x49c427) {
      console.log(_0x49c427);
    }
  }
  async dragonBoat2024_finishTask(_0x56272f, _0x3df266 = {}) {
    try {
      const _0x2bbe9e = {
        taskCode: _0x56272f.taskCode
      };
      let _0x1acc10 = {
          fn: "dragonBoat2024_finishTask",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberEs~taskRecord~finishTask",
          headers: {
            ...this.getSign()
          },
          json: _0x2bbe9e
        },
        {
          result: _0x3e2c02
        } = await this.request(_0x1acc10);
      _0x3e2c02?.["success"] ? (this.log("端午完成任务[" + _0x56272f.taskName + "]成功"), await this.dragonBoat2024_fetchMixTaskReward(_0x56272f)) : this.log("端午完成任务[" + _0x56272f.taskName + "]失败: " + (_0x3e2c02?.["errorMessage"] || (_0x3e2c02 ? JSON.stringify(_0x3e2c02) : "无返回")));
    } catch (_0x1a9b1d) {
      console.log(_0x1a9b1d);
    }
  }
  dragonBoat2024_parse_item(_0x551538) {
    let _0x11194a = [];
    for (let _0x17988e of _0x551538) {
      let _0x3c7b92 = _0x17988e.currency,
        _0x57288d = _0x44af22[_0x3c7b92] || "[" + _0x3c7b92 + "]",
        _0xd96d28 = _0x17988e.balance || _0x17988e.amount || 0;
      const _0x8c6650 = {
        currency: _0x3c7b92,
        type: _0x57288d,
        amount: _0xd96d28
      };
      _0x11194a.push(_0x8c6650);
    }
    return _0x11194a;
  }
  async dragonBoat2024_fetchMixTaskReward(_0x49119b, _0x53f3de = {}) {
    try {
      let _0x53dd20 = {
          fn: "dragonBoat2024_fetchMixTaskReward",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024TaskService~fetchTasksReward",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x4874b8
        } = await this.request(_0x53dd20);
      if (_0x4874b8?.["success"]) {
        let _0x78c22a = this.dragonBoat2024_parse_item(_0x4874b8?.["obj"]?.["receivedAccountList"] || []);
        _0x78c22a = _0x78c22a.map(_0x186534 => _0x186534.type + "x" + _0x186534.amount);
        this.log("端午领取任务[" + _0x49119b.taskName + "]奖励: " + _0x78c22a.join(", "));
      } else {
        let _0xc00e11 = _0x4874b8?.["errorMessage"] || (_0x4874b8 ? JSON.stringify(_0x4874b8) : "无返回");
        this.log("端午领取任务[" + _0x49119b.taskName + "]奖励失败: " + _0xc00e11);
        _0xc00e11?.["includes"]("用户手机号校验未通过") && (this.dragonBoat_black = true);
      }
    } catch (_0x12ee97) {
      console.log(_0x12ee97);
    }
  }
  async dragonBoat2024_game_indexInfo(_0x432c38 = {}) {
    try {
      let _0x2b43bd = {
          fn: "dragonBoat2024_game_indexInfo",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024GameService~indexInfo",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0xdb99
        } = await this.request(_0x2b43bd);
      if (_0xdb99?.["success"]) {
        let _0x563483 = _0xdb99?.["obj"]?.["ifPassAllLevel"];
        await this.dragonBoat2024_game_init(_0x563483);
      } else {
        let _0xa085a9 = _0xdb99?.["errorMessage"] || (_0xdb99 ? JSON.stringify(_0xdb99) : "无返回");
        this.log("端午查询游戏状态失败: " + _0xa085a9);
        _0xa085a9?.["includes"]("用户手机号校验未通过") && (this.dragonBoat_black = true);
      }
    } catch (_0x30d62a) {
      console.log(_0x30d62a);
    }
  }
  async dragonBoat2024_game_init(_0x308c0e, _0x46162c = {}) {
    try {
      let _0x4a855b = {
          fn: "dragonBoat2024_game_init",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024GameService~init",
          headers: {
            ...this.getSign()
          },
          json: {}
        },
        {
          result: _0x1b8b44
        } = await this.request(_0x4a855b);
      if (_0x1b8b44?.["success"]) {
        let {
            gotPushTimeOfToday: _0x914fe0,
            currentIndex: _0x1d79d8
          } = _0x1b8b44?.["obj"],
          _0x16909c = 0;
        if (!_0x308c0e) {
          _0x16909c = 30;
        } else {
          _0x914fe0 < 3 && (_0x16909c = 3 * (3 - _0x914fe0));
        }
        if (_0x16909c > 0) {
          this.log("端午划龙舟, 目标: " + _0x16909c + "关");
          let _0x587f9e = Math.min(_0x16909c + _0x1d79d8, 30);
          for (let _0x3e0773 = _0x1d79d8; _0x3e0773 <= _0x587f9e; _0x3e0773++) {
            let _0x137aef = Math.floor(Math.random() * 2000) + 2000;
            await _0xd20dff.wait(_0x137aef);
            if (!(await this.dragonBoat2024_boat_win(_0x3e0773))) {
              break;
            }
          }
        }
      } else {
        let _0x2026fa = _0x1b8b44?.["errorMessage"] || (_0x1b8b44 ? JSON.stringify(_0x1b8b44) : "无返回");
        this.log("端午查询游戏状态失败: " + _0x2026fa);
        _0x2026fa?.["includes"]("用户手机号校验未通过") && (this.dragonBoat_black = true);
      }
    } catch (_0x8233a4) {
      console.log(_0x8233a4);
    }
  }
  async dragonBoat2024_boat_win(_0x26ca39 = 1, _0x1fa48b = {}) {
    let _0x11fc9c = true;
    try {
      const _0x96145c = {
        levelIndex: _0x26ca39
      };
      let _0x113cc2 = {
          fn: "dragonBoat2024_boat_win",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024GameService~win",
          headers: {
            ...this.getSign()
          },
          json: _0x96145c
        },
        {
          result: _0x1036aa
        } = await this.request(_0x113cc2);
      if (_0x1036aa?.["success"]) {
        let _0x2b705b = this.dragonBoat2024_parse_item(_0x1036aa?.["obj"]?.["currentAwardList"] || []);
        _0x2b705b = _0x2b705b.map(_0x2d1e3c => _0x2d1e3c.type + "x" + _0x2d1e3c.amount);
        _0x2b705b.length ? this.log("端午划龙舟第" + _0x26ca39 + "关通关成功: " + _0x2b705b.join(", ")) : this.log("端午划龙舟第" + _0x26ca39 + "关通关成功");
      } else {
        let _0x231bdc = _0x1036aa?.["errorMessage"] || (_0x1036aa ? JSON.stringify(_0x1036aa) : "无返回");
        this.log("端午划龙舟第" + _0x26ca39 + "关失败: " + _0x231bdc);
        _0x231bdc?.["includes"]("系统繁忙") && (_0x11fc9c = false);
      }
    } catch (_0x3e6c33) {
      console.log(_0x3e6c33);
    } finally {
      return _0x11fc9c;
    }
  }
  async dragonBoat2024_coinStatus(_0x597174 = {}) {
    try {
      let _0x27e076 = {
        fn: "dragonBoat2024_coinStatus",
        method: "post",
        url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024CoinService~coinStatus",
        headers: {
          ...this.getSign()
        },
        json: {}
      };
      {
        let {
          result: _0x1b3b04
        } = await this.request(_0x27e076);
        if (_0x1b3b04?.["success"]) {
          let _0x53e26f = _0x1b3b04?.["obj"]?.["accountCurrencyList"] || [],
            _0x1ebcec = _0x53e26f.filter(_0x17a946 => _0x17a946.currency == "PUSH_TIMES"),
            _0x2996ad = _0x1ebcec?.[0]?.["balance"] || 0;
          this.log("端午可以推" + _0x2996ad + "次金币");
          while (_0x2996ad-- > 0) {
            await this.dragonBoat2024_pushCoin();
          }
        } else {
          this.log("端午查询推金币状态失败: " + (_0x1b3b04?.["errorMessage"] || (_0x1b3b04 ? JSON.stringify(_0x1b3b04) : "无返回")));
        }
      }
      {
        let {
          result: _0x275757
        } = await this.request(_0x27e076);
        if (_0x275757?.["success"]) {
          let {
              accountCurrencyList = [],
              pushedTimesToday: _0x10d0dd,
              pushedTimesTotal: _0x1d597e
            } = _0x275757?.["obj"],
            _0x5921a9 = this.dragonBoat2024_parse_item(accountCurrencyList),
            _0x2e8aa6 = _0x5921a9.filter(_0x123cb0 => _0x123cb0.currency == "COIN"),
            _0x5fb745 = _0x5921a9.filter(_0x1c1a7c => _0x1c1a7c.currency == "RICH_CARD_GAME");
          this.coin = _0x2e8aa6?.[0]?.["amount"] || 0;
          this.rich_card = _0x5fb745?.[0]?.["amount"] || 0;
          const _0x5ab13a = {
            notify: true
          };
          this.log("端午金币: " + this.coin + ", 发财卡: " + this.rich_card, _0x5ab13a);
          let _0x563efb = Math.floor(this.coin / 230),
            _0x4883d2 = Math.min(_0x563efb, this.rich_card);
          this.log("端午可以抽发财卡池" + _0x4883d2 + "次");
          while (_0x4883d2-- > 0) {
            await this.dragonBoat2024_prizeDraw(4);
          }
        } else {
          this.log("端午查询金币失败: " + (_0x275757?.["errorMessage"] || (_0x275757 ? JSON.stringify(_0x275757) : "无返回")));
        }
      }
    } catch (_0x321f91) {
      console.log(_0x321f91);
    }
  }
  async dragonBoat2024_givePushTimes(_0x482ddb = {}) {
    let _0x2a4a8a = true;
    try {
      let _0x536fee = {
        fn: "dragonBoat2024_givePushTimes",
        method: "post",
        url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024CoinService~givePushTimes",
        headers: {
          ...this.getSign()
        },
        json: {}
      };
      await this.request(_0x536fee);
    } catch (_0x51d66d) {
      console.log(_0x51d66d);
    } finally {
      return _0x2a4a8a;
    }
  }
  async dragonBoat2024_pushCoin(_0x3d48d5 = {}) {
    try {
      const _0x16b4ea = {
        plateToken: null
      };
      let _0x52dbfd = {
          fn: "dragonBoat2024_pushCoin",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024CoinService~pushCoin",
          headers: {
            ...this.getSign()
          },
          json: _0x16b4ea
        },
        {
          result: _0x2aadb3
        } = await this.request(_0x52dbfd);
      if (_0x2aadb3?.["success"]) {
        let _0x411c72 = this.dragonBoat2024_parse_item(_0x2aadb3?.["obj"]?.["receivedAccountList"] || []);
        _0x411c72 = _0x411c72.map(_0xfae252 => _0xfae252.type + "x" + _0xfae252.amount);
        _0x411c72.length ? this.log("端午推金币成功: " + _0x411c72.join(", ")) : this.log("端午推金币成功, 没有获得奖品");
      } else {
        this.log("端午推金币失败: " + (_0x2aadb3?.["errorMessage"] || (_0x2aadb3 ? JSON.stringify(_0x2aadb3) : "无返回")));
      }
    } catch (_0x286f6c) {
      console.log(_0x286f6c);
    }
  }
  async dragonBoat2024_prizeDraw(_0x453a90, _0x379c9b = {}) {
    try {
      const _0x432f96 = {
        drawType: _0x453a90
      };
      let _0x4a1d6d = {
          fn: "dragonBoat2024_prizeDraw",
          method: "post",
          url: "https://mcs-mimp-web.sf-express.com/mcs-mimp/commonPost/~memberNonactivity~dragonBoat2024LotteryService~prizeDraw",
          headers: {
            ...this.getSign()
          },
          json: _0x432f96
        },
        {
          result: _0x68ffd6
        } = await this.request(_0x4a1d6d);
      if (_0x68ffd6?.["success"]) {
        let {
          giftBagName: _0x6be8ac,
          giftBagDesc: _0x1dace3
        } = _0x68ffd6?.["obj"];
        const _0x4f5773 = {
          notify: true
        };
        this.log("端午奖池[" + _0x453a90 + "]抽奖: [" + _0x6be8ac + "]" + _0x1dace3, _0x4f5773);
      } else {
        this.log("端午奖池[" + _0x453a90 + "]抽奖失败: " + (_0x68ffd6?.["errorMessage"] || (_0x68ffd6 ? JSON.stringify(_0x68ffd6) : "无返回")));
      }
    } catch (_0x1cf084) {
      console.log(_0x1cf084);
    }
  }
  async anniversary2024_task(_0x43fe06 = {}) {
    await this.anniversary2024_weeklyGiftStatus();
    if (this.anniversary_black) {
      return;
    }
    await this.anniversary2024_game_list();
    await this.anniversary2024_taskList();
    await this.anniversary2024_queryAccountStatus();
  }
  async anniversary2024_draw_task(_0x12d9bb = {}) {
    await this.anniversary2024_queryAccountStatus_card();
  }
  async dragonBoat2024_task(_0x451f02 = {}) {
    let _0x134a05 = Date.now();
    if (_0x134a05 < 1716516000000 || _0x134a05 > 1718190000000) {
      return;
    }
    await this.dragonBoat2024_weeklyGiftStatus();
    if (this.dragonBoat_black) {
      return;
    }
    await this.dragonBoat2024_game_indexInfo();
    await this.dragonBoat2024_taskList();
    await this.dragonBoat2024_givePushTimes();
    await this.dragonBoat2024_coinStatus();
  }
  async memberDay_task(_0x54453a = {}) {
    let _0x53e99a = new Date().getDate();
    _0x53e99a >= 26 && _0x53e99a <= 28 && (await this.memberDay_index());
  }
  async userTask(_0x12b43e = {}) {
    _0xd20dff.log("\n-------------- 账号[" + this.index + "] --------------");
    if (!(await this.refresh_cookie())) {
      return;
    }
    await this.superWelfare_receiveRedPacket();
    await this.automaticSignFetchPackage();
    if (_0x2ee95e == "true") {
      await this.bee_indexData();
    }
    await this.memberDay_task();
    await this.dragonBoat2024_task();
    await this.coupon_list();
  }
}
!(async () => {
  if (!(await _0x28938e())) {
    return;
  }
  await _0x313045();
  _0xd20dff.read_env(_0x1b7c86);
  let _0x49e06a = _0x2ee95e == "true" ? "运行" : "不运行";
  _0xd20dff.log("");
  const _0x22b4b5 = {
    notify: true
  };
  _0xd20dff.log("采蜜游戏目前设置为: " + _0x49e06a, _0x22b4b5);
  _0xd20dff.log("");
  for (let _0x268a0b of _0xd20dff.userList) {
    await _0x268a0b.userTask();
  }
})().catch(_0x52cbb9 => _0xd20dff.log(_0x52cbb9)).finally(() => _0xd20dff.exitNow());
async function _0x28938e(_0x40c2b6 = 0) {
  let _0x241e9b = false;
  try {
    const _0x11238b = {
      fn: "auth",
      method: "get",
      url: _0xca96e0,
      timeout: 20000
    };
    let {
      statusCode: _0x3ca429,
      result: _0x45740c
    } = await _0x6edf86.request(_0x11238b);
    if (_0x3ca429 != 200) {
      _0x40c2b6++ < MAX_AUTH_RETRY && (_0x241e9b = await _0x28938e(_0x40c2b6));
      return _0x241e9b;
    }
    if (_0x45740c?.["code"] == 0) {
      _0x45740c = JSON.parse(_0x45740c.data.file.data);
      if (_0x45740c?.["commonNotify"] && _0x45740c.commonNotify.length > 0) {
        const _0x24ae27 = {
          notify: true
        };
        _0xd20dff.log(_0x45740c.commonNotify.join("\n") + "\n", _0x24ae27);
      }
      _0x45740c?.["commonMsg"] && _0x45740c.commonMsg.length > 0 && _0xd20dff.log(_0x45740c.commonMsg.join("\n") + "\n");
      if (_0x45740c[_0x3296f9]) {
        let _0x3db75a = _0x45740c[_0x3296f9];
        _0x3db75a.status == 0 ? _0x191810 >= _0x3db75a.version ? (_0x241e9b = true, _0xd20dff.log(_0x3db75a.msg[_0x3db75a.status]), _0xd20dff.log(_0x3db75a.updateMsg), _0xd20dff.log("现在运行的脚本版本是：" + _0x191810 + "，最新脚本版本：" + _0x3db75a.latestVersion)) : _0xd20dff.log(_0x3db75a.versionMsg) : _0xd20dff.log(_0x3db75a.msg[_0x3db75a.status]);
      } else {
        _0xd20dff.log(_0x45740c.errorMsg);
      }
    } else {
      _0x40c2b6++ < MAX_AUTH_RETRY && (_0x241e9b = await _0x28938e(_0x40c2b6));
    }
  } catch (_0x1b85c6) {
    _0xd20dff.log(_0x1b85c6);
  } finally {
    return _0x241e9b;
  }
}
async function _0x313045() {
  let _0x2e1020 = false;
  try {
    const _0x1f2a6 = {
      fn: "auth",
      method: "get",
      url: _0x40a629
    };
    let {
      statusCode: _0x48726d,
      result: _0x2f6355
    } = await _0x6edf86.request(_0x1f2a6);
    if (_0x48726d != 200) {
      return Promise.resolve();
    }
    _0x2f6355?.["code"] == 0 && (_0x2f6355 = JSON.parse(_0x2f6355.data.file.data), _0x1dd0c5 = _0x2f6355?.["inviteUserId"] || _0x1dd0c5, _0x191614 = _0x2f6355?.["anniversary_2024"] || _0x191614);
  } catch (_0x4b9ec7) {
    _0xd20dff.log(_0x4b9ec7);
  } finally {
    return _0x2e1020;
  }
}
function _0x1a99ad(_0x14860) {
  return new class {
    constructor(_0x32e139) {
      this.name = _0x32e139;
      this.startTime = Date.now();
      const _0x2d831b = {
        time: true
      };
      this.log("[" + this.name + "]开始运行\n", _0x2d831b);
      this.notifyStr = [];
      this.notifyFlag = true;
      this.userIdx = 0;
      this.userList = [];
      this.userCount = 0;
    }
    log(_0x249752, _0x207050 = {}) {
      const _0x5c97f5 = {
        console: true
      };
      Object.assign(_0x5c97f5, _0x207050);
      if (_0x5c97f5.time) {
        let _0x1d8324 = _0x5c97f5.fmt || "hh:mm:ss";
        _0x249752 = "[" + this.time(_0x1d8324) + "]" + _0x249752;
      }
      if (_0x5c97f5.notify) {
        this.notifyStr.push(_0x249752);
      }
      if (_0x5c97f5.console) {
        console.log(_0x249752);
      }
    }
    get(_0x497d1e, _0x3d2e5e, _0x49727e = "") {
      let _0x496b18 = _0x49727e;
      _0x497d1e?.["hasOwnProperty"](_0x3d2e5e) && (_0x496b18 = _0x497d1e[_0x3d2e5e]);
      return _0x496b18;
    }
    pop(_0x7e6e56, _0x506847, _0x5c2fd1 = "") {
      let _0x57b053 = _0x5c2fd1;
      _0x7e6e56?.["hasOwnProperty"](_0x506847) && (_0x57b053 = _0x7e6e56[_0x506847], delete _0x7e6e56[_0x506847]);
      return _0x57b053;
    }
    copy(_0x81274d) {
      return Object.assign({}, _0x81274d);
    }
    read_env(_0x4a8868) {
      let _0x208ed5 = _0xa054da.map(_0x12608f => process.env[_0x12608f]);
      for (let _0x5a38f4 of _0x208ed5.filter(_0x333c93 => !!_0x333c93)) {
        for (let _0x2cb5bb of _0x5a38f4.split(_0x4c894a).filter(_0x2956e6 => !!_0x2956e6)) {
          if (this.userList.includes(_0x2cb5bb)) {
            continue;
          }
          this.userList.push(new _0x4a8868(_0x2cb5bb));
        }
      }
      this.userCount = this.userList.length;
      if (!this.userCount) {
        const _0xce518 = {
          notify: true
        };
        this.log("未找到变量，请检查变量" + _0xa054da.map(_0x179ee8 => "[" + _0x179ee8 + "]").join("或"), _0xce518);
        return false;
      }
      this.log("共找到" + this.userCount + "个账号");
      return true;
    }
    async threads(_0x406d0c, _0x5ab6b9, _0x3e184d = {}) {
      while (_0x5ab6b9.idx < _0xd20dff.userList.length) {
        let _0x3abe95 = _0xd20dff.userList[_0x5ab6b9.idx++];
        if (!_0x3abe95.valid) {
          continue;
        }
        await _0x3abe95[_0x406d0c](_0x3e184d);
      }
    }
    async threadTask(_0x2bab0d, _0x59c1cf) {
      let _0x138825 = [];
      const _0x27dcbf = {
        idx: 0
      };
      while (_0x59c1cf--) {
        _0x138825.push(this.threads(_0x2bab0d, _0x27dcbf));
      }
      await Promise.all(_0x138825);
    }
    time(_0x1fa95d, _0x35f59e = null) {
      let _0x55b23e = _0x35f59e ? new Date(_0x35f59e) : new Date(),
        _0xccd715 = {
          "M+": _0x55b23e.getMonth() + 1,
          "d+": _0x55b23e.getDate(),
          "h+": _0x55b23e.getHours(),
          "m+": _0x55b23e.getMinutes(),
          "s+": _0x55b23e.getSeconds(),
          "q+": Math.floor((_0x55b23e.getMonth() + 3) / 3),
          S: this.padStr(_0x55b23e.getMilliseconds(), 3)
        };
      /(y+)/.test(_0x1fa95d) && (_0x1fa95d = _0x1fa95d.replace(RegExp.$1, (_0x55b23e.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let _0x1b02b3 in _0xccd715) new RegExp("(" + _0x1b02b3 + ")").test(_0x1fa95d) && (_0x1fa95d = _0x1fa95d.replace(RegExp.$1, 1 == RegExp.$1.length ? _0xccd715[_0x1b02b3] : ("00" + _0xccd715[_0x1b02b3]).substr(("" + _0xccd715[_0x1b02b3]).length)));
      return _0x1fa95d;
    }
    async showmsg() {
      if (!this.notifyFlag) {
        return;
      }
      if (!this.notifyStr.length) {
        return;
      }
      var _0x149ff1 = require("./sendNotify");
      this.log("\n============== 推送 ==============");
      await _0x149ff1.sendNotify(this.name, this.notifyStr.join("\n"));
    }
    padStr(_0x2dc1a6, _0x50d059, _0x59b50b = {}) {
      let _0x115e2f = _0x59b50b.padding || "0",
        _0x3d2886 = _0x59b50b.mode || "l",
        _0x1876b0 = String(_0x2dc1a6),
        _0x1ab90c = _0x50d059 > _0x1876b0.length ? _0x50d059 - _0x1876b0.length : 0,
        _0x8022cf = "";
      for (let _0x307af0 = 0; _0x307af0 < _0x1ab90c; _0x307af0++) {
        _0x8022cf += _0x115e2f;
      }
      _0x3d2886 == "r" ? _0x1876b0 = _0x1876b0 + _0x8022cf : _0x1876b0 = _0x8022cf + _0x1876b0;
      return _0x1876b0;
    }
    json2str(_0x7f7b99, _0x578293, _0x101cea = false) {
      let _0x34d36d = [];
      for (let _0x1f10d5 of Object.keys(_0x7f7b99).sort()) {
        let _0x392c90 = _0x7f7b99[_0x1f10d5];
        if (_0x392c90 && _0x101cea) {
          _0x392c90 = encodeURIComponent(_0x392c90);
        }
        _0x34d36d.push(_0x1f10d5 + "=" + _0x392c90);
      }
      return _0x34d36d.join(_0x578293);
    }
    str2json(_0x1b855f, _0x45b346 = false) {
      let _0xe5beb8 = {};
      for (let _0x4f7486 of _0x1b855f.split("&")) {
        if (!_0x4f7486) {
          continue;
        }
        let _0xa926a2 = _0x4f7486.indexOf("=");
        if (_0xa926a2 == -1) {
          continue;
        }
        let _0x8cac47 = _0x4f7486.substr(0, _0xa926a2),
          _0x42413f = _0x4f7486.substr(_0xa926a2 + 1);
        if (_0x45b346) {
          _0x42413f = decodeURIComponent(_0x42413f);
        }
        _0xe5beb8[_0x8cac47] = _0x42413f;
      }
      return _0xe5beb8;
    }
    randomPattern(_0x1869e2, _0x3a26e7 = "abcdef0123456789") {
      let _0x3f815a = "";
      for (let _0x1ead67 of _0x1869e2) {
        if (_0x1ead67 == "x") {
          _0x3f815a += _0x3a26e7.charAt(Math.floor(Math.random() * _0x3a26e7.length));
        } else {
          _0x1ead67 == "X" ? _0x3f815a += _0x3a26e7.charAt(Math.floor(Math.random() * _0x3a26e7.length)).toUpperCase() : _0x3f815a += _0x1ead67;
        }
      }
      return _0x3f815a;
    }
    randomUuid() {
      return this.randomPattern("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
    }
    randomString(_0x542bb1, _0x12ad72 = "abcdef0123456789") {
      let _0x54afb0 = "";
      for (let _0x5d58b2 = 0; _0x5d58b2 < _0x542bb1; _0x5d58b2++) {
        _0x54afb0 += _0x12ad72.charAt(Math.floor(Math.random() * _0x12ad72.length));
      }
      return _0x54afb0;
    }
    randomList(_0x94408e) {
      if (!_0x94408e.length) {
        return null;
      }
      let _0x203238 = Math.floor(Math.random() * _0x94408e.length);
      return _0x94408e[_0x203238];
    }
    wait(_0x1c8551) {
      return new Promise(_0x1a820b => setTimeout(_0x1a820b, _0x1c8551));
    }
    async exitNow() {
      await this.showmsg();
      let _0x3411b9 = Date.now(),
        _0x2a6826 = (_0x3411b9 - this.startTime) / 1000;
      this.log("");
      const _0x41acca = {
        time: true
      };
      this.log("[" + this.name + "]运行结束，共运行了" + _0x2a6826 + "秒", _0x41acca);
      process.exit(0);
    }
    normalize_time(_0x707c42, _0x2e4486 = {}) {
      let _0xc8d206 = _0x2e4486.len || default_timestamp_len;
      _0x707c42 = _0x707c42.toString();
      let _0x67c2c0 = _0x707c42.length;
      while (_0x67c2c0 < _0xc8d206) {
        _0x707c42 += "0";
      }
      _0x67c2c0 > _0xc8d206 && (_0x707c42 = _0x707c42.slice(0, 13));
      return parseInt(_0x707c42);
    }
    async wait_until(_0x49f9ce, _0xe7cc7e = {}) {
      let _0x403f60 = _0xe7cc7e.logger || this,
        _0x3358a2 = _0xe7cc7e.interval || default_wait_interval,
        _0x25ccca = _0xe7cc7e.limit || default_wait_limit,
        _0x4a0944 = _0xe7cc7e.ahead || default_wait_ahead;
      if (typeof _0x49f9ce == "string" && _0x49f9ce.includes(":")) {
        if (_0x49f9ce.includes("-")) {
          _0x49f9ce = new Date(_0x49f9ce).getTime();
        } else {
          let _0x54d772 = this.time("yyyy-MM-dd ");
          _0x49f9ce = new Date(_0x54d772 + _0x49f9ce).getTime();
        }
      }
      let _0x477c54 = this.normalize_time(_0x49f9ce) - _0x4a0944,
        _0x4e6063 = this.time("hh:mm:ss.S", _0x477c54),
        _0x1b9655 = Date.now();
      _0x1b9655 > _0x477c54 && (_0x477c54 += 86400000);
      let _0x120e2b = _0x477c54 - _0x1b9655;
      if (_0x120e2b > _0x25ccca) {
        const _0x5d0705 = {
          time: true
        };
        _0x403f60.log("离目标时间[" + _0x4e6063 + "]大于" + _0x25ccca / 1000 + "秒,不等待", _0x5d0705);
      } else {
        const _0x222b7b = {
          time: true
        };
        _0x403f60.log("离目标时间[" + _0x4e6063 + "]还有" + _0x120e2b / 1000 + "秒,开始等待", _0x222b7b);
        while (_0x120e2b > 0) {
          let _0x3e8a65 = Math.min(_0x120e2b, _0x3358a2);
          await this.wait(_0x3e8a65);
          _0x1b9655 = Date.now();
          _0x120e2b = _0x477c54 - _0x1b9655;
        }
        const _0x5e6aed = {
          time: true
        };
        _0x403f60.log("已完成等待", _0x5e6aed);
      }
    }
    async wait_gap_interval(_0x50ce0f, _0x59fc2c) {
      let _0x2e3b2c = Date.now() - _0x50ce0f;
      _0x2e3b2c < _0x59fc2c && (await this.wait(_0x59fc2c - _0x2e3b2c));
    }
  }(_0x14860);
}