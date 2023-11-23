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

    const findList = await prisma.user.findUnique({
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

    if (!findList) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ message: "List not found" });
    }

    return res.json(findList);
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
      const list = await prisma.user.create({
        data: {
          id,
        },
      });

      return res.status(HttpStatusCode.CREATED).json(list);
    } catch (error) {
      console.error("[Create List]: ", error);
      return res.status(HttpStatusCode.BAD_REQUEST).json(error);
    }
  }
}
