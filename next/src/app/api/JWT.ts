import { JWT } from "quanvnjwt";

const SECRET = process.env.JWT_SECRET??""

export const jwt = new JWT(SECRET)