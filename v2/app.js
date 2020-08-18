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
      this.result = content
      this.turnCameraOff()

      // pretend it's taking really long
      await this.timeout(200)
      this.isValid = content.startsWith('http')
		  
      // some more delay, so users have time to read the message
      //await this.timeout(800)

      this.turnCameraOn();
      playAudio("red");
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
});


  function  playAudio(i_key){
    	var lv_path = 'https://sound-wall.s3-eu-west-1.amazonaws.com/en_' + i_key + '_word.mp3';
    	$("#music1").attr("src",lv_path);
    	$("#player")[0].load();
      $("#player")[0].play();
    	 //var audio = new Audio('https://sound-wall.s3-eu-west-1.amazonaws.com/en_' + i_key + '_word.mp3');
    	 
    }

       

  