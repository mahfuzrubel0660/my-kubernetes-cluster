--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2
-- Dumped by pg_dump version 15.3 (Ubuntu 15.3-1.pgdg18.04+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: links; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.links (
    id integer NOT NULL,
    url character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    description character varying(255),
    rel character varying(10),
    last_update date DEFAULT now()
);


ALTER TABLE public.links OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.links_id_seq OWNER TO postgres;

--
-- Name: links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.links_id_seq OWNED BY public.links.id;


--
-- Name: staff_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.staff_details (
    id integer NOT NULL,
    name character varying(40),
    designation character varying(40)
);


ALTER TABLE public.staff_details OWNER TO postgres;

--
-- Name: supplies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplies (
    id integer NOT NULL,
    name character varying,
    description character varying,
    msnufacturer character varying,
    color character varying,
    inventory integer,
    CONSTRAINT supplies_inventory_check CHECK ((inventory > 0))
);


ALTER TABLE public.supplies OWNER TO postgres;

--
-- Name: teachers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    first_name character varying,
    last_name character varying,
    subject character varying,
    grade_level integer
);


ALTER TABLE public.teachers OWNER TO postgres;

--
-- Name: test_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_table (
    first integer DEFAULT 0 NOT NULL,
    second text
);


ALTER TABLE public.test_table OWNER TO postgres;

--
-- Name: links id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links ALTER COLUMN id SET DEFAULT nextval('public.links_id_seq'::regclass);


--
-- Data for Name: links; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.links (id, url, name, description, rel, last_update) FROM stdin;
1	https://www.postgresqltutorial.com	PostgreSQL Tutorial	Learn PostgreSQL fast and easy	follow	2013-06-02
2	http://www.oreilly.com	O'Reilly Media	O'Reilly Media	nofollow	2013-06-02
3	http://www.google.com	Google	Google	nofollow	2013-06-02
4	http://www.yahoo.com	Yahoo	Yahoo	nofollow	2013-06-02
5	http://www.bing.com	Bing	Bing	nofollow	2013-06-02
6	http://www.facebook.com	Facebook	Facebook	nofollow	2013-06-01
7	https://www.tumblr.com/	Tumblr	Tumblr	nofollow	2013-06-02
8	http://www.postgresql.org	PostgreSQL	PostgreSQL	nofollow	2013-06-02
\.


--
-- Data for Name: staff_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.staff_details (id, name, designation) FROM stdin;
\.


--
-- Data for Name: supplies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplies (id, name, description, msnufacturer, color, inventory) FROM stdin;
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers (id, first_name, last_name, subject, grade_level) FROM stdin;
\.


--
-- Data for Name: test_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.test_table (first, second) FROM stdin;
\.


--
-- Name: links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.links_id_seq', 1, false);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: staff_details staff_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.staff_details
    ADD CONSTRAINT staff_details_pkey PRIMARY KEY (id);


--
-- Name: supplies supplies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplies
    ADD CONSTRAINT supplies_pkey PRIMARY KEY (id);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

