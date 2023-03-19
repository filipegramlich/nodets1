import { Request, Response } from "express";
const knex = require("../database/knex")

export class TagsController {

    async index(request: Request, response: Response) {

        const { user_id } = request.params;

        const tags = await knex('tags').where({ user_id });

        return response.json(tags);

    }
}


