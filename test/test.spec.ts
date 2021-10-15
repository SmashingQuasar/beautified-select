import { strictEqual } from "assert";
import * as Mocha from "mocha";

Mocha.describe(
	"Typescript usage suite",
	() =>
	{
		Mocha.it(
			"should be able to execute a test",
			() =>
			{
				strictEqual(true, true);
			}
		);
	}
);
