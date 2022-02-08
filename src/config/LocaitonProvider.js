import { PermissionsAndroid } from 'react-native';

async function requestCameraPermisiion() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                'title': 'Homevery App',
                'message': 'Homevery App access to your Camera '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
            return true
        } else {
            console.log("camera permission denied")
            return false

        }
    } catch (err) {
        console.warn("Warn", err)
    }
}

async function askAllPermision() {
    try {
        const granted = await PermissionsAndroid.requestMultiple(
            [
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE],
            {
                'title': 'Homevery App',
                'message': 'Homevery App wants these permission '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
            return true
        } else {
            console.log("camera permission denied")
            return false

        }
    } catch (err) {
        console.warn("Warn", err)
    }
}

export {

    requestCameraPermisiion,
    askAllPermision
}
