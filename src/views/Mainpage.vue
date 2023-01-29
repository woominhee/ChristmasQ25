<template>
<div>

<!-- 엘 : 회원별 박스 view -->
  <div v-if="ooops==true" id="ooopsBox_bg">
    <div id="ooopsBox">
      <div>
        <div>Ooops!</div>
        <div>
          <div class="ooops_line"></div>
          <div>
            아직 질문이 오픈되지 않았어요!
            <br>
            질문은 당일 자정에 오픈됩니다.
            <br>
            조금만 기다려주세요:)
          </div>
          <div>
            <img src="@/assets/13_oops.png" alt="">
          </div>
          <div class="ooops_line"></div>
        </div>
        <button @click="ooops_close">확인</button>
      </div>
    </div>
  </div>
  <div v-if="Q_list_page==true" id="Q_list_page">
    <div class="title">
      <div id="cheerup-memo">매일 잊지말고 작성해서 소중한 추억을 선물받아가세요:)</div>
      <img id="setting" src="../assets/09_setting.png" alt="설정" @click="togo_setting_page">
      <div><span class="userName">{{ userInfo.nickName }}</span>'s</div>
      <div>Christmas Q25</div>
      
      <div id="title_line"></div>
      <p id="ment-1">당신의 1년을 정리하는 25개의 질문</p>
      <p> 선물상자는 당일 자정에 오픈됩니다 :) </p>
    </div>

    <div id="allBox">
      <div v-for="i in 25" :key="i" @click="open_question" style="position : relative">
        <img v-if="i<10" :src="require(`@/assets/06_gift0${i}.png`)" alt="image" id='giftbox' >
        <img v-else :src="require(`@/assets/06_gift${i}.png`)" alt="image" id='giftbox' >
        {{i}}
        <div style="position:absolute;">
          <img v-if="userInfo.question[i-1].answerY_N" src="../assets/03_gift_opened_sticker.png" style="width:50px" class="stamp_sticker">
        </div>
      </div>
    </div>
    <button id="answer_group" @click="togo_answerGrouping_page">답변 모아보기</button>
  </div>

<!-- 엘 : 답변없는 상자 클릭시 보여지는 로딩화면 -->
  <div v-if="loading_page==true" id="loading_page">
    <div class="title">
      <div><span class="userName">{{ userInfo.nickName }}</span>'s</div>
      <div>Christmas Q25</div>
      <div id="title_line"></div>
      <p>당신의 1년을 정리하는 25개의 질문</p>
    </div>
    <transition appear name="fade">
      <img v-if="dayNum<10" :src="require(`@/assets/11_day_op0${dayNum}.png`)" alt="image" id='dayImg'/>
      <img v-else :src="require(`@/assets/11_day_op${dayNum}.png`)" alt="image" id='dayImg'/>
    </transition>
    <div id="day_text">Day {{dayNum}} </div>
  </div>

<!-- 리지 : 답변 모아보기 view -->
  <div v-if="Q_gather_page==true">
      <button @click="togo_Qlist_page" id="backBtn">&lt;</button>
      <br><br>
      <div class="title">
          <div><span class="userName">{{ nickName }}</span>'s</div>
          <div>Christmas Q25</div>
          <p>- 당신의 1년을 정리하는 25개의 질문 -</p>
          <div id="title_line"></div>
      </div>

    <div id="contentsBox">
      <div v-for="item in question" :key="item.id">
        <div @click.stop="goto_QnApage" class="questionBox">
          <div class="questionBox_line">
            <div class="questions">
            <span id="Q_inquestion">Q{{ item.qNum }}. &nbsp;</span>
            <span>{{ item.qnacontent }}</span><br><br>
            <span id="Q_inquestion">A. &nbsp;</span>
            <span>{{ item.answer }}</span>
            <img src="../assets/02_stamp.png" id="stampimg2">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- 자몽: 질문 답변하기 디자인 view -->
  <div v-if="qna_answer_page==true">

<div class ="qna_requset_header">
<i class="material-icons" @click="answerToQlist">keyboard_arrow_left</i>
<span class="request_day_number">day {{dayNum}}</span>
</div>

<div class="qna_answer_header_hr">
<hr>
</div>

<div class="request_img_icon">
  <img v-if="dayNum<10" :src="require(`@/assets/08_question_pic0${dayNum}.png`)" alt="">
  <img v-else :src="require(`@/assets/08_question_pic${dayNum}.png`)" alt="">
</div>

<div class="request_question">
  <span class = "question_number">Q {{dayNum}}</span>
  <span class = "question_contents">{{q}}</span>
</div>

<!--답변창 180글자까지만 작성 가능  -->
<form id= "request_textarea" action="" method="POST">
<textarea v-model="a" cols="40" rows="10"  placeholder="행복했던 순간을 떠올려보세요:)" maxlength="180" id="answer"> </textarea>
<br/>
<!-- length에러나면 아래 주석처리하기 -->
<!-- <span id="counter" v-if='a'>({{a.length}}자 / 최대 180자)</span> -->
</form>

<div id="jm_button">
<button class="jm_finish-btn2" @click="submit">완료</button>
</div>
  </div>

  <!-- 미니 : 비번변경 view -->
  <div v-if="changePw_page==true" id="changePw_page">
    <div class="modal">
      <div class="modal_background" v-if="newpwOpen == true">
        <div class="modal_box">
          <h4>비밀번호 형식을 확인해주세요</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background check-oldpw" v-if="oldpwOpen == true">
        <div class="modal_box">
          <h4>기존 비밀번호가<br>일치하지 않습니다</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background" v-if="changepwOpen == true">
        <div class="modal_box">
          <h4>비밀번호가 변경되었습니다</h4>
          <button @click="check_finish">확인</button>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="wrap1">
        <i class="material-icons" @click="togo_Qlist_page">keyboard_arrow_left</i>
      </div>
      <div id="wrap2">
        <h3>Change</h3>
        <img id="changePw_img" src="../assets/04_key.png" alt="비번변경">
        <ul>
          <li>
            <div class="label-box">
              <span>기존의 비밀번호를 입력해주세요!</span>
            </div>
            <div class="input-box">
              <input type="password" class="inputText" v-model="old_pw" placeholder="기존 비밀번호를 입력해주세요!">
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>새 비밀번호를 입력해주세요!</span>
            </div>
            <div class="input-box newPw-input">
              <input type="password" class="inputText" v-model="new_pw" placeholder="새 비밀번호를 입력해주세요!" @change="chkInput_new">
              <p :class="[chknewPw === false ? 'unchk' : 'chk']">*영문/숫자 포함 6자 이상</p>
            </div>
          </li>
        </ul>
        <p>confirm</p>
        <img id="stamp_img" src="../assets/02_stamp.png" alt="스탬프">
      </div>
      <div id="wrap3">
        <button class="finish-btn" @click="changepw_submit">완료</button>
      </div>
    </div>
  </div>

  <!-- 미니 : 회원탈퇴 view -->
  <div v-if="goodbye_page==true" id="goodbye_page">
    <div class="modal">
      <div class="modal_background" v-if="byeemailOpen == true">
        <div class="modal_box">
          <h4>이메일이 일치하지 않습니다</h4>
          <button @click="check">확인</button>
        </div>
      </div>
      <div class="modal_background" v-if="byepwOpen == true">
        <div class="modal_box">
          <h4>잘못된 비밀번호입니다</h4>
          <button @click="check">확인</button>
        </div>
      </div>
    </div>
    <div class="content">
      <div id="wrap1">
        <i class="material-icons" @click="togo_Qlist_page">keyboard_arrow_left</i>
      </div>
      <div id="wrap2">
        <h3>Bye, Bye</h3>
        <img id="goodbye_img" src="../assets/10_goodbye.png" alt="회원탈퇴">
        <ul>
          <li>
            <div class="label-box">
              <span>이메일을 입력해주세요!</span>
            </div>
            <div class="input-box">
              <input type="email" class="inputText" v-model="bye_email" placeholder="이메일을 입력해주세요!">
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>비밀번호를 입력해주세요!</span>
            </div>
            <div class="input-box">
              <input type="password" class="inputText" v-model="bye_pw" placeholder="비밀번호를 입력해주세요!">
            </div>
          </li>
          <li>
            <div class="label-box">
              <span>비밀번호를 다시 한 번 입력해주세요!</span>
            </div>
            <div class="input-box repw-input">
              <input type="password" class="inputText" v-model="bye_repw" placeholder="비밀번호를 입력해주세요!" @change="chkRePw">
              <img src="../assets/05_check.png" alt="중복확인" v-if="RePw == true">
            </div>
          </li>
        </ul>
        <p>confirm</p>
        <img id="stamp_img" src="../assets/02_stamp.png" alt="스탬프">
      </div>
      <div id="wrap3">
        <button class="finish-btn" @click="bye_submit">완료</button>
      </div>
    </div>
  </div>
  <div v-if="goodbye_finish_page==true" id="goodbye_finish_page">
    <div class="title">Christmas Q25</div>
    <div class="subtitle">- 당신의 1년을 정리하는 25개의 질문 -</div>
    <img src="../assets/01_wreath.png">
    <span>탈퇴가 완료되었습니다<br>이용해주셔서 감사했어요 :)<br>행복한 연말 보내세요!</span>
    <button class="togo_home" @click="togo_home">홈으로</button>
    <div class="teamname">team RUDOLF</div>
  </div>

  <!-- 미니 : 설정 view -->
  <div v-if="setting_page==true" id="setting_page">
    <div class="modal">
      <div class="modal_background">
        <div class="modal_box">
          <h4 class="logout-btn" @click="logout_">로그아웃</h4>
          <h4 class="changepw-btn" @click="togo_changePw_page">비밀번호 변경</h4>
          <h4 class="goodbye-btn" @click="togo_goodbye_page">회원 탈퇴</h4>
          <h4 class="imgcredit-btn" @click="togo_imgCredit_page">이미지 크레딧 보기</h4>
          <button @click="check">닫기</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 미니 : 이미지 크레딧 보기 -->
  <div v-if="imgCredit_page==true" id="imgCredit_page">
    <div class="content">
      <div id="wrap1">
        <i class="material-icons" @click="togo_Qlist_page">keyboard_arrow_left</i>
      </div>
      <div id="wrap2">
        <h3>Image Credit</h3>
        <p class="subtitle">해당 사이트에 사용된 모든 이미지들은 flaticon<br>( https://www.flaticon.com/ )에서<br>가져온 이미지들임을 밝힙니다.</p>
        <div class="icon-link">
          <a href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">Christmas icons created by justicon - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <div> Icons made by <a href="https://www.flaticon.com/authors/maxim-basinski-premium" title="Maxim Basinski Premium"> Maxim Basinski Premium </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a></div>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Pixel Buddha - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Octopocto - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by monkik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Nikita Golubev - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift-card" title="gift card icons">Gift card icons created by juicy_fish - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Indielogy - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by surang - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Luvdat - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift-box" title="gift box icons">Gift box icons created by Luvdat - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/present" title="present icons">Present icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/present" title="present icons">Present icons created by QudaDesign - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift-box" title="gift box icons">Gift box icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift-box" title="gift box icons">Gift box icons created by DinosoftLabs - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Luvdat - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by smashingstocks - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by dhtgicon - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gift" title="gift icons">Gift icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">Christmas icons created by justicon - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/download" title="download icons">Download icons created by Uniconlabs - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/emotions" title="emotions stickers">Emotions stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/student" title="student stickers">Student stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/people" title="people stickers">People stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/statue-of-liberty" title="statue of liberty stickers">Statue of liberty stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/holidays" title="holidays stickers">Holidays stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/emotions" title="emotions stickers">Emotions stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/family" title="family stickers">Family stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/wow" title="wow stickers">Wow stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/music" title="music stickers">Music stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/birthday-and-party" title="birthday and party stickers">Birthday and party stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/activity" title="activity stickers">Activity stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/send" title="send stickers">Send stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/mental-health" title="mental health stickers">Mental health stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/people" title="people stickers">People stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/work" title="work stickers">Work stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/emotions" title="emotions stickers">Emotions stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/computer" title="computer stickers">Computer stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/emotions" title="emotions stickers">Emotions stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/yoga" title="yoga stickers">Yoga stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/cash" title="cash stickers">Cash stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/emotions" title="emotions stickers">Emotions stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/clock" title="clock stickers">Clock stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/sad" title="sad stickers">Sad stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/emotions" title="emotions stickers">Emotions stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-stickers/photography" title="photography stickers">Photography stickers created by Stickers - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/settings" title="settings icons">Settings icons created by Pixel perfect - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/wine-glasses" title="wine-glasses icons">Wine-glasses icons created by pojok d - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/crystal-ball" title="crystal ball icons">Crystal ball icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic-wand" title="magic wand icons">Magic wand icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/spark" title="spark icons">Spark icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by smalllikeart - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/gem" title="gem icons">Gem icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/tarot" title="tarot icons">Tarot icons created by Smashicons - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/spellbook" title="spellbook icons">Spellbook icons created by Ina Mella - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/potion" title="potion icons">Potion icons created by Ina Mella - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/open-book" title="open book icons">Open book icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by fjstudio - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/wand" title="wand icons">Wand icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Flat Icons - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/crystal-ball" title="crystal ball icons">Crystal ball icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/realism" title="realism icons">Realism icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/magic" title="magic icons">Magic icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/wizard" title="wizard icons">Wizard icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/crystal" title="crystal icons">Crystal icons created by Freepik - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">Christmas icons created by justicon - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/christmas" title="christmas icons">Christmas icons created by iconixar - Flaticon</a>
        </div>
        <p class="confirm">confirm</p>
        <img id="stamp_img" src="../assets/02_stamp.png" alt="스탬프" v-if="pwformOpen == false && pwOpen == false && emailOpen == false && nickOpen == false">
      </div>
    </div>

  </div>

 </div>
</template>

<script>
/* eslint-disable */
import question_25 from '../assets/question_25.js';
import { mapState } from 'vuex'
import axios from 'axios'
import data from '../assets/test_data1.js';
// import data2 from '../assets/test_data2.js';
import { changePw } from '../api/changepw';
import question from '../assets/test_data1.js';
// import { config } from 'vue/types/umd';
import { withdraw } from '../api/withdraw';
import { logout } from '../api/index.js';


export default {
    name: 'mainpage',
    // data : () => ({
    //   boxImg : ''
    // }),
    computed: {
        ...mapState(['userInfo', 'token', 'stampNumList', 'config'])
    },
    data() {
        return{
            질문상자들 : data,
            // day이미지 : data2,
            ooops : false,
            Q_list_page : true,
            Q_gather_page : false,
            loading_page : false,

            // nickName1 : 'abcd',
            opened : 1,
            answerY_N:0,
            dayNum : 1,
            dayImg : 0,
            showStamp:false,
      
            q : '',
            a : '',
            start_page : true,
            introduction_page : false,
            pw_find_page : false,
            signUp_page : false,
            complete_page : false,
            login_page : false,
            goodbye_page : false,
            goodbye_finish_page : false,
            changePw_page : false,
            setting_page : false,
            imgCredit_page : false,
            qna_answer_page:false,
            qna_answer:[],
            question_25_content:question_25,
            gift_select:0,

            email : '',
            nickName : '',
            질문데이터 : '부여된 랜덤 질문 리스트 데이터',
            ClickButton : false,
            nickOpen: false,
            password: '',
            pwOpen: false,
            chkPw: true,
            chkNum: /[0-9]/,
            chkEng: /[a-zA-Z]/,
            chkEmailForm: /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            chkEmail: false,
            emailOpen: false,
            pwformOpen: false,
            RePw: false,
            bye_email: '',
            bye_pw:'',
            bye_repw:'',
            byeemailOpen: false,
            byepwOpen: false,
            old_pw: '',
            new_pw: '',
            newpwOpen: false,
            oldpwOpen: false,
            changepwOpen: false,
            emailformOpen: false,
            chknewPw: true,


        }
    },
    methods: {

    logout_(){
        axios
        .delete('http://christmas-q25.site/api/members/logout', {data: {userIdx : this.userInfo.userIdx}})
        .then(response => {
          // handle success
          console.log(response);
          this.$router.push({name: 'home'})
          this.$store.commit('logout')
    })
      },
    goto_QnApage(event) {

      this.Q_gather_page=false;
      this.qna_answer_page=true;

      if (isNaN(event.currentTarget.innerText[2])){
        // console.log('true : 숫자가 아님')
        this.dayNum = event.currentTarget.innerText[1];
      }
      else{
        // console.log('false : 숫자임')
        this.dayNum = event.currentTarget.innerText.substring(1,3);
      }
      // this.dayNum = event.currentTarget.innerText[1];
      // console.log('그냥 타겟 : '+event.target)
      // console.log('그냥 타겟(이너텍스트) : '+event.target.innerText)
      // console.log('현재 타겟 : '+event.currentTarget)
      // console.log('현재 타겟(이너텍스트) : '+event.currentTarget.innerText)
      console.log('dayNum : '+this.dayNum)

      let config2 = {
              headers : {
                'access-token': this.token
              }, 
              params: { 
                userIdx : this.userInfo.userIdx,
                qNum : parseInt(this.dayNum) 
              }
            }
            axios
            .get('https://christmas-q25.site/api/api/members/qnapage', config2)
            .then(res => {
              this.q= res.data.result.qnacontent
              this.a= res.data.result.answer
            })
            .catch(err => {
             console.log(err);
            })

    },
    togo_answerGrouping_page(){
      axios
      .get('https://christmas-q25.site/api/api/members/question/collection',{params: {userIdx : this.userInfo.userIdx}})
      .then(res => {
        this.nickName = res.data.result.nickName
        this.question = res.data.result.question
        this.qNum = res.data.result.question.qNum
        this.qnacontent = res.data.result.question.qnacontent
        this.answer = res.data.result.question.answer
        console.log(res);
        this.Q_list_page=false;
        this.Q_gather_page=true;
      })
      .catch(err => {
        console.log(err);
      })

    },
    togo_Qlist_page(){
      this.Q_list_page=true;
      this.Q_gather_page=false;
      this.changePw_page = false;
      this.goodbye_page = false;
      this.imgCredit_page = false;
    },
    introBtnOn() {
      this.start_page=false;
      this.introduction_page=true;
    },
    introBtnOff(){
      this.start_page=true;
      this.introduction_page=false;
    },
    signUpBtnOn(){
      this.login_page=false;
      this.signUp_page=true;
    },
    // 닫기버튼이 아직 없어서 적용못함
    signUpBtnOff(){
      this.signUp_page=false;
    },
    pwBtnOn(){
      this.login_page=false;
      this.pw_find_page=true;
      this.Q_list_page = false;
    },
    togo_login_page(){
      this.start_page=false;
      this.login_page=true;
      this.signUp_page = false;
    },
    togo_home(){
      this.$router.push({name: 'home'});
      this.$store.commit('logout');
      this.goodbye_finish_page = false;
    },
    togo_changePw_page(){
      this.Q_list_page = false;
      this.setting_page = false;
      this.changePw_page = true;
      this.goodbye_page = false;
      this.imgCredit_page = false;
    },
    togo_goodbye_page(){
      this.Q_list_page = false;
      this.setting_page = false;
      this.changePw_page = false;
      this.goodbye_page = true;
      this.imgCredit_page = false;
    },
    togo_setting_page(){
      this.Q_list_page = true;
      this.setting_page = true;
      this.changePw_page = false;
      this.goodbye_page = false;
      this.imgCredit_page = false;
    },
    togo_imgCredit_page(){
      this.Q_list_page = false;
      this.setting_page = false;
      this.imgCredit_page = true;
      this.changePw_page = false;
      this.goodbye_page = false;
    },

    home_button(){
      this.pw_find_page=false;
      this.login_page=true;
    },
    answerToQlist(){
      this.Q_list_page=true;
      this.qna_answer_page=false;
    },

    // 이 아래 랜덤큐 함수 사용되는 곳이 없는데 지워도 상관없으면 카톡방에 말씀부탁드려요! 
    // 다들 말씀해주시면 지울게요! -엘-
    random_Q(){
      console.log(this.nickName)
    },


    async bye_submit(){
      const withdrawData = {
        email: this.bye_email,
        password: this.bye_pw
      }
      const { data } = await withdraw(withdrawData);
      console.log(data);
      if(/* this.bye_email !== this.email || */ this.bye_email == ''){
        this.byeemailOpen = true;
        this.byepwOpen = false;
      }
      else if(/* this.bye_pw !== this.password || */ this.bye_pw == ''){
        this.byepwOpen = true;
      }
      else if(this.bye_email !== '' && this.bye_pw !== '' && this.bye_repw !== '' && this.RePw == true){
        this.goodbye_page = false;
        this.goodbye_finish_page = true;
        this.initForm();

        //탈퇴시 세션스토리지에 있는 token, useridx도 삭제
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('userIdx')

      }
    },
    async changepw_submit(){
      
      //new_pw 조건 함수 실행
      this.chkInput_new(this.new_pw)

      //조건(영어,숫자포함 & 6자리 이상) 
      //맞으면 -> 기존비번 일치여부 확인 -> 일치 : 성공 / 불일치 : 기존비번 확인 모달창
      //안맞으면 -> 형식 확인 모달창
      if(this.chknewPw==true){

        const pwData = {
          userIdx: this.userInfo.userIdx,
          old_pw: this.old_pw,
          new_pw: this.new_pw
        }
        const { data } = await changePw(pwData);
        console.log('기존비밀번호 일치 확인 : '+ data.message);
        
        //기존 비번일치여부 확인하기
        if(data.code ==1000){
          this.changepwOpen=true;
          this.initForm();
        }else {
          this.oldpwOpen=true;
        }
        
      }else{
        this.newpwOpen = true;
      }
    },
    initForm() {
      this.old_pw = '';
      this.new_pw = '';
      this.bye_email = '';
      this.bye_pw = '';
      this.bye_repw = '';
    },
    check(){
      this.nickOpen = false;
      this.pwOpen = false;
      this.emailOpen = false;
      this.pwformOpen = false;
      this.emailformOpen = false;
      this.byeemailOpen = false;
      this.byepwOpen = false;
      this.oldpwOpen = false;
      this.newpwOpen = false;
      this.setting_page = false;
      this.changepwOpen = false;
    },
    check_finish(){
      this.changepwOpen = false;
      this.changePw_page = false;
      this.Q_list_page = true;
    },
    chkInput(){
      if (this.password.length < 6){
        this.chkPw = false;
      }
      if(!this.chkNum.test(this.password)){
        this.chkPw = false;
      }
      if(!this.chkEng.test(this.password)){
        this.chkPw = false;
      }
      if(this.password.length > 5 && this.chkNum.test(this.password) && this.chkEng.test(this.password))
        this.chkPw = true;
    },
    chkInput_new(){
      if (this.new_pw.length < 6){
        this.chknewPw = false;
      }
      if(!this.chkNum.test(this.new_pw)){
        this.chknewPw = false;
      }
      if(!this.chkEng.test(this.new_pw)){
        this.chknewPw = false;
      }
      if(this.new_pw.length > 5 && this.chkNum.test(this.new_pw) && this.chkEng.test(this.new_pw))
        this.chknewPw = true;
    },
    chkOverlap(){
      this.chkEmail = true;
    },
    chkRePw(){
      if(this.bye_pw == this.bye_repw){
        this.RePw = true;
      }
      else{
        this.RePw = false;
      }
    },
    open_question(event) {
      if(event.target.classList.contains('stamp_sticker')){
         // console.log('포함되어있음')
         
         this.dayNum = parseInt(event.target.parentNode.previousSibling.data);
         console.log(this.dayNum)
       }
       else{
         // console.log('없음')
         this.dayNum = parseInt(event.target.nextSibling.data);
         console.log(this.dayNum)
       }
      //  axios
      //  .get('https://christmas-q25.site/api/api/members/question',this.config)
      //  .then(res=> {
      //    console.log('다시 받아온 opend값:'+res.data.result.question[this.dayNum-1].opened)
      //  })
      this.opened = this.userInfo.question[this.dayNum-1].opened;
      this.answerY_N = this.userInfo.question[this.dayNum-1].answerY_N; 
      // this.getBoxInfo()
      console.log("처음 데이터베이스 상 opened:" + this.opened, 'answerY_N:'+this.answerY_N)

      //답변 입력 페이지 -> qNum 전달 > 질문, 답변 받아오기
      let config2 = {
              headers : {
                'access-token': this.token
              }, 
              params: { 
                userIdx : this.userInfo.userIdx,
                qNum : parseInt(this.dayNum) 
              }
            }
            axios
            .get('https://christmas-q25.site/api/api/members/qnapage', config2)
            .then(res => {
              if(res.data.message == '성공'){
                console.log(res.data.message)
                this.q= res.data.result.qnacontent
                this.a= res.data.result.answer
                axios
                .get('https://christmas-q25.site/api/api/members/question',this.config)
                .then(res=> {
                  console.log('qNum 전달 후 다시 받아온 opend값:'+res.data.result.question[this.dayNum-1].opened)
                  this.opened = res.data.result.question[this.dayNum-1].opened
                  if(this.answerY_N==0){
                    setTimeout(function(){
                    this.qna_answer_page=true;
                    this.loading_page=false;
                    }.bind(this),2000)
                    this.loading_page=true;
                    this.Q_list_page=false;
                  }
                  else if(this.answerY_N==1){
                    this.qna_answer_page=true;
                    this.Q_list_page=false;
                  }
                })
              }
              else if(res.data.message == '아직 오픈 시간이 되지 않았습니다.'){
                console.log(res.data.message)
                this.ooops=true;
              }
              })
              


              
            // })
            .catch(err => {
             console.log(err);
            })

        

      // };
    },
    // getBoxInfo(){
    //   axios
    //    .get('https://christmas-q25.site/api/api/members/question',this.config)
    //    .then(res=> {
    //      console.log('다시 받아온 opend값:'+res.data.result.question[this.dayNum-1].opened)
    //      this.opened = res.data.result.question[this.dayNum-1].opened
    //      console.log(this.opened)
         
    //    })
    // },
    togo_setting_page() {
      this.setting_page=true;
    },
    togo_write_answer() {
      this.qna_answer_page=true;
      this.Q_list_page=false;
    },
    ooops_close(){
      this.ooops=false;
      this.Q_list_page=true;
    },
    submit() {
      axios
      .patch('https://christmas-q25.site/api/api/members/useranswer',{
          answer : this.a,
          userIdx : this.userInfo.userIdx,
          qNum : this.dayNum
      })
      .then(res => {this.answerY_N = res.data.result.answerY_N;})
      axios
      .get('https://christmas-q25.site/api/api/members/question', this.config)
      .then(res => {this.userInfo.question = res.data.result.question;})
      
      this.Q_list_page=true;
      this.qna_answer_page=false;
    }

    }
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

/* 엘 */
#answer {
  padding: 15px;
  font-size: 16px;
}

/* .stamp_sticker {
  width: 100px;
  height: 100px;
  background-image: url('../assets/02_stamp.png');
  background-size: cover;
  position: fixed;
} */
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#Q_list_page #setting{
  position: absolute;
  width: 24px;
  top: 25px;
  right: 30px;
  cursor:pointer;
}
#day_text {
  font-size: 50px;
  color: white;
  margin-top: 30px;
}
#dayImg{
  width: 200px;
  height: 200px;
}
/* #dayImg-enter{
  width: 200px;
  height: 200px;
  opacity: 0;
}
#dayImg-active{
  transition: opacity 2s ease-in;
}
#dayImg-leave-active{
  transition: opacity 2s ease-out;
} */
#ooopsBox_bg {
  /* 배경블러처리 블랙, 화이트 고민 */
  background-color: #00000091;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0px;
  top: 0;
  /* position: absolute; */
  /* position: relative; */
  z-index: 1;
}
#ooopsBox {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: khaki; */
  display: flex;
  align-items: center;
  justify-content: center;
}
#ooopsBox > div {
  width: 224px;
  height: 250px;
  background-color: #F4E7B6;
  /* position: fixed; */
  position: absolute;
  border-radius: 6px;
  padding: 20px;

}
#ooopsBox > div > div:nth-child(1) {
  font-size: 21px;
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 700;
}
#ooopsBox > div > div > div:nth-child(3) >img {
  width: 70px;
  margin-top: 10px;
}
#ooopsBox > div > div > div:nth-child(2) {
  font-size: 13px;
  font-family: 'NanumSquareRound';
  font-weight: 500;
}
.ooops_line {
  width: 200px;
  height: 0.3px;
  background-color: rgba(0, 0, 0, 0.548);
  margin: 13px;
}
#ooopsBox > div > button {
  width: 70px;
  height: 30px;
  color:  #F4E7B6;
  background-color: #920000;
  border: none;
  border-radius: 3px;
  font-size: 13px;
  font-weight: 500;
  /* margin-top: 10px; */
  cursor: pointer;
}
#Q_list_page {
  z-index: 0;
  overflow: scroll;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.title {
  font-family: 'Sorts Mill Goudy', serif;
  color: #FFF500;
  font-size: 30px;
  font-weight: 600;
  /* position: fixed; */
  top: 80px;
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  /* padding: 0px 60px 20px 60px; */
  /* background-color: #920000; */
}
#cheerup-memo {
  font-size: 13px; 
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  color: #ffffffc1;
  background-color: #920000;
  padding: 5px 5px;
  border-radius: 15px;
  line-height: 13px;
  margin-bottom: 10px;
  margin-top: 10px;
  box-shadow: inset 2px 2px 10px rgba(255, 255, 255, 0.242);
}
#ment-1 {
  color: rgba(255, 255, 255, 0.742);
  font-size: 13px;
  margin-bottom: 5px;
}
.title > #title_line { 
  height: 1px;
  width: 330px;
  background-color: rgba(255, 255, 255, 0.646);
  border-radius: 1px;
  margin: 34px 0 30px 0;

}
.title > p {
  font-family: 'NanumSquareRound';
  color: white;
  font-size: 16px;
  font-weight: normal;
}
.title > p:nth-child(5){
  color: rgba(255, 255, 255, 0.742);
  font-size: 13px;
  margin-top: 5px;
}
#allBox {
  height: 400px;
  width: 350px;
  display: flex;
  overflow: scroll;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #9b1010;
  border-radius: 10px;
  padding-bottom: 20px;

}
#allBox > div {
  font-family: 'OFL Sorts Mill Goudy TT';
  font-size: 21px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: 15px;
  color: white;
  cursor: pointer;
}
#giftbox {
  width: 73px;
  height: 73px;
  margin: 16px 0 5px 0;
  line-height: 100px;

}
#giftbox_25{
  width: 100px;
  height: 100px;
  margin-top: 36px;
}
#answer_group {
  width: 120px;
  height: 40px;
  margin: 15px;
  font-weight: bold;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: white;
  color: rgb(16, 16, 16);
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

/* 답변 모아보기view css */
#contentsBox {
  width: 360px;
  height: 440px;
  overflow: auto;
  
}

#backBtn {
  background-color: #920000;
  color: white;
  border: none;
  font-family: 'NanumSquareRound';
  font-size: 43px;
  font-weight: bold;
  cursor: pointer;
  float: left;
  display: block;
  line-height: 60%;
}

.questionBox {
  cursor: pointer;
  width: 300px;
  height: auto;
  background-color: #F4E7B6;
  border-radius: 5px;
  font-family: 'NanumSquareRound';
  font-size: 14px;
  padding: 5px;
  display: inline-block;
  text-align: justify;
  margin: 5px;
}

.questionBox_line {
  width: 290px;
  height: auto;
  border: 3px solid #920000;
  border-radius: 10px;
  background-color: #F4E7B6;
  margin: 2px;
  position: fixed;
  position: sticky;
}

.questions {
  margin: 15px;
  font-weight: bold;
}

#Q_inquestion {
  color: #920000;
  font-family: 'Sorts Mill Goudy', serif;
}

#stampimg2 {
  width: 50px;
  float: right;
  /* bottom: 20px; */
}

::-webkit-scrollbar {
display: none;
}

#downloadIcon {
  width: 25px;
  height: 25px;
  margin: 20px 30px 30px 30px;
  cursor: pointer;
  float: right;
}


/* 자몽 - 질문 답변하기 css */

.qna_requset_header{
  display: flex;
  align-content: center;
  justify-content:space-evenly;
  padding-right:145px;
}

.qna_requset_header .material-icons {
  color: #fff;
  font-size: 42px;
  font-weight: 800;
}
.qna_answer_header_hr hr {
  background-color: rgb(215, 213, 213);
  border: 0;
  height: 0.8px;
  margin-top: 10px;
  width:120px;
  margin-left : auto;
  margin-right : auto;
}

.qna_requset_header .request_day_number{
  padding-left:90px;

}

.request_img_icon img{
  width: 170px;
  height: 170px;
  padding-top: 20px;
}

.request_day_number {
  font-size: 30px;
  color: #FFFFFF;
  font-family: "NanumSquareRound";
  font-weight: 800
}

.question_number{
  padding: 6px;
}

.question_contents{
  margin-left : auto;
  margin-right : auto;
  }
.request_question{
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
  font-weight: bold;
  font-size: 18px;
}

textarea:focus {outline: none;}
textarea::placeholder {
	color: #ccc;
  padding: 20px 5px;
}

#request_textarea{
  margin-top: 30px;
}

#request_textarea textarea{
  width:270px;
  height: 160px;
  border-radius: 2%;
  border: none;
  resize: none;
}
#request_textarea #counter{
color:rgb(153, 151, 151);
font-size: 11px;
padding-left:180px;
}

.jm_finish-btn2{
  font-family: "NanumSquareRound";
  font-size: 16px;
  font-weight: 800;
  background: #fff;
  border: none;
  border-radius: 6px;
  width: 120px;
  height: 42px;
  margin-top: 40px;
  cursor: pointer;
}

.requset_share{
  font-family: "NanumSquareRound";
  display: flex;
  justify-content: center;
  color: #fff;
  padding:3px 0px 0px 130px ;

}
.requset_share img{
  width: 20px;
  height:20px;
  padding-left: 15px;
}

/* 미니 */
@import "https://fonts.googleapis.com/icon?family=Material+Icons";
ul, li {list-style: none;}
span {vertical-align: baseline;}

.modal {
  position: relative;
  z-index: 2;
}
.content {
  position: relative;
  z-index: 1;
}

.modal_background {
  width:100%;
  height: 100%;
  background: #00000091;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
#setting_page .modal_background {
  width:100%;
  height: 100%;
  background: #00000091;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.modal_background .modal_box {
  width: 210px;
  height: 100px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  /* margin: 246px 59px; */
  margin: auto;
  /* margin-top: ; */
  cursor: pointer;
  
}
#setting_page .modal_background .modal_box {
  width: 210px;
  height: 200px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  margin: auto;
  margin-top: 130px;
}
#changePw_page .modal_background .modal_box {
  width: 210px;
  height: 100px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  margin: auto;
  margin-top:360px;
}
#goodbye_page .modal_background .modal_box {
  width: 210px;
  height: 100px;
  background: #F4E7B6;
  border-radius: 10px;
  padding: 16px;
  margin: auto;
  margin-top:350px;
}
.modal_background .modal_box h4 {
  padding: 17px 0 27px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
/* .modal_background.check-email .modal_box h4 {
  padding: 6px 0 18px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
} */
.modal_background.check-oldpw .modal_box h4 {
  padding: 10px 0 14px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
#setting_page .modal_background .modal_box .logout-btn {
  padding: 4px 0 12px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
#setting_page .modal_background .modal_box h4 {
  padding: 12px 0;
  border-bottom: 0.3px solid #000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
.modal_background .modal_box button {
  padding: 16px 0 0 0;
  border: none;
  background: #F4E7B6;
  color: #920000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
}
#setting_page .modal_background .modal_box button {
  padding: 12px 0 0 0;
  border: none;
  background: #F4E7B6;
  color: #920000;
  font-size: 16px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
  cursor: pointer;
}

#wrap1 {
  text-align: left;
  height: 60px;
  position: relative;
}
#wrap1 .material-icons {
  position: absolute;
  top: 8px;
  /* left: 10px; */
  right: 295px;
  display: inline-block;
  color: #fff;
  font-size: 42px;
  font-weight: 800;
}
#wrap1 span {
  position: absolute;
  top: 16px;
  /* left: 50px; */
  right: 238px;
  display: inline-block;
  color: #fff;
  font-size: 21px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
  padding: 0 0 26px 0;
}

#wrap2 {
  /* text-align: center;
  padding: 10px 0; */
  position: relative;
  width: 290px;
  height: 474px;
  padding: 16px;
  border-radius: 5px;
  background-color: #F4E7B6;
  font-family: 'NanumSquareRound';
}
#imgCredit_page #wrap2 {
  position: relative;
  width: 290px;
  height: 564px;
  padding: 16px;
  border-radius: 5px;
  background-color: #F4E7B6;
  font-family: 'NanumSquareRound';
}
#wrap2 h3 {
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 500;
  font-size: 32px;
  border-bottom: 0.3px solid #000;
  padding: 10px;
}
#imgCredit_page #wrap2 h3 {
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 500;
  font-size: 32px;
  padding: 10px;
  border-bottom: none
}
#imgCredit_page #wrap2 .subtitle {
  font-family: 'NanumSquareRound';
  font-weight: 800;
  font-size: 12px;
  padding: 10px 0 20px 0;
  border-bottom: 0.3px solid #000;
  text-align: center;
}
#goodbye_page #wrap2 h3 {
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 500;
  font-size: 32px;
  border-bottom: 0.3px solid #000;
  padding: 6px;
}
#wrap2 #changePw_img {
  width: 84px;
  padding: 38px 0 0 0;
}
#wrap2 #goodbye_img {
  width: 105px;
  padding: 12px 0 0 0;
}
#wrap2 ul {
  padding: 28px 0 0 0;
}
#changePw_page #wrap2 ul {
  padding: 38px 0 0 0;
}
#goodbye_page #wrap2 ul {
  padding: 8px 0 0 0;
}

#wrap2 li .label-box span {
  font-weight: 800;
  font-size: 16px;
}
#wrap2 li .input-box {
  position: relative;
  padding: 18px 0 46px 0;
}
#goodbye_page #wrap2 li .input-box {
  position: relative;
  padding: 18px 0 28px 0;
}
/* #wrap2 li .input-box.email-input {
  position: relative;
  padding: 18px 0 28px 0;
} */
#wrap2 li .input-box.pw-input {
  position: relative;
  padding: 18px 0 26px 0;
}
#changePw_page #wrap2 li .input-box.newPw-input {
  position: relative;
  padding: 18px 0;
}
#goodbye_page #wrap2 li .input-box.repw-input {
  position: relative;
  padding: 18px 0 15px 0;
}
#goodbye_page #wrap2 li .input-box.repw-input img {
  position: absolute;
  color: #920000;
  width: 15px;
  height: 15px;
  top: 23px;
  padding: 0 0 0 6px;
}
#wrap2 li .input-box .inputText {
  width: 200px;
  height: 25px;
  border: none;
  border-radius: 5px;
}
#wrap2 li .input-box .inputText::placeholder {
  font-family: 'NanumSquareRound';
  text-align: center;
  font-weight: 800;
  color: #d9d9d9;
}
#wrap2 li .input-box .overlap-btn {
  margin: 10px 0 0 0;
  font-family: 'NanumSquareRound';
  border: none;
  border-radius: 6px;
  background: #920000;
  width: 49px;
  height: 24px;
  color: #fff;
  font-size: 8px;
  font-weight: 800;
}
#wrap2 li .input-box img {
  position: absolute;
  color: #920000;
  width: 15px;
  height: 15px;
  top: 57px;
  padding: 0 0 0 12px;
}
#wrap2 li .input-box > p {
  font-size: 12px;
  font-weight: 800;
  padding: 13px 0 0 0;
}
#wrap2 li .input-box .unchk {
  color: #920000;
}
#wrap2 > p {
  font-family: 'Sorts Mill Goudy', serif;
  font-weight: 500;
  font-size: 16px;
  color: #000;
  text-align: right;
  padding: 0 35px 0 0;
}
#wrap2 #stamp_img {
  width: 38px;
  position: absolute;
  right: 27px;
  bottom: 7px;
}
#wrap3 {
  text-align: center;
  padding: 16px 0;
}
#wrap3 .finish-btn {
  font-family: 'NanumSquareRound';
  font-size: 16px;
  font-weight: 800;
  background: #fff;
  border: none;
  border-radius: 6px;
  width: 168px;
  height: 42px;
}
#goodbye_finish_page .title {
  font-family: 'Sorts Mill Goudy', serif;
  color: #FFF500;
  font-size: 42px;
  font-weight: 500;
  padding: 54px 0 10px 0;
  margin-bottom: 0;
}
#goodbye_finish_page .subtitle {
  font-family: 'NanumSquareRound';
  color: #fff;
  font-size: 16px;
  font-weight: 800;
}
#goodbye_finish_page img {
  width: 200px;
  padding: 50px 80px 30px 80px;
}
#goodbye_finish_page span {
  font-family: 'NanumSquareRound';
  color: #fff;
  font-size: 21px;
  font-weight: 800;
}
#goodbye_finish_page .togo_home {
  display: block;
  width: 112px;
  height: 42px;
  border: none;
  border-radius: 6px;
  color: #000;
  background: #fff;
  font-family: 'NanumSquareRound';
  font-size: 16px;
  font-weight: 800;
  margin: 33px 124px 14px 124px;
}
#goodbye_finish_page .teamname {
  font-family: 'NanumSquareRound';
  font-size: 16px;
  font-weight: 800;
  color: #fff;
}

#teamname {
  color: rgba(255, 255, 255, 0.666);
  font-size: 16px;
  font-weight: 700;
  /* teamname을 맨 아래 고정시키는건 위에 있는 요소에 margin bottom 해서 하기. teamname에 마진탑 주면 로그인페이지에서 teamname이 아래로 밀림 */
}
.icon-link {
  overflow: scroll;
  font-family: 'NanumSquareRound';
  font-size: 10px;
  font-weight: 800;
  height: 370px;
  margin-top: 13px;
  margin-bottom: 14px;
}
.icon-link a {
  display: block;
  color: #000;
}
/* #imgCredit_page #wrap2 .confirm {
  position: fixed;
  bottom: 20px;
} */


/* - 메인컬러
    - 배경색(red) : 920000
- 서브컬러
    - yellow : FFF500
    - white : FFFFFF
    - black : 000000
    - beige : F4E7B6
- 폰트 컬러
    - yellow : FFF500
    - white : FFFFFF
    - black : 000000
    - gray : D9D9D9 */

.material-icons {
  cursor: pointer;
}
</style>