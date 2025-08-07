-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."Category"
(
    "id"        SERIAL       NOT NULL,
    "name"      TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Food"
(
    "id"            TEXT         NOT NULL,
    "name"          TEXT         NOT NULL,
    "calories"      DOUBLE PRECISION,
    "protein"       DOUBLE PRECISION,
    "fat"           DOUBLE PRECISION,
    "carbohydrates" DOUBLE PRECISION,
    "fiber"         DOUBLE PRECISION,
    "sugar"         DOUBLE PRECISION,
    "categoryId"    INTEGER,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ServingUnit"
(
    "id"        TEXT         NOT NULL,
    "name"      TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodServingUnit"
(
    "id"            TEXT         NOT NULL,
    "grams"         DOUBLE PRECISION,
    "foodId"        TEXT         NOT NULL,
    "servingUnitId" TEXT         NOT NULL,
    "createdAt"     TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodServingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User"
(
    "id"             TEXT            NOT NULL,
    "name"           TEXT            NOT NULL,
    "email"          TEXT            NOT NULL,
    "hashedPassword" TEXT            NOT NULL,
    "role"           "public"."Role" NOT NULL DEFAULT 'USER',
    "createdAt"      TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"      TIMESTAMP(3)    NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Meal"
(
    "id"        SERIAL       NOT NULL,
    "dateTime"  TIMESTAMP(3) NOT NULL,
    "userId"    TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MealFood"
(
    "id"            SERIAL           NOT NULL,
    "foodId"        TEXT             NOT NULL,
    "mealId"        INTEGER          NOT NULL,
    "servingUnitId" TEXT             NOT NULL,
    "amount"        DOUBLE PRECISION NOT NULL,
    "createdAt"     TIMESTAMP(3)     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"     TIMESTAMP(3)     NOT NULL,

    CONSTRAINT "MealFood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_FoodServingUnits"
(
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FoodServingUnits_AB_pkey" PRIMARY KEY ("A", "B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "Food_name_key" ON "public"."Food" ("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User" ("email");

-- CreateIndex
CREATE INDEX "_FoodServingUnits_B_index" ON "public"."_FoodServingUnits" ("B");

-- AddForeignKey
ALTER TABLE "public"."Food"
    ADD CONSTRAINT "Food_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodServingUnit"
    ADD CONSTRAINT "FoodServingUnit_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodServingUnit"
    ADD CONSTRAINT "FoodServingUnit_servingUnitId_fkey" FOREIGN KEY ("servingUnitId") REFERENCES "public"."ServingUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Meal"
    ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MealFood"
    ADD CONSTRAINT "MealFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MealFood"
    ADD CONSTRAINT "MealFood_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "public"."Meal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MealFood"
    ADD CONSTRAINT "MealFood_servingUnitId_fkey" FOREIGN KEY ("servingUnitId") REFERENCES "public"."ServingUnit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodServingUnits"
    ADD CONSTRAINT "_FoodServingUnits_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Food" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FoodServingUnits"
    ADD CONSTRAINT "_FoodServingUnits_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."ServingUnit" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
