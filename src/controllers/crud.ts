import { Request, Response } from "express";
import { prisma } from "../database/connection";
import { HttpStatusCode } from "../enums/httpStatusCode";
import { z } from "zod";

export class Crud {
  async create(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      option: z.string().min(5, "min length is 5").max(45, "max length is 45"),
    });

    const { id } = paramSchema.parse(req.params);
    const { option } = bodySchema.parse(req.body);

    const checkList = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!checkList) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ message: "List not found" });
    }

    const optionCreated = await prisma.options.create({
      data: {
        option,
        User: { connect: { id } },
      },
    });

    return res.status(HttpStatusCode.CREATED).send(optionCreated);
  }

  async read(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramSchema.parse(req.params);

    const checkList = await prisma.options.findUnique({
      where: {
        id,
      },
    });

    if (!checkList) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ message: "List not found" });
    }

    return res.status(HttpStatusCode.OK).send(checkList);
  }

  async update(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const bodySchema = z.object({
      option: z.string().min(5, "min length is 5").max(45, "max length is 45"),
    });

    const { id } = paramSchema.parse(req.params);
    const { option } = bodySchema.parse(req.body);

    const checkList = await prisma.options.findUnique({
      where: {
        id,
      },
    });

    if (!checkList) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ message: "List not found" });
    }

    const update = await prisma.options.update({
      where: {
        id,
      },
      data: {
        option,
      },
    });

    return res.status(HttpStatusCode.OK).send(update);
  }

  async delete(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramSchema.parse(req.params);

    const checkList = await prisma.options.findUnique({
      where: {
        id,
      },
    });

    if (!checkList) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ message: "List not found" });
    }

    await prisma.options.delete({
      where: {
        id,
      },
    });

    return res.status(HttpStatusCode.OK).send({ message: "deleted option" });
  }

  async vote(req: Request, res: Response) {
    const paramSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramSchema.parse(req.params);

    const checkList = await prisma.options.findUnique({
      where: {
        id,
      },
    });

    if (!checkList) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .send({ message: "List not found" });
    }

    const votedOption = await prisma.options.update({
      where: {
        id,
      },
      data: {
        votes: {
          increment: 1,
        },
      },
    });
    return res.status(HttpStatusCode.OK).send(votedOption);
  }
}
