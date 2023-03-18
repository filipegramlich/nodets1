import {config} from '../../../knexfile';

const knex = require('knex');

export const connection = knex(config.development);
