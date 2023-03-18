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
}