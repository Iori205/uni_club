import { Settings } from "lucide-react";

export function SettingsView() {
  return (
    <section>
      <p className="text-sm font-medium text-primary">Вэб сайт тохиргоо</p>
      <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight">
        Тохиргоо
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Админ эрх, мэдэгдэл, бусад системийн тохиргоо.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border bg-card px-6 py-16 text-center">
        <Settings className="text-muted-foreground" size={30} />
        <h3 className="font-serif text-xl font-bold">Тун удахгүй</h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Энэ хэсгийн агуулга (эрхийн удирдлага, мэдэгдэл гэх мэт) хараахан
          тодорхойлогдоогүй байна.
        </p>
      </div>
    </section>
  );
}
export default SettingsView;
