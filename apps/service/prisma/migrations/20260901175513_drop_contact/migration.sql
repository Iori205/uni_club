-- "БСОН-д нэгдэх" (Join) feature бүрэн устсаны дараа Contact model/table нь
-- цорын ганц хэрэглэгддэг байсан зорилго (Join form submission -> Dash
-- notification bell) хэрэггүй болсон тул устгаж байна.
--
-- Codebase-ийг бүрнээр нь шалгасан: Contact model нь News/Event-тэй ямар ч
-- foreign key/relation-гүй, өөр ямар ч module/feature ашигладаггүй тул
-- аюулгүйгээр устгаж болно.
DROP TABLE "Contact";
