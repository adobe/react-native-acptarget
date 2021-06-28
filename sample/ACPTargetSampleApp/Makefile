sync:
	(cd ../../ && rm adobe-react-native-acptarget-2.0.0.tgz || true)
	(cd ../../ && npm pack)
	(rm -rf node_modules/@adobe/react-native-acptarget || true)
	(rm package-lock.json || true)
	(npm cache clean --force && npm install)