class ModalKaraokeController {
  constructor($scope, $uibModalInstance, socketService, dataObj, $log) {
    'ngInject';
    this.$uibModalInstance = $uibModalInstance;
    this.socketService = socketService;
    this.dataObj = dataObj;
    this.karaokeEnabled = false;
    this.musicLevel = 128;
    this.micLevel = 128;
    this.echoLevel = 128;
    this.$scope = $scope;
    this.$scope.avr = false;
    this.$log = $log;
    this.init();
  }

  exit() {
    this.$uibModalInstance.close();
  }

  karaokeSwitch() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'KaraokeSwitchPress',
      'data': 'off'
    };
    if (this.karaokeEnabled) {
      emitPayload.data = 'on';
    }
    this.socketService.emit('callMethod', emitPayload);
  }

  musicVolumePlus() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'MusicPlusPress',
      'data': ''
    };
    this.socketService.emit('callMethod', emitPayload);
  }

  musicVolumeMinus() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'MusicMinusPress',
      'data': ''
    };
    this.socketService.emit('callMethod', emitPayload);
  }

  micVolumePlus() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'MicPlusPress',
      'data': ''
    };
    this.socketService.emit('callMethod', emitPayload);
  }

  micVolumeMinus() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'MicMinusPress',
      'data': ''
    };
    this.socketService.emit('callMethod', emitPayload);
  }
  
  echoVolumePlus() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'EchoPlusPress',
      'data': ''
    };
    this.socketService.emit('callMethod', emitPayload);
  }

  echoVolumeMinus() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'EchoMinusPress',
      'data': ''
    };
    this.socketService.emit('callMethod', emitPayload);
  }

  musicLevelChange() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'MusicLevelChange',
      'data': this.musicLevel
    };
    this.socketService.emit('callMethod', emitPayload);
  }
  micLevelChange() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'MicLevelChange',
      'data': this.micLevel
    };
    this.socketService.emit('callMethod', emitPayload);
  }
  echoLevelChange() {
    let emitPayload = {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'EchoLevelChange',
      'data': this.echoLevel
    };
    this.socketService.emit('callMethod', emitPayload);
  }




  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  init() {
    this.registerListner();
    this.initService();
  }

  registerListner() {
    this.socketService.on('pushKaraokeStatus', (data) => {
      this.$log.debug('pushKaraokeStatus', data);
      this.karaokeEnabled = data === 'off' ? false : true;
    });

    this.socketService.on('pushKaraokeLevels', (data) => {
	    this.$log.debug('pushKaraokeLevels', data);
	    if(
		    this.musicLevel !== data.musicLevel ||
		    this.micLevel !== data.micLevel ||
		    this.echoLevel !== data.echoLevel
	    ){
		    this.musicLevel = data.musicLevel;
		    this.micLevel = data.micLevel;
		    this.echoLevel = data.echoLevel;
	    }
	    this.$scope.avr = !data.legacy;
	    if(data.KaraokeStatus===1){
		    this.karaokeEnabled = true;
	    }else{
		    this.karaokeEnabled = false;
	    }
    });



  }

  initService() {
    this.socketService.emit('callMethod', {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'getKaraokeStatus',
      'data': ''
    });
    this.socketService.emit('callMethod', {
      'endpoint': 'system_controller/gpio-buttons',
      'method': 'getKaraokeLevels',
      'data': ''
    });

  }
}

export default ModalKaraokeController;
