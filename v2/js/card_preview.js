var vm = new Vue({
  el: '#app',

  data() {
    return {
      cards:lv_data2
    }
  }, 
  methods: {
  	addQR: function(){
  		
  			$.each(this.cards, function(key_card,card){
  				var lv_QR = new QRCode('qr'+key_card, {
					    text: "{t:'"+card.text+"',s:'l',k:"+key_card+"}",
					    width: 80,
					    height: 80,
					    colorDark: '#000000',
					    colorLight: '#ffffff',
					    correctLevel: QRCode.CorrectLevel.H
					});
  			});
		}  	
	}
});

