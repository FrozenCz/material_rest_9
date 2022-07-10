--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

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

CREATE SCHEMA devel;
commit;

--
-- Name: asset_note; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.asset_note (
    id integer NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL,
    text character varying(5000) NOT NULL,
    deleted boolean DEFAULT false NOT NULL,
    "userNoteId" integer,
    "deletedByUserId" integer,
    "assetId" integer
);


ALTER TABLE devel.asset_note OWNER TO postgres;

--
-- Name: asset_note_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.asset_note_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.asset_note_id_seq OWNER TO postgres;

--
-- Name: asset_note_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.asset_note_id_seq OWNED BY devel.asset_note.id;


--
-- Name: assets; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.assets (
    id integer NOT NULL,
    name character varying(150),
    quantity integer NOT NULL,
    "serialNumber" character varying(50),
    "inventoryNumber" character varying(50),
    "evidenceNumber" character varying(50),
    "identificationNumber" character varying(50),
    "inquiryDate" timestamp without time zone,
    document character varying(20),
    location character varying(50),
    "locationEtc" character varying(150),
    note character varying(250),
    "inquiryPrice" numeric(10,2),
    "categoryId" integer NOT NULL,
    state integer DEFAULT 0 NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "userId" integer,
    "removingProtocolId" integer
);


ALTER TABLE devel.assets OWNER TO postgres;

--
-- Name: assets_for_list; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.assets_for_list (
    "userId" integer NOT NULL,
    "assetId" integer NOT NULL
);


ALTER TABLE devel.assets_for_list OWNER TO postgres;

--
-- Name: assets_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.assets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.assets_id_seq OWNER TO postgres;

--
-- Name: assets_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.assets_id_seq OWNED BY devel.assets.id;


--
-- Name: category; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.category (
    id integer NOT NULL,
    name character varying NOT NULL,
    code character varying,
    version integer DEFAULT 1 NOT NULL,
    "parentId" integer
);


ALTER TABLE devel.category OWNER TO postgres;

--
-- Name: category_closure; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.category_closure (
    id_ancestor integer NOT NULL,
    id_descendant integer NOT NULL
);


ALTER TABLE devel.category_closure OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.category_id_seq OWNER TO postgres;

--
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.category_id_seq OWNED BY devel.category.id;


--
-- Name: category_settings; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.category_settings (
    id integer NOT NULL,
    name character varying NOT NULL,
    config character varying NOT NULL,
    version integer DEFAULT 1 NOT NULL
);


ALTER TABLE devel.category_settings OWNER TO postgres;

--
-- Name: category_settings_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.category_settings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.category_settings_id_seq OWNER TO postgres;

--
-- Name: category_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.category_settings_id_seq OWNED BY devel.category_settings.id;


--
-- Name: history; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.history (
    id integer NOT NULL,
    "relatedTo" character varying NOT NULL,
    "changedFrom" character varying NOT NULL,
    "changedTo" character varying NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    "changedByUserId" integer,
    "userId" integer,
    "assetId" integer
);


ALTER TABLE devel.history OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.history_id_seq OWNER TO postgres;

--
-- Name: history_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.history_id_seq OWNED BY devel.history.id;


--
-- Name: list_entity; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.list_entity (
    id integer NOT NULL,
    name character varying NOT NULL,
    category character varying,
    connected boolean NOT NULL,
    archived boolean NOT NULL,
    description character varying,
    created timestamp without time zone DEFAULT now() NOT NULL,
    updated timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE devel.list_entity OWNER TO postgres;

--
-- Name: list_entity_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.list_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.list_entity_id_seq OWNER TO postgres;

--
-- Name: list_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.list_entity_id_seq OWNED BY devel.list_entity.id;


--
-- Name: location; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.location (
    id integer NOT NULL,
    name character varying NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "parentId" integer,
    "masterUnitId" integer
);


ALTER TABLE devel.location OWNER TO postgres;

--
-- Name: location_closure; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.location_closure (
    id_ancestor integer NOT NULL,
    id_descendant integer NOT NULL
);


ALTER TABLE devel.location_closure OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.location_id_seq OWNER TO postgres;

--
-- Name: location_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.location_id_seq OWNED BY devel.location.id;


--
-- Name: removing_protocol; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.removing_protocol (
    id integer NOT NULL,
    document character varying(20) NOT NULL,
    "documentDate" timestamp without time zone NOT NULL,
    "possibleRemovingDate" timestamp without time zone NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    "userId" integer
);


ALTER TABLE devel.removing_protocol OWNER TO postgres;

--
-- Name: removing_protocol_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.removing_protocol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.removing_protocol_id_seq OWNER TO postgres;

--
-- Name: removing_protocol_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.removing_protocol_id_seq OWNED BY devel.removing_protocol.id;


--
-- Name: rights; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.rights (
    id integer NOT NULL,
    tag character varying NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(200),
    "relatedTo" character varying NOT NULL
);


ALTER TABLE devel.rights OWNER TO postgres;

--
-- Name: rights_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.rights_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.rights_id_seq OWNER TO postgres;

--
-- Name: rights_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.rights_id_seq OWNED BY devel.rights.id;


--
-- Name: unit; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.unit (
    id integer NOT NULL,
    name character varying NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "parentId" integer
);


ALTER TABLE devel.unit OWNER TO postgres;

--
-- Name: unit_closure; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.unit_closure (
    id_ancestor integer NOT NULL,
    id_descendant integer NOT NULL
);


ALTER TABLE devel.unit_closure OWNER TO postgres;

--
-- Name: unit_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.unit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.unit_id_seq OWNER TO postgres;

--
-- Name: unit_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.unit_id_seq OWNED BY devel.unit.id;


--
-- Name: units_users; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.units_users (
    unit_id integer NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE devel.units_users OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel."user" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    salt character varying NOT NULL,
    active boolean DEFAULT true NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    "unitId" integer
);


ALTER TABLE devel."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: devel; Owner: postgres
--

CREATE SEQUENCE devel.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE devel.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: devel; Owner: postgres
--

ALTER SEQUENCE devel.user_id_seq OWNED BY devel."user".id;


--
-- Name: users_rights; Type: TABLE; Schema: devel; Owner: postgres
--

CREATE TABLE devel.users_rights (
    user_id integer NOT NULL,
    rights_id integer NOT NULL
);


ALTER TABLE devel.users_rights OWNER TO postgres;

--
-- Name: asset_note id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.asset_note ALTER COLUMN id SET DEFAULT nextval('devel.asset_note_id_seq'::regclass);


--
-- Name: assets id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets ALTER COLUMN id SET DEFAULT nextval('devel.assets_id_seq'::regclass);


--
-- Name: category id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category ALTER COLUMN id SET DEFAULT nextval('devel.category_id_seq'::regclass);


--
-- Name: category_settings id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category_settings ALTER COLUMN id SET DEFAULT nextval('devel.category_settings_id_seq'::regclass);


--
-- Name: history id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.history ALTER COLUMN id SET DEFAULT nextval('devel.history_id_seq'::regclass);


--
-- Name: list_entity id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.list_entity ALTER COLUMN id SET DEFAULT nextval('devel.list_entity_id_seq'::regclass);


--
-- Name: location id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.location ALTER COLUMN id SET DEFAULT nextval('devel.location_id_seq'::regclass);


--
-- Name: removing_protocol id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.removing_protocol ALTER COLUMN id SET DEFAULT nextval('devel.removing_protocol_id_seq'::regclass);


--
-- Name: rights id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.rights ALTER COLUMN id SET DEFAULT nextval('devel.rights_id_seq'::regclass);


--
-- Name: unit id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.unit ALTER COLUMN id SET DEFAULT nextval('devel.unit_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel."user" ALTER COLUMN id SET DEFAULT nextval('devel.user_id_seq'::regclass);


--
-- Data for Name: asset_note; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.asset_note (id, created, updated, text, deleted, "userNoteId", "deletedByUserId", "assetId") FROM stdin;
\.


--
-- Data for Name: assets; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.assets (id, name, quantity, "serialNumber", "inventoryNumber", "evidenceNumber", "identificationNumber", "inquiryDate", document, location, "locationEtc", note, "inquiryPrice", "categoryId", state, version, "userId", "removingProtocolId") FROM stdin;
3	Nokia 2.4	1	BDkGUI5IZG	DEg8WNBSr2	lsGtbVXHuA	\N	2021-04-13 14:42:43.935	20210103	\N	\N	\N	2500.00	30	0	1	12	\N
2	Majetkový software 2021	1	RgJJ0nogmf	Z7HCRIeobU	op1xNFZ8gl	\N	2021-04-13 14:38:09.128	20210102	\N	\N	\N	164000.00	17	0	2	16	\N
1	Účetní software 2021	1	QOjgRSMyMD	0100215SW	wcET7nkX5n	\N	2021-01-04 23:00:00	20210101	\N	\N	\N	159000.00	17	0	3	16	\N
4	Dell 2501	1	vySRXKaBmI	6PhX8Qd2Zm	TdAVStd3Cr	\N	2021-04-13 14:46:05.852	20210104	\N	\N	\N	28000.00	18	0	1	16	\N
5	Dell 2501	1	zZJkcT8OJt	QuPL0aW5hx	sRy1eA3yVh	\N	2021-04-13 14:46:42.054	20210104	\N	\N	\N	28000.00	18	0	1	8	\N
6	Dell 2501	1	vFYIJW4OrU	RH04XsE9fI	5LzNb6l90I	\N	2021-04-13 14:47:10.347	20210104	\N	\N	\N	28000.00	18	0	1	10	\N
7	Dell 2501	1	i3NfPkzRxD	jVsVsQdoF3	XUHNFih2Xd	\N	2021-04-13 14:47:40.82	20210104	\N	\N	\N	28000.00	18	0	1	9	\N
8	Asus XF50	1	aTUH94Pvqk	Kp8TghibrF	sO58aXDndI	\N	2021-04-01 22:00:00	20210103	\N	\N	\N	18900.00	18	0	1	9	\N
9	Asus XF50	1	4eL83wPm5n	0o6xuiSRC9	AfvGhfe5JT	\N	2021-04-09 22:00:00	20210108	\N	\N	\N	18900.00	18	0	1	20	\N
10	Lenovo 505i	1	NIEqXLYUeB	MTADxSgVgt	nTQ7Xqv6Ox	\N	2021-04-13 14:49:41.05	20210109	\N	\N	\N	14450.00	18	0	1	11	\N
11	Dell 2501	1	dkGdWot9K8	nj36BqyfeO	que0tyo9F9	\N	2021-04-06 22:00:00	20210104	\N	\N	\N	18900.00	18	0	1	5	\N
12	Lenovo ThinkPad	1	BfFAqGSrc6	QXnRjAcmPz	oLbyXfQ1SJ	\N	2020-06-10 22:00:00	20200180	\N	\N	\N	34900.00	21	0	1	4	\N
13	Asus Zenbook	1	Eu21TWH8eY	aJgldCFtF2	rqsJ93w6kZ	\N	2021-04-13 14:52:26.221	20200450	\N	\N	\N	29000.00	21	0	1	19	\N
15	Dell SE2416H	1	ZQym4FYptC	B9VJL8dHxc	Z3VIA0B9kZ	\N	2021-04-11 22:00:00	20210105	\N	\N	\N	2690.00	32	0	1	16	\N
16	Dell SE2416H	1	PBdXrIgeBL	rpQAVU0pHO	Qa58gHnuKp	\N	2021-04-13 15:08:02.253	20210104	\N	\N	\N	2690.00	32	0	2	12	\N
17	Asus VA24EHE	1	ISfWubthEf	2TtDeu4qXO	lZA32j2t0l	AO1	2020-07-02 22:00:00	20200104	\N	\N	\N	2790.00	32	0	1	3	\N
18	Asus VA24EHE	1	V253u4Dxf8	2YDUclNscl	RVmF4l3B0o	AO2	2020-06-03 22:00:00	20200108	\N	\N	\N	2790.00	32	0	1	4	\N
19	Asus VA24EHE	1	DQbVVpmji2	llYWHzIdrm	wNkO1lddAj	\N	2020-05-05 22:00:00	20200508	\N	\N	\N	2790.00	32	0	1	18	\N
20	Samsung C27F396	1	VoRXL51I48	tVld4rmd0L	HtnhWzUftB	\N	2021-04-13 15:11:35.578	\N	\N	\N	\N	7490.00	33	0	1	19	\N
21	Samsung C27F396	1	DfELuwvM38	YZkaev2zAW	G4SyAqUitY	\N	2021-04-13 15:16:29.064	\N	\N	\N	\N	6900.00	33	0	1	6	\N
14	Dell SE2416H	1	k2i28P6R7g	DoNL600zSt	WGnOHGC9Lm	\N	2021-04-11 22:00:00	\N	\N	\N	\N	2690.00	32	0	2	16	\N
22	Gigabyte G34WQC	1	v7ZTudi91R	Yah7FWE9Qr	8IAlYjP908	\N	2020-06-07 22:00:00	20200150	\N	\N	\N	13490.00	31	0	1	5	\N
23	Philips 346B1C	1	uJTAKUct7e	96UMg69Ddr	M9SchvviN6	\N	2020-10-06 22:00:00	20205081	\N	\N	\N	14490.00	31	0	1	14	\N
24	HP Laser 135w	1	l6YiRfhGwu	kvkJyMt7nw	PAGj54Bmmw	\N	2021-04-06 22:00:00	202101050	\N	\N	\N	3499.00	34	0	2	19	\N
25	HP Laser 107w	1	ifmyiGxZos	2oxo4kqvlC	qCKlOuJNeg	\N	2021-04-13 15:28:18.158	2194415613	\N	\N	\N	2499.00	34	0	1	3	\N
26	HP Color Laser 150nw	1	a6oQPZDwYr	iNiWH69nBD	aAV9mtKiPC	\N	2021-04-13 15:29:54.634	9555836385	\N	\N	\N	4699.00	34	0	1	16	\N
27	Epson EcoTank L3150	1	kUDUNofjfT	E3pvWMjgJG	akVaalvUko	\N	2021-04-06 22:00:00	2072372010	\N	\N	\N	4790.00	35	0	1	19	\N
28	HP OfficeJet 6950	1	9Rnxaz3DOv	VYDTdm6qiz	5f0T4t5yQh	\N	2020-06-09 22:00:00	7846110831	\N	\N	\N	2490.00	35	0	1	19	\N
29	Nokia 7.2	1	chH840ygnJ	qusAz8NHzQ	hGgNCOOvqu	\N	2021-04-05 22:00:00	\N	\N	\N	\N	8349.00	29	0	1	16	\N
30	Nokia 7.2	1	BhAJKveGSU	Lk0DEmcAKo	tLkLSFdo4u	\N	2021-03-30 22:00:00	6766326231	\N	\N	\N	9190.00	29	0	1	8	\N
31	Samsung Galaxy A20	1	Abm4wvCtG0	WuWnsNBIm0	UVLosSytY9	\N	2020-04-28 22:00:00	2072372010	\N	\N	\N	4840.00	29	0	1	10	\N
32	Samsung Galaxy A20	1	HVDxC25rU2	wklgw8Ek3H	L53wo9jftdu	\N	2021-04-13 15:43:17.879	7846110831	\N	\N	\N	4490.00	29	0	1	9	\N
33	circuit	1	3xeosjxyh	y3kl0yk1h	d6pbowg06	\N	2021-04-13 07:07:00	\N	\N	\N	\N	199.00	26	0	1	14	\N
34	HP	1	5rhi8bw36	6a5bcaaa6	q0w510eh7	\N	2021-04-12 17:37:24	\N	\N	\N	\N	199.00	26	0	1	22	\N
35	HP	1	ow9pczl6s	lhtisb7qi	mze6tmlvw	\N	2021-04-12 19:35:47	\N	\N	\N	\N	392.00	26	0	1	6	\N
36	HP	1	3sbcb80fg	f1seac7xa	t2l0jtjqm	\N	2021-04-13 06:21:34	\N	\N	\N	\N	470.00	26	0	1	15	\N
37	HP	1	fmphim6i7	q5w2w8kg1	1z9tbq66z	\N	2021-04-13 10:10:39	\N	\N	\N	\N	254.00	26	0	1	16	\N
38	HP	1	vrhei2b44	1vh6uzfny	vvnnii3ph	\N	2021-04-12 20:44:46	\N	\N	\N	\N	511.00	26	0	1	9	\N
39	HP	1	931xhw3wq	17jinumae	5qigmsau3	\N	2021-04-12 21:37:05	\N	\N	\N	\N	471.00	26	0	1	5	\N
40	HP	1	xxc8uab84	lfmlqmawg	u2x67dgj3	\N	2021-04-13 01:08:58	\N	\N	\N	\N	485.00	26	0	1	17	\N
41	HP	1	jq19600e3	pfnie6dne	0zimygiyk	\N	2021-04-13 14:26:14	\N	\N	\N	\N	261.00	26	0	1	17	\N
42	HP	1	6dccuieaq	ah4ppcabk	f9hli1lzs	\N	2021-04-12 20:40:22	\N	\N	\N	\N	369.00	26	0	1	7	\N
43	HP	1	45yomtw54	3hyh2zp3e	4nj4owyts	\N	2021-04-12 16:43:02	\N	\N	\N	\N	574.00	26	0	1	11	\N
44	HP	1	smjjv9lps	nd2y4eklz	1ampcsrkl	\N	2021-04-13 13:47:47	\N	\N	\N	\N	250.00	26	0	1	11	\N
45	HP	1	xbl4hw27j	al9ywdv7f	jwrp61p9g	\N	2021-04-13 00:37:33	\N	\N	\N	\N	265.00	26	0	1	20	\N
46	HP	1	x1i8qzxmx	j208q3ad0	fy4m5cklf	\N	2021-04-13 03:08:34	\N	\N	\N	\N	475.00	26	0	1	7	\N
47	HP	1	snzs7lbp7	vi1l6beli	v66ur91kt	\N	2021-04-13 14:48:03	\N	\N	\N	\N	516.00	26	0	1	19	\N
48	HP	1	cvnvhzbg7	sblu8fdb4	bel7kydbg	\N	2021-04-12 18:53:44	\N	\N	\N	\N	241.00	26	0	1	7	\N
49	Logitech	1	q7ykzwp16	547zlyjl1	vuuh4otpc	\N	2021-04-12 18:29:04	\N	\N	\N	\N	328.00	27	0	1	17	\N
50	Logitech	1	mdmhaer18	pcsqmbzik	boj6kwdke	\N	2021-04-12 21:18:55	\N	\N	\N	\N	388.00	27	0	1	18	\N
51	Logitech	1	no3zypdgl	u34zrmrzm	k7ma7j6fz	\N	2021-04-12 19:12:18	\N	\N	\N	\N	222.00	27	0	1	6	\N
53	Logitech	1	e2ll7hxv8	4i0u0oeop	32gr4mdkc	\N	2021-04-13 09:54:15	\N	\N	\N	\N	484.00	27	0	1	14	\N
54	Logitech	1	ij0a50tw3	rt9qm6b0u	chhqohvhg	\N	2021-04-13 09:33:35	\N	\N	\N	\N	257.00	27	0	1	20	\N
55	Logitech	1	96h025l55	s08sl4xsx	gvpmtm9p5	\N	2021-04-13 14:14:08	\N	\N	\N	\N	289.00	27	0	1	15	\N
56	Logitech	1	nfuhjwv8p	v7d8vnuqj	52xph6uwk	\N	2021-04-13 01:32:47	\N	\N	\N	\N	270.00	27	0	1	9	\N
57	Logitech	1	zx1ge8gzi	s19hmftrh	s3kubwcbu	\N	2021-04-13 01:21:20	\N	\N	\N	\N	407.00	27	0	1	10	\N
58	Logitech	1	pz090sydm	j683p1om0	oma879fp4	\N	2021-04-12 19:00:32	\N	\N	\N	\N	383.00	27	0	1	12	\N
59	Logitech	1	iyrrkuh9g	7fay90bbz	uyy91t31x	\N	2021-04-12 18:29:17	\N	\N	\N	\N	233.00	27	0	1	16	\N
60	Logitech	1	men7od08r	w7hmksre0	pvtk74z6k	\N	2021-04-12 16:41:30	\N	\N	\N	\N	243.00	27	0	1	22	\N
61	Logitech	1	rovfk1v5w	xxecokkn0	2nmluld4a	\N	2021-04-13 02:47:16	\N	\N	\N	\N	323.00	27	0	1	12	\N
62	Logitech	1	ma2852jid	qe6ofw9qx	huo6v62ld	\N	2021-04-12 18:27:55	\N	\N	\N	\N	303.00	27	0	1	15	\N
63	Logitech	1	eaukm71or	jdt40n6gw	9uf3mlynh	\N	2021-04-13 08:42:11	\N	\N	\N	\N	342.00	27	0	1	20	\N
64	Samsung	1	04o1og7b0	9os60jxf0	av0esl9ox	\N	2021-04-13 06:58:53	\N	\N	\N	\N	4579.00	8	0	1	8	\N
65	Samsung	1	rywn8m5gm	3iecuefec	2fcgjrju0	\N	2021-04-13 04:40:25	\N	\N	\N	\N	4637.00	8	0	1	9	\N
66	Samsung	1	6nmoizw3o	z4h05pmoe	eulw21nea	\N	2021-04-13 15:28:59	\N	\N	\N	\N	4515.00	8	0	1	11	\N
67	Samsung	1	qwgpni7jy	cfk1clo0c	xi05mrrzn	\N	2021-04-13 08:01:00	\N	\N	\N	\N	4103.00	8	0	1	7	\N
68	Samsung	1	3nsfcmb35	rtmj92a4n	l3bqv18ul	\N	2021-04-12 20:42:57	\N	\N	\N	\N	4109.00	8	0	1	4	\N
69	Windows 10	1	nkplp24fv	5e8gd42y5	m1tks19m2	\N	2021-04-13 08:05:50	\N	\N	\N	\N	1030.00	17	0	1	14	\N
70	Windows 10	1	ho2bzxp2k	iyc1sayco	90t0gl4gd	\N	2021-04-13 14:30:39	\N	\N	\N	\N	1176.00	17	0	1	20	\N
71	Windows 10	1	wsv6ldagi	twcqy4b9b	l327bm0ls	\N	2021-04-12 17:58:48	\N	\N	\N	\N	1427.00	17	0	1	3	\N
72	Windows 10	1	51txnicv7	ezt11bf9b	un97h565e	\N	2021-04-13 14:23:29	\N	\N	\N	\N	1167.00	17	0	1	19	\N
73	Windows 10	1	lvw8vor56	c0sjophrl	e60ks0c79	\N	2021-04-12 22:09:53	\N	\N	\N	\N	1075.00	17	0	1	11	\N
74	Windows 10	1	ml19zp2y2	dwxls88ow	ceq91edl4	\N	2021-04-13 04:19:09	\N	\N	\N	\N	1024.00	17	0	1	12	\N
75	Windows 10	1	ws84sb6gg	jc92c7r8l	venm6pmj2	\N	2021-04-12 22:14:02	\N	\N	\N	\N	1248.00	17	0	1	11	\N
76	Windows 10	1	69rdt1wd5	jiydy6lxg	iyum8pidh	\N	2021-04-13 02:50:21	\N	\N	\N	\N	1256.00	17	0	1	3	\N
77	Windows 10	1	uta336iqr	wvqnyfvcv	2gxmn23xz	\N	2021-04-12 19:27:46	\N	\N	\N	\N	1022.00	17	0	1	10	\N
78	Windows 10	1	no28c5frm	qaaixhzfe	72u2oevky	\N	2021-04-13 11:18:33	\N	\N	\N	\N	1087.00	17	0	1	6	\N
79	Windows 10	1	o15nty7p9	ymnd5ws97	rsvpzepj9	\N	2021-04-12 23:58:53	\N	\N	\N	\N	1359.00	17	0	1	15	\N
80	Windows 10	1	ywz74spqh	rtte9b5ln	z5uco3nlz	\N	2021-04-13 03:15:17	\N	\N	\N	\N	1378.00	17	0	1	7	\N
81	Windows 10	1	o4ivdr3fd	zw3yxmkn8	j5e4gveht	\N	2021-04-13 12:38:35	\N	\N	\N	\N	1293.00	17	0	1	22	\N
83	Windows 10	1	2mrlg0gd9	e39hjaytu	cl2hmr82z	\N	2021-04-13 15:35:05	\N	\N	\N	\N	1049.00	17	0	1	22	\N
84	Windows 10	1	xljep2f4f	8atlb195v	a520ewaw3	\N	2021-04-13 07:13:55	\N	\N	\N	\N	1167.00	17	0	1	15	\N
85	Windows 10	1	tml98asgw	8jlu140k0	3f32usmbs	\N	2021-04-12 20:11:05	\N	\N	\N	\N	1134.00	17	0	1	21	\N
86	Windows 10	1	t3nnxyiau	a58bwyw4c	ebsr0ae1w	\N	2021-04-13 07:47:25	\N	\N	\N	\N	1299.00	17	0	1	21	\N
87	Windows 10	1	bk3sz3y0m	cw6p09liy	3egcdyaie	\N	2021-04-13 01:34:46	\N	\N	\N	\N	1411.00	17	0	1	21	\N
88	Windows 10	1	weh1ih9qg	278b23hxx	5ubv70gt8	\N	2021-04-13 15:27:03	\N	\N	\N	\N	1008.00	17	0	1	10	\N
90	Windows 10	1	tuvyrbt73	wp40uoo2f	84oyetn8k	\N	2021-04-12 23:30:40	\N	\N	\N	\N	1150.00	17	0	1	15	\N
91	Windows 10	1	smpzbuhr4	2loko5ie0	j038ldyik	\N	2021-04-13 08:20:00	\N	\N	\N	\N	1409.00	17	0	1	3	\N
92	Windows 10	1	v6qx8ycvb	ea7xwtuug	proxic128	\N	2021-04-13 05:49:46	\N	\N	\N	\N	1205.00	17	0	1	10	\N
93	Windows 10	1	src5n3e0u	klz8s850p	52o8dei68	\N	2021-04-12 19:27:36	\N	\N	\N	\N	1115.00	17	0	1	19	\N
94	Windows 10	1	1ld6uxjb1	5csnddv97	irou7s0p4	\N	2021-04-13 16:17:47	\N	\N	\N	\N	1323.00	17	0	1	20	\N
95	Windows 10	1	v9t48rv8b	coin7pi0n	n7xr56z7e	\N	2021-04-13 07:51:35	\N	\N	\N	\N	1189.00	17	0	1	12	\N
97	Windows 10	1	79xa5ny5q	bo7jrgusu	p3k0fd036	\N	2021-04-12 22:35:48	\N	\N	\N	\N	1134.00	17	0	1	7	\N
98	Windows 10	1	9557ms3a4	j36f2z6a5	cf4qkk37b	\N	2021-04-13 14:59:51	\N	\N	\N	\N	1394.00	17	0	1	11	\N
99	Windows 10	1	o047zk9wz	36kh84g1v	qkc02rk7u	\N	2021-04-13 02:27:41	\N	\N	\N	\N	1371.00	17	0	1	13	\N
100	Windows 10	1	smia7cu54	ijh14cf4w	78z41s76o	\N	2021-04-12 18:51:27	\N	\N	\N	\N	1497.00	17	0	1	4	\N
101	Windows 10	1	g128aivnr	tofcl7w9b	1xmhcmfzs	\N	2021-04-13 14:23:31	\N	\N	\N	\N	1325.00	17	0	1	7	\N
102	Windows 10	1	fmvbfrebe	m9s1d1oso	5enfzwcn0	\N	2021-04-13 03:50:17	\N	\N	\N	\N	1197.00	17	0	1	12	\N
103	Windows 10	1	imtuv0aup	mpjogqp3d	7l9smbf37	\N	2021-04-13 07:02:08	\N	\N	\N	\N	1071.00	17	0	1	12	\N
104	Windows 10	1	kwf5z67ux	7rtdsgapf	cwtg7metq	\N	2021-04-12 18:05:56	\N	\N	\N	\N	1028.00	17	0	1	15	\N
105	Windows 10	1	t1p2ejnax	6yvn78wen	00dicsups	\N	2021-04-13 13:10:01	\N	\N	\N	\N	1274.00	17	0	1	13	\N
120	Acrobat Pro	1	kopq0jvyb	9dsmh2b5o	ovm3dqt3g	\N	2021-04-13 06:02:13	\N	\N	\N	\N	1188.00	17	0	1	7	\N
121	Lenovo ThinkPad	1	51snn5dtw	ymrg37jqp	c5a109075	\N	2021-04-13 06:30:51	\N	\N	\N	\N	1150.00	21	0	1	9	\N
89	Windows 10	1	79p0y0eaf	w685yxew4	qp0jq0p21	\N	2021-04-13 06:07:57	\N	\N	\N	\N	1050.00	17	1	3	6	1
82	Windows 10	1	jzquve7ms	0k0rpy7l3	9tcnvaanu	\N	2021-04-13 05:41:35	\N	\N	\N	\N	1310.00	17	1	3	6	1
106	Adobe Photoshop 	1	s5gi3b6hl	96e370o6z	4x79rec8u	\N	2021-04-13 07:59:03	\N	\N	\N	\N	1336.00	17	0	1	14	\N
107	Adobe Photoshop 	1	sidnv9wuw	53h1z65ex	6dyd6945k	\N	2021-04-13 15:45:05	\N	\N	\N	\N	1269.00	17	0	1	16	\N
108	Adobe Photoshop 	1	lq1l22gk7	b9y5xe78l	mz1w6oeve	\N	2021-04-12 18:18:48	\N	\N	\N	\N	1308.00	17	0	1	4	\N
111	Adobe Photoshop 	1	oy67jzif6	05thy7imy	1qln0rtoi	\N	2021-04-13 07:54:26	\N	\N	\N	\N	1409.00	17	0	1	6	\N
112	Adobe Photoshop 	1	onkd6ww6c	3zwsw6gnu	dc94gvq4j	\N	2021-04-13 03:32:51	\N	\N	\N	\N	1143.00	17	0	1	21	\N
113	Adobe Photoshop 	1	d82z3w30d	6cx5gnmzn	m0k9wraqc	\N	2021-04-13 06:19:32	\N	\N	\N	\N	1067.00	17	0	1	4	\N
114	Acrobat Pro	1	gcdmgr5d4	wy82grrxg	j8zalfs98	\N	2021-04-13 12:07:02	\N	\N	\N	\N	1256.00	17	0	1	11	\N
115	Acrobat Pro	1	zl8nlj27q	y1r9wi5u2	qdpnewut4	\N	2021-04-13 12:26:57	\N	\N	\N	\N	1421.00	17	0	1	10	\N
116	Acrobat Pro	1	6zif7ces7	yazlkm7tw	fbwkrp0ze	\N	2021-04-13 02:33:02	\N	\N	\N	\N	1432.00	17	0	1	17	\N
117	Acrobat Pro	1	jo28a0o8h	gntcqb8vj	fi1ydu8w9	\N	2021-04-13 12:54:28	\N	\N	\N	\N	1483.00	17	0	1	6	\N
119	Acrobat Pro	1	9r5fuxtdi	3yimg9vxo	tmhvjdwi4	\N	2021-04-12 19:45:08	\N	\N	\N	\N	1157.00	17	0	1	20	\N
122	Lenovo ThinkPad	1	83wgugluf	ssgfgwuyy	wa7eu0o6r	\N	2021-04-12 19:09:15	\N	\N	\N	\N	1060.00	21	0	1	10	\N
123	Lenovo ThinkPad	1	b4z0nld09	qkttjqniw	20g7fevqd	\N	2021-04-13 04:26:04	\N	\N	\N	\N	1321.00	21	0	1	5	\N
124	Lenovo ThinkPad	1	h04ll1v90	m4xdknq4f	anz2uvq2n	\N	2021-04-13 15:13:05	\N	\N	\N	\N	1352.00	21	0	1	5	\N
125	Lenovo ThinkPad	1	eab3anlyk	0q8d9jdc0	qawsc66gj	\N	2021-04-13 09:42:07	\N	\N	\N	\N	1465.00	21	0	1	14	\N
126	Lenovo ThinkPad	1	9f0pmi1gh	isvgr3krv	1amij9iu4	\N	2021-04-13 08:25:44	\N	\N	\N	\N	1095.00	21	0	1	11	\N
128	Lenovo ThinkPad	1	i7hiokyb8	yd8sw56ih	u3esysrts	\N	2021-04-13 02:07:21	\N	\N	\N	\N	1290.00	21	0	1	6	\N
129	Lenovo ThinkPad	1	c9zi1rks4	9j4lsod5f	q0nl6v09c	\N	2021-04-13 14:05:56	\N	\N	\N	\N	1140.00	21	0	1	8	\N
110	Adobe Photoshop 	1	hoo3nzqcn	9r7hcijxg	2r5fxawzv	\N	2021-04-13 13:39:49	\N	\N	\N	\N	1125.00	17	0	2	12	\N
131	Rational	1	uogZOrGkg3	btHschEUVa	Sj1jimobF9	\N	2021-04-13 17:32:54.031	7928882085	\N	\N	\N	589000.00	12	0	1	14	\N
134	Winterhalter	1	4wGLHuqVuf	j8M43rL7O8	mtohdi13WP	\N	2021-03-31 22:00:00	6972964663	\N	\N	\N	189000.00	10	0	1	8	\N
137	HP Proliant dym	1	3yhon65pv	g5d3y7fw0	ijcmup7i9	\N	2021-04-13 04:54:56	\N	\N	\N	\N	143217.00	6	0	1	4	\N
138	HP Proliant qch	1	2y30b6iml	rvmefcwjc	r7tolnpij	\N	2021-04-13 07:52:51	\N	\N	\N	\N	119852.00	6	0	1	22	\N
139	HP Proliant 6dg	1	hm4uh61hh	sp54r910c	fgdg90rio	\N	2021-04-13 11:36:22	\N	\N	\N	\N	143195.00	6	0	1	22	\N
140	HP Proliant xw2	1	hhq2gby3z	9h0tx5klo	a2rqjmbw4	\N	2021-04-13 11:52:30	\N	\N	\N	\N	137845.00	6	0	1	14	\N
141	HP Proliant 5z6	1	h5ypi94mx	u44hm3crl	trw43hkzc	\N	2021-04-12 21:26:33	\N	\N	\N	\N	147141.00	6	0	1	4	\N
142	HP Proliant onl	1	yixmfycuj	ez5mmcpu6	kstyno1ya	\N	2021-04-13 01:14:22	\N	\N	\N	\N	135248.00	6	0	1	13	\N
143	HP Proliant q9c	1	2lv0q3lgo	aqkdr5k2k	13daozf8x	\N	2021-04-13 10:36:41	\N	\N	\N	\N	119733.00	6	0	1	16	\N
145	HP Proliant 2wd	1	yfb78n5w2	3xhiylmxe	bjo845wfh	\N	2021-04-13 09:00:19	\N	\N	\N	\N	144412.00	6	0	1	10	\N
146	HP Proliant q8i	1	22i4ux7w2	2esrn9385	xdlp1y6hu	\N	2021-04-13 15:14:29	\N	\N	\N	\N	125108.00	6	0	1	6	\N
147	HP Proliant cdb	1	kqu60acf2	015rcksus	oxf7bk6it	\N	2021-04-13 05:43:09	\N	\N	\N	\N	109610.00	6	0	1	8	\N
148	HP Proliant f6o	1	l0u6t9w54	2f97xzy3d	8al1dfucr	\N	2021-04-13 08:34:07	\N	\N	\N	\N	100553.00	6	0	1	4	\N
149	Dell PowerEdge bbn	1	nhbtsfs6q	3rzoifnrk	0nyox234c	\N	2021-04-13 10:38:23	\N	\N	\N	\N	133827.00	6	0	1	15	\N
150	Dell PowerEdge 6hp	1	0nt1a9lfc	77xtcxjin	aaxo8zce6	\N	2021-04-13 01:47:13	\N	\N	\N	\N	104346.00	6	0	1	21	\N
151	Dell PowerEdge 5uq	1	nyaoi0n30	zhmxv1bfl	mmygrklu7	\N	2021-04-13 12:00:46	\N	\N	\N	\N	126254.00	6	0	1	16	\N
152	Dell PowerEdge uml	1	cvgp289m2	0k3o447wi	oj0kli01o	\N	2021-04-13 09:25:54	\N	\N	\N	\N	125317.00	6	0	1	6	\N
153	Dell PowerEdge wwi	1	4hid4kjes	ez5vmtnc9	ywzr3c1wc	\N	2021-04-13 16:27:23	\N	\N	\N	\N	107047.00	6	0	1	21	\N
154	Dell PowerEdge m65	1	h8l8cjl36	j5hg2ceky	hmelmfl5j	\N	2021-04-12 21:58:50	\N	\N	\N	\N	140844.00	6	0	1	6	\N
155	Dell PowerEdge uu8	1	qaz83yn16	gqbugktpq	tlzh23n97	\N	2021-04-13 09:42:34	\N	\N	\N	\N	110402.00	6	0	1	20	\N
156	Dell PowerEdge i4j	1	amslfwo53	0cc38p74v	7axb9a2pn	\N	2021-04-13 16:43:56	\N	\N	\N	\N	118444.00	6	0	1	4	\N
157	Dell PowerEdge qru	1	k713l7vy4	qiizbz9sz	0e9hc0tqt	\N	2021-04-13 00:11:39	\N	\N	\N	\N	130603.00	6	0	1	3	\N
158	Dell PowerEdge rlq	1	wvkegxonn	61xceno8k	xq60bsxnz	\N	2021-04-12 19:05:40	\N	\N	\N	\N	135658.00	6	0	1	5	\N
159	Dell PowerEdge 8pd	1	40y9qxga1	da8i084hj	fe723xvuu	\N	2021-04-12 18:08:29	\N	\N	\N	\N	125186.00	6	0	1	15	\N
160	Dell PowerEdge 49u	1	cyts9c277	1qm6akc0l	k4ca6curk	\N	2021-04-13 14:55:37	\N	\N	\N	\N	121936.00	6	0	1	22	\N
161	Dell PowerEdge ccj	1	m2nuq4v1j	nqpstsv4r	jn9i9nxsz	\N	2021-04-13 07:51:20	\N	\N	\N	\N	105962.00	6	0	1	3	\N
130	Sklad21	1	\N	\N	\N	\N	2021-03-28 22:00:00	\N	\N	\N	\N	489000.00	15	0	2	4	\N
118	Acrobat Pro	1	jzdbmc22m	5nrs6zkvj	ppyjtk8ai	\N	2021-04-13 10:47:44	\N	\N	\N	\N	1121.00	17	0	2	19	\N
144	HP Proliant rq1	1	6m7uso83z	21icn19pn	bc3zsluwr	\N	2021-04-13 16:49:19	\N	\N	\N	\N	142570.00	6	0	2	12	\N
132	Objem 70l	1	c5xihYq9G4	j8M43rL7O8	dHziFYOx3f	\N	2021-04-13 17:33:39.784	7776906395	\N	\N	\N	279000.00	13	0	2	12	\N
133	Šíře 140	1	Cg8iBsZzXf	mtohdi13WP	c5xihYq9G4	\N	2021-04-13 17:35:22.362	3656573723	\N	\N	\N	219000.00	14	0	2	12	\N
136	HP Proliant jta	1	1ui5zj86j	b3zkaxic7	ofjlweejx	\N	2021-04-13 16:59:14	\N	\N	\N	\N	119859.00	6	0	2	12	\N
135	Mountfield Bsd50	1	zwRjeVVgS9	UTARo0qYyg	1SjESr8Z3b	\N	2021-04-08 22:00:00	3825864277	\N	\N	\N	64500.00	16	0	2	12	\N
127	Lenovo ThinkPad	1	v4z8imdtd	y99snoflf	5cetxwwmz	\N	2021-04-13 10:27:21	\N	\N	\N	\N	1226.00	21	0	3	12	\N
96	Windows 10	1	qb94cbwft	9zihp61cy	9d6yaf82z	\N	2021-04-12 22:10:36	\N	\N	\N	\N	1264.00	17	0	2	12	\N
109	Adobe Photoshop 	1	w5rboskf1	oo48et210	4t7csrhs8	\N	2021-04-13 10:11:09	\N	\N	\N	\N	1499.00	17	0	2	12	\N
\.


--
-- Data for Name: assets_for_list; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.assets_for_list ("userId", "assetId") FROM stdin;
1	27
1	28
1	26
3	57
3	62
3	60
4	132
4	133
4	135
4	127
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.category (id, name, code, version, "parentId") FROM stdin;
1	Oběžný majetek	OM	1	\N
2	Dlouhodobý hmotný majetek	DHM	2	\N
3	Dlouhodobý nehmotný majetek	DNHM	1	\N
4	Drobný hmotný majetek	DRHM	1	\N
5	Drobný nehmotný majetek	SW	1	\N
8	Klimatizace		1	2
10	Myčka		1	9
11	Pračka		1	9
12	Konvektomat		1	9
13	Kuchyňský robot		1	9
14	Mandl		1	9
15	Chladící box		1	9
16	Zahradní traktor		1	9
9	Pracovní stroj		2	2
7	Automobil		2	2
6	Server		2	2
17	Software		1	3
18	Počítač stolní		2	4
21	Notebook		1	4
22	Monitor		1	4
23	Tiskárna		1	4
24	Nábytek		1	4
26	Klávesnice		1	1
27	Myš		1	1
28	Reproduktory		1	1
29	Mobilní telefon		1	4
30	Mobilní telefon		1	1
31	LED 34		1	22
32	LED 24		1	22
33	LED 27		1	22
34	Laserová		2	23
35	Inkoustová		1	23
\.


--
-- Data for Name: category_closure; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.category_closure (id_ancestor, id_descendant) FROM stdin;
1	1
2	2
3	3
4	4
5	5
6	6
2	6
7	7
2	7
8	8
2	8
9	9
2	9
10	10
9	10
2	10
11	11
9	11
2	11
12	12
9	12
2	12
13	13
9	13
2	13
14	14
9	14
2	14
15	15
9	15
2	15
16	16
9	16
2	16
17	17
3	17
18	18
4	18
21	21
4	21
22	22
4	22
23	23
4	23
24	24
4	24
26	26
1	26
27	27
1	27
28	28
1	28
29	29
4	29
30	30
1	30
31	31
22	31
4	31
32	32
22	32
4	32
33	33
22	33
4	33
34	34
23	34
4	34
35	35
23	35
4	35
\.


--
-- Data for Name: category_settings; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.category_settings (id, name, config, version) FROM stdin;
1	categoryColumnNames	[{"name":"Rozdělení","codeName":"Zkratka","useCodeAsColumn":true},{"name":"Obecný název","codeName":null,"useCodeAsColumn":null},{"name":"Typ","codeName":null,"useCodeAsColumn":null}]	2
\.


--
-- Data for Name: history; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.history (id, "relatedTo", "changedFrom", "changedTo", created, "changedByUserId", "userId", "assetId") FROM stdin;
1	assetsCreate		{"quantity":1,"name":"Účetní software 2021","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":null,"inventoryNumber":null,"evidenceNumber":null,"identificationNumber":null,"inquiryDate":"2021-01-04T23:00:00.000Z","inquiryPrice":159000,"document":"20210101","location":null,"locationEtc":null,"note":null,"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"id":1,"state":0,"version":1}	2021-04-13 14:36:52.289432	19	\N	1
2	assetsChangeInformation	{"version":1}	{"version":2}	2021-04-13 14:38:05.512397	19	\N	1
3	assetsCreate		{"quantity":1,"name":"Majetkový software 2021","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"RgJJ0nogmf","inventoryNumber":"Z7HCRIeobU","evidenceNumber":"op1xNFZ8gl","identificationNumber":null,"inquiryDate":"2021-04-13T14:38:09.128Z","inquiryPrice":164000,"document":"20210102","location":null,"locationEtc":null,"note":null,"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"id":2,"state":0,"version":1}	2021-04-13 14:38:55.95552	19	\N	2
4	assetsCreate		{"quantity":1,"name":"Nokia 2.4","user":{"id":12,"name":"Anežka","surname":"Novotná","version":1,"unit":{"id":7,"name":"A21","version":1}},"serialNumber":"BDkGUI5IZG","inventoryNumber":"DEg8WNBSr2","evidenceNumber":"lsGtbVXHuA","identificationNumber":null,"inquiryDate":"2021-04-13T14:42:43.935Z","inquiryPrice":2500,"document":"20210103","location":null,"locationEtc":null,"note":null,"category":{"id":30,"name":"Mobilní telefon","code":"","version":1},"categoryId":30,"id":3,"state":0,"version":1}	2021-04-13 14:43:27.054682	12	\N	3
5	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":16,"name":"Roman","surname":"Bartoška"}	2021-04-13 14:43:57.782817	19	\N	2
6	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":16,"name":"Roman","surname":"Bartoška"}	2021-04-13 14:44:05.0839	19	\N	1
7	assetsCreate		{"quantity":1,"name":"Dell 2501","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"vySRXKaBmI","inventoryNumber":"6PhX8Qd2Zm","evidenceNumber":"TdAVStd3Cr","identificationNumber":null,"inquiryDate":"2021-04-13T14:46:05.852Z","inquiryPrice":28000,"document":"20210104","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":4,"state":0,"version":1}	2021-04-13 14:46:40.534316	16	\N	4
8	assetsCreate		{"quantity":1,"name":"Dell 2501","user":{"id":8,"name":"Alfred","surname":"Hynek","version":1,"unit":{"id":3,"name":"A11","version":1}},"serialNumber":"zZJkcT8OJt","inventoryNumber":"QuPL0aW5hx","evidenceNumber":"sRy1eA3yVh","identificationNumber":null,"inquiryDate":"2021-04-13T14:46:42.054Z","inquiryPrice":28000,"document":"20210104","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":5,"state":0,"version":1}	2021-04-13 14:47:08.772526	8	\N	5
9	assetsCreate		{"quantity":1,"name":"Dell 2501","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"serialNumber":"vFYIJW4OrU","inventoryNumber":"RH04XsE9fI","evidenceNumber":"5LzNb6l90I","identificationNumber":null,"inquiryDate":"2021-04-13T14:47:10.347Z","inquiryPrice":28000,"document":"20210104","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":6,"state":0,"version":1}	2021-04-13 14:47:39.49375	10	\N	6
10	assetsCreate		{"quantity":1,"name":"Dell 2501","user":{"id":9,"name":"Tomáš","surname":"Kloudný","version":1,"unit":{"id":6,"name":"A2","version":1}},"serialNumber":"i3NfPkzRxD","inventoryNumber":"jVsVsQdoF3","evidenceNumber":"XUHNFih2Xd","identificationNumber":null,"inquiryDate":"2021-04-13T14:47:40.820Z","inquiryPrice":28000,"document":"20210104","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":7,"state":0,"version":1}	2021-04-13 14:48:05.680677	9	\N	7
11	assetsCreate		{"quantity":1,"name":"Asus XF50","user":{"id":9,"name":"Tomáš","surname":"Kloudný","version":1,"unit":{"id":6,"name":"A2","version":1}},"serialNumber":"aTUH94Pvqk","inventoryNumber":"Kp8TghibrF","evidenceNumber":"sO58aXDndI","identificationNumber":null,"inquiryDate":"2021-04-01T22:00:00.000Z","inquiryPrice":18900,"document":"20210103","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":8,"state":0,"version":1}	2021-04-13 14:48:51.037518	9	\N	8
12	assetsCreate		{"quantity":1,"name":"Asus XF50","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"serialNumber":"4eL83wPm5n","inventoryNumber":"0o6xuiSRC9","evidenceNumber":"AfvGhfe5JT","identificationNumber":null,"inquiryDate":"2021-04-09T22:00:00.000Z","inquiryPrice":18900,"document":"20210108","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":9,"state":0,"version":1}	2021-04-13 14:49:33.664441	20	\N	9
13	assetsCreate		{"quantity":1,"name":"Lenovo 505i","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"NIEqXLYUeB","inventoryNumber":"MTADxSgVgt","evidenceNumber":"nTQ7Xqv6Ox","identificationNumber":null,"inquiryDate":"2021-04-13T14:49:41.050Z","inquiryPrice":14450,"document":"20210109","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":10,"state":0,"version":1}	2021-04-13 14:50:22.87465	11	\N	10
14	assetsCreate		{"quantity":1,"name":"Dell 2501","user":{"id":5,"name":"Barbora","surname":"Pátková","version":1,"unit":{"id":6,"name":"A2","version":1}},"serialNumber":"dkGdWot9K8","inventoryNumber":"nj36BqyfeO","evidenceNumber":"que0tyo9F9","identificationNumber":null,"inquiryDate":"2021-04-06T22:00:00.000Z","inquiryPrice":18900,"document":"20210104","location":null,"locationEtc":null,"note":null,"category":{"id":18,"name":"Počítač stolní","code":"","version":2},"categoryId":18,"id":11,"state":0,"version":1}	2021-04-13 14:51:24.811549	5	\N	11
15	assetsCreate		{"quantity":1,"name":"Lenovo ThinkPad","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"serialNumber":"BfFAqGSrc6","inventoryNumber":"QXnRjAcmPz","evidenceNumber":"oLbyXfQ1SJ","identificationNumber":null,"inquiryDate":"2020-06-10T22:00:00.000Z","inquiryPrice":34900,"document":"20200180","location":null,"locationEtc":null,"note":null,"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"id":12,"state":0,"version":1}	2021-04-13 14:52:21.932826	4	\N	12
16	assetsCreate		{"quantity":1,"name":"Asus Zenbook","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"Eu21TWH8eY","inventoryNumber":"aJgldCFtF2","evidenceNumber":"rqsJ93w6kZ","identificationNumber":null,"inquiryDate":"2021-04-13T14:52:26.221Z","inquiryPrice":29000,"document":"20200450","location":null,"locationEtc":null,"note":null,"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"id":13,"state":0,"version":1}	2021-04-13 14:53:00.952453	19	\N	13
17	assetsCreate		{"quantity":1,"name":"Dell SE2416H","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"k2i28P6R7g","inventoryNumber":"DoNL600zSt","evidenceNumber":"WGnOHGC9Lm","identificationNumber":null,"inquiryDate":"2021-04-11T22:00:00.000Z","inquiryPrice":null,"document":null,"location":null,"locationEtc":null,"note":null,"category":{"id":32,"name":"LED 24","code":"","version":1},"categoryId":32,"id":14,"state":0,"version":1}	2021-04-13 14:56:06.305522	16	\N	14
18	assetsCreate		{"quantity":1,"name":"Dell SE2416H","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"ZQym4FYptC","inventoryNumber":"B9VJL8dHxc","evidenceNumber":"Z3VIA0B9kZ","identificationNumber":null,"inquiryDate":"2021-04-11T22:00:00.000Z","inquiryPrice":2690,"document":"20210105","location":null,"locationEtc":null,"note":null,"category":{"id":32,"name":"LED 24","code":"","version":1},"categoryId":32,"id":15,"state":0,"version":1}	2021-04-13 14:56:48.825655	16	\N	15
19	assetsCreate		{"quantity":1,"name":"Dell SE2416H","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"PBdXrIgeBL","inventoryNumber":"rpQAVU0pHO","evidenceNumber":"Qa58gHnuKp","identificationNumber":null,"inquiryDate":"2021-04-13T15:08:02.253Z","inquiryPrice":2690,"document":"20210104","location":null,"locationEtc":null,"note":null,"category":{"id":32,"name":"LED 24","code":"","version":1},"categoryId":32,"id":16,"state":0,"version":1}	2021-04-13 15:08:25.280549	19	\N	16
20	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-04-13 15:08:32.703308	19	\N	16
21	assetsCreate		{"quantity":1,"name":"Asus VA24EHE","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"ISfWubthEf","inventoryNumber":"2TtDeu4qXO","evidenceNumber":"lZA32j2t0l","identificationNumber":"AO1","inquiryDate":"2020-07-02T22:00:00.000Z","inquiryPrice":2790,"document":"20200104","location":null,"locationEtc":null,"note":null,"category":{"id":32,"name":"LED 24","code":"","version":1},"categoryId":32,"id":17,"state":0,"version":1}	2021-04-13 15:09:49.246525	3	\N	17
22	assetsCreate		{"quantity":1,"name":"Asus VA24EHE","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"serialNumber":"V253u4Dxf8","inventoryNumber":"2YDUclNscl","evidenceNumber":"RVmF4l3B0o","identificationNumber":"AO2","inquiryDate":"2020-06-03T22:00:00.000Z","inquiryPrice":2790,"document":"20200108","location":null,"locationEtc":null,"note":null,"category":{"id":32,"name":"LED 24","code":"","version":1},"categoryId":32,"id":18,"state":0,"version":1}	2021-04-13 15:10:39.75105	4	\N	18
23	assetsCreate		{"quantity":1,"name":"Asus VA24EHE","user":{"id":18,"name":"Jakub","surname":"Richter","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"DQbVVpmji2","inventoryNumber":"llYWHzIdrm","evidenceNumber":"wNkO1lddAj","identificationNumber":null,"inquiryDate":"2020-05-05T22:00:00.000Z","inquiryPrice":2790,"document":"20200508","location":null,"locationEtc":null,"note":null,"category":{"id":32,"name":"LED 24","code":"","version":1},"categoryId":32,"id":19,"state":0,"version":1}	2021-04-13 15:11:26.841009	18	\N	19
24	assetsCreate		{"quantity":1,"name":"Samsung C27F396","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"VoRXL51I48","inventoryNumber":"tVld4rmd0L","evidenceNumber":"HtnhWzUftB","identificationNumber":null,"inquiryDate":"2021-04-13T15:11:35.578Z","inquiryPrice":7490,"document":null,"location":null,"locationEtc":null,"note":null,"category":{"id":33,"name":"LED 27","code":"","version":1},"categoryId":33,"id":20,"state":0,"version":1}	2021-04-13 15:13:12.420952	19	\N	20
25	assetsCreate		{"quantity":1,"name":"Samsung C27F396","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"serialNumber":"DfELuwvM38","inventoryNumber":"YZkaev2zAW","evidenceNumber":"G4SyAqUitY","identificationNumber":null,"inquiryDate":"2021-04-13T15:16:29.064Z","inquiryPrice":6900,"document":null,"location":null,"locationEtc":null,"note":null,"category":{"id":33,"name":"LED 27","code":"","version":1},"categoryId":33,"id":21,"state":0,"version":1}	2021-04-13 15:16:56.08694	6	\N	21
26	assetsChangeInformation	{"version":1}	{"version":2}	2021-04-13 15:18:20.706156	19	\N	14
27	assetsCreate		{"quantity":1,"name":"Gigabyte G34WQC","user":{"id":5,"name":"Barbora","surname":"Pátková","version":1,"unit":{"id":6,"name":"A2","version":1}},"serialNumber":"v7ZTudi91R","inventoryNumber":"Yah7FWE9Qr","evidenceNumber":"8IAlYjP908","identificationNumber":null,"inquiryDate":"2020-06-07T22:00:00.000Z","inquiryPrice":13490,"document":"20200150","location":null,"locationEtc":null,"note":null,"category":{"id":31,"name":"LED 34","code":"","version":1},"categoryId":31,"id":22,"state":0,"version":1}	2021-04-13 15:24:10.10728	5	\N	22
28	assetsCreate		{"quantity":1,"name":"Philips 346B1C","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"uJTAKUct7e","inventoryNumber":"96UMg69Ddr","evidenceNumber":"M9SchvviN6","identificationNumber":null,"inquiryDate":"2020-10-06T22:00:00.000Z","inquiryPrice":14490,"document":"20205081","location":null,"locationEtc":null,"note":null,"category":{"id":31,"name":"LED 34","code":"","version":1},"categoryId":31,"id":23,"state":0,"version":1}	2021-04-13 15:24:58.173186	14	\N	23
29	assetsCreate		{"quantity":1,"name":"HP Laser 135w","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"l6YiRfhGwu","inventoryNumber":"kvkJyMt7nw","evidenceNumber":"PAGj54Bmmw","identificationNumber":null,"inquiryDate":"2021-04-06T22:00:00.000Z","inquiryPrice":7190,"document":"202101050","location":null,"locationEtc":null,"note":null,"category":{"id":34,"name":"Laserová","code":"","version":2},"categoryId":34,"id":24,"state":0,"version":1}	2021-04-13 15:27:57.883505	19	\N	24
30	assetsChangeInformation	{"inquiryPrice":"7190.00","version":1}	{"inquiryPrice":3499,"version":2}	2021-04-13 15:28:15.681001	19	\N	24
31	assetsCreate		{"quantity":1,"name":"HP Laser 107w","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"ifmyiGxZos","inventoryNumber":"2oxo4kqvlC","evidenceNumber":"qCKlOuJNeg","identificationNumber":null,"inquiryDate":"2021-04-13T15:28:18.158Z","inquiryPrice":2499,"document":"2194415613","location":null,"locationEtc":null,"note":null,"category":{"id":34,"name":"Laserová","code":"","version":2},"categoryId":34,"id":25,"state":0,"version":1}	2021-04-13 15:29:40.382981	3	\N	25
32	assetsCreate		{"quantity":1,"name":"HP Color Laser 150nw","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"a6oQPZDwYr","inventoryNumber":"iNiWH69nBD","evidenceNumber":"aAV9mtKiPC","identificationNumber":null,"inquiryDate":"2021-04-13T15:29:54.634Z","inquiryPrice":4699,"document":"9555836385","location":null,"locationEtc":null,"note":null,"category":{"id":34,"name":"Laserová","code":"","version":2},"categoryId":34,"id":26,"state":0,"version":1}	2021-04-13 15:30:55.186187	16	\N	26
33	assetsCreate		{"quantity":1,"name":"Epson EcoTank L3150","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"kUDUNofjfT","inventoryNumber":"E3pvWMjgJG","evidenceNumber":"akVaalvUko","identificationNumber":null,"inquiryDate":"2021-04-06T22:00:00.000Z","inquiryPrice":4790,"document":"2072372010","location":null,"locationEtc":null,"note":null,"category":{"id":35,"name":"Inkoustová","code":"","version":1},"categoryId":35,"id":27,"state":0,"version":1}	2021-04-13 15:34:45.436887	19	\N	27
34	assetsCreate		{"quantity":1,"name":"HP OfficeJet 6950","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"9Rnxaz3DOv","inventoryNumber":"VYDTdm6qiz","evidenceNumber":"5f0T4t5yQh","identificationNumber":null,"inquiryDate":"2020-06-09T22:00:00.000Z","inquiryPrice":2490,"document":"7846110831","location":null,"locationEtc":null,"note":null,"category":{"id":35,"name":"Inkoustová","code":"","version":1},"categoryId":35,"id":28,"state":0,"version":1}	2021-04-13 15:35:51.883919	19	\N	28
35	assetsCreate		{"quantity":1,"name":"Nokia 7.2","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"chH840ygnJ","inventoryNumber":"qusAz8NHzQ","evidenceNumber":"hGgNCOOvqu","identificationNumber":null,"inquiryDate":"2021-04-05T22:00:00.000Z","inquiryPrice":8349,"document":null,"location":null,"locationEtc":null,"note":null,"category":{"id":29,"name":"Mobilní telefon","code":"","version":1},"categoryId":29,"id":29,"state":0,"version":1}	2021-04-13 15:42:04.3743	16	\N	29
36	assetsCreate		{"quantity":1,"name":"Nokia 7.2","user":{"id":8,"name":"Alfred","surname":"Hynek","version":1,"unit":{"id":3,"name":"A11","version":1}},"serialNumber":"BhAJKveGSU","inventoryNumber":"Lk0DEmcAKo","evidenceNumber":"tLkLSFdo4u","identificationNumber":null,"inquiryDate":"2021-03-30T22:00:00.000Z","inquiryPrice":9190,"document":"6766326231","location":null,"locationEtc":null,"note":null,"category":{"id":29,"name":"Mobilní telefon","code":"","version":1},"categoryId":29,"id":30,"state":0,"version":1}	2021-04-13 15:42:37.12404	8	\N	30
37	assetsCreate		{"quantity":1,"name":"Samsung Galaxy A20","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"serialNumber":"Abm4wvCtG0","inventoryNumber":"WuWnsNBIm0","evidenceNumber":"UVLosSytY9","identificationNumber":null,"inquiryDate":"2020-04-28T22:00:00.000Z","inquiryPrice":4840,"document":"2072372010","location":null,"locationEtc":null,"note":null,"category":{"id":29,"name":"Mobilní telefon","code":"","version":1},"categoryId":29,"id":31,"state":0,"version":1}	2021-04-13 15:43:16.388653	10	\N	31
38	assetsCreate		{"quantity":1,"name":"Samsung Galaxy A20","user":{"id":9,"name":"Tomáš","surname":"Kloudný","version":1,"unit":{"id":6,"name":"A2","version":1}},"serialNumber":"HVDxC25rU2","inventoryNumber":"wklgw8Ek3H","evidenceNumber":"L53wo9jftdu","identificationNumber":null,"inquiryDate":"2021-04-13T15:43:17.879Z","inquiryPrice":4490,"document":"7846110831","location":null,"locationEtc":null,"note":null,"category":{"id":29,"name":"Mobilní telefon","code":"","version":1},"categoryId":29,"id":32,"state":0,"version":1}	2021-04-13 15:43:57.995764	9	\N	32
39	assetsCreate		{"quantity":"1","name":"circuit","serialNumber":"3xeosjxyh","inventoryNumber":"y3kl0yk1h","evidenceNumber":"d6pbowg06","inquiryDate":"Tue Apr 13 2021 09:07:00 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"199","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":33,"state":0,"version":1}	2021-04-13 15:54:58.983508	14	\N	33
40	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"5rhi8bw36","inventoryNumber":"6a5bcaaa6","evidenceNumber":"q0w510eh7","inquiryDate":"Mon Apr 12 2021 19:37:24 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"199","user":{"id":22,"name":"Zlata","surname":"Špotáková","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":34,"state":0,"version":1}	2021-04-13 15:55:58.641114	22	\N	34
41	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"ow9pczl6s","inventoryNumber":"lhtisb7qi","evidenceNumber":"mze6tmlvw","inquiryDate":"Mon Apr 12 2021 21:35:47 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"392","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":35,"state":0,"version":1}	2021-04-13 15:56:21.081122	6	\N	35
42	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"3sbcb80fg","inventoryNumber":"f1seac7xa","evidenceNumber":"t2l0jtjqm","inquiryDate":"Tue Apr 13 2021 08:21:34 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"470","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":36,"state":0,"version":1}	2021-04-13 15:57:26.25313	15	\N	36
43	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"fmphim6i7","inventoryNumber":"q5w2w8kg1","evidenceNumber":"1z9tbq66z","inquiryDate":"Tue Apr 13 2021 12:10:39 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"254","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":37,"state":0,"version":1}	2021-04-13 15:57:26.435053	16	\N	37
44	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"vrhei2b44","inventoryNumber":"1vh6uzfny","evidenceNumber":"vvnnii3ph","inquiryDate":"Mon Apr 12 2021 22:44:46 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"511","user":{"id":9,"name":"Tomáš","surname":"Kloudný","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":38,"state":0,"version":1}	2021-04-13 15:57:26.579941	9	\N	38
45	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"931xhw3wq","inventoryNumber":"17jinumae","evidenceNumber":"5qigmsau3","inquiryDate":"Mon Apr 12 2021 23:37:05 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"471","user":{"id":5,"name":"Barbora","surname":"Pátková","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":39,"state":0,"version":1}	2021-04-13 15:57:27.038099	5	\N	39
46	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"xxc8uab84","inventoryNumber":"lfmlqmawg","evidenceNumber":"u2x67dgj3","inquiryDate":"Tue Apr 13 2021 03:08:58 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"485","user":{"id":17,"name":"Martin","surname":"Šmatlák","version":1,"unit":{"id":11,"name":"B2","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":40,"state":0,"version":1}	2021-04-13 15:57:27.231272	17	\N	40
47	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"jq19600e3","inventoryNumber":"pfnie6dne","evidenceNumber":"0zimygiyk","inquiryDate":"Tue Apr 13 2021 16:26:14 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"261","user":{"id":17,"name":"Martin","surname":"Šmatlák","version":1,"unit":{"id":11,"name":"B2","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":41,"state":0,"version":1}	2021-04-13 15:57:27.401204	17	\N	41
48	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"6dccuieaq","inventoryNumber":"ah4ppcabk","evidenceNumber":"f9hli1lzs","inquiryDate":"Mon Apr 12 2021 22:40:22 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"369","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":42,"state":0,"version":1}	2021-04-13 15:57:27.562567	7	\N	42
49	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"45yomtw54","inventoryNumber":"3hyh2zp3e","evidenceNumber":"4nj4owyts","inquiryDate":"Mon Apr 12 2021 18:43:02 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"574","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":43,"state":0,"version":1}	2021-04-13 15:57:27.730337	11	\N	43
50	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"smjjv9lps","inventoryNumber":"nd2y4eklz","evidenceNumber":"1ampcsrkl","inquiryDate":"Tue Apr 13 2021 15:47:47 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"250","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":44,"state":0,"version":1}	2021-04-13 15:57:27.94299	11	\N	44
51	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"xbl4hw27j","inventoryNumber":"al9ywdv7f","evidenceNumber":"jwrp61p9g","inquiryDate":"Tue Apr 13 2021 02:37:33 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"265","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":45,"state":0,"version":1}	2021-04-13 15:57:28.106942	20	\N	45
52	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"x1i8qzxmx","inventoryNumber":"j208q3ad0","evidenceNumber":"fy4m5cklf","inquiryDate":"Tue Apr 13 2021 05:08:34 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"475","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":46,"state":0,"version":1}	2021-04-13 15:57:28.278871	7	\N	46
53	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"snzs7lbp7","inventoryNumber":"vi1l6beli","evidenceNumber":"v66ur91kt","inquiryDate":"Tue Apr 13 2021 16:48:03 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"516","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":47,"state":0,"version":1}	2021-04-13 15:57:28.460968	19	\N	47
54	assetsCreate		{"quantity":"1","name":"HP","serialNumber":"cvnvhzbg7","inventoryNumber":"sblu8fdb4","evidenceNumber":"bel7kydbg","inquiryDate":"Mon Apr 12 2021 20:53:44 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"241","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":26,"name":"Klávesnice","code":"","version":1},"categoryId":26,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":48,"state":0,"version":1}	2021-04-13 15:57:28.612706	7	\N	48
55	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"q7ykzwp16","inventoryNumber":"547zlyjl1","evidenceNumber":"vuuh4otpc","inquiryDate":"Mon Apr 12 2021 20:29:04 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"328","user":{"id":17,"name":"Martin","surname":"Šmatlák","version":1,"unit":{"id":11,"name":"B2","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":49,"state":0,"version":1}	2021-04-13 16:00:44.209334	17	\N	49
56	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"mdmhaer18","inventoryNumber":"pcsqmbzik","evidenceNumber":"boj6kwdke","inquiryDate":"Mon Apr 12 2021 23:18:55 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"388","user":{"id":18,"name":"Jakub","surname":"Richter","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":50,"state":0,"version":1}	2021-04-13 16:00:44.374053	18	\N	50
57	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"no3zypdgl","inventoryNumber":"u34zrmrzm","evidenceNumber":"k7ma7j6fz","inquiryDate":"Mon Apr 12 2021 21:12:18 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"222","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":51,"state":0,"version":1}	2021-04-13 16:00:44.551563	6	\N	51
59	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"e2ll7hxv8","inventoryNumber":"4i0u0oeop","evidenceNumber":"32gr4mdkc","inquiryDate":"Tue Apr 13 2021 11:54:15 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"484","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":53,"state":0,"version":1}	2021-04-13 16:00:45.049305	14	\N	53
60	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"ij0a50tw3","inventoryNumber":"rt9qm6b0u","evidenceNumber":"chhqohvhg","inquiryDate":"Tue Apr 13 2021 11:33:35 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"257","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":54,"state":0,"version":1}	2021-04-13 16:00:45.213819	20	\N	54
61	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"96h025l55","inventoryNumber":"s08sl4xsx","evidenceNumber":"gvpmtm9p5","inquiryDate":"Tue Apr 13 2021 16:14:08 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"289","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":55,"state":0,"version":1}	2021-04-13 16:00:45.36067	15	\N	55
62	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"nfuhjwv8p","inventoryNumber":"v7d8vnuqj","evidenceNumber":"52xph6uwk","inquiryDate":"Tue Apr 13 2021 03:32:47 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"270","user":{"id":9,"name":"Tomáš","surname":"Kloudný","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":56,"state":0,"version":1}	2021-04-13 16:00:45.528564	9	\N	56
63	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"zx1ge8gzi","inventoryNumber":"s19hmftrh","evidenceNumber":"s3kubwcbu","inquiryDate":"Tue Apr 13 2021 03:21:20 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"407","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":57,"state":0,"version":1}	2021-04-13 16:00:45.690547	10	\N	57
64	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"pz090sydm","inventoryNumber":"j683p1om0","evidenceNumber":"oma879fp4","inquiryDate":"Mon Apr 12 2021 21:00:32 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"383","user":{"id":12,"name":"Anežka","surname":"Novotná","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":58,"state":0,"version":1}	2021-04-13 16:00:46.166787	12	\N	58
65	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"iyrrkuh9g","inventoryNumber":"7fay90bbz","evidenceNumber":"uyy91t31x","inquiryDate":"Mon Apr 12 2021 20:29:17 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"233","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":59,"state":0,"version":1}	2021-04-13 16:00:46.325913	16	\N	59
66	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"men7od08r","inventoryNumber":"w7hmksre0","evidenceNumber":"pvtk74z6k","inquiryDate":"Mon Apr 12 2021 18:41:30 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"243","user":{"id":22,"name":"Zlata","surname":"Špotáková","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":60,"state":0,"version":1}	2021-04-13 16:00:46.505182	22	\N	60
67	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"rovfk1v5w","inventoryNumber":"xxecokkn0","evidenceNumber":"2nmluld4a","inquiryDate":"Tue Apr 13 2021 04:47:16 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"323","user":{"id":12,"name":"Anežka","surname":"Novotná","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":61,"state":0,"version":1}	2021-04-13 16:00:46.821598	12	\N	61
68	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"ma2852jid","inventoryNumber":"qe6ofw9qx","evidenceNumber":"huo6v62ld","inquiryDate":"Mon Apr 12 2021 20:27:55 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"303","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":62,"state":0,"version":1}	2021-04-13 16:00:46.980778	15	\N	62
69	assetsCreate		{"quantity":"1","name":"Logitech","serialNumber":"eaukm71or","inventoryNumber":"jdt40n6gw","evidenceNumber":"9uf3mlynh","inquiryDate":"Tue Apr 13 2021 10:42:11 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"342","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":27,"name":"Myš","code":"","version":1},"categoryId":27,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":63,"state":0,"version":1}	2021-04-13 16:00:47.148667	20	\N	63
70	assetsCreate		{"quantity":"1","name":"Samsung","serialNumber":"04o1og7b0","inventoryNumber":"9os60jxf0","evidenceNumber":"av0esl9ox","inquiryDate":"Tue Apr 13 2021 08:58:53 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"4579","user":{"id":8,"name":"Alfred","surname":"Hynek","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":8,"name":"Klimatizace","code":"","version":1},"categoryId":8,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":64,"state":0,"version":1}	2021-04-13 16:19:07.826677	8	\N	64
71	assetsCreate		{"quantity":"1","name":"Samsung","serialNumber":"rywn8m5gm","inventoryNumber":"3iecuefec","evidenceNumber":"2fcgjrju0","inquiryDate":"Tue Apr 13 2021 06:40:25 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"4637","user":{"id":9,"name":"Tomáš","surname":"Kloudný","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":8,"name":"Klimatizace","code":"","version":1},"categoryId":8,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":65,"state":0,"version":1}	2021-04-13 16:19:08.134925	9	\N	65
72	assetsCreate		{"quantity":"1","name":"Samsung","serialNumber":"6nmoizw3o","inventoryNumber":"z4h05pmoe","evidenceNumber":"eulw21nea","inquiryDate":"Tue Apr 13 2021 17:28:59 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"4515","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":8,"name":"Klimatizace","code":"","version":1},"categoryId":8,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":66,"state":0,"version":1}	2021-04-13 16:19:08.500594	11	\N	66
73	assetsCreate		{"quantity":"1","name":"Samsung","serialNumber":"qwgpni7jy","inventoryNumber":"cfk1clo0c","evidenceNumber":"xi05mrrzn","inquiryDate":"Tue Apr 13 2021 10:01:00 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"4103","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":8,"name":"Klimatizace","code":"","version":1},"categoryId":8,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":67,"state":0,"version":1}	2021-04-13 16:19:08.701167	7	\N	67
74	assetsCreate		{"quantity":"1","name":"Samsung","serialNumber":"3nsfcmb35","inventoryNumber":"rtmj92a4n","evidenceNumber":"l3bqv18ul","inquiryDate":"Mon Apr 12 2021 22:42:57 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"4109","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":8,"name":"Klimatizace","code":"","version":1},"categoryId":8,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":68,"state":0,"version":1}	2021-04-13 16:19:08.883647	4	\N	68
75	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"nkplp24fv","inventoryNumber":"5e8gd42y5","evidenceNumber":"m1tks19m2","inquiryDate":"Tue Apr 13 2021 10:05:50 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1030","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":69,"state":0,"version":1}	2021-04-13 16:23:15.951272	14	\N	69
76	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"ho2bzxp2k","inventoryNumber":"iyc1sayco","evidenceNumber":"90t0gl4gd","inquiryDate":"Tue Apr 13 2021 16:30:39 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1176","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":70,"state":0,"version":1}	2021-04-13 16:23:16.234534	20	\N	70
77	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"wsv6ldagi","inventoryNumber":"twcqy4b9b","evidenceNumber":"l327bm0ls","inquiryDate":"Mon Apr 12 2021 19:58:48 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1427","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":71,"state":0,"version":1}	2021-04-13 16:23:16.355819	3	\N	71
78	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"51txnicv7","inventoryNumber":"ezt11bf9b","evidenceNumber":"un97h565e","inquiryDate":"Tue Apr 13 2021 16:23:29 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1167","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":72,"state":0,"version":1}	2021-04-13 16:23:16.525197	19	\N	72
79	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"lvw8vor56","inventoryNumber":"c0sjophrl","evidenceNumber":"e60ks0c79","inquiryDate":"Tue Apr 13 2021 00:09:53 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1075","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":73,"state":0,"version":1}	2021-04-13 16:23:16.667707	11	\N	73
80	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"ml19zp2y2","inventoryNumber":"dwxls88ow","evidenceNumber":"ceq91edl4","inquiryDate":"Tue Apr 13 2021 06:19:09 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1024","user":{"id":12,"name":"Anežka","surname":"Novotná","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":74,"state":0,"version":1}	2021-04-13 16:23:16.895816	12	\N	74
81	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"ws84sb6gg","inventoryNumber":"jc92c7r8l","evidenceNumber":"venm6pmj2","inquiryDate":"Tue Apr 13 2021 00:14:02 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1248","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":75,"state":0,"version":1}	2021-04-13 16:23:17.156802	11	\N	75
82	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"69rdt1wd5","inventoryNumber":"jiydy6lxg","evidenceNumber":"iyum8pidh","inquiryDate":"Tue Apr 13 2021 04:50:21 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1256","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":76,"state":0,"version":1}	2021-04-13 16:23:17.28722	3	\N	76
83	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"uta336iqr","inventoryNumber":"wvqnyfvcv","evidenceNumber":"2gxmn23xz","inquiryDate":"Mon Apr 12 2021 21:27:46 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1022","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":77,"state":0,"version":1}	2021-04-13 16:23:17.441332	10	\N	77
84	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"no28c5frm","inventoryNumber":"qaaixhzfe","evidenceNumber":"72u2oevky","inquiryDate":"Tue Apr 13 2021 13:18:33 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1087","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":78,"state":0,"version":1}	2021-04-13 16:23:17.647874	6	\N	78
85	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"o15nty7p9","inventoryNumber":"ymnd5ws97","evidenceNumber":"rsvpzepj9","inquiryDate":"Tue Apr 13 2021 01:58:53 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1359","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":79,"state":0,"version":1}	2021-04-13 16:23:17.759874	15	\N	79
86	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"ywz74spqh","inventoryNumber":"rtte9b5ln","evidenceNumber":"z5uco3nlz","inquiryDate":"Tue Apr 13 2021 05:15:17 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1378","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":80,"state":0,"version":1}	2021-04-13 16:23:17.980724	7	\N	80
87	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"o4ivdr3fd","inventoryNumber":"zw3yxmkn8","evidenceNumber":"j5e4gveht","inquiryDate":"Tue Apr 13 2021 14:38:35 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1293","user":{"id":22,"name":"Zlata","surname":"Špotáková","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":81,"state":0,"version":1}	2021-04-13 16:23:18.117268	22	\N	81
88	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"jzquve7ms","inventoryNumber":"0k0rpy7l3","evidenceNumber":"9tcnvaanu","inquiryDate":"Tue Apr 13 2021 07:41:35 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1310","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":82,"state":0,"version":1}	2021-04-13 16:23:18.24682	6	\N	82
89	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"2mrlg0gd9","inventoryNumber":"e39hjaytu","evidenceNumber":"cl2hmr82z","inquiryDate":"Tue Apr 13 2021 17:35:05 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1049","user":{"id":22,"name":"Zlata","surname":"Špotáková","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":83,"state":0,"version":1}	2021-04-13 16:23:18.35139	22	\N	83
90	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"xljep2f4f","inventoryNumber":"8atlb195v","evidenceNumber":"a520ewaw3","inquiryDate":"Tue Apr 13 2021 09:13:55 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1167","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":84,"state":0,"version":1}	2021-04-13 16:23:18.445765	15	\N	84
91	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"tml98asgw","inventoryNumber":"8jlu140k0","evidenceNumber":"3f32usmbs","inquiryDate":"Mon Apr 12 2021 22:11:05 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1134","user":{"id":21,"name":"Radka","surname":"Důsledná","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":85,"state":0,"version":1}	2021-04-13 16:23:18.584376	21	\N	85
92	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"t3nnxyiau","inventoryNumber":"a58bwyw4c","evidenceNumber":"ebsr0ae1w","inquiryDate":"Tue Apr 13 2021 09:47:25 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1299","user":{"id":21,"name":"Radka","surname":"Důsledná","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":86,"state":0,"version":1}	2021-04-13 16:23:18.749564	21	\N	86
93	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"bk3sz3y0m","inventoryNumber":"cw6p09liy","evidenceNumber":"3egcdyaie","inquiryDate":"Tue Apr 13 2021 03:34:46 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1411","user":{"id":21,"name":"Radka","surname":"Důsledná","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":87,"state":0,"version":1}	2021-04-13 16:23:19.08185	21	\N	87
94	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"weh1ih9qg","inventoryNumber":"278b23hxx","evidenceNumber":"5ubv70gt8","inquiryDate":"Tue Apr 13 2021 17:27:03 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1008","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":88,"state":0,"version":1}	2021-04-13 16:23:19.462482	10	\N	88
95	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"79p0y0eaf","inventoryNumber":"w685yxew4","evidenceNumber":"qp0jq0p21","inquiryDate":"Tue Apr 13 2021 08:07:57 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1050","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":89,"state":0,"version":1}	2021-04-13 16:23:19.58448	6	\N	89
96	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"tuvyrbt73","inventoryNumber":"wp40uoo2f","evidenceNumber":"84oyetn8k","inquiryDate":"Tue Apr 13 2021 01:30:40 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1150","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":90,"state":0,"version":1}	2021-04-13 16:23:19.689886	15	\N	90
97	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"smpzbuhr4","inventoryNumber":"2loko5ie0","evidenceNumber":"j038ldyik","inquiryDate":"Tue Apr 13 2021 10:20:00 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1409","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":91,"state":0,"version":1}	2021-04-13 16:23:19.91725	3	\N	91
98	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"v6qx8ycvb","inventoryNumber":"ea7xwtuug","evidenceNumber":"proxic128","inquiryDate":"Tue Apr 13 2021 07:49:46 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1205","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":92,"state":0,"version":1}	2021-04-13 16:23:20.032897	10	\N	92
99	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"src5n3e0u","inventoryNumber":"klz8s850p","evidenceNumber":"52o8dei68","inquiryDate":"Mon Apr 12 2021 21:27:36 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1115","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":93,"state":0,"version":1}	2021-04-13 16:23:20.15875	19	\N	93
100	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"1ld6uxjb1","inventoryNumber":"5csnddv97","evidenceNumber":"irou7s0p4","inquiryDate":"Tue Apr 13 2021 18:17:47 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1323","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":94,"state":0,"version":1}	2021-04-13 16:23:20.277263	20	\N	94
101	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"v9t48rv8b","inventoryNumber":"coin7pi0n","evidenceNumber":"n7xr56z7e","inquiryDate":"Tue Apr 13 2021 09:51:35 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1189","user":{"id":12,"name":"Anežka","surname":"Novotná","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":95,"state":0,"version":1}	2021-04-13 16:23:20.473078	12	\N	95
102	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"qb94cbwft","inventoryNumber":"9zihp61cy","evidenceNumber":"9d6yaf82z","inquiryDate":"Tue Apr 13 2021 00:10:36 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1264","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":96,"state":0,"version":1}	2021-04-13 16:23:20.599459	3	\N	96
103	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"79xa5ny5q","inventoryNumber":"bo7jrgusu","evidenceNumber":"p3k0fd036","inquiryDate":"Tue Apr 13 2021 00:35:48 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1134","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":97,"state":0,"version":1}	2021-04-13 16:26:31.64874	7	\N	97
104	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"9557ms3a4","inventoryNumber":"j36f2z6a5","evidenceNumber":"cf4qkk37b","inquiryDate":"Tue Apr 13 2021 16:59:51 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1394","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":98,"state":0,"version":1}	2021-04-13 16:26:32.003762	11	\N	98
105	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"o047zk9wz","inventoryNumber":"36kh84g1v","evidenceNumber":"qkc02rk7u","inquiryDate":"Tue Apr 13 2021 04:27:41 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1371","user":{"id":13,"name":"Aneta","surname":"Bittnerová","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":99,"state":0,"version":1}	2021-04-13 16:26:32.181778	13	\N	99
106	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"smia7cu54","inventoryNumber":"ijh14cf4w","evidenceNumber":"78z41s76o","inquiryDate":"Mon Apr 12 2021 20:51:27 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1497","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":100,"state":0,"version":1}	2021-04-13 16:26:32.367896	4	\N	100
107	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"g128aivnr","inventoryNumber":"tofcl7w9b","evidenceNumber":"1xmhcmfzs","inquiryDate":"Tue Apr 13 2021 16:23:31 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1325","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":101,"state":0,"version":1}	2021-04-13 16:26:32.546879	7	\N	101
108	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"fmvbfrebe","inventoryNumber":"m9s1d1oso","evidenceNumber":"5enfzwcn0","inquiryDate":"Tue Apr 13 2021 05:50:17 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1197","user":{"id":12,"name":"Anežka","surname":"Novotná","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":102,"state":0,"version":1}	2021-04-13 16:26:32.729275	12	\N	102
109	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"imtuv0aup","inventoryNumber":"mpjogqp3d","evidenceNumber":"7l9smbf37","inquiryDate":"Tue Apr 13 2021 09:02:08 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1071","user":{"id":12,"name":"Anežka","surname":"Novotná","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":103,"state":0,"version":1}	2021-04-13 16:26:32.903029	12	\N	103
110	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"kwf5z67ux","inventoryNumber":"7rtdsgapf","evidenceNumber":"cwtg7metq","inquiryDate":"Mon Apr 12 2021 20:05:56 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1028","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":104,"state":0,"version":1}	2021-04-13 16:26:33.066591	15	\N	104
111	assetsCreate		{"quantity":"1","name":"Windows 10","serialNumber":"t1p2ejnax","inventoryNumber":"6yvn78wen","evidenceNumber":"00dicsups","inquiryDate":"Tue Apr 13 2021 15:10:01 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1274","user":{"id":13,"name":"Aneta","surname":"Bittnerová","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":105,"state":0,"version":1}	2021-04-13 16:26:33.23946	13	\N	105
112	assetsRemoved	{"id":82,"name":"Windows 10","quantity":1,"serialNumber":"jzquve7ms","inventoryNumber":"0k0rpy7l3","evidenceNumber":"9tcnvaanu","identificationNumber":null,"inquiryDate":"2021-04-13T05:41:35.000Z","document":null,"location":null,"locationEtc":null,"note":null,"inquiryPrice":"1310.00","categoryId":17,"state":1,"version":2,"user":{"id":6,"username":"danecek","name":"Daniel","surname":"Prášek","version":1,"rights":[],"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1}}		2021-04-13 16:31:01.392907	19	\N	82
113	assetsRemoved	{"id":89,"name":"Windows 10","quantity":1,"serialNumber":"79p0y0eaf","inventoryNumber":"w685yxew4","evidenceNumber":"qp0jq0p21","identificationNumber":null,"inquiryDate":"2021-04-13T06:07:57.000Z","document":null,"location":null,"locationEtc":null,"note":null,"inquiryPrice":"1050.00","categoryId":17,"state":1,"version":2,"user":{"id":6,"username":"danecek","name":"Daniel","surname":"Prášek","version":1,"rights":[],"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1}}		2021-04-13 16:31:01.395024	19	\N	89
114	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"s5gi3b6hl","inventoryNumber":"96e370o6z","evidenceNumber":"4x79rec8u","inquiryDate":"Tue Apr 13 2021 09:59:03 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1336","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":106,"state":0,"version":1}	2021-04-13 17:06:08.040015	14	\N	106
115	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"sidnv9wuw","inventoryNumber":"53h1z65ex","evidenceNumber":"6dyd6945k","inquiryDate":"Tue Apr 13 2021 17:45:05 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1269","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":107,"state":0,"version":1}	2021-04-13 17:06:08.324759	16	\N	107
116	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"lq1l22gk7","inventoryNumber":"b9y5xe78l","evidenceNumber":"mz1w6oeve","inquiryDate":"Mon Apr 12 2021 20:18:48 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1308","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":108,"state":0,"version":1}	2021-04-13 17:06:08.461437	4	\N	108
117	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"w5rboskf1","inventoryNumber":"oo48et210","evidenceNumber":"4t7csrhs8","inquiryDate":"Tue Apr 13 2021 12:11:09 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1499","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":109,"state":0,"version":1}	2021-04-13 17:06:08.613322	19	\N	109
118	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"hoo3nzqcn","inventoryNumber":"9r7hcijxg","evidenceNumber":"2r5fxawzv","inquiryDate":"Tue Apr 13 2021 15:39:49 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1125","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":110,"state":0,"version":1}	2021-04-13 17:06:08.726089	19	\N	110
119	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"oy67jzif6","inventoryNumber":"05thy7imy","evidenceNumber":"1qln0rtoi","inquiryDate":"Tue Apr 13 2021 09:54:26 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1409","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":111,"state":0,"version":1}	2021-04-13 17:06:08.854392	6	\N	111
120	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"onkd6ww6c","inventoryNumber":"3zwsw6gnu","evidenceNumber":"dc94gvq4j","inquiryDate":"Tue Apr 13 2021 05:32:51 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1143","user":{"id":21,"name":"Radka","surname":"Důsledná","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":112,"state":0,"version":1}	2021-04-13 17:06:09.084249	21	\N	112
121	assetsCreate		{"quantity":"1","name":"Adobe Photoshop ","serialNumber":"d82z3w30d","inventoryNumber":"6cx5gnmzn","evidenceNumber":"m0k9wraqc","inquiryDate":"Tue Apr 13 2021 08:19:32 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1067","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":113,"state":0,"version":1}	2021-04-13 17:06:09.18357	4	\N	113
122	assetsCreate		{"quantity":"1","name":"Acrobat Pro","serialNumber":"gcdmgr5d4","inventoryNumber":"wy82grrxg","evidenceNumber":"j8zalfs98","inquiryDate":"Tue Apr 13 2021 14:07:02 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1256","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":114,"state":0,"version":1}	2021-04-13 17:07:07.46954	11	\N	114
123	assetsCreate		{"quantity":"1","name":"Acrobat Pro","serialNumber":"zl8nlj27q","inventoryNumber":"y1r9wi5u2","evidenceNumber":"qdpnewut4","inquiryDate":"Tue Apr 13 2021 14:26:57 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1421","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":115,"state":0,"version":1}	2021-04-13 17:07:07.767845	10	\N	115
124	assetsCreate		{"quantity":"1","name":"Acrobat Pro","serialNumber":"6zif7ces7","inventoryNumber":"yazlkm7tw","evidenceNumber":"fbwkrp0ze","inquiryDate":"Tue Apr 13 2021 04:33:02 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1432","user":{"id":17,"name":"Martin","surname":"Šmatlák","version":1,"unit":{"id":11,"name":"B2","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":116,"state":0,"version":1}	2021-04-13 17:07:08.079585	17	\N	116
125	assetsCreate		{"quantity":"1","name":"Acrobat Pro","serialNumber":"jo28a0o8h","inventoryNumber":"gntcqb8vj","evidenceNumber":"fi1ydu8w9","inquiryDate":"Tue Apr 13 2021 14:54:28 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1483","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":117,"state":0,"version":1}	2021-04-13 17:07:08.202273	6	\N	117
126	assetsCreate		{"quantity":"1","name":"Acrobat Pro","serialNumber":"jzdbmc22m","inventoryNumber":"5nrs6zkvj","evidenceNumber":"ppyjtk8ai","inquiryDate":"Tue Apr 13 2021 12:47:44 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1121","user":{"id":18,"name":"Jakub","surname":"Richter","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":118,"state":0,"version":1}	2021-04-13 17:07:08.433626	18	\N	118
127	assetsCreate		{"quantity":"1","name":"Acrobat Pro","serialNumber":"9r5fuxtdi","inventoryNumber":"3yimg9vxo","evidenceNumber":"tmhvjdwi4","inquiryDate":"Mon Apr 12 2021 21:45:08 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1157","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":119,"state":0,"version":1}	2021-04-13 17:07:08.609105	20	\N	119
128	assetsCreate		{"quantity":"1","name":"Acrobat Pro","serialNumber":"kopq0jvyb","inventoryNumber":"9dsmh2b5o","evidenceNumber":"ovm3dqt3g","inquiryDate":"Tue Apr 13 2021 08:02:13 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1188","user":{"id":7,"name":"Adam","surname":"Havel","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":17,"name":"Software","code":"","version":1},"categoryId":17,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":120,"state":0,"version":1}	2021-04-13 17:07:08.781049	7	\N	120
129	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"51snn5dtw","inventoryNumber":"ymrg37jqp","evidenceNumber":"c5a109075","inquiryDate":"Tue Apr 13 2021 08:30:51 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1150","user":{"id":9,"name":"Tomáš","surname":"Kloudný","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":121,"state":0,"version":1}	2021-04-13 17:09:39.918752	9	\N	121
130	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"83wgugluf","inventoryNumber":"ssgfgwuyy","evidenceNumber":"wa7eu0o6r","inquiryDate":"Mon Apr 12 2021 21:09:15 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1060","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":122,"state":0,"version":1}	2021-04-13 17:09:40.08581	10	\N	122
131	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"b4z0nld09","inventoryNumber":"qkttjqniw","evidenceNumber":"20g7fevqd","inquiryDate":"Tue Apr 13 2021 06:26:04 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1321","user":{"id":5,"name":"Barbora","surname":"Pátková","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":123,"state":0,"version":1}	2021-04-13 17:09:40.238875	5	\N	123
132	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"h04ll1v90","inventoryNumber":"m4xdknq4f","evidenceNumber":"anz2uvq2n","inquiryDate":"Tue Apr 13 2021 17:13:05 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1352","user":{"id":5,"name":"Barbora","surname":"Pátková","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":124,"state":0,"version":1}	2021-04-13 17:09:40.381595	5	\N	124
133	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"eab3anlyk","inventoryNumber":"0q8d9jdc0","evidenceNumber":"qawsc66gj","inquiryDate":"Tue Apr 13 2021 11:42:07 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1465","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":125,"state":0,"version":1}	2021-04-13 17:09:40.697462	14	\N	125
134	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"9f0pmi1gh","inventoryNumber":"isvgr3krv","evidenceNumber":"1amij9iu4","inquiryDate":"Tue Apr 13 2021 10:25:44 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1095","user":{"id":11,"name":"Anna","surname":"Nová","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":126,"state":0,"version":1}	2021-04-13 17:09:40.884711	11	\N	126
135	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"v4z8imdtd","inventoryNumber":"y99snoflf","evidenceNumber":"5cetxwwmz","inquiryDate":"Tue Apr 13 2021 12:27:21 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1226","user":{"id":18,"name":"Jakub","surname":"Richter","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":127,"state":0,"version":1}	2021-04-13 17:09:41.016758	18	\N	127
136	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"i7hiokyb8","inventoryNumber":"yd8sw56ih","evidenceNumber":"u3esysrts","inquiryDate":"Tue Apr 13 2021 04:07:21 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1290","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":128,"state":0,"version":1}	2021-04-13 17:09:41.186777	6	\N	128
137	assetsCreate		{"quantity":"1","name":"Lenovo ThinkPad","serialNumber":"c9zi1rks4","inventoryNumber":"9j4lsod5f","evidenceNumber":"q0nl6v09c","inquiryDate":"Tue Apr 13 2021 16:05:56 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"1140","user":{"id":8,"name":"Alfred","surname":"Hynek","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":21,"name":"Notebook","code":"","version":1},"categoryId":21,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":129,"state":0,"version":1}	2021-04-13 17:09:41.334902	8	\N	129
138	assetsCreate		{"quantity":1,"name":"Sklad21","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"serialNumber":null,"inventoryNumber":null,"evidenceNumber":null,"identificationNumber":null,"inquiryDate":"2021-03-28T22:00:00.000Z","inquiryPrice":null,"document":null,"location":null,"locationEtc":null,"note":null,"category":{"id":15,"name":"Chladící box","code":"","version":1},"categoryId":15,"id":130,"state":0,"version":1}	2021-04-13 17:32:06.912142	19	\N	130
139	assetsCreate		{"quantity":1,"name":"Rational","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"serialNumber":"uogZOrGkg3","inventoryNumber":"btHschEUVa","evidenceNumber":"Sj1jimobF9","identificationNumber":null,"inquiryDate":"2021-04-13T17:32:54.031Z","inquiryPrice":589000,"document":"7928882085","location":null,"locationEtc":null,"note":null,"category":{"id":12,"name":"Konvektomat","code":"","version":1},"categoryId":12,"id":131,"state":0,"version":1}	2021-04-13 17:33:35.143832	19	\N	131
140	assetsCreate		{"quantity":1,"name":"Objem 70l","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"c5xihYq9G4","inventoryNumber":"j8M43rL7O8","evidenceNumber":"dHziFYOx3f","identificationNumber":null,"inquiryDate":"2021-04-13T17:33:39.784Z","inquiryPrice":279000,"document":"7776906395","location":null,"locationEtc":null,"note":null,"category":{"id":13,"name":"Kuchyňský robot","code":"","version":1},"categoryId":13,"id":132,"state":0,"version":1}	2021-04-13 17:35:18.602857	19	\N	132
141	assetsCreate		{"quantity":1,"name":"Šíře 140","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"Cg8iBsZzXf","inventoryNumber":"mtohdi13WP","evidenceNumber":"c5xihYq9G4","identificationNumber":null,"inquiryDate":"2021-04-13T17:35:22.362Z","inquiryPrice":219000,"document":"3656573723","location":null,"locationEtc":null,"note":null,"category":{"id":14,"name":"Mandl","code":"","version":1},"categoryId":14,"id":133,"state":0,"version":1}	2021-04-13 17:35:58.853042	19	\N	133
142	assetsCreate		{"quantity":1,"name":"Winterhalter","user":{"id":8,"name":"Alfred","surname":"Hynek","version":1,"unit":{"id":3,"name":"A11","version":1}},"serialNumber":"4wGLHuqVuf","inventoryNumber":"j8M43rL7O8","evidenceNumber":"mtohdi13WP","identificationNumber":null,"inquiryDate":"2021-03-31T22:00:00.000Z","inquiryPrice":189000,"document":"6972964663","location":null,"locationEtc":null,"note":null,"category":{"id":10,"name":"Myčka","code":"","version":1},"categoryId":10,"id":134,"state":0,"version":1}	2021-04-13 17:37:12.262823	19	\N	134
143	assetsCreate		{"quantity":1,"name":"Mountfield Bsd50","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"serialNumber":"zwRjeVVgS9","inventoryNumber":"UTARo0qYyg","evidenceNumber":"1SjESr8Z3b","identificationNumber":null,"inquiryDate":"2021-04-08T22:00:00.000Z","inquiryPrice":64500,"document":"3825864277","location":null,"locationEtc":null,"note":null,"category":{"id":16,"name":"Zahradní traktor","code":"","version":1},"categoryId":16,"id":135,"state":0,"version":1}	2021-04-13 17:37:57.125607	19	\N	135
144	assetsCreate		{"quantity":"1","name":"HP Proliant jta","serialNumber":"1ui5zj86j","inventoryNumber":"b3zkaxic7","evidenceNumber":"ofjlweejx","inquiryDate":"Tue Apr 13 2021 18:59:14 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"119859","user":{"id":18,"name":"Jakub","surname":"Richter","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":136,"state":0,"version":1}	2021-04-13 17:40:24.627567	19	\N	136
145	assetsCreate		{"quantity":"1","name":"HP Proliant dym","serialNumber":"3yhon65pv","inventoryNumber":"g5d3y7fw0","evidenceNumber":"ijcmup7i9","inquiryDate":"Tue Apr 13 2021 06:54:56 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"143217","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":137,"state":0,"version":1}	2021-04-13 17:40:24.797656	19	\N	137
146	assetsCreate		{"quantity":"1","name":"HP Proliant qch","serialNumber":"2y30b6iml","inventoryNumber":"rvmefcwjc","evidenceNumber":"r7tolnpij","inquiryDate":"Tue Apr 13 2021 09:52:51 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"119852","user":{"id":22,"name":"Zlata","surname":"Špotáková","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":138,"state":0,"version":1}	2021-04-13 17:40:24.958942	19	\N	138
147	assetsCreate		{"quantity":"1","name":"HP Proliant 6dg","serialNumber":"hm4uh61hh","inventoryNumber":"sp54r910c","evidenceNumber":"fgdg90rio","inquiryDate":"Tue Apr 13 2021 13:36:22 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"143195","user":{"id":22,"name":"Zlata","surname":"Špotáková","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":139,"state":0,"version":1}	2021-04-13 17:40:25.135131	19	\N	139
148	assetsCreate		{"quantity":"1","name":"HP Proliant xw2","serialNumber":"hhq2gby3z","inventoryNumber":"9h0tx5klo","evidenceNumber":"a2rqjmbw4","inquiryDate":"Tue Apr 13 2021 13:52:30 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"137845","user":{"id":14,"name":"Bohuslav","surname":"Sobota","version":1,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":140,"state":0,"version":1}	2021-04-13 17:40:25.583851	19	\N	140
149	assetsCreate		{"quantity":"1","name":"HP Proliant 5z6","serialNumber":"h5ypi94mx","inventoryNumber":"u44hm3crl","evidenceNumber":"trw43hkzc","inquiryDate":"Mon Apr 12 2021 23:26:33 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"147141","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":141,"state":0,"version":1}	2021-04-13 17:40:25.743345	19	\N	141
150	assetsCreate		{"quantity":"1","name":"HP Proliant onl","serialNumber":"yixmfycuj","inventoryNumber":"ez5mmcpu6","evidenceNumber":"kstyno1ya","inquiryDate":"Tue Apr 13 2021 03:14:22 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"135248","user":{"id":13,"name":"Aneta","surname":"Bittnerová","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":142,"state":0,"version":1}	2021-04-13 17:40:26.038183	19	\N	142
151	assetsCreate		{"quantity":"1","name":"HP Proliant q9c","serialNumber":"2lv0q3lgo","inventoryNumber":"aqkdr5k2k","evidenceNumber":"13daozf8x","inquiryDate":"Tue Apr 13 2021 12:36:41 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"119733","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":143,"state":0,"version":1}	2021-04-13 17:40:26.218239	19	\N	143
152	assetsCreate		{"quantity":"1","name":"HP Proliant rq1","serialNumber":"6m7uso83z","inventoryNumber":"21icn19pn","evidenceNumber":"bc3zsluwr","inquiryDate":"Tue Apr 13 2021 18:49:19 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"142570","user":{"id":19,"name":"Petr","surname":"Pořádný","version":1,"unit":{"id":1,"name":"A","version":2}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":144,"state":0,"version":1}	2021-04-13 17:40:26.543504	19	\N	144
153	assetsCreate		{"quantity":"1","name":"HP Proliant 2wd","serialNumber":"yfb78n5w2","inventoryNumber":"3xhiylmxe","evidenceNumber":"bjo845wfh","inquiryDate":"Tue Apr 13 2021 11:00:19 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"144412","user":{"id":10,"name":"Tomáš","surname":"Klepný","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":145,"state":0,"version":1}	2021-04-13 17:40:26.665194	19	\N	145
154	assetsCreate		{"quantity":"1","name":"HP Proliant q8i","serialNumber":"22i4ux7w2","inventoryNumber":"2esrn9385","evidenceNumber":"xdlp1y6hu","inquiryDate":"Tue Apr 13 2021 17:14:29 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"125108","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":146,"state":0,"version":1}	2021-04-13 17:40:27.025288	19	\N	146
155	assetsCreate		{"quantity":"1","name":"HP Proliant cdb","serialNumber":"kqu60acf2","inventoryNumber":"015rcksus","evidenceNumber":"oxf7bk6it","inquiryDate":"Tue Apr 13 2021 07:43:09 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"109610","user":{"id":8,"name":"Alfred","surname":"Hynek","version":1,"unit":{"id":3,"name":"A11","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":147,"state":0,"version":1}	2021-04-13 17:40:27.206682	19	\N	147
156	assetsCreate		{"quantity":"1","name":"HP Proliant f6o","serialNumber":"l0u6t9w54","inventoryNumber":"2f97xzy3d","evidenceNumber":"8al1dfucr","inquiryDate":"Tue Apr 13 2021 10:34:07 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"100553","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":148,"state":0,"version":1}	2021-04-13 17:40:27.416967	19	\N	148
157	assetsCreate		{"quantity":"1","name":"Dell PowerEdge bbn","serialNumber":"nhbtsfs6q","inventoryNumber":"3rzoifnrk","evidenceNumber":"0nyox234c","inquiryDate":"Tue Apr 13 2021 12:38:23 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"133827","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":149,"state":0,"version":1}	2021-04-13 17:42:50.595677	19	\N	149
158	assetsCreate		{"quantity":"1","name":"Dell PowerEdge 6hp","serialNumber":"0nt1a9lfc","inventoryNumber":"77xtcxjin","evidenceNumber":"aaxo8zce6","inquiryDate":"Tue Apr 13 2021 03:47:13 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"104346","user":{"id":21,"name":"Radka","surname":"Důsledná","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":150,"state":0,"version":1}	2021-04-13 17:42:50.771376	19	\N	150
159	assetsCreate		{"quantity":"1","name":"Dell PowerEdge 5uq","serialNumber":"nyaoi0n30","inventoryNumber":"zhmxv1bfl","evidenceNumber":"mmygrklu7","inquiryDate":"Tue Apr 13 2021 14:00:46 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"126254","user":{"id":16,"name":"Roman","surname":"Bartoška","version":2,"unit":{"id":5,"name":"A13","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":151,"state":0,"version":1}	2021-04-13 17:42:50.941602	19	\N	151
160	assetsCreate		{"quantity":"1","name":"Dell PowerEdge uml","serialNumber":"cvgp289m2","inventoryNumber":"0k3o447wi","evidenceNumber":"oj0kli01o","inquiryDate":"Tue Apr 13 2021 11:25:54 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"125317","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":152,"state":0,"version":1}	2021-04-13 17:42:51.168563	19	\N	152
161	assetsCreate		{"quantity":"1","name":"Dell PowerEdge wwi","serialNumber":"4hid4kjes","inventoryNumber":"ez5vmtnc9","evidenceNumber":"ywzr3c1wc","inquiryDate":"Tue Apr 13 2021 18:27:23 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"107047","user":{"id":21,"name":"Radka","surname":"Důsledná","version":1,"unit":{"id":9,"name":"B","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":153,"state":0,"version":1}	2021-04-13 17:42:51.635946	19	\N	153
162	assetsCreate		{"quantity":"1","name":"Dell PowerEdge m65","serialNumber":"h8l8cjl36","inventoryNumber":"j5hg2ceky","evidenceNumber":"hmelmfl5j","inquiryDate":"Mon Apr 12 2021 23:58:50 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"140844","user":{"id":6,"name":"Daniel","surname":"Prášek","version":1,"unit":{"id":7,"name":"A21","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":154,"state":0,"version":1}	2021-04-13 17:42:51.78203	19	\N	154
163	assetsCreate		{"quantity":"1","name":"Dell PowerEdge uu8","serialNumber":"qaz83yn16","inventoryNumber":"gqbugktpq","evidenceNumber":"tlzh23n97","inquiryDate":"Tue Apr 13 2021 11:42:34 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"110402","user":{"id":20,"name":"Petra","surname":"Malá","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":155,"state":0,"version":1}	2021-04-13 17:42:51.982325	19	\N	155
164	assetsCreate		{"quantity":"1","name":"Dell PowerEdge i4j","serialNumber":"amslfwo53","inventoryNumber":"0cc38p74v","evidenceNumber":"7axb9a2pn","inquiryDate":"Tue Apr 13 2021 18:43:56 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"118444","user":{"id":4,"name":"Josef","surname":"Nový","version":1,"unit":{"id":2,"name":"A1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":156,"state":0,"version":1}	2021-04-13 17:42:52.128663	19	\N	156
165	assetsCreate		{"quantity":"1","name":"Dell PowerEdge qru","serialNumber":"k713l7vy4","inventoryNumber":"qiizbz9sz","evidenceNumber":"0e9hc0tqt","inquiryDate":"Tue Apr 13 2021 02:11:39 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"130603","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":157,"state":0,"version":1}	2021-04-13 17:42:52.270642	19	\N	157
166	assetsCreate		{"quantity":"1","name":"Dell PowerEdge rlq","serialNumber":"wvkegxonn","inventoryNumber":"61xceno8k","evidenceNumber":"xq60bsxnz","inquiryDate":"Mon Apr 12 2021 21:05:40 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"135658","user":{"id":5,"name":"Barbora","surname":"Pátková","version":1,"unit":{"id":6,"name":"A2","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":158,"state":0,"version":1}	2021-04-13 17:42:52.518023	19	\N	158
167	assetsCreate		{"quantity":"1","name":"Dell PowerEdge 8pd","serialNumber":"40y9qxga1","inventoryNumber":"da8i084hj","evidenceNumber":"fe723xvuu","inquiryDate":"Mon Apr 12 2021 20:08:29 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"125186","user":{"id":15,"name":"Cyril","surname":"Novák","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":159,"state":0,"version":1}	2021-04-13 17:42:52.69966	19	\N	159
168	assetsCreate		{"quantity":"1","name":"Dell PowerEdge 49u","serialNumber":"cyts9c277","inventoryNumber":"1qm6akc0l","evidenceNumber":"k4ca6curk","inquiryDate":"Tue Apr 13 2021 16:55:37 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"121936","user":{"id":22,"name":"Zlata","surname":"Špotáková","version":1,"unit":{"id":10,"name":"B1","version":1}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":160,"state":0,"version":1}	2021-04-13 17:42:52.882649	19	\N	160
169	assetsCreate		{"quantity":"1","name":"Dell PowerEdge ccj","serialNumber":"m2nuq4v1j","inventoryNumber":"nqpstsv4r","evidenceNumber":"jn9i9nxsz","inquiryDate":"Tue Apr 13 2021 09:51:20 GMT+0200 (Středoevropský letní čas)","inquiryPrice":"105962","user":{"id":3,"name":"Jiří","surname":"Novák","version":2,"unit":{"id":1,"name":"A","version":2}},"category":{"id":6,"name":"Server","code":"","version":2},"categoryId":6,"identificationNumber":null,"document":null,"location":null,"locationEtc":null,"note":null,"id":161,"state":0,"version":1}	2021-04-13 17:42:53.191785	19	\N	161
170	assetsChangeInformation	{"version":1}	{"version":2}	2021-04-13 17:50:27.763681	19	\N	130
171	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":19,"name":"Petr","surname":"Pořádný"}	2021-05-24 11:54:59.718909	19	\N	135
172	assetsUserChange	{"userId":18,"name":"Jakub","surname":"Richter"}	{"userId":19,"name":"Petr","surname":"Pořádný"}	2021-05-24 11:54:59.725458	19	\N	118
173	assetsUserChange	{"userId":18,"name":"Jakub","surname":"Richter"}	{"userId":4,"name":"Josef","surname":"Nový"}	2021-05-25 07:14:12.120727	19	\N	127
174	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.222837	19	\N	144
175	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.272564	19	\N	132
176	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.290798	19	\N	133
177	assetsUserChange	{"userId":18,"name":"Jakub","surname":"Richter"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.303668	19	\N	136
178	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.355802	19	\N	110
179	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.372971	19	\N	135
180	assetsUserChange	{"userId":4,"name":"Josef","surname":"Nový"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.388649	19	\N	127
181	assetsUserChange	{"userId":3,"name":"Jiří","surname":"Novák"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.399194	19	\N	96
182	assetsUserChange	{"userId":19,"name":"Petr","surname":"Pořádný"}	{"userId":12,"name":"Anežka","surname":"Novotná"}	2021-05-25 07:14:43.408448	19	\N	109
\.


--
-- Data for Name: list_entity; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.list_entity (id, name, category, connected, archived, description, created, updated, "userId") FROM stdin;
1	Barevné tiskárny	tiskárny	f	f	\N	2021-04-13 15:36:43.15804	2021-04-13 15:36:43.15804	19
3	Na zrušení	\N	f	f	myši na vyřazení	2021-04-13 16:30:39.752672	2021-04-13 16:30:39.752672	19
4	Test	\N	f	f	\N	2021-04-17 12:06:26.730549	2021-04-17 12:06:26.730549	1
\.


--
-- Data for Name: location; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.location (id, name, version, "parentId", "masterUnitId") FROM stdin;
\.


--
-- Data for Name: location_closure; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.location_closure (id_ancestor, id_descendant) FROM stdin;
\.


--
-- Data for Name: removing_protocol; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.removing_protocol (id, document, "documentDate", "possibleRemovingDate", created, "userId") FROM stdin;
1	01	2021-04-13 16:30:55.927	2028-04-11 16:30:55.927	2021-04-13 16:31:01.321257	\N
\.


--
-- Data for Name: rights; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.rights (id, tag, name, description, "relatedTo") FROM stdin;
1	createCategory	Tvorba kategorií majetku	\N	categories
2	getUser	zobrazení uživatele	\N	users
3	createUser	tvorba uživatele	\N	users
4	deleteUser	smazání uživatele	\N	users
5	updateUsersInformation	aktualizace uživatelských informací	Aktualizace jména, příjmení a fotografie?	users
6	settingRights	nastavování práv uživatelů	\N	users
7	updateCategory	Úprava kategorií majetku	\N	categories
8	createLocation	Tvorba lokací	\N	locations
9	setRights	tvorba práv	\N	rights
10	createAssets	Přidávání majetku	\N	assets
11	changeAssetsInformation	Změna informací u majetku	\N	assets
12	updateLocation	Mazání lokací	\N	locations
13	changeAssetsUser	Změna uživatele u majetku	\N	assets
14	removeAssets	Vyřazování majetku	\N	assets
15	createUnits	tvorba jednotek	\N	units
16	editUnits	úprava jednotek	\N	units
17	deleteUnits	mazání jednotek	\N	units
18	addManagerToUnits	přidávání manažerů jednotkám	\N	units
19	removeManagerFromUnits	odebírání manažerů z jednotek	\N	units
20	deleteCategory	Mazání kategorií majetku	\N	categories
21	deleteLocation	Úprava lokací	\N	locations
\.


--
-- Data for Name: unit; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.unit (id, name, version, "parentId") FROM stdin;
1	A	2	\N
2	A1	1	1
3	A11	1	2
4	A12	1	2
5	A13	1	2
6	A2	1	1
7	A21	1	6
8	A22	1	6
9	B	1	\N
10	B1	1	9
11	B2	1	9
\.


--
-- Data for Name: unit_closure; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.unit_closure (id_ancestor, id_descendant) FROM stdin;
1	1
2	2
1	2
3	3
2	3
1	3
4	4
2	4
1	4
5	5
2	5
1	5
6	6
1	6
7	7
6	7
1	7
8	8
6	8
1	8
9	9
10	10
9	10
11	11
9	11
\.


--
-- Data for Name: units_users; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.units_users (unit_id, user_id) FROM stdin;
1	1
9	1
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel."user" (id, username, name, surname, password, salt, active, version, "unitId") FROM stdin;
3	komesta	Jiří	Novák	$2a$10$Zt8WTThErf4X02HlVIMt2uWHS/Q7VzAtrFItVrssAm6fM7/CnAxyG	$2a$10$Zt8WTThErf4X02HlVIMt2u	t	2	1
4	jozkas	Josef	Nový	$2a$10$/0/xAS2EHiJqLvuFbeYE8.gqowl33Q4qLc1eD.8USeuggKbGz46tC	$2a$10$/0/xAS2EHiJqLvuFbeYE8.	t	1	2
5	Barbora	Barbora	Pátková	$2a$10$fz/PUMqCvpSezNvM2vGfA.USJCzbejfbNX7ND8nRmjniu2/D6yTPS	$2a$10$fz/PUMqCvpSezNvM2vGfA.	t	1	6
6	danecek	Daniel	Prášek	$2a$10$o/ClCjWVqWaqq5d3M7eh2urnXOOjEH4EsOvF/hD3qT3uGl9YtfXfS	$2a$10$o/ClCjWVqWaqq5d3M7eh2u	t	1	7
7	Adamek	Adam	Havel	$2a$10$wuMH2b84l5sMKeY4P86Bs.Gb33khEF7i3dx13LFZlajSwCyw0VYGa	$2a$10$wuMH2b84l5sMKeY4P86Bs.	t	1	9
8	Alfredek	Alfred	Hynek	$2a$10$BfaODGVroXHis7XkXDiEWukjDiFgXhpEysTjz84VZdMhStS/SdXxe	$2a$10$BfaODGVroXHis7XkXDiEWu	t	1	3
9	Tomasek	Tomáš	Kloudný	$2a$10$wOuhY0Ti4Z1gzF09j4wqU.9dpPTuanlzaJEeBliNMO6GeKUY9K0eG	$2a$10$wOuhY0Ti4Z1gzF09j4wqU.	t	1	6
10	Tomasek1	Tomáš	Klepný	$2a$10$/NaPqoQzPlV6y4UdYHkk6O3DEnFak2sukykHLILHfweHS0ErN5uRW	$2a$10$/NaPqoQzPlV6y4UdYHkk6O	t	1	3
11	Annatak	Anna	Nová	$2a$10$2Pm8PT5bQ/jRuS1yX4DZCubl/MHSDIgSZnWTxxgXIWhCgGCAqf/gG	$2a$10$2Pm8PT5bQ/jRuS1yX4DZCu	t	1	5
12	Anezka	Anežka	Novotná	$2a$10$07frpBf1WDi5J2JVnWOeTe8KjrvSRbDsIoG0pQl9G2TQHc6.C7gfq	$2a$10$07frpBf1WDi5J2JVnWOeTe	t	1	7
13	Aleasd	Aneta	Bittnerová	$2a$10$flsHvzMolxMA8Ey2RxUXzeJAjsFFYuMT7elPRLAxtqXdbDOl9V7iq	$2a$10$flsHvzMolxMA8Ey2RxUXze	t	1	10
14	bohuslavek	Bohuslav	Sobota	$2a$10$J.zKzlaQMEhmCekaeWe1KOpEe8XlLh2q70d.RRca7bN/CmSogXw0.	$2a$10$J.zKzlaQMEhmCekaeWe1KO	t	1	5
15	cyrilek	Cyril	Novák	$2a$10$q6tYz3t9VqknFLFhZEroxOehpltjo0OYiJeyy68..hV1Pp7mAXPM.	$2a$10$q6tYz3t9VqknFLFhZEroxO	t	1	10
17	richtas	Martin	Šmatlák	$2a$10$vneG7V26AFdlzuwYxS0S6.ytLduTi.yNNjmebj1s.VH3hgBX/WNEm	$2a$10$vneG7V26AFdlzuwYxS0S6.	t	1	11
18	smatal	Jakub	Richter	$2a$10$3CDyBZeBhfzS1yP4pmCQG.z7c7dlRVr/GkCctpWVwferrrXzxLhDe	$2a$10$3CDyBZeBhfzS1yP4pmCQG.	t	1	1
19	spravceA	Petr	Pořádný	$2a$10$6MJDunQLYWkKbt.HCFGK/.NTdsjZp9BGgIfNh8FjtxodI6h33/YQm	$2a$10$6MJDunQLYWkKbt.HCFGK/.	t	1	1
16	romake	Roman	Bartoška	$2a$10$bC9LXZbVa468KR4At7jfJeKLVna3yzffCxogekfspSOqsmaJ70T0.	$2a$10$bC9LXZbVa468KR4At7jfJe	t	2	5
20	Petrasad	Petra	Malá	$2a$10$Tf5Y8bgStdp8qNymmQ.YoujT2JOokg6GEBjvhgy4sPXzJBQJc2wom	$2a$10$Tf5Y8bgStdp8qNymmQ.You	t	1	6
21	spravceB	Radka	Důsledná	$2a$10$Dx3bukkplYZ3IzCV528RV.z8Hruj2xj9lAP1HbSNFOqU1jb3BMXwG	$2a$10$Dx3bukkplYZ3IzCV528RV.	t	1	9
22	zlatka	Zlata	Špotáková	$2a$10$yJKBTroUZo0PiN3RTFzsQ..ETOYxU3mQwjV7Hn1SnXNSnA0IsivbW	$2a$10$yJKBTroUZo0PiN3RTFzsQ.	t	1	10
1	Administrator	admin	hlavni	$2a$10$oX2DsmxFoEVNTuH2njD1KOfXMZv7Ltew4x1rstkI/meb/QHy1OuFm	$2a$10$oX2DsmxFoEVNTuH2njD1KO	t	4	\N
\.


--
-- Data for Name: users_rights; Type: TABLE DATA; Schema: devel; Owner: postgres
--

COPY devel.users_rights (user_id, rights_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
1	9
1	8
1	10
1	13
1	15
1	11
1	12
1	14
1	17
1	18
1	19
1	16
1	20
1	21
19	2
19	3
19	4
19	5
19	6
19	8
19	12
19	21
19	10
19	11
19	13
19	14
19	15
19	16
19	17
19	18
19	19
19	1
19	7
19	20
21	2
21	3
21	4
21	5
21	6
21	8
21	12
21	21
21	7
21	20
21	1
21	19
21	18
21	17
21	16
21	15
21	13
21	11
21	10
21	14
16	2
16	13
\.


--
-- Name: asset_note_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.asset_note_id_seq', 1, false);


--
-- Name: assets_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.assets_id_seq', 161, true);


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.category_id_seq', 35, true);


--
-- Name: category_settings_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.category_settings_id_seq', 1, true);


--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.history_id_seq', 182, true);


--
-- Name: list_entity_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.list_entity_id_seq', 4, true);


--
-- Name: location_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.location_id_seq', 1, false);


--
-- Name: removing_protocol_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.removing_protocol_id_seq', 1, true);


--
-- Name: rights_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.rights_id_seq', 21, true);


--
-- Name: unit_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.unit_id_seq', 11, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: devel; Owner: postgres
--

SELECT pg_catalog.setval('devel.user_id_seq', 22, true);


--
-- Name: user PK_03b91d2b8321aa7ba32257dc321; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel."user"
    ADD CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY (id);


--
-- Name: assets_for_list PK_0767956e0620532506b52f0a4a0; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets_for_list
    ADD CONSTRAINT "PK_0767956e0620532506b52f0a4a0" PRIMARY KEY ("userId", "assetId");


--
-- Name: history PK_0cd7178186b34b86b6397129a95; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.history
    ADD CONSTRAINT "PK_0cd7178186b34b86b6397129a95" PRIMARY KEY (id);


--
-- Name: location PK_0cdf0dc691740ac9b1041edb14c; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.location
    ADD CONSTRAINT "PK_0cdf0dc691740ac9b1041edb14c" PRIMARY KEY (id);


--
-- Name: unit_closure PK_136045083c7b73a1239590ebd00; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.unit_closure
    ADD CONSTRAINT "PK_136045083c7b73a1239590ebd00" PRIMARY KEY (id_ancestor, id_descendant);


--
-- Name: rights PK_1ce388920d4f09ee2e81f3ec0c4; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.rights
    ADD CONSTRAINT "PK_1ce388920d4f09ee2e81f3ec0c4" PRIMARY KEY (id);


--
-- Name: list_entity PK_245e6b894a1cff9193494c08255; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.list_entity
    ADD CONSTRAINT "PK_245e6b894a1cff9193494c08255" PRIMARY KEY (id);


--
-- Name: removing_protocol PK_4340e44e0de67b9fe654cb38d1d; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.removing_protocol
    ADD CONSTRAINT "PK_4340e44e0de67b9fe654cb38d1d" PRIMARY KEY (id);


--
-- Name: users_rights PK_4a47f61cb0ed934c118a98b6d9f; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.users_rights
    ADD CONSTRAINT "PK_4a47f61cb0ed934c118a98b6d9f" PRIMARY KEY (user_id, rights_id);


--
-- Name: category_settings PK_5f8b14b13bdaaefedc070b6448c; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category_settings
    ADD CONSTRAINT "PK_5f8b14b13bdaaefedc070b6448c" PRIMARY KEY (id);


--
-- Name: location_closure PK_67ff709a8d004f94287f2de898c; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.location_closure
    ADD CONSTRAINT "PK_67ff709a8d004f94287f2de898c" PRIMARY KEY (id_ancestor, id_descendant);


--
-- Name: asset_note PK_7e8aae8b51248237df1ec559bfe; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.asset_note
    ADD CONSTRAINT "PK_7e8aae8b51248237df1ec559bfe" PRIMARY KEY (id);


--
-- Name: units_users PK_8c3864b326e90f3ce4af7e3b875; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.units_users
    ADD CONSTRAINT "PK_8c3864b326e90f3ce4af7e3b875" PRIMARY KEY (unit_id, user_id);


--
-- Name: unit PK_9c0af0f878f29028f0bef2cf005; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.unit
    ADD CONSTRAINT "PK_9c0af0f878f29028f0bef2cf005" PRIMARY KEY (id);


--
-- Name: category PK_a2fd3397138f6f29d0cdad6ba06; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category
    ADD CONSTRAINT "PK_a2fd3397138f6f29d0cdad6ba06" PRIMARY KEY (id);


--
-- Name: category_closure PK_ba4b6b484479ba1f53563ca5644; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category_closure
    ADD CONSTRAINT "PK_ba4b6b484479ba1f53563ca5644" PRIMARY KEY (id_ancestor, id_descendant);


--
-- Name: assets PK_bbd9b67466ce36ece4b2f1e4fd1; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets
    ADD CONSTRAINT "PK_bbd9b67466ce36ece4b2f1e4fd1" PRIMARY KEY (id);


--
-- Name: unit UQ_1868983ed0b29629e66d80d22d4; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.unit
    ADD CONSTRAINT "UQ_1868983ed0b29629e66d80d22d4" UNIQUE (name);


--
-- Name: rights UQ_3739ee1b0cd5169993e6d5039e7; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.rights
    ADD CONSTRAINT "UQ_3739ee1b0cd5169993e6d5039e7" UNIQUE (tag);


--
-- Name: user UQ_b67337b7f8aa8406e936c2ff754; Type: CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel."user"
    ADD CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE (username);


--
-- Name: IDX_10e74815a010799598c129bb28; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_10e74815a010799598c129bb28" ON devel.units_users USING btree (user_id);


--
-- Name: IDX_266c434660bc839c095ac56e70; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_266c434660bc839c095ac56e70" ON devel.users_rights USING btree (user_id);


--
-- Name: IDX_325def3f480f1c16a1a34e52fb; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_325def3f480f1c16a1a34e52fb" ON devel.category_closure USING btree (id_ancestor);


--
-- Name: IDX_366e31efa2e88c33baad1d8c9e; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_366e31efa2e88c33baad1d8c9e" ON devel.assets_for_list USING btree ("userId");


--
-- Name: IDX_5a1597bcfaa0b590717409ea4e; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_5a1597bcfaa0b590717409ea4e" ON devel.users_rights USING btree (rights_id);


--
-- Name: IDX_5b03e4c8acb25317211690d3a6; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_5b03e4c8acb25317211690d3a6" ON devel.unit_closure USING btree (id_descendant);


--
-- Name: IDX_79df7daf75a70d9cc96ad2933a; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_79df7daf75a70d9cc96ad2933a" ON devel.location_closure USING btree (id_ancestor);


--
-- Name: IDX_9eb2143928401e00879cd663dc; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_9eb2143928401e00879cd663dc" ON devel.unit_closure USING btree (id_ancestor);


--
-- Name: IDX_a2fedd47c0b84f4b89474dcc2e; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_a2fedd47c0b84f4b89474dcc2e" ON devel.category_closure USING btree (id_descendant);


--
-- Name: IDX_aaaf5ce76fbf847a80f02db698; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_aaaf5ce76fbf847a80f02db698" ON devel.location_closure USING btree (id_descendant);


--
-- Name: IDX_b6063aa5192bcaca765b3d6f6c; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_b6063aa5192bcaca765b3d6f6c" ON devel.units_users USING btree (unit_id);


--
-- Name: IDX_dada2fb59e5e15958dcccbc5ab; Type: INDEX; Schema: devel; Owner: postgres
--

CREATE INDEX "IDX_dada2fb59e5e15958dcccbc5ab" ON devel.assets_for_list USING btree ("assetId");


--
-- Name: unit FK_0503e786cc8da7160fba6124e3a; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.unit
    ADD CONSTRAINT "FK_0503e786cc8da7160fba6124e3a" FOREIGN KEY ("parentId") REFERENCES devel.unit(id);


--
-- Name: units_users FK_10e74815a010799598c129bb288; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.units_users
    ADD CONSTRAINT "FK_10e74815a010799598c129bb288" FOREIGN KEY (user_id) REFERENCES devel."user"(id) ON DELETE CASCADE;


--
-- Name: assets FK_216a6d88531541416bcf164d36c; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets
    ADD CONSTRAINT "FK_216a6d88531541416bcf164d36c" FOREIGN KEY ("categoryId") REFERENCES devel.category(id);


--
-- Name: history FK_23d208ac200bc6e47121e8a369f; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.history
    ADD CONSTRAINT "FK_23d208ac200bc6e47121e8a369f" FOREIGN KEY ("userId") REFERENCES devel."user"(id);


--
-- Name: users_rights FK_266c434660bc839c095ac56e709; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.users_rights
    ADD CONSTRAINT "FK_266c434660bc839c095ac56e709" FOREIGN KEY (user_id) REFERENCES devel."user"(id) ON DELETE CASCADE;


--
-- Name: category_closure FK_325def3f480f1c16a1a34e52fbb; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category_closure
    ADD CONSTRAINT "FK_325def3f480f1c16a1a34e52fbb" FOREIGN KEY (id_ancestor) REFERENCES devel.category(id);


--
-- Name: list_entity FK_34da4f70f5e2e19548d1727abf4; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.list_entity
    ADD CONSTRAINT "FK_34da4f70f5e2e19548d1727abf4" FOREIGN KEY ("userId") REFERENCES devel."user"(id);


--
-- Name: assets_for_list FK_366e31efa2e88c33baad1d8c9e2; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets_for_list
    ADD CONSTRAINT "FK_366e31efa2e88c33baad1d8c9e2" FOREIGN KEY ("userId") REFERENCES devel.list_entity(id) ON DELETE CASCADE;


--
-- Name: assets FK_392daafb7a6a4cc106ee6181914; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets
    ADD CONSTRAINT "FK_392daafb7a6a4cc106ee6181914" FOREIGN KEY ("removingProtocolId") REFERENCES devel.removing_protocol(id);


--
-- Name: asset_note FK_4b06f745f8d126e478cb72d4ed8; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.asset_note
    ADD CONSTRAINT "FK_4b06f745f8d126e478cb72d4ed8" FOREIGN KEY ("userNoteId") REFERENCES devel."user"(id);


--
-- Name: history FK_5264fd4209e5072872212441791; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.history
    ADD CONSTRAINT "FK_5264fd4209e5072872212441791" FOREIGN KEY ("changedByUserId") REFERENCES devel."user"(id) ON UPDATE CASCADE;


--
-- Name: users_rights FK_5a1597bcfaa0b590717409ea4ea; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.users_rights
    ADD CONSTRAINT "FK_5a1597bcfaa0b590717409ea4ea" FOREIGN KEY (rights_id) REFERENCES devel.rights(id) ON DELETE CASCADE;


--
-- Name: unit_closure FK_5b03e4c8acb25317211690d3a65; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.unit_closure
    ADD CONSTRAINT "FK_5b03e4c8acb25317211690d3a65" FOREIGN KEY (id_descendant) REFERENCES devel.unit(id);


--
-- Name: removing_protocol FK_6aeee0d5fd22dd759612862bb45; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.removing_protocol
    ADD CONSTRAINT "FK_6aeee0d5fd22dd759612862bb45" FOREIGN KEY ("userId") REFERENCES devel."user"(id) ON UPDATE CASCADE;


--
-- Name: assets FK_73a896871471b10a45956ccdff9; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets
    ADD CONSTRAINT "FK_73a896871471b10a45956ccdff9" FOREIGN KEY ("userId") REFERENCES devel."user"(id) ON UPDATE CASCADE;


--
-- Name: location_closure FK_79df7daf75a70d9cc96ad2933ae; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.location_closure
    ADD CONSTRAINT "FK_79df7daf75a70d9cc96ad2933ae" FOREIGN KEY (id_ancestor) REFERENCES devel.location(id);


--
-- Name: user FK_9553809fa0e1d8802ca06ab78b4; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel."user"
    ADD CONSTRAINT "FK_9553809fa0e1d8802ca06ab78b4" FOREIGN KEY ("unitId") REFERENCES devel.unit(id);


--
-- Name: unit_closure FK_9eb2143928401e00879cd663dcd; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.unit_closure
    ADD CONSTRAINT "FK_9eb2143928401e00879cd663dcd" FOREIGN KEY (id_ancestor) REFERENCES devel.unit(id);


--
-- Name: category_closure FK_a2fedd47c0b84f4b89474dcc2e6; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category_closure
    ADD CONSTRAINT "FK_a2fedd47c0b84f4b89474dcc2e6" FOREIGN KEY (id_descendant) REFERENCES devel.category(id);


--
-- Name: location_closure FK_aaaf5ce76fbf847a80f02db6986; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.location_closure
    ADD CONSTRAINT "FK_aaaf5ce76fbf847a80f02db6986" FOREIGN KEY (id_descendant) REFERENCES devel.location(id);


--
-- Name: units_users FK_b6063aa5192bcaca765b3d6f6c7; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.units_users
    ADD CONSTRAINT "FK_b6063aa5192bcaca765b3d6f6c7" FOREIGN KEY (unit_id) REFERENCES devel.unit(id) ON DELETE CASCADE;


--
-- Name: asset_note FK_b890cb3a153be868aace83a340b; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.asset_note
    ADD CONSTRAINT "FK_b890cb3a153be868aace83a340b" FOREIGN KEY ("deletedByUserId") REFERENCES devel."user"(id);


--
-- Name: history FK_bdd6fdcb22425e26800cecba036; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.history
    ADD CONSTRAINT "FK_bdd6fdcb22425e26800cecba036" FOREIGN KEY ("assetId") REFERENCES devel.assets(id);


--
-- Name: location FK_c2ecf8e93bac110ae43e676b59b; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.location
    ADD CONSTRAINT "FK_c2ecf8e93bac110ae43e676b59b" FOREIGN KEY ("parentId") REFERENCES devel.location(id);


--
-- Name: location FK_c929741144998fa562fe49ceff6; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.location
    ADD CONSTRAINT "FK_c929741144998fa562fe49ceff6" FOREIGN KEY ("masterUnitId") REFERENCES devel.unit(id);


--
-- Name: assets_for_list FK_dada2fb59e5e15958dcccbc5abc; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.assets_for_list
    ADD CONSTRAINT "FK_dada2fb59e5e15958dcccbc5abc" FOREIGN KEY ("assetId") REFERENCES devel.assets(id) ON DELETE CASCADE;


--
-- Name: category FK_e9552c0a1e1ab1d28295475daea; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.category
    ADD CONSTRAINT "FK_e9552c0a1e1ab1d28295475daea" FOREIGN KEY ("parentId") REFERENCES devel.category(id);


--
-- Name: asset_note FK_e98501dbd8c77210f7fe3cf25c4; Type: FK CONSTRAINT; Schema: devel; Owner: postgres
--

ALTER TABLE ONLY devel.asset_note
    ADD CONSTRAINT "FK_e98501dbd8c77210f7fe3cf25c4" FOREIGN KEY ("assetId") REFERENCES devel.assets(id);


--
-- PostgreSQL database dump complete
--

