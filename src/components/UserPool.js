import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-central-1_5VFkp7Age",
    ClientId: "34fdl3rr8r40qk2p615mepdt12",
};

export default new CognitoUserPool(poolData);
