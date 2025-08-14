-- CreateTable
CREATE TABLE "public"."Contacts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "Contacts_pkey" PRIMARY KEY ("id")
);
