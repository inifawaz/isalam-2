export function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/admin")) {
        if (req.cookies.get("user") && req.cookies.get("token")) {
            const user = JSON.parse(req.cookies.get("user"));
            if (user.role != "admin") {
                console.log("bukan admin");
                return Response.redirect(new URL("/", req.url));
            }
        } else {
            return Response.redirect(new URL("/", req.url));
        }
    }
}
