import { expect } from "chai";
import jsonProvider from "../../util/json-provider";

describe ("jsonProvider", () => {
    it ("should return object from config files, supports custom paths (like 'config.js')", () => {
        const finalObject = {
            dogName: "Rex",
            teamName: "team1",
            userName: "user1",
        };

        return jsonProvider(["src/util/__tests__/mock/app/universal/*"], ["config.js"]).then((object) => {
            expect(object).to.be.deep.equal(finalObject);
        });
    });

    it ("should return empty object if files do not exists", () => {
        return jsonProvider(["a/b/c"], ["js"]).then((data) => expect(data).to.be.deep.equal({}));
    });

    it ("should combine configurations from different extensions", () => {
        const finalObject = {
            dogName: "Rex",
            fromJSON: true,
            teamName: "team1",
            userName: "user1",
        };

        return jsonProvider(["src/util/__tests__/mock/app/universal/*"], ["config.js", "json"]).then((object) => {
            expect(object).to.be.deep.equal(finalObject);
        });
    });
});
