<template>
<div>
  <div v-if="start_page==true">
    <div class="container">
        <div id="title">Christmas Q25</div>
        <div class="subtitle">- 당신의 1년을 정리하는 25개의 질문 -</div>
        <div><img id="logo_1" src="../assets/01_wreath.png"></div>
        <div><button type="button" @click="introBtnOn" class="btn">소개</button></div>
        <div><button type="button" @click="gotoLogin()" class="btn" id="startBtn">시작하기</button></div>
        <router-view></router-view>
        <div id="teamname">team RUDOLF</div>
      </div>
  </div>

    <div v-if="introduction_page==true">
    <div class="container">
      <div id="title">Christmas Q25</div>
      <div class="subtitle">- 당신의 1년을 정리하는 25개의 질문 -</div>
      <div class="introductionBox">
        <p>Christmas Q25는<br>12월 1일부터 12월 25일 크리스마스까지<br>
        1년을 돌아볼 수 있는 질문들을<br>매일 하나씩 제공합니다.</p><br>
        <p>여러분들은 각 질문에 대한 답변을 작성하며<br>1년을 되돌아보고,<br>정리할 수 있을 것입니다.</p><br>
        <p>Christmas Q25가<br>1년동안의 소중했던 추억,<br>행복했던 기억,<br>고마웠던 사람을 떠올리게 하는<br>
            따뜻한 매개체가 되길 바라며</p><br>
        <p>모든 사용자분들의 행복한 연말을 기원합니다.</p><br>
        <div id="fromteam">team RUDOLF<span><img src="../assets/02_stamp.png" id="stampimg">&nbsp;올림&nbsp;&nbsp;</span></div>
      </div>
      <div><button @click="introBtnOff" type="button" class="btn" id="closeBtn">닫기</button></div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      start_page : true,
      introduction_page : false,
    }
  },
	methods: {
    		gotoLogin() {
        this.$router.push('/login');
                },
        introBtnOn() {
          this.start_page=false;
          this.introduction_page=true;
        },
        introBtnOff(){
          this.start_page=true;
          this.introduction_page=false;
        }
        },
    }
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Sorts+Mill+Goudy&display=swap');
@font-face {
    font-family: 'NanumSquareRound';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
@import url(//fonts.googleapis.com/earlyaccess/nanummyeongjo.css);

#app {
  margin-top: 20px;
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  display: flex;
  flex-direction: column;
  align-items:  center;
  /* justify-content: center; */
  background-color: #920000;
  border-radius: 5px;
  padding: 20px;
  padding-top: 70px;
  width: 360px;
  height: 640px;
}
* {
  margin: 0;
  padding: 0;
  /* box-sizing: border-box; */
}
body {
  margin: 0;
  display: flex;
  background-color: #920000;
  align-items:  center;
  justify-content: center;
}

/* 리지 */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #920000;
    width: 360px; height: 640px;
    margin: 0 auto;
}

body {
    font-family: 'NanumSquareRound';
}

#title {
    color: #FFF500;
    font-family: 'Sorts Mill Goudy', serif;
    font-size: 50px;
}

.subtitle {
    color: white;
    font-family: 'NanumSquareRound';
    font-size: 16px;
}

.btn {
    margin: 7px;
    background-color: white;
    border: none;
    border-radius: 6px;
    width: 170px; height: 42px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    font-family: 'NanumSquareRound';
}

#teamname {
  color: rgba(255, 255, 255, 0.666);
  font-size: 16px;
  font-weight: 700;
  /* teamname을 맨 아래 고정시키는건 위에 있는 요소에 margin bottom 해서 하기. teamname에 마진탑 주면 로그인페이지에서 teamname이 아래로 밀림 */
}

/* 가입전 시작 view css */
a {
  text-decoration: none;
}

#startBtn {
  margin-top: 23px;
  margin-bottom: 33px;
}

#logo_1 {
    width: 202px;
    height: 202px;
    /* padding: 60px; */
    display: block;
    margin: 0 auto;
    margin-top: 57px;
    margin-bottom: 56px;
}

/* 소개view css */
.introductionBox {
    padding: 15px 15px 25px 15px;
    border-radius: 5px;
    background-color: #F4E7B6;
    width: 305px;

    margin: 30px;
    margin-bottom: 10px;
    font-family: 'NanumSquareRound';
    font-weight: bold;
}

#fromteam {
  display: flex;
  float: right;
}

#stampimg {
  width: 53px;
  position: absolute;
}
</style>