CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- create schemas
CREATE SCHEMA production;

CREATE SCHEMA sales;

CREATE SCHEMA graphics;

-- create tables
CREATE TABLE graphics.settings (
	setting_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	profile_name VARCHAR (255) NOT NULL,
	visitor_pie1_color varchar (32) NOT NULL,
	visitor_pie2_color varchar (32) NOT NULL,
	visitor_pie3_color varchar (32) NOT NULL
);

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
	zip_code VARCHAR (7),
	thumnail_url VARCHAR (700)
);

CREATE TABLE sales.stakeholders (
	stakeholder_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	stakeholder_name VARCHAR (255) NOT NULL,
	type VARCHAR (50) NOT NULL,
	phone VARCHAR (25) NOT NULL,
	email VARCHAR (255),
	address_line1 VARCHAR (512),
	address_line2 VARCHAR (512),
	city VARCHAR (50),
	state VARCHAR (32),
	zip_code VARCHAR (7),
	thumnail_url VARCHAR (700)
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
	designation VARCHAR(50) NOT NULL,
	manager_id UUID,
	thumnail_url VARCHAR (700),
	FOREIGN KEY (store_id) REFERENCES sales.stores (store_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (manager_id) REFERENCES sales.staffs (staff_id) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE production.products (
	product_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	product_name VARCHAR (255) NOT NULL,
	brand_id UUID NOT NULL,
	category_id UUID NOT NULL,
	model_year SMALLINT NOT NULL,
	stakeholder_id UUID NOT NULL,
	chassi_number VARCHAR (100) NOT NULL,
	colour VARCHAR (40) NOT NULL,
	vehicle_number VARCHAR (40) NOT NULL,
	insuarance_company VARCHAR (100) NOT NULL,
	insuarance_expiry VARCHAR (40) NOT NULL,
	puc_expiry VARCHAR (40) NOT NULL,
	thumnail_url VARCHAR (700),
	FOREIGN KEY (category_id) REFERENCES production.bike_categories (category_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (brand_id) REFERENCES production.brands (brand_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (stakeholder_id) REFERENCES sales.stakeholders (stakeholder_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE sales.transactions (
	transaction_id UUID DEFAULT UUID_GENERATE_V4()::UUID PRIMARY KEY,
	transaction_status VARCHAR(50) NOT NULL,
	transaction_type VARCHAR (25) NOT NULL,
	start_date VARCHAR (40) NOT NULL,
	end_date VARCHAR (40),
	product_id UUID,
	customer_id UUID,
	store_id UUID,
	staff_id UUID,
	invoice_number VARCHAR (25),
	trans_amount DECIMAL (15, 2) NOT NULL,
	paid_amount DECIMAL (15, 2) NOT NULL,
	garage_id UUID,
	van_id UUID,
	payment_mode VARCHAR (25),
	financer VARCHAR (50),
	down_payment DECIMAL (15, 2),
	loan_amount DECIMAL (15, 2),
	stakeholder_id UUID,
	paper_handover_date VARCHAR (40),
	rto_paper_recv_date VARCHAR (40),
	rto_reciept_recv int,
	drc_pending int,
	hp_pending int,
	FOREIGN KEY (customer_id) REFERENCES sales.customers (customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (product_id) REFERENCES production.products (product_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (store_id) REFERENCES sales.stores (store_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (staff_id) REFERENCES sales.staffs (staff_id) ON DELETE NO ACTION ON UPDATE NO ACTION,
	FOREIGN KEY (garage_id) REFERENCES production.garage (garage_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (van_id) REFERENCES production.towing_vans (van_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (stakeholder_id) REFERENCES sales.stakeholders (stakeholder_id) ON DELETE CASCADE ON UPDATE CASCADE
);