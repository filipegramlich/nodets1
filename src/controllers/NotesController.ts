import { Request, Response } from "express";
const knex = require("../database/knex")

export class NotesController {

    async create(request: Request, response: Response) {

        const { title, description, tags, links } = request.body;
        const  user_id  = request.user.id;

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

    async index(request: Request, response: Response) {

        const { title,  tags } = request.query;
        const user_id = request.user.id;
        let notes;

        if (tags) {
            const filterTags = (tags as string).split(',').map((tag: string) => tag.trim());

            notes = await knex('tags')
                .select(['notes.id',
                    'notes.title',
                    'notes.user_id',
                ]).where('notes.user_id', user_id)
                .whereLike('notes.title', `%${title}%`)
                .whereIn('name', filterTags)
                .innerJoin('notes', 'notes.id', 'tags.note_id')
        } else {
            notes = await knex('notes').where({ user_id }).whereLike('title', `%${title}%`).orderBy('title');
        }

        const userTags = await knex('tags').where({ user_id });

        const notesWithTags = notes.map((note: any) => {

            const noteTags = userTags.filter((tag: any) => tag.note_id === note.id);

            return {
                ...note,
                tags: noteTags
            }
        });

        return response.json(notesWithTags);
    }
}


