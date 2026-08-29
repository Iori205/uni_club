import { clerkMiddleware } from "@clerk/nextjs/server";

// apps/dash бүхэлдээ admin панель тул нийтэд нээлттэй route байхгүй — бүх хуудас Clerk login шаардана.
// Next.js 16-с хойш "middleware" file convention нь "proxy"-руу нэрлэгдсэн (энэ файлын нэр/export нь proxy).
export default clerkMiddleware(async (auth) => {
  await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
