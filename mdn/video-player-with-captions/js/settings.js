(function() {
	var subscriptionHandle;
	var subtitles;

	function monitorSettingsChange(category, keys, handleFunc) {
		return webOS.service.request("luna://com.webos.settingsservice", {
			method: "getSystemSettings",
			parameters: {
				"category": category,
				"keys": keys,
				"subscribe": true
			},
			onSuccess: function (inResponse) {
				if (typeof(inResponse.subscribed) != 'undefined') {
					if (!inResponse.subscribed) {
						console.log("Failed to subscribe settings' value");
						return;
					}
				}
				console.log("Result: " + JSON.stringify(inResponse));
				handleFunc(inResponse);
			},
			onFailure: function (inError) {
				console.log("Failed to get settings' value");
				console.log("[" + inError.errorCode + "]: " + inError.errorText);
				// To-Do something
				return;
			}
		});
	}

	function handleSettingsChange(res) {
		if (res.settings.captionEnable) {
			console.log("captionEnable: " + res.settings.captionEnable);
			var evt = new MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: true
			});
			var langMenu;
			if (re.settings.captionEnable === 'on') {
				langMenu = document.getElementById(subtitles.getAttribute('lastLang'));
			} else {
				langMenu = document.getElementById('subtitles-off');
			}
			if (langMenu) {
				langMenu.dispatchEvent(evt);
			}
		}
	}

	window.addEventListener('load', function() {
		subscriptionHandle = monitorSettingsChange('caption', ['captionEnable'], handleSettingsChange);
		subtitles = document.getElementById('subtitles');
	});

	window.addEventListener('unload', function() {
		if (subscriptionHandle) {
			subscriptionHandle.cancel();
		}
	});
})();
