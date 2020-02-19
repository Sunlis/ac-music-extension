// Handles playing town tunes, could potentially be either folded
// into AudioManager, or tune_player instead of making createSampler
// and createTunePlayer globally accessable.

'use strict';

function TownTuneManager() {

	var defaultTune = ["C2", "E2", "C2", "G1", "F1", "G1", "B1", "D2", "C2", "zZz", "G1", "zZz", "C2", "-", "-", "zZz"];
	var defaultTownTuneVolume = 0.75;
	var defaultTabAudio = 'pause';
	var defaultTabAudioReduceVolume = 80;
	var audioContext = new AudioContext();
	var sampler = createSampler(audioContext);
	var tunePlayer = createTunePlayer(audioContext);
	
	// Play tune and call doneCB after it's done
	this.playTune = function(tabAudioPlaying = false, doneCB) {
		chrome.storage.sync.get({ townTune: defaultTune, townTuneVolume: defaultTownTuneVolume, tabAudio: defaultTabAudio, tabAudioReduceValue: defaultTabAudioReduceVolume }, function(items){
			// Reduce the volume when necessary
			var volume = items.townTuneVolume;
			if (items.tabAudio == 'reduce' && tabAudioPlaying) volume = volume * (1 - items.tabAudioReduceValue / 100);
			if (volume < 0) volume = 0;
			if (volume > 1) volume = 1;

			tunePlayer.playTune(items.townTune, sampler, 100, volume).done(doneCB);
		});
	}

}