import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "XXX",
    ClientId: "XXX",
};

export default new CognitoUserPool(poolData);
