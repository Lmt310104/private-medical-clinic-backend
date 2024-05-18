import authController from "../controllers/authController";
import db from "../models/index";

jest.mock("../models/index");

const req = {
    isAuthenticated: jest.fn().mockReturnValue(true),
    user: {
        user: {
            id: 1
        },
        refreshToken: "required",
    }
}
const res = {
    status: jest.fn((x) => x),
    json: jest.fn((x) => x)
}
describe("isSuccessLogin", () => {
    it("should send a status code of 401 when user not found", async () => {
        db.users.findOne.mockReturnValueOnce(undefined);
        await authController.isSuccessLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
    it("should send a status code of 200 when login success", async () => {
        db.users.findOne.mockReturnValueOnce({
            refreshToken: "required",
        });
        await authController.isSuccessLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "You are logged in", user: req.user });
    });
});