--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2022-01-02 13:26:06

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE "MH47_BikePoint";
--
-- TOC entry 3401 (class 1262 OID 24987)
-- Name: MH47_BikePoint; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "MH47_BikePoint" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE "MH47_BikePoint" OWNER TO postgres;

\connect "MH47_BikePoint"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 24988)
-- Name: production; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA production;


ALTER SCHEMA production OWNER TO postgres;

--
-- TOC entry 7 (class 2615 OID 24989)
-- Name: sales; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA sales;


ALTER SCHEMA sales OWNER TO postgres;

--
-- TOC entry 2 (class 3079 OID 24990)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3402 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 212 (class 1259 OID 25001)
-- Name: bike_categories; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.bike_categories (
    category_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_name character varying(255) NOT NULL
);


ALTER TABLE production.bike_categories OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 25005)
-- Name: brands; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.brands (
    brand_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    brand_name character varying(255) NOT NULL
);


ALTER TABLE production.brands OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 25009)
-- Name: garage; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.garage (
    garage_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    garage_name character varying(255) NOT NULL,
    phone character varying(25),
    email character varying(255),
    address_line1 character varying(512),
    address_line2 character varying(512),
    city character varying(50),
    state character varying(32),
    zip_code character varying(7)
);


ALTER TABLE production.garage OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 25015)
-- Name: products; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.products (
    product_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_name character varying(255) NOT NULL,
    brand_id uuid NOT NULL,
    category_id uuid NOT NULL,
    model_year smallint NOT NULL,
    list_price numeric(10,2) NOT NULL,
    model_number character varying(40) NOT NULL,
    owner_id uuid NOT NULL,
    rc_number character varying(100) NOT NULL,
    chassi_number character varying(100) NOT NULL,
    colour character varying(40) NOT NULL,
    vehicle_number character varying(40) NOT NULL,
    insuarance_company character varying(100) NOT NULL,
    insuarance_expiry date,
    puc_expiry date NOT NULL,
    thumnail_url character varying(700)
);


ALTER TABLE production.products OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 25021)
-- Name: towing_vans; Type: TABLE; Schema: production; Owner: postgres
--

CREATE TABLE production.towing_vans (
    van_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    van_name character varying(255) NOT NULL,
    driver_name character varying(255) NOT NULL,
    van_number character varying(15) NOT NULL
);


ALTER TABLE production.towing_vans OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 25027)
-- Name: customers; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.customers (
    customer_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    phone character varying(25),
    email character varying(255) NOT NULL,
    address_line1 character varying(512),
    address_line2 character varying(512),
    city character varying(50),
    state character varying(32),
    zip_code character varying(7),
    thumnail_url character varying(700)
);


ALTER TABLE sales.customers OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 25033)
-- Name: staffs; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.staffs (
    staff_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(25),
    address_line1 character varying(512),
    address_line2 character varying(512),
    city character varying(50),
    state character varying(32),
    active integer NOT NULL,
    store_id uuid NOT NULL,
    designation character varying(50) NOT NULL,
    manager_id uuid,
    thumnail_url character varying(700)
);


ALTER TABLE sales.staffs OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 25039)
-- Name: stores; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.stores (
    store_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    store_name character varying(255) NOT NULL,
    phone character varying(25),
    email character varying(255),
    address_line1 character varying(512),
    address_line2 character varying(512),
    city character varying(255),
    state character varying(32),
    zip_code character varying(7)
);


ALTER TABLE sales.stores OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25045)
-- Name: transactions; Type: TABLE; Schema: sales; Owner: postgres
--

CREATE TABLE sales.transactions (
    transaction_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    customer_id uuid,
    product_id uuid NOT NULL,
    order_status integer NOT NULL,
    transaction_type character varying(25),
    start_date date NOT NULL,
    end_date date,
    store_id uuid NOT NULL,
    staff_id uuid,
    invoice_number character varying(25),
    cost numeric(10,2) NOT NULL,
    garage_id uuid,
    van_id uuid,
    payment_mode character varying(25)
);


ALTER TABLE sales.transactions OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 25001)
-- Dependencies: 212
-- Data for Name: bike_categories; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.bike_categories (category_id, category_name) VALUES ('76cbbe77-21b7-471b-b237-5af55324adab', 'With Gear');
INSERT INTO production.bike_categories (category_id, category_name) VALUES ('279a83d5-4663-4244-b771-335fc60f50f6', 'Without Gear');
INSERT INTO production.bike_categories (category_id, category_name) VALUES ('30fef00c-22d9-42e8-b92b-c1d47d43e8dc', 'E-Bike');


--
-- TOC entry 3388 (class 0 OID 25005)
-- Dependencies: 213
-- Data for Name: brands; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.brands (brand_id, brand_name) VALUES ('023d27f2-60d7-4933-9881-83bb2279f5fa', 'Honda');
INSERT INTO production.brands (brand_id, brand_name) VALUES ('de8c231d-0318-42df-8c73-c625a353cf8c', 'Hero');
INSERT INTO production.brands (brand_id, brand_name) VALUES ('4a6bab84-af16-49f3-a1d5-79f9951287b0', 'Suzuki');


--
-- TOC entry 3389 (class 0 OID 25009)
-- Dependencies: 214
-- Data for Name: garage; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.garage (garage_id, garage_name, phone, email, address_line1, address_line2, city, state, zip_code) VALUES ('5c711c9d-7156-4308-bcd4-b3e49eb2657f', 'Tisai Garage', '8878678798', 'tisaigarage@gmail.com', 'Tisgaon', 'Kalyan', 'Thane', 'Maharashtra', '421306');


--
-- TOC entry 3390 (class 0 OID 25015)
-- Dependencies: 215
-- Data for Name: products; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.products (product_id, product_name, brand_id, category_id, model_year, list_price, model_number, owner_id, rc_number, chassi_number, colour, vehicle_number, insuarance_company, insuarance_expiry, puc_expiry, thumnail_url) VALUES ('ead537b2-b23c-4eb5-bd16-bfb96005b7aa', 'Unicorn', '023d27f2-60d7-4933-9881-83bb2279f5fa', '76cbbe77-21b7-471b-b237-5af55324adab', 2015, 68102.00, '5565', '6ae7e974-3d4c-41ac-bca6-8c5055f3c776', '12345', '67890', 'Red', 'MH 04 TG 3432', 'Oriental', '2022-01-06', '2022-02-03', 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640887265/gsclu8jpwqrjffcv61cq.jpg');
INSERT INTO production.products (product_id, product_name, brand_id, category_id, model_year, list_price, model_number, owner_id, rc_number, chassi_number, colour, vehicle_number, insuarance_company, insuarance_expiry, puc_expiry, thumnail_url) VALUES ('0d02e1f8-5e78-4c09-8c6d-31d701ccc44b', 'Splendor', 'de8c231d-0318-42df-8c73-c625a353cf8c', '76cbbe77-21b7-471b-b237-5af55324adab', 2008, 45000.00, '76567', 'a95c8a54-c30c-4c25-bfff-e3c87da0b295', '12345', '654321', 'Black', 'MH 05 SD 7765', 'ICICI', '2022-02-03', '2022-01-20', 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640888035/zn07hd6rbhjzb4ffe8y1.jpg');


--
-- TOC entry 3391 (class 0 OID 25021)
-- Dependencies: 216
-- Data for Name: towing_vans; Type: TABLE DATA; Schema: production; Owner: postgres
--

INSERT INTO production.towing_vans (van_id, van_name, driver_name, van_number) VALUES ('6b2c2967-7a65-4771-83af-fe57f517e340', 'Tata ACE', 'Vikrant Parab', 'MH 05 DA 6543');
INSERT INTO production.towing_vans (van_id, van_name, driver_name, van_number) VALUES ('ac7f7119-5888-4597-b4b8-6ff9f04a4639', 'Piaggio APE', 'Pankaj Wankhede', 'MH 03 AX 5543');
INSERT INTO production.towing_vans (van_id, van_name, driver_name, van_number) VALUES ('81cb41fb-6e09-4a22-b0ba-e60d2baf6ad5', 'Mahindra Maximo', 'Ankit Rane', 'MH 04 HG 6567');


--
-- TOC entry 3392 (class 0 OID 25027)
-- Dependencies: 217
-- Data for Name: customers; Type: TABLE DATA; Schema: sales; Owner: postgres
--

INSERT INTO sales.customers (customer_id, first_name, last_name, phone, email, address_line1, address_line2, city, state, zip_code, thumnail_url) VALUES ('6ae7e974-3d4c-41ac-bca6-8c5055f3c776', 'Rohit', 'Rajguru', '8787678965', 'rohit.rajguru@gmail.com', 'Pipeline Road', 'Bhiwandi', 'Thane', 'Maharashtra', '423876', 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640791849/wpwfhyskx7ulyhfpezyv.jpg');
INSERT INTO sales.customers (customer_id, first_name, last_name, phone, email, address_line1, address_line2, city, state, zip_code, thumnail_url) VALUES ('a95c8a54-c30c-4c25-bfff-e3c87da0b295', 'Akshay', 'Gaikar', '9878674532', 'asgaikar@gmail.com', 'Birla College', 'Khadakpada', 'Kalyan', 'Maharashtra', '421303', 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640792132/temwnlz6kyeanlkqkjnh.jpg');
INSERT INTO sales.customers (customer_id, first_name, last_name, phone, email, address_line1, address_line2, city, state, zip_code, thumnail_url) VALUES ('2b6990ac-0379-423c-ba90-9b21277ca760', 'Ankur', 'Mandlik', '7767985645', 'ankur.mandlik@gmail.com', 'Addr 1', 'Addr 2', 'Thane', 'Maharashtra', '431987', 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640792210/ehsrloywukhw9crubvfc.jpg');


--
-- TOC entry 3393 (class 0 OID 25033)
-- Dependencies: 218
-- Data for Name: staffs; Type: TABLE DATA; Schema: sales; Owner: postgres
--

INSERT INTO sales.staffs (staff_id, first_name, last_name, email, phone, address_line1, address_line2, city, state, active, store_id, designation, manager_id, thumnail_url) VALUES ('2a03d3fe-7083-4996-a56b-7e9a603dfafa', 'Mamta', 'Mohite', 'mamta@gmail.com', '8878679875', 'Tisgaon', 'Kalyan', 'Thane', 'Maharashtra', 1, '7a4523ec-b759-48ba-81da-7f7dbb7d8dd8', 'Manager', NULL, 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640805089/e7anfxqzylfwqwbn93bg.jpg');
INSERT INTO sales.staffs (staff_id, first_name, last_name, email, phone, address_line1, address_line2, city, state, active, store_id, designation, manager_id, thumnail_url) VALUES ('1a2e7850-30df-4da3-ade6-0b7cf525840b', 'Anil', 'Parab', 'anil@gmail.com', '6676584739', 'Borivali', 'Borivali', 'Mumbai', 'Maharashtra', 1, '4f646a5e-9a1e-4352-9c29-4a1944021882', 'Staff', '2a03d3fe-7083-4996-a56b-7e9a603dfafa', 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640805169/uu9akxdp00nsaf8upkro.jpg');
INSERT INTO sales.staffs (staff_id, first_name, last_name, email, phone, address_line1, address_line2, city, state, active, store_id, designation, manager_id, thumnail_url) VALUES ('7547eb0d-441a-400b-bc4e-d98d6c784e7a', 'Bhagyashri', 'Bhosale', 'bhagoo@gmail.com', '8878889867', 'Highland', 'Majiwada', 'Thane', 'Maharashtra', 1, 'a718c2e7-da65-4336-b8ca-eddfa763b28e', 'Manager', NULL, 'https://res.cloudinary.com/mh47bikepoint/image/upload/v1640805402/gadetfup19ynolnqzxbn.jpg');


--
-- TOC entry 3394 (class 0 OID 25039)
-- Dependencies: 219
-- Data for Name: stores; Type: TABLE DATA; Schema: sales; Owner: postgres
--

INSERT INTO sales.stores (store_id, store_name, phone, email, address_line1, address_line2, city, state, zip_code) VALUES ('7a4523ec-b759-48ba-81da-7f7dbb7d8dd8', 'MH 47', '9786765465', 'mh47@gmail.com', 'Borivali', 'Borivali', 'Mumbai', 'Maharashtra', '400209');
INSERT INTO sales.stores (store_id, store_name, phone, email, address_line1, address_line2, city, state, zip_code) VALUES ('4f646a5e-9a1e-4352-9c29-4a1944021882', 'MH 46', '8897867564', 'MH46@gmail.com', 'Panvel', 'Panvel', 'Thane', 'Maharashtra', '411576');
INSERT INTO sales.stores (store_id, store_name, phone, email, address_line1, address_line2, city, state, zip_code) VALUES ('a718c2e7-da65-4336-b8ca-eddfa763b28e', 'MH 05', '7787679856', 'mh05@gmail.com', 'Tisgaon', 'Kalyan', 'Thane', 'Maharashtra', '421306');


--
-- TOC entry 3395 (class 0 OID 25045)
-- Dependencies: 220
-- Data for Name: transactions; Type: TABLE DATA; Schema: sales; Owner: postgres
--



--
-- TOC entry 3218 (class 2606 OID 25050)
-- Name: bike_categories bike_categories_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.bike_categories
    ADD CONSTRAINT bike_categories_pkey PRIMARY KEY (category_id);


--
-- TOC entry 3220 (class 2606 OID 25052)
-- Name: brands brands_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.brands
    ADD CONSTRAINT brands_pkey PRIMARY KEY (brand_id);


--
-- TOC entry 3222 (class 2606 OID 25054)
-- Name: garage garage_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.garage
    ADD CONSTRAINT garage_pkey PRIMARY KEY (garage_id);


--
-- TOC entry 3224 (class 2606 OID 25056)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- TOC entry 3226 (class 2606 OID 25058)
-- Name: towing_vans towing_vans_pkey; Type: CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.towing_vans
    ADD CONSTRAINT towing_vans_pkey PRIMARY KEY (van_id);


--
-- TOC entry 3228 (class 2606 OID 25060)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);


--
-- TOC entry 3230 (class 2606 OID 25062)
-- Name: staffs staffs_email_key; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.staffs
    ADD CONSTRAINT staffs_email_key UNIQUE (email);


--
-- TOC entry 3232 (class 2606 OID 25064)
-- Name: staffs staffs_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.staffs
    ADD CONSTRAINT staffs_pkey PRIMARY KEY (staff_id);


--
-- TOC entry 3234 (class 2606 OID 25066)
-- Name: stores stores_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.stores
    ADD CONSTRAINT stores_pkey PRIMARY KEY (store_id);


--
-- TOC entry 3236 (class 2606 OID 25068)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- TOC entry 3237 (class 2606 OID 25069)
-- Name: products products_brand_id_fkey; Type: FK CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.products
    ADD CONSTRAINT products_brand_id_fkey FOREIGN KEY (brand_id) REFERENCES production.brands(brand_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3238 (class 2606 OID 25074)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES production.bike_categories(category_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3239 (class 2606 OID 25079)
-- Name: products products_owner_id_fkey; Type: FK CONSTRAINT; Schema: production; Owner: postgres
--

ALTER TABLE ONLY production.products
    ADD CONSTRAINT products_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES sales.customers(customer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3240 (class 2606 OID 25084)
-- Name: staffs staffs_manager_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.staffs
    ADD CONSTRAINT staffs_manager_id_fkey FOREIGN KEY (manager_id) REFERENCES sales.staffs(staff_id);


--
-- TOC entry 3241 (class 2606 OID 25089)
-- Name: staffs staffs_store_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.staffs
    ADD CONSTRAINT staffs_store_id_fkey FOREIGN KEY (store_id) REFERENCES sales.stores(store_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3242 (class 2606 OID 25094)
-- Name: transactions transactions_customer_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.transactions
    ADD CONSTRAINT transactions_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES sales.customers(customer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3243 (class 2606 OID 25099)
-- Name: transactions transactions_garage_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.transactions
    ADD CONSTRAINT transactions_garage_id_fkey FOREIGN KEY (garage_id) REFERENCES production.garage(garage_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3244 (class 2606 OID 25104)
-- Name: transactions transactions_product_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.transactions
    ADD CONSTRAINT transactions_product_id_fkey FOREIGN KEY (product_id) REFERENCES production.products(product_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3245 (class 2606 OID 25109)
-- Name: transactions transactions_staff_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.transactions
    ADD CONSTRAINT transactions_staff_id_fkey FOREIGN KEY (staff_id) REFERENCES sales.staffs(staff_id);


--
-- TOC entry 3246 (class 2606 OID 25114)
-- Name: transactions transactions_store_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.transactions
    ADD CONSTRAINT transactions_store_id_fkey FOREIGN KEY (store_id) REFERENCES sales.stores(store_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3247 (class 2606 OID 25119)
-- Name: transactions transactions_van_id_fkey; Type: FK CONSTRAINT; Schema: sales; Owner: postgres
--

ALTER TABLE ONLY sales.transactions
    ADD CONSTRAINT transactions_van_id_fkey FOREIGN KEY (van_id) REFERENCES production.towing_vans(van_id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-01-02 13:26:06

--
-- PostgreSQL database dump complete
--

