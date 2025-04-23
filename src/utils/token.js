const jwt = require('jsonwebtoken');
const secretKey = "f6f83d91b905e4f25d58f7b6fbb4b9f8e3f34516c7d8a33f4a1adfe442cd8edb9e59fe717f64f575160cc0f85b09c84b";
// Function to generate a license key based on the machine ID
function generateToken(user) {
    // Validate the machineId input
    const payload = {
       user:user, // License key// Private key (could be encrypted or encoded for security)
        generatedTime:Date.now() // Expiration set for 1 hour from now
    };

    // Create the JWT token
    const token = jwt.sign(payload, secretKey);

    console.log("Generated JWT Token:", token);
    return token;
}

const verifyToken = (req, res, next) => {
  console.log(req.body)
  try {
    // Replace 'your-secret-key' with your actual secret key
    const decoded = jwt.verify(req.body.token, secretKey); // This will also verify the signature
    console.log(decoded); // Logs the verified payload

    req.body=decoded
    // No response here, just call next to pass control to the next middleware
    return res.status(200).json({ 'message': 'authorized','user':decoded });  // You might want to send a 401 for an invalid token

  } catch (error) {
    console.log('Invalid token:', error);
    // Do not send a response here, just let the next middleware handle it
    return res.status(401).json({ 'data': 'invalid' });  // You might want to send a 401 for an invalid token
  }
};

const verifyTokenAndGetUser = (req, res, next) => {
  console.log(req.body)
  try {
    // Replace 'your-secret-key' with your actual secret key
    const decoded = jwt.verify(req.body.token, secretKey); // This will also verify the signature
    console.log(decoded); // Logs the verified payload

    req.body = { ...req.body, ...decoded };
    console.log(req.body)
    // No response here, just call next to pass control to the next middleware
next()
  } catch (error) {
    console.log('Invalid token:', error);
    // Do not send a response here, just let the next middleware handle it
    return res.status(401).json({ 'data': 'invalid' });  // You might want to send a 401 for an invalid token
  }
};
function affToken(payload) {
  // Validate the machineId input
  console.log(payload)

// Sign the token with a 3-hour expiration time
const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });

  return token;
}




// Export the function using CommonJS
module.exports = {generateToken,verifyToken,affToken,verifyTokenAndGetUser};




