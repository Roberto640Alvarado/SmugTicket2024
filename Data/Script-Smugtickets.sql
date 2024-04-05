
CREATE TABLE categoria (
	id_categoria uuid NOT NULL DEFAULT gen_random_uuid(),
	descripcion varchar NOT NULL,
	estado int4 NOT NULL,
	CONSTRAINT categoria_pk PRIMARY KEY (id_categoria)
);

-- public.evento definition

-- Drop table

-- DROP TABLE evento;

CREATE TABLE evento (
	id_evento uuid NOT NULL DEFAULT gen_random_uuid(),
	descripcion varchar NOT NULL,
	lugar varchar NOT NULL,
	hora varchar NOT NULL,
	duracion int4 NOT NULL,
	estado int4 NOT NULL,
	fecha_creacion date NOT NULL,
	fecha_evento date NOT NULL,
	id_categoria uuid NOT NULL,
	usuarios_creador uuid NOT NULL,
	imagen varchar NULL DEFAULT 'https://i.pinimg.com/originals/24/58/5f/24585fc9b7433a224a6ff5506e346969.png'::character varying,
	CONSTRAINT evento_pk PRIMARY KEY (id_evento)
);


-- public.evento foreign keys

ALTER TABLE public.evento ADD CONSTRAINT evento_fk_2 FOREIGN KEY (usuarios_creador) REFERENCES "user"(id);
ALTER TABLE public.evento ADD CONSTRAINT evento_fk_3 FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria);

-- public.historial_ticket definition

-- Drop table

-- DROP TABLE historial_ticket;

CREATE TABLE historial_ticket (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	codigo varchar NOT NULL,
	id_ticket uuid NOT NULL,
	estado int4 NOT NULL,
	fecha_modificacion date NOT NULL,
	CONSTRAINT historial_ticket_pk PRIMARY KEY (id)
);


-- public.historial_ticket foreign keys

ALTER TABLE public.historial_ticket ADD CONSTRAINT historial_ticket_fk FOREIGN KEY (id_ticket) REFERENCES tickets(id_ticket);
-- public.lugares definition

-- Drop table

-- DROP TABLE lugares;

CREATE TABLE lugares (
	id_lugares uuid NOT NULL DEFAULT gen_random_uuid(),
	descripcion varchar NOT NULL,
	id_evento uuid NOT NULL,
	precio float4 NULL,
	estado int4 NOT NULL,
	fecha_creacion date NOT NULL,
	tickets int4 NOT NULL,
	CONSTRAINT lugares_pk PRIMARY KEY (id_lugares)
);
-- public.rol definition

-- Drop table

-- DROP TABLE rol;

CREATE TABLE rol (
	id_rol uuid NOT NULL DEFAULT gen_random_uuid(),
	rol varchar NOT NULL,
	descripcion varchar NOT NULL,
	estado int4 NOT NULL,
	CONSTRAINT rol_pk PRIMARY KEY (id_rol)
);
-- public.tickets definition

-- Drop table

-- DROP TABLE tickets;

CREATE TABLE tickets (
	id_ticket uuid NOT NULL DEFAULT gen_random_uuid(),
	estado int4 NOT NULL,
	fecha_venta date NOT NULL,
	id_cliente uuid NOT NULL,
	id_localidad uuid NOT NULL,
	id_evento uuid NOT NULL,
	CONSTRAINT tickets_pk PRIMARY KEY (id_ticket)
);


-- public.tickets foreign keys

ALTER TABLE public.tickets ADD CONSTRAINT tickets_fk_1 FOREIGN KEY (id_cliente) REFERENCES "user"(id);
ALTER TABLE public.tickets ADD CONSTRAINT tickets_fk_2 FOREIGN KEY (id_evento) REFERENCES evento(id_evento);
-- public."token" definition

-- Drop table

-- DROP TABLE "token";

CREATE TABLE "token" (
	code uuid NOT NULL DEFAULT gen_random_uuid(),
	"content" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	"timestamp" timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	user_code uuid NULL,
	CONSTRAINT token_pk PRIMARY KEY (code)
);


-- public."token" foreign keys

ALTER TABLE public."token" ADD CONSTRAINT token_fk FOREIGN KEY (user_code) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE;
-- public.traspaso_tickets definition

-- Drop table

-- DROP TABLE traspaso_tickets;

CREATE TABLE traspaso_tickets (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	id_ticket uuid NOT NULL,
	id_usuario_original uuid NOT NULL,
	fecha_traspaso date NOT NULL DEFAULT CURRENT_DATE,
	fecha_recibido date NULL,
	estado int4 NOT NULL,
	id_nuevo_usuario uuid NOT NULL,
	CONSTRAINT traspaso_tickets_pk PRIMARY KEY (id)
);


-- public.traspaso_tickets foreign keys

ALTER TABLE public.traspaso_tickets ADD CONSTRAINT traspaso_tickets_fk FOREIGN KEY (id_ticket) REFERENCES tickets(id_ticket);
ALTER TABLE public.traspaso_tickets ADD CONSTRAINT traspaso_tickets_fk_1 FOREIGN KEY (id_usuario_original) REFERENCES "user"(id);
ALTER TABLE public.traspaso_tickets ADD CONSTRAINT traspaso_tickets_fk_2 FOREIGN KEY (id_nuevo_usuario) REFERENCES "user"(id);

-- public."user" definition

-- Drop table

-- DROP TABLE "user";

CREATE TABLE "user" (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	usuario varchar NOT NULL,
	estado int4 NOT NULL,
	nombre varchar NOT NULL,
	email varchar NOT NULL,
	fecha_ingreso date NULL,
	"password" varchar NOT NULL,
	active bool NOT NULL DEFAULT true,
	CONSTRAINT user_pk PRIMARY KEY (id)
);

-- public.user_rol definition

-- Drop table

-- DROP TABLE user_rol;

CREATE TABLE user_rol (
	id uuid NOT NULL,
	id_user uuid NOT NULL,
	id_rol uuid NOT NULL,
	estado int4 NOT NULL,
	CONSTRAINT user_rol_pk PRIMARY KEY (id)
);


-- public.user_rol foreign keys

ALTER TABLE public.user_rol ADD CONSTRAINT user_rol_fk FOREIGN KEY (id_user) REFERENCES "user"(id);
ALTER TABLE public.user_rol ADD CONSTRAINT user_rol_fk_1 FOREIGN KEY (id_rol) REFERENCES rol(id_rol);

-- public.usuarios_asignados_eventos definition

-- Drop table

-- DROP TABLE usuarios_asignados_eventos;

CREATE TABLE usuarios_asignados_eventos (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	id_evento uuid NOT NULL,
	id_usuario uuid NOT NULL,
	estado int4 NOT NULL,
	CONSTRAINT usuarios_asignados_eventos_pk PRIMARY KEY (id)
);


-- public.usuarios_asignados_eventos foreign keys

ALTER TABLE public.usuarios_asignados_eventos ADD CONSTRAINT usuarios_asignados_eventos_fk FOREIGN KEY (id_evento) REFERENCES evento(id_evento);
ALTER TABLE public.usuarios_asignados_eventos ADD CONSTRAINT usuarios_asignados_eventos_fk_1 FOREIGN KEY (id_usuario) REFERENCES "user"(id);


-- Agregar el rol Cliente
INSERT INTO rol (rol, descripcion, estado) VALUES ('Cliente', 'Rol para clientes', 1);

-- Agregar el rol Admin
INSERT INTO rol (rol, descripcion, estado) VALUES ('Admin', 'Rol para administradores', 1);

-- Agregar el rol Moderador
INSERT INTO rol (rol, descripcion, estado) VALUES ('Moderador', 'Rol para moderadores', 1);

-- Agregar el rol LectorQR
INSERT INTO rol (rol, descripcion, estado) VALUES ('LectorQR', 'Rol para usuarios con permisos de escaneo de códigos QR', 1);



--Categorias
-- Agregar la categoría Concierto
INSERT INTO categoria (descripcion, estado) VALUES ('Concierto', 1);

-- Agregar la categoría Conferencia
INSERT INTO categoria (descripcion, estado) VALUES ('Conferencia', 1);

-- Agregar la categoría Teatro
INSERT INTO categoria (descripcion, estado) VALUES ('Teatro', 1);

-- Agregar la categoría Danza
INSERT INTO categoria (descripcion, estado) VALUES ('Danza', 1);