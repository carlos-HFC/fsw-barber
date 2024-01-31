import { Prisma } from "@prisma/client";

type Barbershop = typeof Prisma.BarbershopScalarFieldEnum;
type Service = typeof Prisma.ServiceScalarFieldEnum;
type User = typeof Prisma.UserScalarFieldEnum;
type Booking = typeof Prisma.BookingScalarFieldEnum;