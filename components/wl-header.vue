<template>
  <div style="min-width:1180px">
    <header class="wl-header">
      <div class="wl-header-inner clearfix">
        <a href="/" class="wl-header-logo">
          <img src="../assets/images/logo_walian.png" alt="">
        </a>
        <ul class="wl-header-nav">
          <li :class="{active:$route.name=='index'}">
            <nuxt-link to="/">首页</nuxt-link>
          </li>
          <li :class="{active:$route.name=='video'}">
            <nuxt-link to="/video">链视听</nuxt-link>
          </li>
          <li :class="{active:$route.name=='live'}">
            <nuxt-link to="/live">闪讯</nuxt-link>
          </li>
          <li :class="{active:$route.name=='writer'}">
            <nuxt-link to="/writer">挖链号</nuxt-link>
          </li>
          <li :class="{active:$route.name=='chain-market'}">
            <nuxt-link to="/chain-market">行情</nuxt-link>
          </li>
          <!-- <li :class="{active:$route.name=='chain-index'}">
            <nuxt-link to="/chain-index">指数</nuxt-link>
          </li> -->
          <li :class="{active:$route.name=='xueyuan'}">
            <nuxt-link to="/xueyuan">活动</nuxt-link>
          </li>
          <li :class="{active:$route.name=='calculator'}">
            <nuxt-link to="/calculator">挖矿计算器</nuxt-link>
          </li>
          <!-- <li>
            <a href="http://www.bitong.top/" target="_blank">币通</a>
          </li> -->
          <li>
            <a href="http://www.hc.top/" target="_blank">算立方</a>
          </li>
          <!-- <li>
            <a href="http://www.xt.top" target="_blank">XToken</a>
          </li> -->

        </ul>
        <ul class="wl-header-ctrls">
          <li class="wl-header-ctrls-app">
            <svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>app_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-55" fill="#666666" fill-rule="nonzero">
                  <path d="M2,1 C1.44771525,1 1,1.44771525 1,2 L1,14 C1,14.5522847 1.44771525,15 2,15 L10,15 C10.5522847,15 11,14.5522847 11,14 L11,2 C11,1.44771525 10.5522847,1 10,1 L2,1 Z M2,0 L10,0 C11.1045695,-2.02906125e-16 12,0.8954305 12,2 L12,14 C12,15.1045695 11.1045695,16 10,16 L2,16 C0.8954305,16 1.3527075e-16,15.1045695 0,14 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z" id="Rectangle-2"></path>
                  <path d="M4.5,14 C4.22385763,14 4,13.7761424 4,13.5 C4,13.2238576 4.22385763,13 4.5,13 L7.5,13 C7.77614237,13 8,13.2238576 8,13.5 C8,13.7761424 7.77614237,14 7.5,14 L4.5,14 Z" id="Line-3"></path>
                  <path d="M3,3 L3,11 L9,11 L9,3 L3,3 Z M2,2 L10,2 L10,12 L2,12 L2,2 Z" id="Rectangle-10"></path>
                </g>
              </g>
            </svg>
            <svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>app_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-55" fill="#4D87EA" fill-rule="nonzero">
                  <path d="M2,1 C1.44771525,1 1,1.44771525 1,2 L1,14 C1,14.5522847 1.44771525,15 2,15 L10,15 C10.5522847,15 11,14.5522847 11,14 L11,2 C11,1.44771525 10.5522847,1 10,1 L2,1 Z M2,0 L10,0 C11.1045695,-2.02906125e-16 12,0.8954305 12,2 L12,14 C12,15.1045695 11.1045695,16 10,16 L2,16 C0.8954305,16 1.3527075e-16,15.1045695 0,14 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z" id="Rectangle-2"></path>
                  <path d="M4.5,14 C4.22385763,14 4,13.7761424 4,13.5 C4,13.2238576 4.22385763,13 4.5,13 L7.5,13 C7.77614237,13 8,13.2238576 8,13.5 C8,13.7761424 7.77614237,14 7.5,14 L4.5,14 Z" id="Line-3"></path>
                  <path d="M3,3 L3,11 L9,11 L9,3 L3,3 Z M2,2 L10,2 L10,12 L2,12 L2,2 Z" id="Rectangle-10"></path>
                </g>
              </g>
            </svg>
            <p>App</p>
            <div class="wl-header-ctrls-app-download">
              <img src="../assets/images/download.png" alt="">
              <p>扫码下载APP</p>
            </div>
          </li>
          <li @click='tougao'>
            <svg width="14px" height="16px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>tougao_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-32" fill="#666666" fill-rule="nonzero">
                  <path d="M2,1 C1.44771525,1 1,1.44771525 1,2 L1,12 C1,12.5522847 1.44771525,13 2,13 L12,13 C12.5522847,13 13,12.5522847 13,12 L13,2 C13,1.44771525 12.5522847,1 12,1 L2,1 Z M2,0 L12,0 C13.1045695,-2.02906125e-16 14,0.8954305 14,2 L14,12 C14,13.1045695 13.1045695,14 12,14 L2,14 C0.8954305,14 1.3527075e-16,13.1045695 0,12 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z" id="Rectangle-9"></path>
                  <path d="M6.59897514,9.44765406 L7.68806908,8.29260268 L7.21771391,7.58060365 C7.05931996,7.34083517 7.13514886,7.01721104 7.38356902,6.87276385 L8.98343058,5.94250318 C9.71690107,4.9262014 10.221428,4.15695849 10.4925076,3.64543099 C8.26309221,4.31377898 6.17863716,6.13173931 4.25005739,9.11801741 C4.914942,8.98130884 5.70429774,9.0944427 6.59897514,9.44765406 Z M10.6969893,3.18681991 C10.6992692,3.17874451 10.7003358,3.17364001 10.7002388,3.17173404 C10.7002655,3.17225861 10.6991823,3.17728724 10.6969893,3.18681991 Z M8.74074654,8.07186031 C8.86864991,8.26547373 8.846537,8.52164227 8.68734683,8.69047328 L7.08855176,10.3860942 C6.94265678,10.5408248 6.71485029,10.5863376 6.52070176,10.4995432 C5.01423891,9.82607687 4.07814876,9.93663431 3.54237688,10.7444992 C2.77331677,11.9041282 2.4476794,12.3819737 2.34879478,12.4782488 C1.94688262,12.8695546 1.30432351,12.4040561 1.55089578,11.9002151 C4.241649,6.40198166 7.33598431,3.2579688 10.8641934,2.5200888 C11.2884964,2.43135122 11.6754126,2.65850757 11.6989462,3.12090531 C11.7108037,3.35388826 11.6245192,3.61741303 11.4519944,3.96580162 C11.163071,4.54924007 10.5915914,5.42734586 9.73136539,6.6147664 L9.5777864,6.75366962 L8.34389733,7.47113075 L8.74074654,8.07186031 Z" id="Path-2"></path>
                </g>
              </g>
            </svg>
            <svg width="14px" height="16px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>tougao_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-32" fill="#4D87EA" fill-rule="nonzero">
                  <path d="M2,1 C1.44771525,1 1,1.44771525 1,2 L1,12 C1,12.5522847 1.44771525,13 2,13 L12,13 C12.5522847,13 13,12.5522847 13,12 L13,2 C13,1.44771525 12.5522847,1 12,1 L2,1 Z M2,0 L12,0 C13.1045695,-2.02906125e-16 14,0.8954305 14,2 L14,12 C14,13.1045695 13.1045695,14 12,14 L2,14 C0.8954305,14 1.3527075e-16,13.1045695 0,12 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z" id="Rectangle-9"></path>
                  <path d="M6.59897514,9.44765406 L7.68806908,8.29260268 L7.21771391,7.58060365 C7.05931996,7.34083517 7.13514886,7.01721104 7.38356902,6.87276385 L8.98343058,5.94250318 C9.71690107,4.9262014 10.221428,4.15695849 10.4925076,3.64543099 C8.26309221,4.31377898 6.17863716,6.13173931 4.25005739,9.11801741 C4.914942,8.98130884 5.70429774,9.0944427 6.59897514,9.44765406 Z M10.6969893,3.18681991 C10.6992692,3.17874451 10.7003358,3.17364001 10.7002388,3.17173404 C10.7002655,3.17225861 10.6991823,3.17728724 10.6969893,3.18681991 Z M8.74074654,8.07186031 C8.86864991,8.26547373 8.846537,8.52164227 8.68734683,8.69047328 L7.08855176,10.3860942 C6.94265678,10.5408248 6.71485029,10.5863376 6.52070176,10.4995432 C5.01423891,9.82607687 4.07814876,9.93663431 3.54237688,10.7444992 C2.77331677,11.9041282 2.4476794,12.3819737 2.34879478,12.4782488 C1.94688262,12.8695546 1.30432351,12.4040561 1.55089578,11.9002151 C4.241649,6.40198166 7.33598431,3.2579688 10.8641934,2.5200888 C11.2884964,2.43135122 11.6754126,2.65850757 11.6989462,3.12090531 C11.7108037,3.35388826 11.6245192,3.61741303 11.4519944,3.96580162 C11.163071,4.54924007 10.5915914,5.42734586 9.73136539,6.6147664 L9.5777864,6.75366962 L8.34389733,7.47113075 L8.74074654,8.07186031 Z" id="Path-2"></path>
                </g>
              </g>
            </svg>
            <p>投稿</p>
          </li>
          <li @click="show_applogin=true" v-if="!$store.state.userinfo">
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>Sign in_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-56" fill="#666666" fill-rule="nonzero">
                  <path d="M8,9.375 C5.77688526,9.375 4,7.37600408 4,4.9375 C4,2.49899592 5.77688526,0.5 8,0.5 C10.2231147,0.5 12,2.49899592 12,4.9375 C12,7.37600408 10.2231147,9.375 8,9.375 Z M8,8.375 C9.64287851,8.375 11,6.84823832 11,4.9375 C11,3.02676168 9.64287851,1.5 8,1.5 C6.35712149,1.5 5,3.02676168 5,4.9375 C5,6.84823832 6.35712149,8.375 8,8.375 Z" id="Oval-2"></path>
                  <path d="M15.5,14.5625 L15.5,15.0625 L0.5,15.0625 L0.5,14.5625 C0.5,12.1146084 3.52386827,10.125 8,10.125 C12.4761317,10.125 15.5,12.1146084 15.5,14.5625 Z M8,11.125 C4.38576006,11.125 1.98608185,12.4798551 1.56597848,14.0625 L14.4340215,14.0625 C14.0139181,12.4798551 11.6142399,11.125 8,11.125 Z" id="Oval-5"></path>
                </g>
              </g>
            </svg>
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>Sign in_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-56" fill="#4D87EA" fill-rule="nonzero">
                  <path d="M8,9.375 C5.77688526,9.375 4,7.37600408 4,4.9375 C4,2.49899592 5.77688526,0.5 8,0.5 C10.2231147,0.5 12,2.49899592 12,4.9375 C12,7.37600408 10.2231147,9.375 8,9.375 Z M8,8.375 C9.64287851,8.375 11,6.84823832 11,4.9375 C11,3.02676168 9.64287851,1.5 8,1.5 C6.35712149,1.5 5,3.02676168 5,4.9375 C5,6.84823832 6.35712149,8.375 8,8.375 Z" id="Oval-2"></path>
                  <path d="M15.5,14.5625 L15.5,15.0625 L0.5,15.0625 L0.5,14.5625 C0.5,12.1146084 3.52386827,10.125 8,10.125 C12.4761317,10.125 15.5,12.1146084 15.5,14.5625 Z M8,11.125 C4.38576006,11.125 1.98608185,12.4798551 1.56597848,14.0625 L14.4340215,14.0625 C14.0139181,12.4798551 11.6142399,11.125 8,11.125 Z" id="Oval-5"></path>
                </g>
              </g>
            </svg>
            <p>登录</p>
          </li>
          <li @click="goreg" v-if="!$store.state.userinfo">
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>register_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-58" fill="#666666" fill-rule="nonzero">
                  <path d="M8.03555556,9.44 C5.8016907,9.44 4.01777778,7.43309796 4.01777778,4.98666667 C4.01777778,2.54023537 5.8016907,0.533333333 8.03555556,0.533333333 C10.2694204,0.533333333 12.0533333,2.54023537 12.0533333,4.98666667 C12.0533333,7.43309796 10.2694204,9.44 8.03555556,9.44 Z M8.03555556,8.37333333 C9.65050176,8.37333333 10.9866667,6.87014781 10.9866667,4.98666667 C10.9866667,3.10318552 9.65050176,1.6 8.03555556,1.6 C6.42060935,1.6 5.08444444,3.10318552 5.08444444,4.98666667 C5.08444444,6.87014781 6.42060935,8.37333333 8.03555556,8.37333333 Z" id="Oval-2"></path>
                  <path d="M8.11965562,14.4088889 C8.41420749,14.4088889 8.65298896,14.6476704 8.65298896,14.9422222 C8.65298896,15.2367741 8.41420749,15.4755556 8.11965562,15.4755556 L0.533333333,15.4755556 L0.533333333,14.9422222 C0.533333333,12.4816806 3.56203977,10.4888889 8.03555556,10.4888889 C8.33010742,10.4888889 8.56888889,10.7276704 8.56888889,11.0222222 C8.56888889,11.3167741 8.33010742,11.5555556 8.03555556,11.5555556 C4.48522088,11.5555556 2.12322234,12.8705671 1.67688284,14.4088889 L8.11965562,14.4088889 Z" id="Oval-5"></path>
                  <g id="Group-57" transform="translate(8.035556, 9.031111)">
                    <path d="M3.23555556,2.73777778 L3.23555556,0.995555556 C3.23555556,0.583182942 3.56984961,0.248888889 3.98222222,0.248888889 C4.39459484,0.248888889 4.72888889,0.583182942 4.72888889,0.995555556 L4.72888889,2.73777778 L6.47111111,2.73777778 C6.88348372,2.73777778 7.21777778,3.07207183 7.21777778,3.48444444 C7.21777778,3.89681706 6.88348372,4.23111111 6.47111111,4.23111111 L4.72888889,4.23111111 L4.72888889,5.97333333 C4.72888889,6.38570595 4.39459484,6.72 3.98222222,6.72 C3.56984961,6.72 3.23555556,6.38570595 3.23555556,5.97333333 L3.23555556,4.23111111 L1.49333333,4.23111111 C1.08096072,4.23111111 0.746666667,3.89681706 0.746666667,3.48444444 C0.746666667,3.07207183 1.08096072,2.73777778 1.49333333,2.73777778 L3.23555556,2.73777778 Z" id="Combined-Shape"></path>
                  </g>
                </g>
              </g>
            </svg>
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <!-- Generator: Sketch 49.3 (51167) - http://www.bohemiancoding.com/sketch -->
              <title>register_nav</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="切图" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Group-58" fill="#4D87EA" fill-rule="nonzero">
                  <path d="M8.03555556,9.44 C5.8016907,9.44 4.01777778,7.43309796 4.01777778,4.98666667 C4.01777778,2.54023537 5.8016907,0.533333333 8.03555556,0.533333333 C10.2694204,0.533333333 12.0533333,2.54023537 12.0533333,4.98666667 C12.0533333,7.43309796 10.2694204,9.44 8.03555556,9.44 Z M8.03555556,8.37333333 C9.65050176,8.37333333 10.9866667,6.87014781 10.9866667,4.98666667 C10.9866667,3.10318552 9.65050176,1.6 8.03555556,1.6 C6.42060935,1.6 5.08444444,3.10318552 5.08444444,4.98666667 C5.08444444,6.87014781 6.42060935,8.37333333 8.03555556,8.37333333 Z" id="Oval-2"></path>
                  <path d="M8.11965562,14.4088889 C8.41420749,14.4088889 8.65298896,14.6476704 8.65298896,14.9422222 C8.65298896,15.2367741 8.41420749,15.4755556 8.11965562,15.4755556 L0.533333333,15.4755556 L0.533333333,14.9422222 C0.533333333,12.4816806 3.56203977,10.4888889 8.03555556,10.4888889 C8.33010742,10.4888889 8.56888889,10.7276704 8.56888889,11.0222222 C8.56888889,11.3167741 8.33010742,11.5555556 8.03555556,11.5555556 C4.48522088,11.5555556 2.12322234,12.8705671 1.67688284,14.4088889 L8.11965562,14.4088889 Z" id="Oval-5"></path>
                  <g id="Group-57" transform="translate(8.035556, 9.031111)">
                    <path d="M3.23555556,2.73777778 L3.23555556,0.995555556 C3.23555556,0.583182942 3.56984961,0.248888889 3.98222222,0.248888889 C4.39459484,0.248888889 4.72888889,0.583182942 4.72888889,0.995555556 L4.72888889,2.73777778 L6.47111111,2.73777778 C6.88348372,2.73777778 7.21777778,3.07207183 7.21777778,3.48444444 C7.21777778,3.89681706 6.88348372,4.23111111 6.47111111,4.23111111 L4.72888889,4.23111111 L4.72888889,5.97333333 C4.72888889,6.38570595 4.39459484,6.72 3.98222222,6.72 C3.56984961,6.72 3.23555556,6.38570595 3.23555556,5.97333333 L3.23555556,4.23111111 L1.49333333,4.23111111 C1.08096072,4.23111111 0.746666667,3.89681706 0.746666667,3.48444444 C0.746666667,3.07207183 1.08096072,2.73777778 1.49333333,2.73777778 L3.23555556,2.73777778 Z" id="Combined-Shape"></path>
                  </g>
                </g>
              </g>
            </svg>
            <p>注册</p>
          </li>
          <li v-if="$store.state.userinfo" class="wl-header-ctrls-user">
            <el-dropdown @command="userselectchange" placement="bottom-end">
              <span class="el-dropdown-link">
                <img :src="$store.state.userinfo.head" alt="" class="wl-header-ctrls-user-head">
                <span class="dian" v-if="$store.state.newmessage"></span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="2">发布平台</el-dropdown-item>
                <el-dropdown-item command="4">我的收藏</el-dropdown-item>
                <el-dropdown-item command="5">我的消息</el-dropdown-item>
                <el-dropdown-item command="3">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </ul>

      </div>
    </header>
    <div class="common_dialogs">
      <app-login :show.sync="show_applogin" @login-success='login_success'></app-login>
    </div>

  </div>

</template>
<script>
  import { getMarketInfo } from "../service/main-api";
  import { myAccount, logout } from "../pages/mine/js/mineapi";
  import AppLogin from "../components/dialog/app-login.vue";

  import loginmodalevent from "../service/loginmodalevent.js";
  export default {
    components: { AppLogin },
    data() {
      return {
        show_applogin: false,
        newmessage:0,
      };
    },
    methods: {
      tougao() {
        if (this.$store.state.userinfo) {
          this.$router.push("/mine/publish");
        } else {
          this.show_applogin = true;
        }
      },

      login_success() {

        
        this._getUserinfo();
      },

      _getUserinfo() {
        myAccount()
          .then(res => {
            this.$store.commit("USERINFO", res);
          })
          .catch(err => {});
      },
      userselectchange(key) {
        switch (key) {
          case "1":
            this.$router.push("/mine");
            break;
          case "2":
            this.$router.push("/mine/publish");
            break;
          case "3":
            logout().then(res => {
              this.$store.commit("CLEAR_TOKEN");
              window.gio('clearUserId');
              if (this.$route.path != "/") {
                this.$router.replace({
                  path: "/"
                });
              } else {
                this.$router.replace({
                  path: "/loading"
                });
              }
            });
            break;
          case "4":
            this.$router.push("/mine/collection");
            break;
          case "5":
            this.$router.push("/mine/mynews");
            break;
          default:
            break;
        }
        this.userselect = "-1";
      },
      goreg() {
        this.$router.push({
          path: "/reg",
          query: { from: this.$route.fullPath }
        });
      }
    },
    mounted() {
      // this.getMarketInfo();
      loginmodalevent.$on("login", () => {
        this.show_applogin = true;
      });

    }
  };
</script>

<style lang="scss" scoped>
  .wl-header {
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.15);
    position: fixed;
    z-index: 1500;
    width: 100%;
    background-color: #fff;
    height: 70px;
    min-width: 1180px;
    &-inner {
      width: 1180px;
      margin: 0 auto;
      line-height: 70px;
      height: 70px;
    }
    &-logo {
      float: left;
      img {
        height: 40px;
      }
    }
    &-nav {
      float: left;
      margin-left: 40px;
      li {
        float: left;
        margin-right: 30px;
        a {
          font-size: 16px;
          color: #222222;
          font-weight: 400;
        }
        &.active,
        &:hover,
        &:focus {
          a {
            color: #4d87ea;
          }
        }
        &:last-of-type {
          margin: 0;
        }
      }
    }
    &-ctrls {
      float: right;
      margin-top: 17px;
      margin-left: 0px;
      li {
        float: left;
        text-align: center;
        // width: 27px;
        margin-left: 20px;
        line-height: initial;
        cursor: pointer;
        position: relative;
        svg:last-of-type {
          display: none;
        }
        &:hover {
          > p {
            color: #4d87ea;
          }
          svg:last-of-type {
            display: initial;
          }
          svg:first-of-type {
            display: none;
          }
        }
        &.wl-header-ctrls-app:hover {
          .wl-header-ctrls-app-download {
            background-color: white;
            display: block;
            position: absolute;
            right: -6px;
            top: 60px;
            width: 140px;
            height: 160px;
            border: 1px solid #eeeeee;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
            border-radius: 4px;
            text-align: center;
            padding-top: 20px;
            &::before {
              content: "";
              width: 10px;
              height: 10px;
              position: absolute;
              right: 15px;
              top: -5px;
              border-left: 1px solid #eeeeee;
              border-top: 1px solid #eeeeee;
              transform: rotate(45deg);
              background-color: white;
            }
          }
        }
        .wl-header-ctrls-app-download {
          display: none;
          img {
            width: 100px;
            height: 100px;
            margin-bottom: 5px;
          }
          p {
            font-size: 12px;
            color: #222222;
          }
        }

        &.wl-header-ctrls-user {
          width: 50px;
          margin-top: 3px;
            .el-dropdown-link{
              position: relative;
              display: inline-block;
              width: 50px;
              height: 30px;
              .dian{
                position: absolute;
                left: 35px;
                top: 2px;
                background: #EF3B3B;
                height: 6px;
                width: 6px;
                border-radius: 50%;
              }
            }
          .wl-header-ctrls-user-head {
            width: 30px;
            height: 30px;
            border-radius: 50%;
          }
        }

        > p {
          font-size: 12px;
          color: #666666;
        }
      }
    }
  }

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background: #f5f5f5;
    font-size: 14px;
    color: #222222;
  }
  .el-dropdown-menu__item {
    line-height: 40px;
    font-size: 14px;
    color: #222222;
  }
</style>

