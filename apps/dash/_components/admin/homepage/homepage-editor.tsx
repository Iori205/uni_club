"use client";
import { useState } from "react";
export function HomepageEditor() {
  const [saved, setSaved] = useState(false);
  return (
    <section>
      <p className="text-sm font-medium text-primary">Вэб сайт тохиргоо</p>
      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight">
        Нүүр хуудас
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Нүүр хуудасны агуулгаа эндээс шинэчилнэ.
      </p>
      <div className="mt-8 max-w-3xl rounded-xl border border-border bg-card p-6">
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm font-medium">
            Нүүр хуудасны гарчиг
            <input
              defaultValue="Бизнесийн мэдлэг, ирээдүйн манлайлал"
              className="h-11 rounded-lg border border-input bg-background px-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Товч танилцуулга
            <textarea
              defaultValue="МУИС-ийн Бизнесийн сургууль нь бизнесийн боловсрол, судалгааны тэргүүлэх төв юм."
              className="min-h-28 rounded-lg border border-input bg-background p-3 outline-none focus:ring-4 focus:ring-primary/20"
            />
          </label>
          <button
            onClick={() => setSaved(true)}
            className="w-fit rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            {saved ? "Хадгалагдлаа" : "Өөрчлөлт хадгалах"}
          </button>
        </div>
      </div>
    </section>
  );
}
export default HomepageEditor;
