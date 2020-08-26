var vm = new Vue({
  el: '#app',

  data() {
    return {
    	cards:lv_data2,
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
    	
    	var lv_min = new Date().getMinutes();
    	
    	//同一分鐘不重覆呼叫
    	if(this.lastContent == (lv_min + content)){    		
    			return false;//和上次內容一樣
    	}else{
    		//與上次不同，記錄本次
    		this.lastContent = lv_min + content;
    	}
      
      this.turnCameraOff();

      // pretend it's taking really long
      //await this.timeout(200)

      var lv_item = null;
      //content={"t":"ant","s":"l","k":"0"}
      this.isValid = false;// content.startsWith('http')
      try{
      	lv_item =  JSON.parse(content);
      	this.isValid = (lv_item.s=="l");// content.startsWith('http')
      	this.errorMessage = "vaild = "+this.isValid;
      	
      	if(this.isValid == true){
      		this.errorMessage = "play https://sound-wall.s3-eu-west-1.amazonaws.com/en_"+lv_item.t.toLowerCase()+"_word.mp3";
      		await playAudio("https://sound-wall.s3-eu-west-1.amazonaws.com/en_"+lv_item.t.toLowerCase()+"_word.mp3");
      	}
      }catch(e){
      	this.errorMessage = e.toString();
      	console.log(e);
      }
      if(this.isValid == false)
      {
      	this.errorMessage = this.errorMessage + "<br/>不是lingumi閃卡";
      }
		  
      // some more delay, so users have time to read the message
      //await this.timeout(800)
      /*if(this.isValid == true){
      	this.errorMessage = "play https://sound-wall.s3-eu-west-1.amazonaws.com/en_"+lv_item.t+"_word.mp3";
      	await playAudio("https://sound-wall.s3-eu-west-1.amazonaws.com/en_"+lv_item.t+"_word.mp3");
      }else{
      	//this.errorMessage = "無效音效"
      	//呼叫無效音效
      } */    

      this.turnCameraOn();
      
    },

    turnCameraOn () {
    	this.isValid = undefined;
      this.camera = 'auto';
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
    	 //audio.play();
    	vm.record +=1;
    }
    

window.onload = function () {
	//alert('讀取到正確條碼會發出聲音！');
	};

       

  