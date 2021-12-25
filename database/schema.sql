CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create schemas
CREATE SCHEMA production;

CREATE SCHEMA sales;

-- create tables
CREATE TABLE production.bike_categories (
	category_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	category_name VARCHAR (255) NOT NULL
);

CREATE TABLE production.brands (
	brand_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	brand_name VARCHAR (255) NOT NULL
);

CREATE TABLE production.towing_vans (
	van_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	van_name VARCHAR (255) NOT NULL,
	driver_name VARCHAR (255) NOT NULL,
	van_number VARCHAR (15) NOT NULL
);

CREATE TABLE sales.customers (
	customer_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	first_name VARCHAR (255) NOT NULL,
	last_name VARCHAR (255) NOT NULL,
	phone VARCHAR (25),
	email VARCHAR (255) NOT NULL,
	address_line1 VARCHAR (512),
	address_line2 VARCHAR (512),
	city VARCHAR (50),
	state VARCHAR (32),
	zip_code VARCHAR (7)
);

CREATE TABLE sales.stores (
	store_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	store_name VARCHAR (255) NOT NULL,
	phone VARCHAR (25),
	email VARCHAR (255),
	address_line1 VARCHAR (512),
	address_line2 VARCHAR (512),
	city VARCHAR (255),
	state VARCHAR (32),
	zip_code VARCHAR (7)
);

CREATE TABLE production.garage (
	garage_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	garage_name VARCHAR (255) NOT NULL,
	phone VARCHAR (25),
	email VARCHAR (255),
	address_line1 VARCHAR (512),
	address_line2 VARCHAR (512),
	city VARCHAR (50),
	state VARCHAR (32),
	zip_code VARCHAR (7)
);

CREATE TABLE sales.staffs (
	staff_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	first_name VARCHAR (50) NOT NULL,
	last_name VARCHAR (50) NOT NULL,
	email VARCHAR (255) NOT NULL UNIQUE,
	phone VARCHAR (25),
	address_line1 VARCHAR (512),
	address_line2 VARCHAR (512),
	city VARCHAR (50),
	state VARCHAR (32),
	active int NOT NULL,
	store_id UUID NOT NULL,
	manager_id UUID DEFAULT UUID_GENERATE_V4()::UUID,
	FOREIGN KEY (store_id) REFERENCES sales.stores (store_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (manager_id) REFERENCES sales.staffs (staff_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE production.products (
	product_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	product_name VARCHAR (255) NOT NULL,
	brand_id UUID NOT NULL,
	category_id UUID NOT NULL,
	model_year SMALLINT NOT NULL,
	list_price DECIMAL (10, 2) NOT NULL,
	model_number VARCHAR (40) NOT NULL,
	owner_id UUID NOT NULL,
	rc_number VARCHAR (100) NOT NULL,
	chassi_number VARCHAR (100) NOT NULL,
	colour VARCHAR (40) NOT NULL,
	vehicle_number VARCHAR (40) NOT NULL,
	insuarance_company VARCHAR (100) NOT NULL,
	insuarance_expiry DATE,
	puc_expiry DATE NOT NULL,
	FOREIGN KEY (category_id) REFERENCES production.bike_categories (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (brand_id) REFERENCES production.brands (brand_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (owner_id) REFERENCES sales.customers (customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE sales.transactions (
	transaction_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	customer_id UUID,
	product_id UUID NOT NULL,
	order_status int NOT NULL,
	transaction_type VARCHAR (25),
	start_date DATE NOT NULL,
	end_date DATE,
	store_id UUID NOT NULL,
	staff_id UUID,
	invoice_number VARCHAR (25),
	cost DECIMAL (10, 2) NOT NULL,
	garage_id UUID,
	van_id UUID,
	payment_mode VARCHAR (25),
	FOREIGN KEY (customer_id) REFERENCES sales.customers (customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (product_id) REFERENCES production.products (product_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (store_id) REFERENCES sales.stores (store_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (staff_id) REFERENCES sales.staffs (staff_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (garage_id) REFERENCES production.garage (garage_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (van_id) REFERENCES production.towing_vans (van_id) ON DELETE CASCADE ON UPDATE CASCADE
);
