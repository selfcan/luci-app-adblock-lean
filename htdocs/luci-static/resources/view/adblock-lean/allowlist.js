'use strict';
'require view';
'require fs';
'require ui';

return view.extend({
	load: function () {
		return Promise.all([
			L.resolveDefault(fs.stat('/root/adblock-lean/allowlist'), {}),
			L.resolveDefault(fs.read_direct('/root/adblock-lean/allowlist'), '')
		]);
	},
	handleSave: function (ev) {
		// Remove any existing notifications
		var notifications = document.getElementsByClassName("alert-message");
		for (var i = 0; i < notifications.length; i++) {
			notifications[i].style.display = 'none';
		}

		let value = ((document.querySelector('textarea').value || '').trim().toLowerCase().replace(/\r\n/g, '\n')) + '\n';
		return fs.write('/root/adblock-lean/allowlist', value)
			.then(function () {
				document.querySelector('textarea').value = value;
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				ui.addNotification(null, E('p', _('Allowlist modifications have been saved, reload adblock-lean for changes to take effect.')), 'success');
			}).catch(function (e) {
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				ui.addNotification(null, E('p', _('Unable to save modifications: %s').format(e.message)), 'error');
			});
	},
	render: function (allowlist) {
		if (allowlist[0].size >= 100000) {
			document.body.scrollTop = document.documentElement.scrollTop = 0;
			ui.addNotification(null, E('p', _('The allowlist is too big, unable to save modifications.')), 'error');
		}
		return E([
			E('p', {},
				_('This is the local adblock-lean allowlist that will permit certain domain names.<br /> \
				<em><b>Please note:</b></em> add only exactly one domain name per line.')),
			E('p', {},
				E('textarea', {
					'style': 'width: 100% !important; padding: 5px; font-family: monospace',
					'spellcheck': 'false',
					'wrap': 'off',
					'rows': 25
				}, [allowlist[1] ?? ''])
			)
		]);
	},
	handleSaveApply: null,
	handleReset: null
});
