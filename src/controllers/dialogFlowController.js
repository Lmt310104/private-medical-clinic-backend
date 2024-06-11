const dialogflow = require("@google-cloud/dialogflow");
import asyncHandler from "express-async-handler";

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const PROJECTID = CREDENTIALS.project_id;

const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS["private_key"],
    client_email: CREDENTIALS["client_email"],
  },
};

const sessionClient = new dialogflow.SessionsClient(CONFIGURATION);

const detectIntent = async (languageCode, queryText, sessionId) => {
  let sessionPath = sessionClient.projectAgentSessionPath(PROJECTID, sessionId);

  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult;

  return {
    response: result.fulfillmentText,
  };
};

const chatBotMessage = asyncHandler(async (req, res, next) => {
  try {
    const languageCode = req.body.languageCode;
    const queryText = req.body.queryText;
    const sessionId = req.body.sessionId;

    const responseData = await detectIntent(languageCode, queryText, sessionId);

    res.status(200).json({
      status: res.statusCode,
      success: "success",
      data: responseData.response,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default { chatBotMessage };
