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
      

    onInit (promise) {
      promise
        .catch(console.error)
        .then(this.resetValidationState)
    },  

    resetValidationState () {
      this.isValid = undefined
    },
    
    async onDecode (content) {
      this.result = content;
      this.turnCameraOff()
      enterAsync();
      this.decodedContent = content;
      this.record = this.record + 1;

      // pretend it's taking really long
      //await this.timeout(3000)
      this.isValid = content.startsWith('http');

      // some more delay, so users have time to read the message      
      
      playAudio("pink");
      await this.timeout(800);

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
    playAudio(card_key){
      var lv_audio = new Audio('https://sound-wall.s3-eu-west-1.amazonaws.com/en_' + card_key + '_word.mp3');
      lv_audio.play();
    },

    timeout (ms) {
      return new Promise(resolve => {
        window.setTimeout(resolve, ms)
      })
    }

  }
})