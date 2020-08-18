var vm = new Vue({
  el: '#app',

  data() {
    return {
      decodedContent: '',
      record:0,
      noContinue:true,
      lastContent:'',
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
    	//和上次內容一樣
    	if(this.lastContent == content){    		
    			return false;    		
    	}else{
    		//與上次不同，記錄本次
    		this.lastContent = content;
    	}
      
      this.turnCameraOff();      

      // pretend it's taking really long
      //await this.timeout(200)
      //this.isValid = content.startsWith('http')
		  
      // some more delay, so users have time to read the message
      //await this.timeout(800)
      await playAudio("red");

      this.turnCameraOn();
      
      //10秒鐘後可以重複
      await this.timeout(10000);
      this.lastContent = "";
      //this.noContinue = false;
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
      $("#player")[0].pause();
      $("#player")[0].play();
    	 //var audio = new Audio('https://sound-wall.s3-eu-west-1.amazonaws.com/en_' + i_key + '_word.mp3');
    	vm.record +=1;
    }
    

window.onload = function () {
	//alert('讀取到正確條碼會發出聲音！');
	};

       

  