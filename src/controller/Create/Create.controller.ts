import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
interface userType {
  name: string;
  email: string;
}

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body as userType;

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
      },
    });
    res.status(201).json({
      status: "Success",
      newUser,
    });
  } catch (error) {
    res.status(400).json({ sttaus: "Success", error });
  }
};
export { createUser };
