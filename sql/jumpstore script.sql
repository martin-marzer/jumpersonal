DROP DATABASE IF EXISTS jumpstore;
CREATE DATABASE jumpstore;
USE jumpstore;

DROP TABLE IF EXISTS jumpstore.brands;

CREATE TABLE jumpstore.brands (
	ID INT(10) NOT NULL auto_increment,
	name varchar(100) NOT NULL,
	createdAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT brands_pk PRIMARY KEY (ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.brands
values (default, "adidas", default), (default, "fila", default), (default, "nike", default), (default, "vans", default)
;



DROP TABLE IF EXISTS jumpstore.sizes;

CREATE TABLE jumpstore.sizes (
	ID INT(10) NOT NULL auto_increment,
	name varchar(100) NOT NULL,
	createdAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT sizes_pk PRIMARY KEY (ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.sizes
values (default, "35-40", default), (default, "40-45", default)
;


DROP TABLE IF EXISTS jumpstore.stocks;

CREATE TABLE jumpstore.stocks (
	ID INT(10) NOT NULL auto_increment,
	quantity int(10) NOT NULL,
	createdAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	modifiedAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT stocks_pk PRIMARY KEY (ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.stocks
values (default, "1", default, default)
;


DROP TABLE IF EXISTS jumpstore.discounts;

CREATE TABLE jumpstore.discounts (
	ID INT(10) NOT NULL auto_increment,
	name varchar(100) NOT NULL,
	discountPercent INT(10) NOT null,
	active boolean not null,
	createdAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	modifiedAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT stocks_pk PRIMARY KEY (ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.discounts
values (default, "sin descuento", 0, false, default, default), (default, "20%", 20, true, default, default) 
;



DROP TABLE IF EXISTS jumpstore.products;

CREATE TABLE jumpstore.products (
	ID INT(10) NOT NULL auto_increment,
	name varchar(100) NOT NULL,
	price int(10) NOT null,
	discountID INT(10) NOT null,
	brandID INT(10) NOT null,
	createdAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NULL DEFAULT NULL,
	stockID INT(10) NOT null,
	description text NOT NULL,
	CONSTRAINT products_pk PRIMARY KEY (ID),
	CONSTRAINT products_FK FOREIGN KEY (discountID) REFERENCES jumpstore.discounts(ID),
	CONSTRAINT products_FK_1 FOREIGN KEY (brandID) REFERENCES jumpstore.brands(ID),
	CONSTRAINT products_FK_2 FOREIGN KEY (stockID) REFERENCES jumpstore.stocks(ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.products
values (default, "Air Jordan 1 Retro Low 'Lakers top 3", 23000, 2, 3, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Nike AIRMAX 97", 20600, 1, 3, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Jordan 1 Retro High White University", 22400, 1, 3, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Jordan 5 Retro Grape Fresh Prince", 22500, 1, 3, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Jordan 11 Retro Win Like 96", 23700, 1, 3, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),

(default, "Adidas Yeezy 350v2 Black", 20400, 1, 1, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Adidas Yeezy 350v2 White", 20400, 1, 1, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Adidas X9000L4 CYBERPUNK 2077", 20900, 1, 1, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Adidas X9000L4", 20900, 1, 1, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Adidas Superstar Sean Wotherspoon", 17200, 1, 1, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Adidas Superstar Melting Sadness", 20200, 1, 1, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),

(default, "Fila archive RJV", 12990, 1, 2, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Fila Flex Shine", 20200, 1, 2, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Fila Renno", 19990, 1, 2, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Fila Renno 90S", 19990, 1, 2, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),

(default, "Vans ERA", 17900, 1, 4, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Vans Old Skool VLT LX", 17900, 1, 4, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Vans Old Skool Supreme", 17900, 1, 4, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." ),
(default, "Vans Old Skool", 18700, 1, 4, default, default, 1, "lorem ipsum etc etc esto es un largo texto escrito y firmado." )
;

ALTER TABLE jumpstore.products DROP FOREIGN KEY products_FK_1;
ALTER TABLE jumpstore.products ADD CONSTRAINT products_FK_1 FOREIGN KEY (brandID) REFERENCES jumpstore.brands(ID) ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE jumpstore.products DROP FOREIGN KEY products_FK_2;
ALTER TABLE jumpstore.products ADD CONSTRAINT products_FK_2 FOREIGN KEY (stockID) REFERENCES jumpstore.stocks(ID) ON DELETE CASCADE ON UPDATE RESTRICT;



DROP TABLE IF EXISTS jumpstore.sizesProducts;

CREATE TABLE jumpstore.sizesProducts (
	ID INT(10) NOT NULL auto_increment,
	sizeID INT(10) NOT null,
	productID INT(10) NOT null,
	CONSTRAINT sizesProducts_pk PRIMARY KEY (ID),
	CONSTRAINT sizesProducts_pk_FK FOREIGN KEY (sizeID) REFERENCES jumpstore.sizes(ID),
	CONSTRAINT sizesProducts_pk_FK_1 FOREIGN KEY (productID) REFERENCES jumpstore.products(ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.sizesProducts
values (default, 1, 1), (default, 1, 2), (default, 1, 3), (default, 1, 4), (default, 1, 5), (default, 1, 6), (default, 1, 7),(default, 1, 8),
(default, 1, 9), (default, 1, 10), (default, 1, 11), (default, 1, 12), (default, 1, 13), (default, 1, 14), (default, 1, 15), (default, 1, 16),
(default, 1, 17), (default, 1, 18), (default, 1, 19)
;

ALTER TABLE jumpstore.sizesproducts DROP FOREIGN KEY sizesProducts_pk_FK;
ALTER TABLE jumpstore.sizesproducts ADD CONSTRAINT sizesProducts_pk_FK FOREIGN KEY (sizeID) REFERENCES jumpstore.sizes(ID) ON DELETE RESTRICT ON UPDATE RESTRICT;
ALTER TABLE jumpstore.sizesproducts DROP FOREIGN KEY sizesProducts_pk_FK_1;
ALTER TABLE jumpstore.sizesproducts ADD CONSTRAINT sizesProducts_pk_FK_1 FOREIGN KEY (productID) REFERENCES jumpstore.products(ID) ON DELETE CASCADE ON UPDATE RESTRICT;



DROP TABLE IF EXISTS jumpstore.imagesProducts;

CREATE TABLE jumpstore.imagesProducts (
	ID INT(10) NOT NULL auto_increment,
	url varchar(200) NOT NULL,
	productsID int(10) NOT NULL,
	CONSTRAINT imagesProduct_pk PRIMARY KEY (ID),
	CONSTRAINT imagesProduct_FK FOREIGN KEY (productsID) REFERENCES jumpstore.products(ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.imagesProducts
values (default, "airjordan1retro.jpeg", 1), (default, "airjordan1retro2.jpeg", 1), (default, "airjordan1retro3.jpeg", 1),
(default, "airmax97-1.jpg", 2), (default, "airmax97-2.jpg", 2), (default, "airmax97-3.jpg", 2),
(default, "jordan1retro.jpeg", 3), (default, "jordan1retro2.jpeg", 3), (default, "jordan1retro3.jpeg", 3),
(default, "jordan5retro.jpeg", 4), (default, "jordan5retro2.jpeg", 4), (default, "jordan5retro3.jpeg", 4),
(default, "jordan11retro.jpeg", 5), (default, "jordan11retro2.jpeg", 5), (default, "jordan11retro3.jpeg", 5),
(default, "Adidas Yeezyblack1.jpg", 6), (default, "Adidas Yeezyblack2.jpg", 6), (default, "Adidas Yeezyblack3.jpg", 6),
(default, "Adidas Yeezy1.jpg", 7), (default, "Adidas Yeezy2.jpg", 7), (default, "Adidas Yeezy3.jpg", 7),
(default, "adidascyberpunk1.jpeg", 8), (default, "adidascyberpunk2.jpeg", 8), (default, "adidascyberpunk3.jpeg", 8),
(default, "Adidas X9000L4-1.jpeg", 9), (default, "Adidas X9000L4-2.jpeg", 9), (default, "Adidas X9000L4-3.jpeg", 9),
(default, "adidasSuperstar1.jpeg", 10), (default, "adidasSuperstar2.jpeg", 10), (default, "adidasSuperstar3.jpeg", 10),
(default, "adidasmelting1.jpeg", 11), (default, "adidasmelting2.jpeg", 11), (default, "adidasmelting3.jpeg", 11),
(default, "fila archive-1.jpg", 12), (default, "fila archive-2.jpg", 12), (default, "fila archive-3.jpg", 12),
(default, "fila flex1.jpg", 13), (default, "fila flex2.jpg", 13), (default, "fila flex3.jpg", 13),
(default, "fila renno-1.jpg", 14), (default, "fila renno-2.jpg", 14), (default, "fila renno-3.jpg", 14),
(default, "fila renno90s-1.jpg", 15), (default, "fila renno90s-2.jpg", 15), (default, "fila renno90s-3.jpg", 15),
(default, "vans era1.jpeg", 16), (default, "vans era2.jpeg", 16), (default, "vans era3.jpeg", 16),
(default, "vans oldskool vlt1.jpg", 17), (default, "vans oldskool vlt2.jpg", 17), (default, "vans oldskool vlt3.jpg", 17),
(default, "vans oldskool supreme1.jpeg", 18), (default, "vans oldskool supreme2.jpeg", 18), (default, "vans oldskool supreme3.jpeg", 18),
(default, "vans oldskool1.jpeg", 19), (default, "vans oldskool2.jpeg", 19), (default, "vans oldskool3.jpeg", 19)
;

DROP TABLE IF EXISTS jumpstore.users;

CREATE TABLE jumpstore.users (
	ID INT(10) NOT NULL AUTO_INCREMENT,
	username varchar(20) NOT NULL,
	email varchar(30) NOT NULL,
	password text NOT NULL,
	rol boolean not null,
	createdAt timestamp not NULL DEFAULT CURRENT_TIMESTAMP,
	updatedAt timestamp NULL DEFAULT NULL,
	CONSTRAINT users_pk PRIMARY KEY (ID),
	UNIQUE (email)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

insert into jumpstore.users
values (default, "martin", "martinvazquez1104@gmail.com", "$2a$10$pLgJLTzebjs0PnbeyAh1WeuImVh6mLMhqiOc5iAUwKjDp3FCJqTXC", true, default, default),
(default, "ale xd", "alegon2772@gmail.com", "$2a$10$USkH5FPwHmGITcJR8.7./O13qKPSBkZfPTdTYVBiHGhJVQnuygd5i", true, default, default),
(default, "Alesan", "alegonzalez1@hotmail.es", "$2a$10$dNnl8/WRtbAecYjVB6y3rOlI1cL.x/xiiS8RMwaO85sVu.JArmc3S", true, default, default)
;


DROP TABLE IF EXISTS jumpstore.userProducts;

CREATE TABLE jumpstore.userProducts (
	ID INT(10) NOT NULL AUTO_INCREMENT,
	userID INT(10) NOT null,
	productID INT(10) NOT null,
	CONSTRAINT userProducts_pk PRIMARY KEY (ID),
	CONSTRAINT userProducts_pk_FK FOREIGN KEY (userID) REFERENCES jumpstore.users(ID),
	CONSTRAINT userProducts_pk_FK_1 FOREIGN KEY (productID) REFERENCES jumpstore.products(ID)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



