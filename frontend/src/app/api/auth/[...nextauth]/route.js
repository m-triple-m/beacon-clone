import NextAuth from "next-auth/next";

const authOptions = {}
const handler = NextAuth({

});

export { handler as GET , handler as POST}