import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../database/connection";
import { HttpStatusCode } from "../enums/httpStatusCode";

export class List {
  async getList(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramSchema.parse(req.params);

    try {
      const findList = await prisma.user.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          options: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      return res.json(findList);
    } catch (error) {
      console.error("[Get List]: ", error);
      return res.json(error);
    }
  }

  async createList(req: Request, res: Response) {
    const bodySchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = bodySchema.parse(req.body);
    if (!id) {
      return res
        .status(HttpStatusCode.NO_CONTENT)
        .json({ message: "missing id on body" });
    }
    try {
      await prisma.user.create({
        data: {
          id,
        },
      });

      return res
        .status(HttpStatusCode.CREATED)
        .json({ message: "successfuly created" });
    } catch (error) {
      console.error("[Create List]: ", error);
      return res.status(HttpStatusCode.BAD_REQUEST).json(error);
    }
  }
}
