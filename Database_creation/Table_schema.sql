-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


DROP TABLE IF EXISTS Location CASCADE;
DROP TABLE IF EXISTS Crime CASCADE;

CREATE TABLE Location (
    Suburb VARCHAR(100)   NOT NULL,
    LGA VARCHAR(100)   NOT NULL,
    Latitude VARCHAR(100)   NOT NULL,
    Longitude VARCHAR(100)   NOT NULL,
    CONSTRAINT pk_Location PRIMARY KEY (
        Suburb
     )
);

CREATE TABLE Crime (
    Index_no INT   NOT NULL,
    Year INT   NOT NULL,
    Suburb VARCHAR(100)   NOT NULL,
    LGA VARCHAR(100)   NOT NULL,
    Postcode INT   NOT NULL,
    Offence_div VARCHAR   NOT NULL,
    Offence_sub_div VARCHAR   NOT NULL,
    Incidents INT   NOT NULL,
    CONSTRAINT pk_Crime PRIMARY KEY (
        Index_no
     )
);

ALTER TABLE Crime ADD CONSTRAINT fk_Crime_Suburb FOREIGN KEY(Suburb)
REFERENCES Location (Suburb);



