BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "CartProducts" (
	"id"	INTEGER,
	"cart_id"	INTEGER NOT NULL,
	"product_id"	INTEGER NOT NULL,
	"quantity"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("cart_id") REFERENCES "Carts"("id"),
	FOREIGN KEY("product_id") REFERENCES "Products"("id")
);
CREATE TABLE IF NOT EXISTS "Carts" (
	"id"	INTEGER,
	"status"	TEXT NOT NULL CHECK("status" IN ('new', 'abandoned', 'purchased')),
	"created_at"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"user_id"	INTEGER NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("user_id") REFERENCES "Users"("id")
);
CREATE TABLE IF NOT EXISTS "Categories" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL UNIQUE,
	"priority_level"	INTEGER,
	PRIMARY KEY("id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Products" (
	"id"	INTEGER,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"image_url"	TEXT,
	"price"	REAL NOT NULL,
	"category_id"	INTEGER NOT NULL,
	"featured"	INTEGER DEFAULT 0,
	PRIMARY KEY("id" AUTOINCREMENT),
	FOREIGN KEY("category_id") REFERENCES "Categories"("id")
);
CREATE TABLE IF NOT EXISTS "Users" (
	"id"	INTEGER,
	"created_at"	TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	"name"	TEXT NOT NULL,
	"email"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"user_type"	TEXT NOT NULL CHECK("user_type" IN ('admin', 'shopper')),
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "Categories" VALUES (1,'Graphics Cards',1);
INSERT INTO "Categories" VALUES (2,'Keyboards',2);
INSERT INTO "Categories" VALUES (3,'Mice',3);
INSERT INTO "Products" VALUES (1,'GeForce RTX 4090','The latest graphics card','images/rtx4090.jpg',1499.99,1,1);
INSERT INTO "Products" VALUES (2,'Gaming Keyboard','RGB Mechanical Keyboard','images/gprokeyboard.png',99.99,2,0);
INSERT INTO "Products" VALUES (3,'Gaming Mouse','Lightweight precision mouse','images/gpromouse.png',59.99,3,0);
COMMIT;