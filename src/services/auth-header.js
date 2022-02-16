import { useAuth } from "../auth";

export default function authHeader() {
    const user = (useAuth()).user;
    if (user && user.accessToken) {
        return { Authorization: `Bearer ${user.accessToken}`}
    } else {
        return {};
    }
}