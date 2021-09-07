-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS Crime CASCADE;

CREATE TABLE Crime (
    index_no INT   NOT NULL,
    year INT   NOT NULL,
    suburb VARCHAR(100)   NOT NULL,
    latitude VARCHAR   NOT NULL,
    longitude VARCHAR   NOT NULL,
    lga VARCHAR(100)   NOT NULL,
    postcode INT   NOT NULL,
    offence_div VARCHAR   NOT NULL,
    offence_sub_div VARCHAR   NOT NULL,
    incidents INT   NOT NULL,
    CONSTRAINT pk_CRIME PRIMARY KEY (
        index_no
     )
);

