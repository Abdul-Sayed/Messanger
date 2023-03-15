export { default } from "next-auth/middleware";

// Secures the homepage; routes the /auth/signin if not authenticated
export const config = { matcher: ["/"] };
