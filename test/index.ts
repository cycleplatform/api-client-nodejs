import { config } from "dotenv";
import { testAccount } from "./account";
import { passwordGrant } from "./auth/PasswordGrant";

config({path: "./config.env"});

passwordGrant();
testAccount();
