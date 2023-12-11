-- Region 
INSERT INTO region(region,code,status) VALUES("Norte","N",1);
INSERT INTO region(region,code,status) VALUES("Sur","S",1);
INSERT INTO region(region,code,status) VALUES("Noroeste","NE",0);

SELECT * FROM region;
-- Category
INSERT INTO category(category, code, status) VALUES("Instrumentos", "Instru", 1);
INSERT INTO category(category, code, status) VALUES("Accesorios", "Accessories", 1);
INSERT INTO category(category, code, status) VALUES("Merchandising", "Merchandise", 1);
INSERT INTO category(category, code, status) VALUES("RecordedMusic", "RecordedMusic", 1);

SELECT * FROM category;

-- Customer
INSERT INTO customer_image(image, status) VALUES('img1', 1);
INSERT INTO customer(name, surname, rfc, mail, address, region_id, customer_image_id, status) VALUES('Iván', 'Saavedra', 'SAAI920101A01', 'ivan.saavedra@ciencias.unam.mx', 'Av. Universidad 3000', 1, 2, 1);

SELECT * FROM customer;

-- Product
 -- Para la categoría con category_id = 1
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890127', 'Guitarras electroacústica', 'Guitarra-electroacústica-Ground-YWAG-902E-N', 7000.00, 27, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890128', 'Guitarra Acústica', 'Guitarra acústica modelo XYZ', 8000.00, 15, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890129', 'Bajo Eléctrico', 'Bajo eléctrico de 4 cuerdas', 12000.00, 10, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890130', 'Teclado Digital', 'Teclado digital de 88 teclas', 6000.00, 20, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890131', 'Batería Completa', 'Batería completa con platillos y pedal', 15000.00, 8, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890132', 'Saxofón Alto', 'Saxofón alto profesional', 9000.00, 12, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890133', 'Violín de Estudio', 'Violín de estudio con estuche', 3500.00, 18, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890134', 'Flauta Travesera', 'Flauta travesera plateada', 2500.00, 25, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890135', 'Guitarra Eléctrica', 'Guitarra eléctrica modelo Rockstar', 9000.00, 15, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890136', 'Acordeón de Botones', 'Acordeón de botones de 31 teclas', 7000.00, 10, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890137', 'Charango', 'Charango profesional hecho a mano', 4000.00, 22, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567290127', 'Batería Acústica', 'Batería Acústica Musical 5 piezas Altura Ajustable Aro negro', 7800.00, 27, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1235567890128', 'Guitarra Eléctrica', 'Guitarra Eléctrica Modelo X1000', 9500.00, 15, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1238567890129', 'Bajo Eléctrico de 5 Cuerdas', 'Bajo Eléctrico de 5 Cuerdas Profesional', 13500.00, 10, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1534567890130', 'Teclado Digital Avanzado', 'Teclado Digital de 88 Teclas con Funciones Avanzadas', 8000.00, 20, 1, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1434567890132', 'Trompeta Profesional', 'Trompeta Profesional de Latón con Estuche', 11000.00, 12, 1, 1);

-- category 2
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1834567890131', 'Set de Platillos Profesionales', 'Set de Platillos para Batería Profesionales', 16000.00, 8, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1934567890132', 'Baquetas de Batería Premium', 'Baquetas de Batería Profesionales de Madera', 50.00, 50, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1204567890133', 'Cuerdas para Guitarra Eléctrica', 'Set de Cuerdas de Acero para Guitarra Eléctrica', 15.00, 100, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234867890134', 'Afinador Cromático de Pinza', 'Afinador Digital de Pinza para Instrumentos', 30.00, 30, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1284567890135', 'Soporte para Teclado Doble', 'Soporte Ajustable para Dos Teclados', 80.00, 20, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234267890136', 'Estuche Rígido para Guitarra Acústica', 'Estuche de Protección para Guitarra Acústica', 120.00, 15, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234467890137', 'Cables de Conexión Profesionales', 'Pack de 3 Cables de Conexión para Instrumentos', 40.00, 40, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1231567890138', 'Puas para Guitarra', 'Pack de 12 Puas de Diferentes Grosores', 5.00, 200, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890139', 'Aceite Lubricante para Trombón', 'Aceite Especial para Trombón y Otros Metales', 12.00, 25, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1233567890140', 'Banqueta Ajustable para Piano', 'Banqueta Acolchada Ajustable en Altura para Piano', 60.00, 10, 2, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890141', 'Caja de Ritmos Electrónica', 'Caja de Ritmos Programable con Funciones Avanzadas', 150.00, 8, 2, 1);

-- category 3

 INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1235587890131', 'Cuadro Dua Lipa', 'Cuadro Decorativo Canvas Dua Lipa ', 1000.00, 8, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890142', 'Camiseta Beatles', 'Camiseta Negra con Logo de los Beatles', 25.00, 50, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890143', 'Taza Pink Floyd', 'Taza con Diseño de Pink Floyd y Mensaje', 15.00, 30, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890144', 'Póster Rolling Stones', 'Póster de los Rolling Stones con Marco', 35.00, 20, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567890145', 'Gorra Nirvana', 'Gorra con Logo de Nirvana Bordado', 20.00, 40, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234566890146', 'Llavero Queen', 'Llavero con Logo de Queen en Metal', 8.00, 100, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234565890147', 'Almohada Bob Marley', 'Almohada con Diseño de Bob Marley', 30.00, 15, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234564890148', 'Bufanda AC/DC', 'Bufanda con Estampado de AC/DC', 18.00, 25, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234563890149', 'Mochila Jimi Hendrix', 'Mochila con Imagen de Jimi Hendrix', 40.00, 10, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234562890150', 'Adhesivo Led Zeppelin', 'Adhesivo para Portátil con Logo de Led Zeppelin', 5.00, 200, 3, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234561890151', 'Puzzle Elvis Presley', 'Puzzle de 1000 Piezas con Imagen de Elvis Presley', 22.00, 12, 3, 1);

-- Cat<egoría con category_id = 4
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234569890152', 'The Beatles – Abbey Road', 'Álbum de CD con Edición Especial', 1800.00, 12, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234566890153', 'Adele – 25', 'Álbum de CD con Canciones Populares', 1600.00, 15, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234568890154', 'Pink Floyd – The Dark Side of the Moon', 'Álbum de CD Remasterizado', 2000.00, 10, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234564890155', 'Michael Jackson – Thriller', 'Álbum de CD con Clásicos del Pop', 2200.00, 8, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234563890156', 'Queen – Greatest Hits', 'Álbum de CD con los Mejores Éxitos', 1900.00, 11, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567490157', 'Ed Sheeran – ÷ (Divide)', 'Álbum de CD con Pop Contemporáneo', 1700.00, 14, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567290158', 'Coldplay – A Head Full of Dreams', 'Álbum de CD con Música Alternativa', 2000.00, 9, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567790159', 'Bob Marley – Legend', 'Álbum de CD con los Grandes Éxitos', 2200.00, 7, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567690160', 'Taylor Swift – 1989', 'Álbum de CD con Pop y Country', 1800.00, 13, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567590161', 'U2 – The Joshua Tree', 'Álbum de CD con Rock Alternativo', 2100.00, 10, 4, 1);
INSERT INTO product (gtin, product, description, price, stock, category_id, status) VALUES ('1234567490131', 'Tainy – Data', ' Álbum De CD Premium TL03 ', 1500.00, 8, 4, 1);

SELECT * FROM product;

