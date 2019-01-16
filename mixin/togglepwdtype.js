export default {
  data() {
    return {
      pwdtype: "password",
      pwdtype1: "password",
      pwdtype2: "password",
      pwdtype3: "password",
      pwdtype4: "password",
      pwdtype5: "password",
      pwdtype6: "password"
    };
  },
  methods: {
    togglepwd() {
      if (this.pwdtype == "password") {
        this.pwdtype = "text";
      } else {
        this.pwdtype = "password";
      }
    },
    togglepwd1() {
      if (this.pwdtype1 == "password") {
        this.pwdtype1 = "text";
      } else {
        this.pwdtype1 = "password";
      }
    },
    togglepwd2() {
      if (this.pwdtype2 == "password") {
        this.pwdtype2 = "text";
      } else {
        this.pwdtype2 = "password";
      }
    },
    togglepwd3() {
      if (this.pwdtype3 == "password") {
        this.pwdtype3 = "text";
      } else {
        this.pwdtype3 = "password";
      }
    },
    togglepwd4() {
      if (this.pwdtype4 == "password") {
        this.pwdtype4 = "text";
      } else {
        this.pwdtype4 = "password";
      }
    },
    togglepwd5() {
      if (this.pwdtype5 == "password") {
        this.pwdtype5 = "text";
      } else {
        this.pwdtype5 = "password";
      }
    },
    togglepwd6() {
      if (this.pwdtype6 == "password") {
        this.pwdtype6 = "text";
      } else {
        this.pwdtype6 = "password";
      }
    }
  }
};
