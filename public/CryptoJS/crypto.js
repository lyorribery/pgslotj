function encrypt(plaintText, key) {
    // ECB加密
    var options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
        // 加密
    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
    var encryptedBase64Str = encryptedData.toString();
    return encryptedBase64Str
}

function decrypt(encryptedBase64Str, key) {
    var options = {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
        // 解密
    var decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, options);
    // 解密后，需要按照Utf8的方式将明文转位字符串
    var decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
    return decryptedStr
}