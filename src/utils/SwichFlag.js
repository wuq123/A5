import { ref } from 'vue'
import $ from 'jquery'
let flag = ref(true)
const SwichFlag =()=> {
    const pre_box = document.querySelector('.pre-box')
    // const img = document.querySelector('#avatar')
if(flag.value) {
    // $(".pre-box").css("transform","translateX(100%)")
    pre_box.style.transform ="translateX(100%)"
    // $(".pre-box").css("background-color","rgb(186, 213, 245)")
    pre_box.style.backgroundColor = "rgb(186, 213, 245)"
    $("img").attr("src","/src/assets/images/RC2.jpg")
    // img.src = require("@/assets/images/welcome2.jpg")

}
else {
    // $(".pre-box").css("transform","translateX(0%)")
    pre_box.style.transform ="translateX(0%)"
    // $(".pre-box").css("background-color","rgb(254, 225, 230)")
    pre_box.style.backgroundColor = "rgb(254, 225, 230)"
    $("img").attr("src","/src/assets/images/RC.jpg")
}
flag.value = !flag.value
}

export default SwichFlag