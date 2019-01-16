import CommonAPI from '../../services/common-api';

export default {
  data() {
    return {
      countryCode: '+86',
      cities: []
    };
  },
  methods: {
    initPage() {
      CommonAPI.country()
        .then(res => {
          this.cities = res;
        });
    },
    countDown(seconds) {
      return {
        timer: null,
        _endHandler: null,
        start(fn) {
          let self = this;
          fn && fn(seconds);
          self.timer = setInterval(function () {
            seconds--;
            fn && fn(seconds);
            if (seconds === 0) {
              self._endHandler && self._endHandler();
              clearInterval(self.timer);
            }
          }, 1000);
          return self;
        },
        end(fn) {
          this._endHandler = fn;
        },
        cancel() {
          clearInterval(this.timer);
        }
      };
    }
  },
  mounted() {
    this.initPage();
  }
};
