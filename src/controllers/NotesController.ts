import { Request, Response } from "express";
const knex = require("../database/knex")

export class NotesController {

    async create(request: Request, response: Response) {

        console.log('entrou no metodo de create nota');

        const { title, description, tags, links } = request.body;
        const { user_id } = request.params;

        console.log(user_id)

        const [note_id] = await knex('notes').insert({
            title,
            description,
            user_id,
        });

        const linksInsert = links.map((link: any) => {
            return {
                note_id,
                url: link
            }
        });

        await knex('links').insert(linksInsert);

        const tagsInsert = tags.map((name: any) => {
            return {
                note_id,
                name,
                user_id
            }
        });

        await knex('tags').insert(tagsInsert);

        response.json();
    }

    async show(request: Request, response: Response) {

        const { id } = request.params;
        const noteSelected = await knex('notes').where({ id }).first();
        const tags = await knex('tags').where({ note_id: id }).orderBy('name');
        const links = await knex('links').where({ note_id: id }).orderBy('created_at');

        return response.json({
            ...noteSelected,
            tags,
            links
        });
    }

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        await knex('notes').where({ id }).delete();

        return response.json();
    }

}