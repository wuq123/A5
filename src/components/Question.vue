<template>
    <div class="big-box-question">
        <div id="results" ref="results">
            <i class="iconfont icon-zhankai" style="margin: 5px;position:absolute;right: 1%;font-size:x-large;color: black;" @click="drawer = true">HELP</i>        
                <el-drawer v-model="drawer" title="帮助中心" :with-header="true">
                    <span>Help</span>
                    <br><br><br><br>
                    <p style="user-select: none;line-height: 30px;">本平台提供针对不同用户的课程推荐，数据来源与网络，可能出现与实际不符的情况，</p>
                </el-drawer>
            <!-- <textarea id="result" :value="resultContent" readonly placeholder="请输入想要学习的内容，一键为你推荐适当的课程" v-if="!isAlive"></textarea>/ -->
            <!-- <div>{{ question.textContent }}</div> -->
                    <el-progress type="dashboard" v-if="isPrecentage" :percentage="percentage2" :color="colors" />
            
                <el-button ref="buttonRef" v-click-outside="onClickOutside" style="position: relative;left:14%;width: 150px;">
                    <i class="iconfont icon-tuijianbaobiao"></i>课程推荐助手
                </el-button>
                <p>{{ question.dialogueId }}</p>
                <div class="help-infomation" style="display: flex" v-if="isHelp">
                    <div style="margin:auto;flex: 1;justify-content: center;align-items: center;">
                        <i class="iconfont icon-Idea" style="margin: 115px;font-size: 50px"></i>
                        <p style="text-align: center;margin-bottom: 25px;font-size: 25px;user-select: none;">example</p>
                        <el-button @click="tes()"  class="" style="z-index: 99;" text><p>我想学习与机器学习有关的课程</p></el-button>
                        <el-button @click="javates()"  class="" style="z-index: 99;margin-top: 15%;margin-left: 0" text><p>我想学习Java</p></el-button>
                        <el-button @click="pythontes()"  class="" style="z-index: 99;margin-top: 15%;margin-left: 0" text><p>我想要学习网络爬虫</p></el-button>
                    </div>
                    <div style="margin-left:100px;margin:auto">
                        <i class="iconfont icon-dianzan"></i>
                        <p style="text-align: center;margin-bottom: 25px;font-size: 25px;user-select: none;">capabilities</p>
                        <el-button   class="" style="z-index: 99;" text><p>可以为用户提供更清晰的学习线路</p></el-button>
                        <el-button   class="" style="z-index: 99;margin-top: 15%;margin-left: 40px" text><p>允许用户进行新的对话</p></el-button>
                        <el-button   class="" style="z-index: 99;margin-top: 15%;margin-left: 70px" text><p>阻止非法请求</p></el-button>
                    </div>
                    <div style="margin-left:100px;margin:auto">
                        <i class="iconfont icon-xianzhi"></i>
                        <p style="text-align: center;margin-bottom: 25px;font-size: 25px;user-select: none;">limitations</p>
                        <el-button style="z-index: 99;" text><p>可能偶尔会产生不正确的信息</p></el-button>
                        <el-button style="z-index: 99;margin-top: 15%;margin-left: 0" text><p>可能偶尔会生成错误的推荐课程</p></el-button>
                        <el-button style="z-index: 99;margin-top: 15%;margin-left: 0" text><p>可能对课程的最新网址生成存在错误</p></el-button>
                    </div>
                </div>
                
                <el-popover
                    ref="popoverRef"
                    :virtual-ref="buttonRef"
                    trigger="click"
                    
                    virtual-triggering
                >
                    <i class="iconfont icon-tuijianbaobiao" style="position:relative; margin: auto;font-size: 50px;left: 35px;user-select: none;"></i>
                    <br>
                    <el-button @click="clear()">清除聊天记录</el-button>
                    
                </el-popover>

            <div id="show" v-if="isAlive"><tree :key="isAlive" :json="treeData" style="z-index:0"></tree></div>
        </div>
        <!-- <div v-for="(item) in list" :key="item"><a :href="item.classUrl">{{ item.className }}</a></div> -->
        <div id="sendVal" ref="sendVal">
            <input id="question" type="text" name="test" v-model="questionInput" @keydown.enter="sendMsg()"  placeholder="请输入想要的学习方向，如我想学习机器学习，只需输入‘机器学习’,按住enter发送">
            <p class="p-new">内容由<a href="https://xinghuo.xfyun.cn/desk" style="font-size: smaller;margin: auto;">星火讯飞大模型</a>生成，仅供您参考</p>
        </div>
    </div>

</template>

<script setup>
import api from '@/api/login';
import tree from '@/components/tree.vue';
import * as base64 from 'base-64';
import CryptoJs from 'crypto-js';
import { computed, onUpdated, reactive, ref,unref,inject, onMounted, onUnmounted  } from 'vue';
import { ClickOutside as vClickOutside } from 'element-plus'
import Information from '@/views/Information.vue';
import { ElMessage } from 'element-plus';
import bus from '@/eventBus';

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

const drawer = ref(false)

const percentage2 = ref(0)

let isAlive = ref(true)

let isPrecentage = ref(false)

const isHelp = ref(true)

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]


const question = reactive({
    userId:"",
    dialogueId:'',
    textContent:""
})

const off = bus.on('brotherEvent',(data) => {
    question.dialogueId = data
})


question.userId = JSON.parse(window.sessionStorage.getItem("user")).userId
question.dialogueId = JSON.parse(window.sessionStorage.getItem("dialog"))


console.log(question)


const jsonObject = ref({
        "name": "Python机器学习应用",
        "url": "https://www.icourse163.org/course/BIT-1001872001?from=searchPage&outVendor=zw_mooc_pcssjg_",
        "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
        "children": [
            {
                "name": "机器学习",
                "url": "https://www.icourse163.org/course/CUG-1003556007?from=searchPage&outVendor=zw_mooc_pcssjg_",
                "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
                "children": [
                    {
                        "name": "Machine Learning",
                        "url": "https://www.udacity.com/course/machine-learning--ud262",
                        "image_url":"https://tse1-mm.cn.bing.net/th/id/OIP-C.5UwxcIBwz7gKZit6Gi92EgHaIJ?rs=1&pid=ImgDetMain",
                        "children": null
                    },
                    {
                        "name": "Python数据分析与机器学习实战",
                        "url": "https://www.udemy.com/course/meachinelearningcn/?couponCode=THANKSLEARNER24",
                        "image_url":"https://www.svgrepo.com/show/354483/udemy.svg",
                        "children": null
                    },
                    {
                        "name": "Machine learning and artificial intelligence",
                        "url": "https://cloud.google.com/learn/training/machinelearning-ai",
                        "image_url": "https://tse1-mm.cn.bing.net/th/id/OIP-C.Fll7WPtNT6jrz1oBP8GbCgHaHj?rs=1&pid=ImgDetMain",
                        "children": null
                    }
                ]
            },
            {
                "name": "Machine Learning",
                "url": "https://www.coursera.org/specializations/machine-learning",
                "image_url":"https://ts1.cn.mm.bing.net/th/id/R-C.9ea02a6061633548eb261bb03fc1ac4e?rik=Ik6hyRV9q2HDhw&riu=http%3a%2f%2fexothermic.co%2fwp-content%2fuploads%2f2017%2f06%2fCoursera-logo-1200x1148.png&ehk=Xcpj7QCWF8eKUrpWnEX2BJ97aLBFoTAVqVl8CvjcFLs%3d&risl=&pid=ImgRaw&r=0",
                "children": null
            },
            {
                "name": "Machine Learning A-Z: AI, Python & R + ChatGPT Prize [2024]",
                "url": "https://www.udemy.com/course/machinelearning/?couponCode=THANKSLEARNER24",
                "image_url":"https://www.svgrepo.com/show/354483/udemy.svg",
                "children": null
            }
        ]
})

const javaTry = ref({
                        "name": "Java程序设计",
                        "url": "https://www.icourse163.org/course/PKU-1001941004?from=searchPage&outVendor=zw_mooc_pcssjg_",
                        "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
                        "children": [
                            {
                                "name": "Java 编程：用软件解决问题",
                                "image_url":"https://ts1.cn.mm.bing.net/th/id/R-C.9ea02a6061633548eb261bb03fc1ac4e?rik=Ik6hyRV9q2HDhw&riu=http%3a%2f%2fexothermic.co%2fwp-content%2fuploads%2f2017%2f06%2fCoursera-logo-1200x1148.png&ehk=Xcpj7QCWF8eKUrpWnEX2BJ97aLBFoTAVqVl8CvjcFLs%3d&risl=&pid=ImgRaw&r=0",
                                "url": "https://www.coursera.org/learn/java-programming",
                                "children": [{
                                        "name": "來杯Java吧! 2024 Java 入門到精通課程",
                                        "image_url":"https://www.svgrepo.com/show/354483/udemy.svg",
                                        "url": "https://www.udemy.com/course/java-master-chinese/?couponCode=THANKSLEARNER24",
                                        "children": null
                                    }]
                            },
                            {
                                "name": "Java入门教程",
                                "image_url":"https://tse1-mm.cn.bing.net/th/id/OIP-C.5UwxcIBwz7gKZit6Gi92EgHaIJ?rs=1&pid=ImgDetMain",
                                "url": "https://www.udacity.com/course/java-programming-basics--ud282",
                                "children": [
                                    {
                                        "name": "Java核心技术",
                                        "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
                                        "url": "https://www.icourse163.org/course/ECNU-1002842004?from=searchPage&outVendor=zw_mooc_pcssjg_",
                                        "children": null
                                    },
                                    {
                                        "name": "核心 Java 专项课程",
                                        "image_url":"https://ts1.cn.mm.bing.net/th/id/R-C.9ea02a6061633548eb261bb03fc1ac4e?rik=Ik6hyRV9q2HDhw&riu=http%3a%2f%2fexothermic.co%2fwp-content%2fuploads%2f2017%2f06%2fCoursera-logo-1200x1148.png&ehk=Xcpj7QCWF8eKUrpWnEX2BJ97aLBFoTAVqVl8CvjcFLs%3d&risl=&pid=ImgRaw&r=0",
                                        "url": "https://www.coursera.org/specializations/core-java",
                                        "children": null
                                    }
                                ]
                            },
                            {
                                "name": "Java Web开发",
                                "url": "https://www.icourse163.org/course/YZPC-1449963190?from=searchPage&outVendor=zw_mooc_pcssjg_",
                                "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
                                "children": null
                            }
        ]
    })

const pythonTry = ref({
    "name": "Python网络爬虫",
        "url": "https://www.icourse163.org/course/BIT-1001870001?from=searchPage&outVendor=zw_mooc_pcssjg_",
        "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
        "children": [
            {
                "name": "Web Crawler Programming with Python",
                "image_url":"https://ts1.cn.mm.bing.net/th/id/R-C.9ea02a6061633548eb261bb03fc1ac4e?rik=Ik6hyRV9q2HDhw&riu=http%3a%2f%2fexothermic.co%2fwp-content%2fuploads%2f2017%2f06%2fCoursera-logo-1200x1148.png&ehk=Xcpj7QCWF8eKUrpWnEX2BJ97aLBFoTAVqVl8CvjcFLs%3d&risl=&pid=ImgRaw&r=0",
                "url": "https://www.coursera.org/learn/python-databases",
                "children": null
            },
            {
                "name": "网络爬虫技术",
                "url": "https://www.udacity.com/course/web-crawling--ud1904",
                "image_url":"https://tse1-mm.cn.bing.net/th/id/OIP-C.5UwxcIBwz7gKZit6Gi92EgHaIJ?rs=1&pid=ImgDetMain",
                "children": [
                    {
                        "name": "Python网络爬虫程序技术",
                        "url": "https://www.icourse163.org/course/ZIIT-1002925008?from=searchPage&outVendor=zw_mooc_pcssjg_",
                        "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
                        "children": null
                    },
                    {
                        "name": "Python 基礎網路爬蟲課程",
                        "url": "https://www.udemy.com/course/stark-python-crawler/?couponCode=THANKSLEARNER24",
                        "image_url":"https://www.svgrepo.com/show/354483/udemy.svg",
                        "children": null
                    },
                    {
                        "name": "高效网络爬虫设计与实现",
                        "url": "https://www.icourse163.org/course/ZJU-90000130837",
                        "image_url":"https://src.onlinedown.net/new_img/apk_logo/2015/0430/257251_1430364529_3288.png",
                        "children": null
                    }
                ]
            },
            {
                "name": "网络爬虫与数据分析",
                "image_url":"https://ts1.cn.mm.bing.net/th/id/R-C.9ea02a6061633548eb261bb03fc1ac4e?rik=Ik6hyRV9q2HDhw&riu=http%3a%2f%2fexothermic.co%2fwp-content%2fuploads%2f2017%2f06%2fCoursera-logo-1200x1148.png&ehk=Xcpj7QCWF8eKUrpWnEX2BJ97aLBFoTAVqVl8CvjcFLs%3d&risl=&pid=ImgRaw&r=0",
                "url": "https://www.coursera.org/learn/hipython",
                "children": null
            }
        ]
})

// console.log(jsonObject)

const treeData = ref([])
treeData.value = JSON.parse(JSON.parse(window.sessionStorage.getItem("jsonData")))
console.log(treeData.value)
// console.log("treeData",treeData.value)

const clear =() => {
    treeData.value = [""]
    isAlive.value = false
    isHelp.value = true
    isPrecentage.value = false
    // window.sessionStorage.setItem("data",JSON.stringify(treeData.value))
    // location.reload() 
}

let timer = null
let timerMes = null

const tes = () => {
    isAlive.value = false
    clearInterval(timerMes)
    timerMes = null
    clearInterval(timer)
    timer = null
    percentage2.value=0
    isPrecentage.value = true
    isHelp.value = false
    timer = setInterval(() => {
        if(percentage2.value<100)
          percentage2.value=(percentage2.value%100)+1;
          if(percentage2.value==100){
            isAlive.value = true
            isPrecentage.value = false
                // location.reload()      
          }
      }, 70)

    treeData.value = jsonObject
    window.sessionStorage.setItem("data",JSON.stringify(treeData.value))
}

const javates =()=>{
    isAlive.value = false
    clearInterval(timerMes)
    timerMes = null
    clearInterval(timer)
    timer = null
    percentage2.value=0
    isPrecentage.value = true
    isHelp.value = false
    timer = setInterval(() => {
        if(percentage2.value<100)
          percentage2.value=(percentage2.value%100)+1;
          if(percentage2.value==100){
            isAlive.value = true
            isPrecentage.value = false
                // location.reload()      
          }
      }, 10)

    treeData.value = javaTry.value
}

const pythontes =()=>{
    isAlive.value = false   
    clearInterval(timerMes)
    timerMes = null
    clearInterval(timer)
    timer = null
    percentage2.value=0
    isPrecentage.value = true
    isHelp.value = false
    timer = setInterval(() => {
        if(percentage2.value<100)
          percentage2.value=(percentage2.value%100)+1;
          if(percentage2.value==100){
            isAlive.value = true
            isPrecentage.value = false
                // location.reload()      
          }
      }, 60)

    treeData.value = pythonTry.value
}

const questionInput = ref('')

const result = ref(' ')

const resultContent = ref("")

onMounted(()=>{
    if(treeData.value==null){
        isAlive.value = false
    }else{
        isAlive.value = true
        isHelp.value = false
    }
})

const requestObj = reactive({
    APPID: '36125e5c',
    APISecret: 'YmEzYTI1NjZkMTAyYzFhOWQwMDM4Y2I2',
    APIKey: '71bedf1c28c757c958e3da0f9d7d3205',
    Uid: "red润",
    sparkResult: ''
})



// 发送消息
const sendMsg = async () => {    
    console.log("1")
    
    clearInterval(timer)
    timer = null
    clearInterval(timerMes)
    timerMes = null
    isAlive.value = false;
    isHelp.value = false;
    isPrecentage.value = true; 

    percentage2.value=0
    requestObj.sparkResult=" "
    question.textContent = " "
    resultContent.value = " "
    timerMes = setInterval(() => {
        if(percentage2.value<99)
          percentage2.value=(percentage2.value%100)+1;
      }, 100)
    // 获取请求地址
    let myUrl = await getWebsocketUrl(); 
    // 获取输入框中的内容
    let inputVal = questionInput.value;
    // 每次发送问题 都是一个新的websocketqingqiu
    let socket = new WebSocket(myUrl);

    // 监听websocket的各阶段事件 并做相应处理
    socket.addEventListener('open', (event) => {
        console.log('开启连接！！', event);
        // 发送消息
        let params = {
            "header": {
                "app_id": requestObj.APPID,
                "uid": "redrun"
            },
            "parameter": {
                "chat": {
                    "domain": "generalv3.5",
                    "temperature": 0.5,
                    "max_tokens": 1024,
                }
            },
            "payload": {
                "message": {
                    // 如果想获取结合上下文的回答，需要开发者每次将历史问答信息一起传给服务端，如下示例
                    // 注意：text里面的所有content内容加一起的tokens需要控制在8192以内，开发者如有较长对话需求，需要适当裁剪历史信息
                    "text": [
                        { "role": "user", "content": "请根据我给出的学习内容，在中国大学MOOC，coursera，udacity ,udemy上搜索，给出七门不同的视频课程，要求给出课程名称：《课程名称》和在线网络地址：'在线网络地址'的格式，每门课程之间要加上换行,不要出现*，回答要严谨,按照json格式返回" }, //# 用户的历史问题
                        { "role": "system", "content": "你是一名专家，熟悉所有计算机网络课程并能很好的给别人推荐课程，在给出某个课程的回答时需同时给出课程名称和课程在线网络地址，回答要严谨，请给出课程信息来源并按照json格式返回，不能捏造信息" },
                        { "role": "user", "content": "请根据我给出的学习内容，给出推荐的学习课程，在中国大学MOOC，coursera，udacity ,udemy上搜索，并按如下格式返回。 格式：1.课程名称：《xxxx》，在线网络地址：xxxx;" },
                        { "role": "user", "content": inputVal },  //# 最新的一条问题，如无需上下文，可只传最新一条问题
                    ]
                }
            }
        };
        console.log("发送消息");
        socket.send(JSON.stringify(params))
    })
    socket.addEventListener('message', (event) => {
        let data = JSON.parse(event.data)
        // console.log('收到消息！！',data);
        // requestObj.sparkResult += data.payload.choices.text[0].content
        if (data.header.code !== 0) {
            console.log("出错了", data.header.code, ":", data.header.message);
            // 出错了"手动关闭连接"
            socket.close()
        }
        if (data.header.code === 0) {
            let message =  data.payload.choices.text[0].content
            // if (message.substring(message.length - 1) == 10) {
            //     message.slice(0, -1)
            // }
            // console.log(message.substring(message.length - 4))
            requestObj.sparkResult += data.payload.choices.text[0].content;
            // 对话已经完成
            // console.log(message)
            if (data.payload.choices.text && data.header.status === 2) {
                setTimeout(() => {
                    // "对话完成，手动关闭连接"
                    socket.close()
                }, 1000)
                question.textContent = resultContent.value
                console.log(question.textContent)
                api.questionApi(question).then((res)=>{
                    console.log("res",res)
                    if(res.code==200)
                    {
                        treeData.value = res.data
                        window.sessionStorage.setItem("data",JSON.stringify(treeData.value))
                        // location.reload()    
                        isPrecentage.value = false
                        isAlive.value = true
                    }
                    else
                    {
                        isPrecentage.value = false
                        ElMessage.error("构建失败")
                    }
                })
            }
        }
        
        addMsgToTextarea(requestObj.sparkResult);
    })
    socket.addEventListener('close', (event) => {
        console.log('连接关闭！！', event);
        // 对话完成后socket会关闭，将聊天记录换行处理
        requestObj.sparkResult = requestObj.sparkResult + "&#10;"
        addMsgToTextarea(requestObj.sparkResult);
        // 清空输入框
        questionInput.value = ''
    })
    socket.addEventListener('error', (event) => {
        console.log('连接发送错误！！', event);
    })

    return {
        requestObj
    }
}
// 鉴权url地址Information.vue
const getWebsocketUrl = () => {
    return new Promise((resovle, reject) => {
        let url = "wss://spark-api.xf-yun.com/v3.5/chat";
        let host = "spark-api.xf-yun.com";
        let apiKeyName = "api_key";
        let date = new Date().toGMTString();
        let algorithm = "hmac-sha256"
        let headers = "host date request-line";
        let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v3.5/chat HTTP/1.1`;
        let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
        let signature = CryptoJs.enc.Base64.stringify(signatureSha);

        let authorizationOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;

        let authorization = base64.encode(authorizationOrigin);

        // 将空格编码
        url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`;

        resovle(url)
    })
}
/** 将信息添加到textare中
    在textarea中不支持HTML标签。
    不能使用
    标签进行换行。
    也不能使用\r\n这样的转义字符。

    要使Textarea中的内容换行，可以使用&#13;或者&#10;来进行换行。
    &#13;表示回车符；&#10;表示换行符；
*/
const addMsgToTextarea = (text) => {
    resultContent.value = text;
}


</script>

<style lang="less" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

// .introduce1{
//     width: 80%;
//     height: 50px;;
//     // margin: auto;
//     position: absolute;
//     top: 20%;
//     border: none;
//     background-color: #e5e5ef;
//     border-radius: 15px    
// }

p{
    font-weight: 200px;
    font-size: medium;
}

.introduce1:hover {
        // cursor: pointer;
        // opacity: .5;
        color: #2d30d8;
    }


.big-box-question {
    width: 1200px;
    height: 100vh;
    background-color: #fff;
    padding: 2%;
    overflow: hidden;
}


#results {
    width: 100%;
    height: 75%;
    margin-bottom: 10px;
}

#results #result {
    width: 100%;
    height: 100%;
    padding: 1%;
    line-height: 1.5;//行间距
    border: none;
    resize: none;
    outline: none;//去除选中后的边框
    // border-radius: 8px;
    background-color: #fff;
    // // white-space: pre-line;
    text-indent: 100px;
    font:bolder;
}

.help-infomation{
    width: 800px;
    height: 400px;
    position: absolute;
    margin: auto;
    left: 30%;
    top: 20%;
    z-index:3;
    i{
        margin: 115px;font-size: 50px
    }
}

.el-progress{
    position: absolute;
    left:50%;
    top:30%;
}

.el-progress--line {
  margin-bottom: 15px;
  max-width: 600px;
}

.el-progress--circle {
  margin-right: 15px;
}

#results #show{
    width: 100%;
    height: 100%;
    position: relative;
    left:30%;
    z-index: 2;
}

#results #result::-webkit-scrollbar {
    width: 0;
    height: 0;
}

#sendVal {
    display: flex;
    width: 100%;
    height: 10%;
    margin-top: 10px;
    flex-direction: column;
}

#sendVal #question {
    width: 70%;
    height: 100%;
    padding: 5%;
    background-color: #fafafa;
    border-radius: 8px;
    border: 1px solid #ababab;
    outline: none;
    position: relative;
    margin: auto;
    left:10%;
    z-index:2
}

.p-new {
    font-size: smaller; 
    color: #6a6a6a;   
    margin: auto; 
}



</style>