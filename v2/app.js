var vm = new Vue({
  el: '#app',

  data() {
    return {
      decodedContent: '',
      record:0,
      enter:0,
      errorMessage: '',
      isValid: undefined,
      camera: 'auto',
      result: null,
    }
  },
  computed: {
    validationPending () {
      return this.isValid === undefined
        && this.camera === 'off'
    },

    validationSuccess () {
      return this.isValid === true
    },

    validationFailure () {
      return this.isValid === false
    }
  },

  methods: {
    onDecode(content) {
      this.decodedContent = content
      this.record = this.record + 1;
    },

    async onInit(promise) {
    	async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permisson"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        }
      }.then(this.resetValidationState)

    },    

    resetValidationState () {
      this.isValid = undefined
    },
    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
      enterAsync();

      // pretend it's taking really long
      //await this.timeout(3000)
      this.isValid = content.startsWith('http');

      // some more delay, so users have time to read the message
      
      await this.timeout(800);
      var lv_key = "pink";
      var lv_audio = new Audio('https://sound-wall.s3-eu-west-1.amazonaws.com/en_' + lv_key + '_word.mp3');
      lv_audio.play();

      this.turnCameraOn();
    },
    enterAsync(){
    	this.enter = this.enter + 1;
    },
    turnCameraOn () {
      this.camera = 'auto'
    },

    turnCameraOff () {
      this.camera = 'off'
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }

  }
})