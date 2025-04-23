const generateLicenseKey = require("./src/utils/lisckey");

const createTemp= async (req, res, next) => {

    const licenseKey = generateLicenseKey("hammad7277@gmail.com");
    console.log(licenseKey)

}
createTemp()