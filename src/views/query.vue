<template>
  <div class="img-placeholder">
    <div class="service">
      <div class="title">
        <span>这里的证书</span>
        <span>含金量高</span>
      </div>
      <div class="sub-title">学习，让自己更优秀</div>
      <div class="img-box main-container">
        <a href="http://www.rsj.sh.gov.cn/xjd/index600.jsp" target="_blank">
          <img src="@/assets/images/query/01.png" alt="" />
        </a>
        <a href="http://na.mofyi.com/na/login/search.html" target="_blank">
          <img src="@/assets/images/query/02.png" alt="" />
        </a>
        <img v-scrollBot src="@/assets/images/query/03.png" alt="" />
      </div>
      <img v-scrollBot class="btn" src="@/assets/images/query/05.png" alt="" />
    </div>
    <img v-scrollBot src="@/assets/images/query/04.png" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.service {
  padding-top: 68px;
  font-family: Alibaba PuHuiTi-Medium, Alibaba PuHuiTi;
  .title {
    margin-bottom: 18px;
    font-size: 58px;
    font-weight: 500;
    span:last-child {
      margin-left: 30px;
      color: #1f92d1;
    }
  }
  .sub-title {
    margin: 0 auto;
    max-width: 1200px;
    font-size: 28px;
    font-weight: 400;
    color: #888888;
    margin-bottom: 68px;
  }

  .img-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 68px;
    a {
      width: 33%;
    }
    > img {
      width: 33%;
    }
  }
  .btn {
    margin: 0 auto 70px;
    width: 297px;
    height: 71px;
  }
}
</style>
