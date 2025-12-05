CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: commission_kind; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.commission_kind AS ENUM (
    'percent',
    'flat'
);


--
-- Name: seat_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.seat_status AS ENUM (
    'active',
    'limited',
    'full',
    'closed'
);


SET default_table_access_method = heap;

--
-- Name: analytics_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.analytics_events (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id text,
    event_type text NOT NULL,
    event_data jsonb,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: languages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.languages (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    code text NOT NULL,
    name_en text NOT NULL,
    name_ar text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: major_aliases; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.major_aliases (
    alias text NOT NULL,
    major_slug text
);


--
-- Name: majors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.majors (
    slug text NOT NULL,
    name_en text NOT NULL,
    name_ar text,
    emoji text,
    badge_label_en text,
    badge_label_ar text
);


--
-- Name: program_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.program_types (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    duration_years numeric NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: programs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.programs (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    title_ar text,
    university_id uuid,
    program_type_id uuid,
    language_id uuid,
    major_slug text,
    original_tuition numeric NOT NULL,
    tuition_after_discount numeric,
    cash_discount_percent numeric DEFAULT 0,
    siblings_discount_percent numeric DEFAULT 0,
    commission_kind public.commission_kind DEFAULT 'percent'::public.commission_kind,
    commission_rate numeric,
    commission_amount numeric,
    bonus_amount numeric,
    application_deadline date DEFAULT '2025-09-01'::date,
    start_date date,
    seat_status public.seat_status DEFAULT 'active'::public.seat_status,
    total_seats integer,
    available_seats integer,
    is_active boolean DEFAULT true,
    description text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: universities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.universities (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    name_ar text,
    city text NOT NULL,
    country text DEFAULT 'Turkey'::text,
    logo_url text,
    website text,
    established_year integer,
    is_private boolean DEFAULT true,
    is_prestigious boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


--
-- Name: programs_view; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.programs_view AS
 SELECT p.id AS program_id,
    p.title AS program_name_en,
    p.title_ar AS program_name_ar,
    u.name AS university_name,
    u.name_ar AS university_name_ar,
    u.city,
    u.country,
    u.logo_url,
    p.tuition_after_discount,
    p.original_tuition,
    l.id AS language_id,
    l.code AS language_code,
    l.name_en AS language_name_en,
    pt.id AS program_type_id,
    pt.name AS program_type,
    pt.duration_years,
    p.start_date,
    p.application_deadline,
    u.is_private,
    u.is_prestigious,
    p.is_active,
    p.seat_status,
    p.available_seats,
    p.major_slug,
    m.name_en AS major_name_en,
    m.name_ar AS major_name_ar
   FROM ((((public.programs p
     LEFT JOIN public.universities u ON ((p.university_id = u.id)))
     LEFT JOIN public.languages l ON ((p.language_id = l.id)))
     LEFT JOIN public.program_types pt ON ((p.program_type_id = pt.id)))
     LEFT JOIN public.majors m ON ((p.major_slug = m.slug)))
  WHERE (p.is_active = true);


--
-- Name: quiz_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_sessions (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    session_id text,
    user_name text NOT NULL,
    user_phone text,
    user_id uuid,
    answers jsonb NOT NULL,
    grade_band smallint,
    top_major_slug text,
    confidence numeric,
    badge_slug text,
    top_programs jsonb NOT NULL,
    highest_tuition bigint,
    ai_explanation text,
    ai_generated_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);


--
-- Name: analytics_events analytics_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_pkey PRIMARY KEY (id);


--
-- Name: languages languages_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code_key UNIQUE (code);


--
-- Name: languages languages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_pkey PRIMARY KEY (id);


--
-- Name: major_aliases major_aliases_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.major_aliases
    ADD CONSTRAINT major_aliases_pkey PRIMARY KEY (alias);


--
-- Name: majors majors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.majors
    ADD CONSTRAINT majors_pkey PRIMARY KEY (slug);


--
-- Name: program_types program_types_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program_types
    ADD CONSTRAINT program_types_name_key UNIQUE (name);


--
-- Name: program_types program_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.program_types
    ADD CONSTRAINT program_types_pkey PRIMARY KEY (id);


--
-- Name: programs programs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);


--
-- Name: quiz_sessions quiz_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_sessions
    ADD CONSTRAINT quiz_sessions_pkey PRIMARY KEY (id);


--
-- Name: quiz_sessions quiz_sessions_session_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_sessions
    ADD CONSTRAINT quiz_sessions_session_id_key UNIQUE (session_id);


--
-- Name: universities universities_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_name_key UNIQUE (name);


--
-- Name: universities universities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.universities
    ADD CONSTRAINT universities_pkey PRIMARY KEY (id);


--
-- Name: idx_analytics_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_analytics_created_at ON public.analytics_events USING btree (created_at DESC);


--
-- Name: idx_analytics_event_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_analytics_event_type ON public.analytics_events USING btree (event_type);


--
-- Name: idx_analytics_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_analytics_session_id ON public.analytics_events USING btree (session_id);


--
-- Name: idx_programs_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_programs_active ON public.programs USING btree (is_active) WHERE (is_active = true);


--
-- Name: idx_programs_major_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_programs_major_slug ON public.programs USING btree (major_slug);


--
-- Name: idx_programs_tuition; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_programs_tuition ON public.programs USING btree (tuition_after_discount);


--
-- Name: idx_programs_university; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_programs_university ON public.programs USING btree (university_id);


--
-- Name: idx_quiz_sessions_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_quiz_sessions_created_at ON public.quiz_sessions USING btree (created_at DESC);


--
-- Name: idx_quiz_sessions_session_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_quiz_sessions_session_id ON public.quiz_sessions USING btree (session_id);


--
-- Name: idx_quiz_sessions_top_major; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_quiz_sessions_top_major ON public.quiz_sessions USING btree (top_major_slug);


--
-- Name: idx_quiz_sessions_user_phone; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_quiz_sessions_user_phone ON public.quiz_sessions USING btree (user_phone);


--
-- Name: analytics_events analytics_events_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.analytics_events
    ADD CONSTRAINT analytics_events_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.quiz_sessions(session_id) ON DELETE CASCADE;


--
-- Name: major_aliases major_aliases_major_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.major_aliases
    ADD CONSTRAINT major_aliases_major_slug_fkey FOREIGN KEY (major_slug) REFERENCES public.majors(slug) ON DELETE CASCADE;


--
-- Name: programs programs_language_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_language_id_fkey FOREIGN KEY (language_id) REFERENCES public.languages(id) ON DELETE SET NULL;


--
-- Name: programs programs_major_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_major_slug_fkey FOREIGN KEY (major_slug) REFERENCES public.majors(slug) ON DELETE SET NULL;


--
-- Name: programs programs_program_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_program_type_id_fkey FOREIGN KEY (program_type_id) REFERENCES public.program_types(id) ON DELETE SET NULL;


--
-- Name: programs programs_university_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_university_id_fkey FOREIGN KEY (university_id) REFERENCES public.universities(id) ON DELETE SET NULL;


--
-- Name: quiz_sessions quiz_sessions_top_major_slug_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_sessions
    ADD CONSTRAINT quiz_sessions_top_major_slug_fkey FOREIGN KEY (top_major_slug) REFERENCES public.majors(slug) ON DELETE SET NULL;


--
-- Name: analytics_events Anyone can create analytics events; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create analytics events" ON public.analytics_events FOR INSERT WITH CHECK (true);


--
-- Name: quiz_sessions Anyone can create quiz sessions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can create quiz sessions" ON public.quiz_sessions FOR INSERT WITH CHECK (true);


--
-- Name: quiz_sessions Anyone can update quiz sessions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can update quiz sessions" ON public.quiz_sessions FOR UPDATE USING (true);


--
-- Name: programs Anyone can view active programs; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view active programs" ON public.programs FOR SELECT USING ((is_active = true));


--
-- Name: analytics_events Anyone can view analytics events; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view analytics events" ON public.analytics_events FOR SELECT USING (true);


--
-- Name: languages Anyone can view languages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view languages" ON public.languages FOR SELECT USING (true);


--
-- Name: majors Anyone can view majors; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view majors" ON public.majors FOR SELECT USING (true);


--
-- Name: program_types Anyone can view program types; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view program types" ON public.program_types FOR SELECT USING (true);


--
-- Name: quiz_sessions Anyone can view quiz sessions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view quiz sessions" ON public.quiz_sessions FOR SELECT USING (true);


--
-- Name: universities Anyone can view universities; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view universities" ON public.universities FOR SELECT USING (true);


--
-- Name: analytics_events; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

--
-- Name: languages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.languages ENABLE ROW LEVEL SECURITY;

--
-- Name: majors; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.majors ENABLE ROW LEVEL SECURITY;

--
-- Name: program_types; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.program_types ENABLE ROW LEVEL SECURITY;

--
-- Name: programs; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

--
-- Name: quiz_sessions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: universities; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


