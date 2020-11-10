import Assert from "assert";
import Mocha from "mocha";

Mocha.describe(
    "Typescript usage suite",
    () =>
    {
        Mocha.it(
            "should be able to execute a test",
            () =>
            {
                Assert.strictEqual(true, true);
            }
        );
    }
);
